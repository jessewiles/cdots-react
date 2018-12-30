const express = require('express')
const path = require('path')
const port = process.env.PORT || 4000
const app = express()

const TIMELINES = [
    {
        id: '87654ABCDBDCFA',
        user: 'DEF7014388BBDE',
        name: 'alpha',
        dots: [
            {
                id: 'x1000',
                content: 'eins',
                start: '2015-04-11',
                end: '2015-05-01'
            },
            {
                id: 'x2000',
                content: 'tsvei',
                start: '2011-08-12'
            },
            {
                id: 'x3000',
                content: 'drei',
                start: '2015-11-04'
            }
        ]
    },
    {
        id: '12354ABCDBDCFA',
        user: 'FED7014388BBDE',
        name: 'beta',
        dots: [
            {
                id: 'x1000',
                content: 'un',
                start: '2014-09-14'
            },
            {
                id: 'x2000',
                content: 'deux',
                start: '2014-08-08'
            },
            {
                id: 'x3000',
                content: 'trois',
                start: '2014-09-04'
            }
        ]
    }
    ]


app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.get('/timelines', function(request, response) {
    response.writeHead(200, 'OK', { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(TIMELINES))
})

app.get('/view/:name', function(request, response) {
    var name = request.params.name,
        obj = (t => {
            for (var i = 0 ; i < t.length; i++) {
                if (t[i].name === name)
                    return t[i];
            }
        })(TIMELINES);
    response.writeHead(200, 'OK', { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(obj))
})

app.listen(port)
console.log('server started on port ' + port)