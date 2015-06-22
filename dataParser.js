var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    Converter=require("csvtojson").core.Converter;

var teams = [];
var salaries = [];
var stats = [];
 
var salaryFile="./salary.csv";
var statsFile = "./team_season2000.csv";
var teamsFile = "./teams.csv";

var salaryFileStream = fs.createReadStream(salaryFile);
var statsFileStream = fs.createReadStream(statsFile);
var teamsFilStream = fs.createReadStream(teamsFile);

//new converter instance 
var salaryCsvConv = new Converter({constructResult:true, delimiter: ";"});
var statsCsvConv = new Converter({constructResult:true});
var teamsCsvConv = new Converter({constructResult:true});


//end_parsed will be emitted once parsing finished 
salaryCsvConv.on("end_parsed",function(jsonObj){
	for (item in jsonObj) {
		var salary = {};
		salary.team = jsonObj[item].TEAM;
		salary.total = jsonObj[item].TOTAL;
		salary.avg = jsonObj[item].AVG;
		salary.year = jsonObj[item].YEAR;
		salaries.push(salary);

	}
	// console.log(salaries); 
	parseTeams();
});



function parseTeams() {
	teamsCsvConv.on("end_parsed", function(jsonObj) {
		for(item in jsonObj) {
			if(jsonObj[item].leag === "N") {
				var team = {};
				team.name = jsonObj[item].team;
				team.franchige = jsonObj[item].name;
				console.log(team);
				teams.push(team);
			}
		}
		mergeTeams2Salaries();
	});
}


function mergeTeams2Salaries() {
	for(var i = 0; i<)
}


//read from file 
salaryFileStream.pipe(salaryCsvConv);
teamsFilStream.pipe(teamsCsvConv);
