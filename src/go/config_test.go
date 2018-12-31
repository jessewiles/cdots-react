package main

import (
	"testing"
)

func TestConfigObject(t *testing.T) {
	if Config.TemplateDirectory != "./templates/*" {
		t.Errorf("Unexpected templates directory: %s", Config.TemplateDirectory)
	}
	if Config.StaticDirectory != "../../public" {
		t.Errorf("Unexpected static directory: %s", Config.StaticDirectory)
	}
	if Config.MongoHost != "localhost" {
		t.Errorf("Unexpected mongo host: %s", Config.MongoHost)
	}
	if Config.MongoPort != "27017" {
		t.Errorf("Unexpected mongo port: %s", Config.MongoPort)
	}
}
