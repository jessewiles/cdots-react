package mongo

import "os"

type configuration struct {
	uri      string
	user     *string
	password *string
}

var config configuration

func init() {
	var exists bool
	var user string
	var pass string
	config = configuration{}
	if config.uri, exists = os.LookupEnv("CDOTS_MONGO_URI"); !exists {
		config.uri = "mongodb://localhost:27017/cdots"
	}
	if user, exists = os.LookupEnv("CDOTS_MONGO_USER"); !exists {
		config.user = nil
	} else {
		config.user = &user
	}
	if pass, exists = os.LookupEnv("CDOTS_MONGO_PASSWORD"); !exists {
		config.password = nil
	} else {
		config.password = &pass
	}
}
