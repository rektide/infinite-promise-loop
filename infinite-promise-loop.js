"use strict"

var defer= require("p-defer")

setInterval(function(){
	var start = process.hrtime()
	global.gc()
	var end = process.hrtime()
	var diff = end - start
	var memUse= process.memoryUsage()
	memUse.gcTime = diff
	console.log(memUse)
}, 5000)



var start
var cursor

function loop(){
	var next = defer()
	setTimeout(function(){
		next.resolve(loop())
	});
	return next.promise
}

function setup(){
	cursor = loop()
	start = cursor
}

setup()
start.then(function(){
	console.log("start finished")
})
process.on("SIGUSR1", setup)

