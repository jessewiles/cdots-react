package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"

	//"github.com/gin-contrib/sessions"
	//"github.com/gin-contrib/sessions/mongo"
	"github.com/gin-gonic/gin"
	"github.com/jessewiles/cdots/src/go/mongo"
	uuid "github.com/satori/go.uuid"
)

func siteIndexHandler(c *gin.Context) {
	c.HTML(
		http.StatusOK, "main.tmpl", gin.H{})
}

func registerHandler(c *gin.Context) {
}

func signinHandler(c *gin.Context) {
}

func uuidHandler(w http.ResponseWriter, r *http.Request) {
	auuid := []byte(uuid.NewV4().String())
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "text/plain")
	w.Header().Set("Content-Length", strconv.Itoa(len(auuid)))
	w.Write(auuid)
}

func getTimelines(c *gin.Context) { // {{{
	m, ok := c.Keys["mongo"].(*mongo.MongoDB)
	if !ok {
		c.JSON(400, gin.H{"message": "can't reach db", "body": nil})
	}

	tl, err := m.GetTimelines()
	if err != nil {
		c.JSON(400, gin.H{"message": "can't get data from database", "body": nil})
	} else {
		c.JSON(200, tl)
	}
} // }}}

func getTimeline(c *gin.Context) { // {{{
	m, ok := c.Keys["mongo"].(*mongo.MongoDB)
	if !ok {
		c.JSON(400, gin.H{"message": "can't reach db", "body": nil})
	}

	name := c.Param("name")
	tl, err := m.GetTimeline(name)
	if err != nil {
		c.JSON(400, gin.H{"message": "can't get timeline from database", "body": nil})
	} else {
		c.JSON(200, tl)
	}
}

func newTimeline(c *gin.Context) {
	m, ok := c.Keys["mongo"].(*mongo.MongoDB)
	if !ok {
		c.JSON(400, gin.H{"message": "can't reach db", "body": nil})
	}

	body, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(400, gin.H{
			"message": fmt.Sprintf("Error reading data from request: %v", err),
			"body":    nil,
		})
	}
	tl := mongo.Timeline{}
	err = json.Unmarshal(body, &tl)
	if err != nil {
		c.JSON(400, gin.H{
			"message": fmt.Sprintf("Error unmarshaling timeline from request: %v: %s", err, string(body)),
			"body":    nil,
		})
		return
	}
	err = m.NewTimeline(&tl)
	if err != nil {
		c.JSON(400, gin.H{
			"message": fmt.Sprintf("Error making new timeline: %v", err),
			"body":    nil,
		})
		return
	}
	c.JSON(202, nil)
}

func saveTimeline(c *gin.Context) {
	m, ok := c.Keys["mongo"].(*mongo.MongoDB)
	if !ok {
		c.JSON(400, gin.H{"message": "Database is not available", "body": nil})
	}

	name := c.Param("name")
	body, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(400, gin.H{
			"message": fmt.Sprintf("Error reading data from request: %v", err),
			"body":    nil,
		})
	}
	tl := mongo.Timeline{}
	err = json.Unmarshal(body, &tl)
	if err != nil {
		c.JSON(400, gin.H{
			"message": fmt.Sprintf("Error unmarshaling timeline from request: %v: %s", err, string(body)),
			"body":    nil,
		})
		return
	}
	err = m.SaveTimeline(name, &tl)
	if err != nil {
		c.JSON(400, gin.H{
			"message": fmt.Sprintf("Error saving timeline: %v", err),
			"body":    nil,
		})
		return
	}
	c.JSON(200, nil)
}

// deleteTimeline
func deleteTimeline(c *gin.Context) {
	m, ok := c.Keys["mongo"].(*mongo.MongoDB)
	if !ok {
		c.JSON(400, gin.H{"message": "Database is not available", "body": nil})
	}

	name := c.Param("name")

	err := m.DeleteTimeline(name)
	if err != nil {
		c.JSON(400, gin.H{
			"message": fmt.Sprintf("Error deleting timeline: %v", err),
			"body":    nil,
		})
		return
	}
	c.JSON(200, nil)
}

func SetupRouter() (router *gin.Engine) {
	m := mongo.MongoDB{}
	m.SetDefault()

	router = gin.Default()
	router.LoadHTMLGlob(Config.TemplateDirectory)
	router.Use(gin.Recovery())
	router.Use(mongo.MiddleDB(&m))

	router.Static("/static/", Config.StaticDirectory)
	router.GET("/", siteIndexHandler)
	router.POST("/api/add", newTimeline)
	router.GET("/api/timelines", getTimelines)
	router.GET("/api/timeline/:name", getTimeline)
	router.POST("/api/timeline/:name", saveTimeline)
	router.DELETE("/api/timeline/:name", deleteTimeline)
	return
}

func main() {
	router := SetupRouter()
	router.Run()
}
