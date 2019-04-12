package mongo

import "os"

type configuration struct {
	uri      string
	user     string
	password string
}

var config configuration

func init() {
	var exists bool
	config = configuration{}
	if config.uri, exists = os.LookupEnv("CDOTS_MONGO_URI"); !exists {
		config.uri = "mongodb://localhost:27017/cdots"
	}
	if config.user, exists = os.LookupEnv("CDOTS_MONGO_USER"); !exists {
		config.user = "root"
	}
	if config.password, exists = os.LookupEnv("CDOTS_MONGO_PASSWORD"); !exists {
		config.password = "password!"
	}
}
