const http = require('http')
const express = require('express')
const net = require('net')
var app = express();

app.get("/", (req, res) => {
	let array = require('./temperature.json')
	res.json(array)
})
app.get('/reset', (req, res) => {
	if (req.query.pass == '997') {
		require('fs').writeFileSync('./temperature.json', JSON.stringify([]))
	}
})
app.get("/saveTemperature", (req, res) => {
	let array = require('./temperature.json')
	if (array.constructor != Array) {
		array = []
	}
	array.push(req.query)
	require('fs').writeFileSync('./temperature.json', JSON.stringify(array))
})

app.listen(process.env.PORT || 80)

