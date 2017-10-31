const http = require('http')
const express = require('express')
const net = require('net')
var app = express();

const read = () => {
	return JSON.parse(require('fs').readFileSync('./temperature.json', 'utf8'))
}
app.use('/', express.static('static'))
app.get("/data", (req, res) => {
	let array = read()
	res.json(array)
})
app.get('/reset', (req, res) => {
	if (req.query.pass == '997') {
		require('fs').writeFileSync('./temperature.json', JSON.stringify([]))
		res.send('1')
	}
	res.send('0')
})
app.get("/saveTemperature", (req, res) => {
	let array = read()
	if (array.constructor != Array) {
		array = []
	}
	const data = {
		in : req.query.in,
		out : req.query.out,
		date : Date.now()
	}
	array.push(data)
	require('fs').writeFileSync('./temperature.json', JSON.stringify(array))
})

app.listen(process.env.PORT || 80)

