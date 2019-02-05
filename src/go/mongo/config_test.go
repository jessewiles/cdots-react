package mongo

import (
	"testing"
)

func TestConfigObject(t *testing.T) {
	if config.host != "localhost" {
		t.Errorf("Unexpected mongo host: %s", config.host)
	}
	if config.port != "27017" {
		t.Errorf("Unexpected mongo port: %s", config.port)
	}
	if config.user != "root" {
		t.Errorf("Unexpected mongo user: %s", config.user)
	}
	if config.password != "password!" {
		t.Errorf("Unexpected mongo password: %s", config.password)
	}
}
