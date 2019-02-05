package main

import (
	"fmt"
	"log"
	"time"

	"github.com/gin-gonic/gin"
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type Data struct {
	Id   bson.ObjectId `form:"id" bson:"_id,omitempty"`
	Data string        `form:"data" bson:"data"`
}

type Timeline struct {
	ID   string `json:"id,omitempty"`
	User string `json:"user,omitempty"`
	Name string `json:"name,omitempty"`
	Dots []Dot  `json:"dots,omitempty"`
}

type Dot struct {
	ID      string     `json:"id"`
	Content string     `json:"content"`
	Start   *time.Time `json:"start"`
	End     *time.Time `json:"end,omitempty"`
}

type TimelineKey struct {
	ID         string `json:"id"`
	Key        string `json:"key"`
	TimelineID string `json:"timelineID,omitempty"`
}

type MongoDB struct {
	Host             string
	Port             string
	Addrs            string
	Database         string
	EventTTLAfterEnd time.Duration
	StdEventTTL      time.Duration
	Info             *mgo.DialInfo
	Session          *mgo.Session
}

func (m *MongoDB) SetDefault() {
	m.Host = Config.MongoHost
	m.Addrs = fmt.Sprintf("%s:%s", Config.MongoHost, Config.MongoPort)
	m.Database = "cdots"
	m.EventTTLAfterEnd = 1 * time.Second
	m.StdEventTTL = 20 * time.Minute
	m.Info = &mgo.DialInfo{
		Addrs:    []string{m.Addrs},
		Timeout:  30 * time.Second,
		Database: "cdots",
		Username: Config.MongoUser,
		Password: Config.MongoPassword,
	}
}

func (mongo *MongoDB) SetSession() (err error) {
	mongo.Session, err = mgo.DialWithInfo(mongo.Info)
	if err != nil {
		log.Printf("%v", err)
		mongo.Session, err = mgo.Dial(mongo.Host)
		if err != nil {
			return err
		}
	}
	return err
}

func MiddleDB(m *MongoDB) gin.HandlerFunc {
	return func(c *gin.Context) {
		err := m.SetSession()
		if err != nil {
			log.Println("Could not set db session")
			c.Abort()
		} else {
			c.Set("mongo", m)
			c.Next()
		}
	}
}

// ========== model

func (m *MongoDB) GetData() (dates []Data, err error) {
	session := m.Session.Clone()
	defer session.Close()

	err = session.DB(m.Database).C("Data").Find(bson.M{}).All(&dates)
	return dates, err
}

func (m *MongoDB) PostData(data *Data) (err error) {
	session := m.Session.Clone()
	defer session.Close()

	err = session.DB(m.Database).C("Data").Insert(&data)
	return err
}

func (m *MongoDB) GetTimelines() (tl []Timeline, err error) {
	session := m.Session.Clone()
	defer session.Close()

	err = session.DB(m.Database).C("timelines").Find(bson.M{}).All(&tl)
	return tl, err
}

func (m *MongoDB) GetTimeline(name string) (tl Timeline, err error) {
	session := m.Session.Clone()
	defer session.Close()

	err = session.DB(m.Database).C("timelines").Find(bson.M{"name": name}).One(&tl)
	return tl, err
}

func (m *MongoDB) NewTimeline(tl *Timeline) (err error) {
	session := m.Session.Clone()
	defer session.Close()

	err = session.DB(m.Database).C("timelines").Insert(
		bson.M{
			"name": tl.Name,
			"dots": []bson.M{},
		})
	return
}

func (m *MongoDB) SaveTimeline(name string, tl *Timeline) (err error) {
	session := m.Session.Clone()
	defer session.Close()

	dots := []bson.M{}
	for _, dot := range tl.Dots {
		d := bson.M{
			"id":      dot.ID,
			"content": dot.Content,
			"start":   dot.Start,
		}
		if dot.End != nil {
			d["end"] = dot.End
		}
		dots = append(dots, d)
	}
	err = session.DB(m.Database).C("timelines").Update(
		bson.M{"name": name},
		bson.M{
			"$set": bson.M{
				"name": tl.Name,
				"dots": dots,
			},
		},
	)
	return
}

func (m *MongoDB) DeleteTimeline(name string) (err error) {
	session := m.Session.Clone()
	defer session.Close()

	err = session.DB(m.Database).C("timelines").Remove(bson.M{"name": name})
	return
}

func (m *MongoDB) NewTimelineKey(tlk *TimelineKey) (err error) {
	session := m.Session.Clone()
	defer session.Close()
	err = session.DB(m.Database).C("timelineKeys").Insert(
		bson.M{
			"key": tlk.Key,
		})
	return
}
