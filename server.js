var http = require('http'),
    fs = require('fs'),
    // NEVER use a Sync function except at start-up!
    index = fs.readFileSync(__dirname + '/index.html');

// Send index.html to all requests
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

// Socket.io server listens to our app
var io = require('socket.io').listen(app);

var scores = [
	{
		groupNumber: 1,
		scoreContent: {
			total: 0,
			number: 0,
			average: 0
		},
		scorePresentation: {
			total: 0,
			number: 0,
			average: 0
		},
		scoreDelivery: {
			total: 0,
			number: 0,
			average: 0
		}
	},
	{
		groupNumber: 2,
		scoreContent: {
			total: 0,
			number: 0,
			average: 0
		},
		scorePresentation: {
			total: 0,
			number: 0,
			average: 0
		},
		scoreDelivery: {
			total: 0,
			number: 0,
			average: 0
		}
	},
	{
		groupNumber: 3,
		scoreContent: {
			total: 0,
			number: 0,
			average: 0
		},
		scorePresentation: {
			total: 0,
			number: 0,
			average: 0
		},
		scoreDelivery: {
			total: 0,
			number: 0,
			average: 0
		}
	},
	{
		groupNumber: 4,
		scoreContent: {
			total: 0,
			number: 0,
			average: 0
		},
		scorePresentation: {
			total: 0,
			number: 0,
			average: 0
		},
		scoreDelivery: {
			total: 0,
			number: 0,
			average: 0
		}
	}
];

var updateScores = function (index, data) {
	scores[index].scoreContent.total += parseInt(data.scoreContent);
	scores[index].scoreContent.number++;
	scores[index].scoreContent.average =
		scores[index].scoreContent.total/scores[index].scoreContent.number;

	scores[index].scorePresentation.total += parseInt(data.scorePresentation);
	scores[index].scorePresentation.number++;
	scores[index].scorePresentation.average =
		scores[index].scorePresentation.total/scores[index].scorePresentation.number;

	scores[index].scoreDelivery.total += parseInt(data.scoreDelivery);
	scores[index].scoreDelivery.number++;
	scores[index].scoreDelivery.average =
		scores[index].scoreDelivery.total/scores[index].scoreDelivery.number;

	console.log(scores[index]);
	io.sockets.emit('getScores', scores);
};

// Emit welcome message on connection
io.sockets.on('connection', function(socket) {
    socket.on('submitScores', function (data) {
    	updateScores(data.groupNumber - 1, data);
  	});
    socket.emit('getScores', scores);
});

app.listen(3000);
