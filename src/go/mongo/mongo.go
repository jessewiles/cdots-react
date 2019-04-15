package mongo

import (
	"log"
	"time"

	"github.com/gin-gonic/gin"
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

const Database = "cdots"

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
	Info    *mgo.DialInfo
	Session *mgo.Session
}

func (m *MongoDB) SetDefault() (err error) {
	m.Info, err = mgo.ParseURL(config.uri)
	if err != nil {
		log.Printf("%v", err)
	}
	m.Info.Username = config.user
	m.Info.Password = config.password
	return
}

func (m *MongoDB) SetSession() (err error) {
	log.Println("Trying to set the mongo session...")
	log.Printf("%v\n", m.Info)
	m.Session, err = mgo.DialWithInfo(m.Info)
	if err != nil {
		log.Printf("%v", err)
		m.Session, err = mgo.Dial(config.uri)
		if err != nil {
			return
		}
	}
	return
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

	err = session.DB(Database).C("Data").Find(bson.M{}).All(&dates)
	return dates, err
}

func (m *MongoDB) PostData(data *Data) (err error) {
	session := m.Session.Clone()
	defer session.Close()

	err = session.DB(Database).C("Data").Insert(&data)
	return err
}

func (m *MongoDB) GetTimelines() (tl []Timeline, err error) {
	session := m.Session.Clone()
	defer session.Close()

	err = session.DB(Database).C("timelines").Find(bson.M{}).All(&tl)
	return tl, err
}

func (m *MongoDB) GetTimeline(name string) (tl Timeline, err error) {
	session := m.Session.Clone()
	defer session.Close()

	err = session.DB(Database).C("timelines").Find(bson.M{"name": name}).One(&tl)
	return tl, err
}

func (m *MongoDB) NewTimeline(tl *Timeline) (err error) {
	session := m.Session.Clone()
	defer session.Close()

	err = session.DB(Database).C("timelines").Insert(
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
	err = session.DB(Database).C("timelines").Update(
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

	err = session.DB(Database).C("timelines").Remove(bson.M{"name": name})
	return
}

func (m *MongoDB) NewTimelineKey(tlk *TimelineKey) (err error) {
	session := m.Session.Clone()
	defer session.Close()
	err = session.DB(Database).C("timelineKeys").Insert(
		bson.M{
			"key": tlk.Key,
		})
	return
}
