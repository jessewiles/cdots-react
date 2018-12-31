package main

import (
	"net/http"
	"strconv"

	//"github.com/gin-contrib/sessions"
	//"github.com/gin-contrib/sessions/mongo"
	"github.com/gin-gonic/gin"
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

func getData(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*MongoDB)
	if !ok {
		c.JSON(400, gin.H{"message": "can't reach db", "body": nil})
	}

	data, err := mongo.GetData()
	// fmt.Printf("\ndata: %v, ok: %v\n", data, ok)
	if err != nil {
		c.JSON(400, gin.H{"message": "can't get data from database", "body": nil})
	} else {
		c.JSON(200, gin.H{"message": "get data sucess", "body": data})
	}
} // }}}

func postData(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*MongoDB)
	if !ok {
		c.JSON(400, gin.H{"message": "can't connect to db", "body": nil})
	}
	var req Data
	err := c.Bind(&req)
	if err != nil {
		c.JSON(400, gin.H{"message": "Incorrect data", "body": nil})
		return
	} else {
		err := mongo.PostData(&req)
		if err != nil {
			c.JSON(400, gin.H{"message": "error post to db", "body": nil})
		}
		c.JSON(200, gin.H{"message": "post data sucess", "body": req})
	}
} // }}}

func getTimelines(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*MongoDB)
	if !ok {
		c.JSON(400, gin.H{"message": "can't reach db", "body": nil})
	}

	tl, err := mongo.GetTimelines()
	// fmt.Printf("\ndata: %v, ok: %v\n", data, ok)
	if err != nil {
		c.JSON(400, gin.H{"message": "can't get data from database", "body": nil})
	} else {
		c.JSON(200, tl)
	}
} // }}}

func getTimeline(c *gin.Context) { // {{{
	mongo, ok := c.Keys["mongo"].(*MongoDB)
	if !ok {
		c.JSON(400, gin.H{"message": "can't reach db", "body": nil})
	}

	name := c.Param("name")
	tl, err := mongo.GetTimeline(name)
	// fmt.Printf("\ndata: %v, ok: %v\n", data, ok)
	if err != nil {
		c.JSON(400, gin.H{"message": "can't get timeline from database", "body": nil})
	} else {
		c.JSON(200, tl)
	}
}

func SetupRouter() *gin.Engine {
	mongo := MongoDB{}
	mongo.SetDefault()

	router := gin.Default()
	router.LoadHTMLGlob(Config.TemplateDirectory)
	router.Use(gin.Recovery())
	router.Use(MiddleDB(&mongo))

	router.Static("/static/", Config.StaticDirectory)
	router.GET("/", siteIndexHandler)
	router.GET("/data", getData)
	router.POST("/data", postData)
	router.GET("/timelines", getTimelines)
	router.GET("/view/:name", getTimeline)
	return router
}

func main() {
	router := SetupRouter()
	router.Run()
}
