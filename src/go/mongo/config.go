package mongo

import "os"

type configuration struct {
	host     string
	port     string
	user     string
	password string
}

var config configuration

func init() {
	var exists bool
	config = configuration{}
	if config.host, exists = os.LookupEnv("CDOTS_MONGO_HOST"); !exists {
		config.host = "localhost"
	}
	if config.port, exists = os.LookupEnv("CDOTS_MONGO_PORT"); !exists {
		config.port = "27017"
	}
	if config.user, exists = os.LookupEnv("CDOTS_MONGO_USER"); !exists {
		config.user = "root"
	}
	if config.password, exists = os.LookupEnv("CDOTS_MONGO_PASSWORD"); !exists {
		config.password = "password!"
	}
}
