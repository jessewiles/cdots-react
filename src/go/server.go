package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	//"github.com/gin-contrib/sessions"
	//"github.com/gin-contrib/sessions/mongo"
	"github.com/gin-gonic/gin"
	"github.com/jessewiles/cdots/src/go/mongo"
)

func siteIndexHandler(c *gin.Context) {
	c.HTML(
		http.StatusOK, "main.tmpl", gin.H{})
}

func registerHandler(c *gin.Context) {
}

func signinHandler(c *gin.Context) {
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

func getStacks(c *gin.Context) {
	m, ok := c.Keys["mongo"].(*mongo.MongoDB)
	if !ok {
		c.JSON(400, gin.H{"message": "can't reach db", "body": nil})
	}

	name := c.Param("name")
	stacks, err := m.GetStacks(name)
	if err != nil {
		c.JSON(400, gin.H{"message": "can't get stacks from database", "body": nil})
	} else {
		c.JSON(200, stacks)
	}
}

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

func getStackedTimeline(c *gin.Context) {
	m, ok := c.Keys["mongo"].(*mongo.MongoDB)
	if !ok {
		c.JSON(400, gin.H{"message": "can't reach db", "body": nil})
	}

	name := c.Param("name")
	stacks := strings.Split(c.Param("stacks"), "/")
	var tls []mongo.Timeline
	tl, err := m.GetTimeline(name)
	if err != nil {
		log.Printf("Error fetching timeline: %s", name)
		c.JSON(400, gin.H{"message": "problem retrieving stacked tl from database", "body": nil})
		return
	} else {
		tls = append(tls, tl)
	}
	for _, stack := range stacks {
		if stack != "" {
			tl, err = m.GetTimeline(stack)
			if err != nil {
				log.Printf("Error fetching stack: %s\n", stack)
				c.JSON(400, gin.H{"message": "problem retrieving stacked tl from database", "body": nil})
				return
			} else {
				tls = append(tls, tl)
			}
		}
	}

	c.JSON(200, tls)
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
	router.GET("/api/stacks/on/:name", getStacks)
	router.GET("/api/timelines", getTimelines)
	router.GET("/api/timeline/:name", getTimeline)
	router.GET("/api/timeline/:name/*stacks", getStackedTimeline)
	router.POST("/api/timeline/:name", saveTimeline)
	router.DELETE("/api/timeline/:name", deleteTimeline)
	return
}

func main() {
	router := SetupRouter()
	router.Run()
}
