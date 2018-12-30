package main

import (
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
	ID   string `json:"id"`
	User string `json:"user"`
	Name string `json:"name"`
	Dots []Dot  `json:"dots"`
}

type Dot struct {
	ID      string     `json:"id"`
	Content string     `json:"content"`
	Start   *time.Time `json:"start"`
	End     *time.Time `json:"end,omitempty"`
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
	m.Host = "localhost"
	m.Addrs = "localhost:27017"
	m.Database = "cdots"
	m.EventTTLAfterEnd = 1 * time.Second
	m.StdEventTTL = 20 * time.Minute
	m.Info = &mgo.DialInfo{
		Addrs:    []string{m.Addrs},
		Timeout:  60 * time.Second,
		Database: m.Database,
	}
}

func (mongo *MongoDB) SetSession() (err error) {
	mongo.Session, err = mgo.DialWithInfo(mongo.Info)
	if err != nil {
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