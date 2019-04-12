package main

import (
	"os"
)

type configuration struct {
	TemplateDirectory string
	StaticDirectory   string
}

var Config configuration

func init() {
	var exists bool
	Config = configuration{}
	if Config.TemplateDirectory, exists = os.LookupEnv("CDOTS_TMPL_DIR"); !exists {
		Config.TemplateDirectory = "./templates/*"
	}
	if Config.StaticDirectory, exists = os.LookupEnv("CDOTS_STATIC_DIR"); !exists {
		Config.StaticDirectory = "../../public"
	}

}
