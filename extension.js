'use strict';

module.exports = function (nodecg) {
	const sports = {
		NBA: {
			ShortName: "NBA",
			LongName: "National Basketball Association",
			URL: "/basketball/nba/",
			stats: {
				all: {
					0: "MIN",
					1: "FG",
					2: "3PT",
					3: "FT",
					4: "OREB",
					5: "DREB",
					6: "REB",
					7: "AST",
					8: "STL",
					9: "BLK",
					10: "TO",
					11: "PF",
					12: "+/-",
					13: "PTS",
				}
		}
		},
		NHL: {
			ShortName: "NHL",
			LongName: "National Hockey League",
			URL: "/hockey/nhl/",
			stats: {
				forwards: {
					keys: {
						0: "plusMinus",
						1: "timeOnIce",
						2: "powerPlayTimeOnIce",
						3: "shortHandedTimeOnIce",
						4: "evenStrengthTimeOnIce",
						5: "shifts",
						6: "goals",
						7: "ytdGoals",
						8: "assists",
						9: "shotsTotal",
						10: "shotsMissed",
						11: "shootoutGoals",
						12: "faceoffsWon",
						13: "faceoffsLost",
						14: "faceoffPercent",
						15: "giveaways",
						16: "blockedShots",
						17: "hits",
						18: "takeaways",
						19: "penalties",
						20: "penaltyMinutes"
					},
					labels: {
						0: "+/-",
						1: "TOI",
						2: "PPTOI",
						3: "SHTOI",
						4: "ESTOI",
						5: "SHFT",
						6: "G",
						7: "YTDG",
						8: "A",
						9: "S",
						10: "SM",
						11: "SOG",
						12: "FW",
						13: "FL",
						14: "FO%",
						15: "GV",
						16: "BS",
						17: "HT",
						18: "TK",
						19: "PN",
						20: "PIM"
					},
					descriptions: {
						0: "Plus/Minus Rating",
						1: "Total time on ice.",
						2: "Total power play time on ice.",
						3: "Total short handed time on ice.",
						4: "Total even strength time on ice.",
						5: "Total shifts.",
						6: "Total goals scored.",
						7: "Year to date goals/",
						8: "Total goal assists.",
						9: "Total shots.",
						10: "Total missed shots.",
						11: "Total shootout goals.",
						12: "Total faceoffs won.",
						13: "Total faceoffs lost.",
						14: "Percentage of faceoffs won.",
						15: "Total giveaways.",
						16: "Total shots blocked.",
						17: "Total hits.",
						18: "Total takeaways.",
						19: "Total number of penalties.",
						20: "Total penalty minutes."
					}
				},
				defenses: {
					keys: {
						0: "plusMinus",
						1: "timeOnIce",
						2: "powerPlayTimeOnIce",
						3: "shortHandedTimeOnIce",
						4: "evenStrengthTimeOnIce",
						5: "shifts",
						6: "goals",
						7: "ytdGoals",
						8: "assists",
						9: "shotsTotal",
						10: "shotsMissed",
						11: "shootoutGoals",
						12: "faceoffsWon",
						13: "faceoffsLost",
						14: "faceoffPercent",
						15: "giveaways",
						16: "blockedShots",
						17: "hits",
						18: "takeaways",
						19: "penalties",
						20: "penaltyMinutes",
					},
					labels: {
						0: "+/-",
						1: "TOI",
						2: "PPTOI",
						3: "SHTOI",
						4: "ESTOI",
						5: "SHFT",
						6: "G",
						7: "YTDG",
						8: "A",
						9: "S",
						10: "SM",
						11: "SOG",
						12: "FW",
						13: "FL",
						14: "FO%",
						15: "GV",
						16: "BS",
						17: "HT",
						18: "TK",
						19: "PN",
						20: "PIM"
					},
					descriptions: {
						0: "Plus/Minus Rating",
						1: "Total time on ice.",
						2: "Total power play time on ice.",
						3: "Total short handed time on ice.",
						4: "Total even strength time on ice.",
						5: "Total shifts.",
						6: "Total goals scored.",
						7: "Year to date goals/",
						8: "Total goal assists.",
						9: "Total shots.",
						10: "Total missed shots.",
						11: "Total shootout goals.",
						12: "Total faceoffs won.",
						13: "Total faceoffs lost.",
						14: "Percentage of faceoffs won.",
						15: "Total giveaways.",
						16: "Total shots blocked.",
						17: "Total hits.",
						18: "Total takeaways.",
						19: "Total number of penalties.",
						20: "Total penalty minutes."
					}
				},
				goalies: {
					keys: {
						0: "timeOnIce",
						1: "ytdGoals",
						2: "goalsAgainst",
						3: "shotsAgainst",
						4: "shootoutSaves",
						5: "shootoutShotsAgainst",
						6: "saves",
						7: "savePct",
						8: "evenStrengthSaves",
						9: "powerPlaySaves",
						10: "shortHandedSaves",
						11: "penaltyMinutes"
					},
					labels: {
						0: "TOI",
						1: "YTDG",
						2: "GA",
						3: "SA",
						4: "SOS",
						5: "SOSA",
						6: "SV",
						7: "SV%",
						8: "ESSV",
						9: "PPSV",
						10: "SHSV",
						11: "PIM",
					},
					descriptions: {
						0: "Total time on ice.",
						1: "Year to date goals/",
						2: "Total goals against.",
						3: "Total shots against.",
						4: "Total shootout saves.",
						5: "Total shootout shots against.",
						6: "Total saves.",
						7: "Percentage of shots saved.",
						8: "Saves made at even strength.",
						9: "Saves made while in a power play.",
						10: "Saves made while shorthanded",
						11: "Total penalty minutes."
					}
				}			
		},
		},
		NFL: {
			ShortName: "NFL",
			LongName: "National Football League",
			URL: "/football/nfl/",
		},
		NCAAFooball: {
			ShortName: "NCAA Football",
			LongName: "NCAA Division I Football Bowl Subdivision",
			URL: "/football/college-football/",
		},
		WNBA: {
			ShortName: "WNBA",
			LongName: "Women's National Basketball Association",
			URL: "/basketball/wnba/",
		},
		NCAABBMens: {
			ShortName: "NCAA Men's Basketball",
			LongName: "NCAA Division I Men's Basketball",
			URL: "/basketball/mens-college-basketball/",
		},
		NCAABBWomens: {
			ShortName: "NCAA Women's Basketball",
			LongName: "NCAA Division I Women's Basketball",
			URL: "/basketball/womens-college-basketball/",
		},
		eng1: {
			ShortName: "Premiere League",
			LongName: "English Premier League",
			URL: "/soccer/eng.1/",
		},
		MLS: {
			ShortName: "MLS",
			LongName: "Major League Soccer",
			URL: "/soccer/usa.1/",
		},
		eng2: {
			ShortName: "League Championship",
			LongName: "English League Championship",
			URL: "/soccer/eng.2/",
		},
		eng3: {
			ShortName: "League One",
			LongName: "English League One",
			URL: '/soccer/eng.3/',
		},
		eng4: {
			ShortName: "League Two",
			LongName: "English League Two",
			URL: '/soccer/eng.4/',
		}
	};
	const sport1 = nodecg.Replicant('bet1sport', { defaultValue: 'NBA', persistent: true });
	console.log(sport1.value);
	const sportsInfo = nodecg.Replicant('sportsInfo', {persistent: true});
	sportsInfo.value = sports;
	const game1 = nodecg.Replicant('bet1game', { defaultValue: '' });
	const url1 = nodecg.Replicant('bet1url', { defaultValue: '' })
	getEvents(sport1.value, 1);
	sport1.on('change', (newValue) => {
		getEvents(newValue, "1");
	});
	game1.on('change', (newValue) => {
		getGame(newValue, sport1.value, "1");
		//console.log(sport1);
		console.log(newValue);
		console.log(sport1.value);
	});


	function getGame(id,selectedSport,betNumber){
		var scoreURL = sports[selectedSport].URL;
		var fullURL = 'https://site.api.espn.com/apis/site/v2/sports'+scoreURL+'summary?event='+id;
		console.log(fullURL);
		const axios = require('axios');
		axios.get(fullURL)
			.then(response => {
				//console.log(response.data);
				const messageName = "sendGame"+betNumber;
				if(response.data != null){
					nodecg.sendMessage(messageName, response.data);
					console.log(response.data);
					var teams = Object.assign(response.data.boxscore.teams);
					teams.forEach(element => getPlayers(element.team.id,sport));
				} 
				else {
					nodecg.sendMessage(messageName, 'No Game Data');
				}
			})
			.catch(error => {
				console.log(error);
			});
	}


	function getEvents(selectedSport, betNumber) {
		var MyDate = new Date();
			var MyDateString;
			MyDateString = MyDate.getFullYear() + ('0' + (MyDate.getMonth()+1)).slice(-2) + ('0' + MyDate.getDate()).slice(-2);
			var MyDatetwo = new Date();
			MyDatetwo.setDate(MyDatetwo.getDate() + 3);
			var MyDateStringtwo;
			MyDateStringtwo = MyDatetwo.getFullYear() + ('0' + (MyDatetwo.getMonth()+1)).slice(-2) + ('0' + MyDatetwo.getDate()).slice(-2);
			var sport = selectedSport;
			var scoreURL = sports[sport].URL;
			var fullURL = 'https://site.api.espn.com/apis/site/v2/sports'+scoreURL+'scoreboard?dates='+MyDateString+'-'+MyDateStringtwo;
			console.log(fullURL);
			const axios = require('axios');
			axios.get(fullURL)
			.then(response => {
				//console.log(response.data.events);
				//const events = nodecg.Replicant('events', { defaultValue: `No Events` });
				const messageName = "sendEvents"+betNumber;
				if(response.data.events != null){
					nodecg.sendMessage(messageName, response.data.events);
					url1.value = fullURL;
				} 
				else {
					nodecg.sendMessage(messageName, 'No Events Scheduled for Today');
				}
			})
			.catch(error => {
				console.log(error);
			});
	}

	function getPlayers(team,sport) {
		var scoreURL = sports[sport].URL;
		var fullURL = 'https://site.api.espn.com/apis/site/v2/sports'+scoreURL+'/teams/'+team+'/roster';
		console.log(fullURL);
		const axios = require('axios');

		axios.get(fullURL)
			.then(response => {
				var messageName = "teamRoster"+sport+team;
				if(response.data != null){
					nodecg.sendMessage(messageName, 'response.data');
					console.log(response.data)
				} 
				else {
					nodecg.sendMessage(messageName, 'No Player Data');
				}
			})
			.catch(error => {
				console.log(error);
			});
	}
};


