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
}
