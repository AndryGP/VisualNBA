var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    Converter=require("csvtojson").core.Converter;

var salaries = [];
var stats = [];
var finalStats = [];
 
var salaryFile="./salary.csv";
var statsFile = "./team_season2000.csv";

var salaryFileStream = fs.createReadStream(salaryFile);
var statsFileStream = fs.createReadStream(statsFile);

//new converter instance 
var salaryCsvConv = new Converter({constructResult:true, delimiter: ";"});
var statsCsvConv = new Converter({constructResult:true});


//end_parsed will be emitted once parsing finished 
salaryCsvConv.on("end_parsed",function(jsonObj){
	for (item in jsonObj) {
		var salary = {};
		salary.team = jsonObj[item].TEAM;
		salary.total = jsonObj[item].TOTAL;
		salary.avg = jsonObj[item].AVG;
		salary.year = jsonObj[item].YEAR;
		salary.id = jsonObj[item].ID;
		salaries.push(salary);

	}
	//console.log(salaries); 
	parseStats();
});

function parseStats() {

	statsCsvConv.on("end_parsed", function(jsonObj){
		for(item in jsonObj) {
			var stat = {};
			stat.team_id = jsonObj[item].team;
			stat.year = jsonObj[item].year;
			stat.team_wins = jsonObj[item].won;
			stat.team_loss = jsonObj[item].lost;
			stat.ratio = Math.round((stat.team_wins/(stat.team_wins + stat.team_loss))*1000) / 1000;
			stats.push(stat);
		}
		// console.log(stats);
		dataCrossing();
	});
}



function dataCrossing() {
	for (var i = 0; i < salaries.length; i++) {
		for(var j = 0; j < stats.length; j++) {
			if(salaries[i].id === stats[j].team_id && salaries[i].year === stats[j].year) {
				stats[j].salaryTot = salaries[i].total;
				stats[j].salaryAvg = salaries[i].avg;
			}
		}
	}
	for(var j = 0; j < stats.length; j++) {
		if(typeof stats[j].salaryTot !== 'undefined') {
			finalStats.push(stats[j]);
		}
	}
	console.log(finalStats);
}
		

//read from file 
salaryFileStream.pipe(salaryCsvConv);
statsFileStream.pipe(statsCsvConv);