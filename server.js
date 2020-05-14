let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let db = [];

//configure the express app to handle the engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

//serve static file
app.use(express.static('images'))
app.use(express.static('css'))

app.get('/', function (req, res) {
    res.render('index')
})

app.get('/addtask', function(req, res){
    res.render('addtask');
})

app.get('/listtasks', function(req, res){
    res.render('listtasks', {
        tasksDb: db
    })
})

app.post('/add', function(req, res){
    db.push({
        id: 1 + Math.floor((Math.random() * 100)),
        name: req.body.name,
        dueDate: req.body.dueDate,
        description: req.body.description
    })

    res.render('listtasks', {
        tasksDb: db
    })
})

app.listen(8000);
