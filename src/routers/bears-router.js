
var bears = [];
var nextId = 1;

module.exports = {
    "/bears": {
        get: function (req, res) {
            res.json(bears);
        },
        post: function (req, res) {
            if (req.body.name) {
                var bear = {
                    id: nextId++,
                    name: req.body.name
                };
                bears.push(bear);
                res.json(bear);
            } else {
                res.status(400).json({message: 'Name not provided or invalid'});
            }
        }
    },
    "/bears/:id": {
        get: function (req, res) {
            var bear = bears.find(function (b) {
                return b.id === parseInt(req.params.id, 10);
            });

            if (bear) {
                res.json(bear);
            } else {
                res.status(404).json({message: 'Bear not found'});
            }
        }
    }
};