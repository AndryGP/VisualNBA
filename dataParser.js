var http = require('http'),
    fs = require('fs'),
    LineByLineReader = require('line-by-line'),
    url = require('url');

var obj = [];
    lrPlayers = new LineByLineReader('/Volumes/MacbookHD/Documenti/MYSTUFF/RM3/2nd/VisualizzazionedelleInformazioni/VisualNBA/salary.txt');
	lrPlayers.on('error', function(err) {
	    // 'err' contains error object
	});

	var players = [];
	lrPlayers.on('line', function(line) {
		var str = line;
		var arr = str.split("\t");
	});



	lrPlayers.on('end', function() {
	    console.log("finish all players");

	});



var teams = [];
//Converter Class 
var Converter=require("csvtojson").core.Converter;
 
var csvFileName="./teams.csv";
var fileStream=fs.createReadStream(csvFileName);
//new converter instance 
var csvConverter = new Converter({constructResult:true});
//end_parsed will be emitted once parsing finished 
csvConverter.on("end_parsed",function(jsonObj){
	for (team in jsonObj) {
		console.log(jsonObj[team]);

	}
});
 
//read from file 
fileStream.pipe(csvConverter);
