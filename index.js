
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var router = express.Router();

router.get('/', function (req, res) {
    res.json({ message: "hellow world!" });
});

var bearsRouter = require('./src/routers/bears-router');

for(var path in bearsRouter) {
    if (bearsRouter.hasOwnProperty(path)) {
        var route = router.route(path);

        for (var method in bearsRouter[path]) {
            if (bearsRouter[path].hasOwnProperty(method) && typeof route[method] === 'function') {
                route[method](bearsRouter[path][method]);
            }
        }
    }
}


app.use('/api', router);

app.listen(port, function () {
    console.log('listening on port', port)
});