package main

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
)

const INDEX_FILE_FRAGMENT = `<div id="react-root"></div>`

func TestIndexHandler(t *testing.T) {
	req, _ := http.NewRequest("GET", "/", nil)
	w := httptest.NewRecorder()
	r := gin.Default()
	r.LoadHTMLGlob(Config.TemplateDirectory)
	r.GET("/", siteIndexHandler)
	r.ServeHTTP(w, req)
	if w.HeaderMap.Get("Content-Type") != "text/html; charset=utf-8" {
		t.Errorf("Bad content type: %s", w.HeaderMap.Get("Content-Type"))
	}
	if strings.Index(w.Body.String(), INDEX_FILE_FRAGMENT) < 0 {
		t.Errorf("Expected index file string not found: %s", w.Body.String())
	}
}
