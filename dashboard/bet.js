const sport = nodecg.Replicant('bet1sport', { defaultValue: 'NBA' });
nodecg.readReplicant('sportsInfo', value => {
    const sports = value;
    makeSelect(sports,sport);
});
const gameID = nodecg.Replicant('bet1game');
const gameDetails = nodecg.Replicant('bet1gamedetails');
const bet1 = nodecg.Replicant('bet1');
const sportSelect = document.getElementById('sport-select');
const events = document.getElementById('events');
const sGame = document.getElementById('selectedGame');
const betSummary = document.getElementById('betSummary');
const betBody = document.getElementById('bets-body');
const gameBetsContainer = document.getElementById('GameBets');
const playerBetsContainer = document.getElementById('PlayerBets');
const propBetsContainer = document.getElementById('PropBets');
const tabMenu = document.getElementById('tab-menu');
const betsContainer = document.getElementById('bets-container');

function sportChange(league) {
    sport.value = league.value;
    events.classList.toggle("m-fadeIn");
    events.classList.remove("m-fadeOut");
}

function gameSelect(selectedID) {
    gameID.value = selectedID;
    events.classList.toggle("m-fadeOut");
    events.classList.remove("m-fadeIn");
}

function getFormattedDate(date) {
	let year = date.getFullYear();
	let month = (1 + date.getMonth()).toString().padStart(2, '0');
	let day = date.getDate().toString().padStart(2, '0');
  
	return month + '/' + day + '/' + year;
}

function getFormattedTime(date) {
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
}

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
};


//Function to create dropdown menu of events
function makeSelect(sports,sport){
    const keys = Object.keys(sports);
    const betSport = sport.value;
    const sSelect = document.createElement('select');
    sSelect.setAttribute("id", "sport");
    sSelect.setAttribute("class", "sport");
    sSelect.setAttribute("onClick", "sportChange(this)");
    keys.forEach((key, index) => {
        if(key == betSport){
            var newOption = new Option(sports[key].ShortName,key,false,true);
        } else {
            var newOption = new Option(sports[key].ShortName,key,false,false);
        }
        sSelect.add(newOption,undefined);
        console.log(sports[key].ShortName);
    });
    sportSelect.appendChild(sSelect);
}

//Function to construct the array of games to chose 
function makeGame(game){
        const newDiv = document.createElement("div");
        newDiv.setAttribute("id", game.id);
        newDiv.setAttribute("class", "m-fadeIn");
        newDiv.setAttribute("class", "game");
        newDiv.setAttribute("onClick", "gameSelect("+game.id+")");
        const newContent = document.createTextNode(game.name);
        const teamsDiv = document.createElement("div");
        teamsDiv.setAttribute("class", "teams");
        const dateDiv = document.createElement("div");
        dateDiv.setAttribute("class", "gamedate");
        const gdate = getFormattedDate(new Date(game.date));
        const gameDate = document.createTextNode(gdate);
        const gtime = getFormattedTime(new Date(game.date));
        const gameTime = document.createTextNode(gtime);
        const separator = document.createTextNode(" - ");
        
        //Get Subobject that contains the two teams
        var competitiorsObj = Object.assign(game.competitions[0].competitors);

        newDiv.appendChild(teamsDiv);

        //Setup nested function to create away and home teams
        function makeTeam(competitor) {
            const teamContainer = document.createElement("div");
            teamContainer.setAttribute("class", "team");
            teamContainer.setAttribute("style", "background-color: #"+competitor.team.color);
            const teamNameGraph = document.createElement("p");
            teamNameGraph.setAttribute("class", "teamname");
            const teamName = document.createTextNode(competitor.team.abbreviation)
            const homeTeam = document.createTextNode("@");
            const teamLogo = document.createElement("img");
            teamLogo.setAttribute("src", competitor.team.logo);
            teamsDiv.appendChild(teamContainer);
            teamContainer.appendChild(teamNameGraph);
            const homeAway = competitor.homeAway;
            if( homeAway == 'home'){teamNameGraph.appendChild(homeTeam);}
            teamNameGraph.appendChild(teamName);
            teamContainer.appendChild(teamLogo);
        }

        competitiorsObj.reverse();
        competitiorsObj.forEach(element => makeTeam(element));

        dateDiv.appendChild(gameDate);
        dateDiv.appendChild(separator);
        dateDiv.appendChild(gameTime);
        events.appendChild(newDiv);
        newDiv.appendChild(dateDiv);
};

//Listener for the sendEvents message that contains the return from the API call for events based on sport
nodecg.listenFor('sendEvents1', (data) => {
    const gamesLabelGraph = document.createElement("p");
    const gamesLabel = document.createTextNode("Select Game/Match");
    //data.forEach(element => console.log(element));
    events.innerHTML = "";
    gamesLabelGraph.appendChild(gamesLabel);
    //events.appendChild(gamesLabelGraph);
    const newData = data.filter(e => e.shortName !== "TBD @ TBD");
    if(newData.length > 0){
        newData.forEach(element => makeGame(element));
    } else {
        events.innerHTML = '<p>No Scheduled Games</p>';
    }
    
});

function makeBet(element,betID,gameID,teamID,sportName,betType){
    let bet1Local = new Object();
    bet1Local = JSON.parse(JSON.stringify(bet1.value));
    if(bet1Local.hasOwnProperty(betID)){
        delete bet1Local[betID];
        element.classList.remove('pressed');
    }
    else {
        bet1Local[betID] = { game: gameID, type: betType, team: teamID, sport: sportName}
        element.setAttribute("class", "game-bet pressed");
    }
    bet1.value = bet1Local;
}

function updateLine(evt,betID){
    console.log(typeof betID);
    /*if(betID.includes('moneyline')){
      
    } 
    else{
        //bet1[betID] = {...bet1[betID], line: evt.target.value};
    }
    console.log(bet1);*/
}

function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

//Listener for the sendEvents message that contains the return from the API call for events based on sport
nodecg.listenFor('sendGame1', (data) => {
    gameDetails.value = data.header;
    console.log(gameDetails);
    removeElementsByClass('game-header');
    removeElementsByClass('selected-game-date');
    const gameLabelGraph = document.createElement("div");
    gameLabelGraph.setAttribute("class", "game-header");
    const gameLabel = document.createTextNode(data.header.competitions[0].competitors[1].team.displayName+" at "+data.header.competitions[0].competitors[0].team.displayName);
    const gameDateCont = document.createElement("div");
    gameDateCont.setAttribute("class", "selected-game-date");
    const gameDate = document.createTextNode(data.header.competitions[0].status.type.shortDetail);
    //data.forEach(element => console.log(element));
    //console.log(data);
    //Get Subobject that contains the two teams
    var competitiorsObj = Object.assign(data.header.competitions[0].competitors);
    competitiorsObj.reverse();
    console.log(competitiorsObj);
    sGame.style.display = "block";
    gameBetsContainer.innerHTML = "";
    playerBetsContainer.innerHTML = "";
    propBetsContainer.innerHTML = "";
    gameLabelGraph.appendChild(gameLabel);
    betsContainer.insertBefore(gameLabelGraph,tabMenu);
    gameDateCont.appendChild(gameDate);
    betsContainer.insertBefore(gameDateCont,tabMenu);
    document.getElementById('gameBetsButton').click();
    const gameBetOptions = document.createElement("div");
    gameBetOptions.setAttribute("class", "game-bets");
    gameBetsContainer.appendChild(gameBetOptions);
    const playerBetOptions = document.createElement("div");
    playerBetOptions.setAttribute("class", "player-bets");
    playerBetsContainer.appendChild(playerBetOptions);
    
    //Setup nested function to create away and home teams Moneyline, Spread and O/U options.
    function makeGameBets(competitor,gameID,sport,betType) {
        const betSport = sport.value;
        const gameSpread = document.createElement("div");
        var betID = betType+"_"+gameID+"_"+competitor.team.abbreviation;
        gameSpread.setAttribute("id", betID)
        gameSpread.setAttribute("class", "game-bet");

        if(betType == 'Spread') {
            if(competitor.team.color == 'ffffff') {
                gameSpread.setAttribute("style", "color: #000; background-color: #"+competitor.team.color);
            }
            else {
                gameSpread.setAttribute("style", "background-color: #"+competitor.team.color);
            }
            gameSpread.setAttribute("onClick", "makeBet(this,'"+betID+"',"+gameID+","+competitor.team.id+",'"+betSport+"','"+betType+"')");
            const spreadName = document.createElement("p");
            const spreadText = document.createTextNode(competitor.team.displayName);
            /*const spreadEntry = document.createElement("input");
            spreadEntry.setAttribute("type","text");
            spreadEntry.setAttribute("value", "Line")
            spreadEntry.setAttribute("size", "6");
            spreadEntry.setAttribute("style", "border: 3px solid #"+competitor.team.alternateColor+";")
            spreadEntry.setAttribute("oninput", "updateLine(event,"+betID+")");*/
            spreadName.appendChild(spreadText);
            gameSpread.appendChild(spreadName);
            //gameSpread.appendChild(spreadEntry);
            gameBetOptions.appendChild(gameSpread);
        }
        else if (betType == 'Over' || betType == 'Under') {
            gameSpread.setAttribute("style", "background-color: #333333");
            gameSpread.setAttribute("onClick", "makeBet(this,'"+betID+"',"+gameID+",'gameBet','"+betSport+"','"+betType+"')");
            const spreadName = document.createElement("p");
            const spreadText = document.createTextNode(betType);
            /*const spreadEntry = document.createElement("input");
            spreadEntry.setAttribute("type","text");
            spreadEntry.setAttribute("value", "Line")
            spreadEntry.setAttribute("size", "6");
            spreadEntry.setAttribute("style", "border: 3px solid #CCC;")
            spreadEntry.setAttribute("oninput", "updateLine(event,"+betID+")");*/
            spreadName.appendChild(spreadText);
            gameSpread.appendChild(spreadName);
            //gameSpread.appendChild(spreadEntry);
            gameBetOptions.appendChild(gameSpread);
        }
        else if (betType == 'Moneyline') {
            if(competitor.team.color == 'ffffff') {
                gameSpread.setAttribute("style", "color: #000; background-color: #"+competitor.team.color);
            }
            else {
                gameSpread.setAttribute("style", "background-color: #"+competitor.team.color);
            }
            gameSpread.setAttribute("onClick", "makeBet(this,'"+betID+"',"+gameID+","+competitor.team.id+",'"+betSport+"','"+betType+"')")
            gameSpread.setAttribute("tabindex", "-1");
            const teamName = document.createElement("p");
            const spreadName = document.createElement("p");
            const spreadTeam = document.createTextNode(competitor.team.displayName);
            teamName.appendChild(spreadTeam);
            gameSpread.appendChild(teamName);
            gameSpread.appendChild(spreadName);
            gameBetOptions.appendChild(gameSpread);
        }
    }

    function makePlayerBets(competitor,sport) {
        //console.log(competitor);
        const playerData = nodecg.getPlayers(competitor,sport);
        const player= document.createElement("p");
        console.log(playerData);
        //const playerName = playerData.fullName;
        //player.appendChild(playerName);
        //playerBetOptions.appendChild(player);
    }
    
    const moneyHeader = document.createElement("div");
    moneyHeader.setAttribute("style", "flex-basis: 100%;");
    const moneyHeaderH2 = document.createElement("h3");
    moneyHeaderText = document.createTextNode('Moneyline');
    moneyHeaderH2.appendChild(moneyHeaderText);
    moneyHeader.appendChild(moneyHeaderH2);
    gameBetOptions.appendChild(moneyHeader);
    competitiorsObj.forEach(element => makeGameBets(element,data.header.competitions[0].id,sport,'Moneyline'));
    const spreadHeader = document.createElement("div");
    spreadHeader.setAttribute("style", "flex-basis: 100%;");
    const spreadHeaderH2 = document.createElement("h3");
    spreadHeaderText = document.createTextNode('Spread');
    spreadHeaderH2.appendChild(spreadHeaderText);
    spreadHeader.appendChild(spreadHeaderH2);
    gameBetOptions.appendChild(spreadHeader);
    competitiorsObj.forEach(element => makeGameBets(element,data.header.competitions[0].id,sport,'Spread'));
    const ouHeader = document.createElement("div");
    ouHeader.setAttribute("style", "flex-basis: 100%;");
    const ouHeaderH2 = document.createElement("h3");
    ouHeaderText = document.createTextNode('Spread');
    ouHeaderH2.appendChild(ouHeaderText);
    ouHeader.appendChild(ouHeaderH2);
    gameBetOptions.appendChild(ouHeader);
    makeGameBets(competitiorsObj[0],data.header.competitions[0].id,sport,'Over');
    makeGameBets(competitiorsObj[0],data.header.competitions[0].id,sport,'Under');
    
    
});

bet1.on('change', (newValue) => {
    betBody.innerHTML = "";
    betSummary.style.display = "block";
    betSummary.classList.remove("m-fadeOut");
    betSummary.classList.add("m-fadeIn");
    const betContainer = document.createElement('div');
    betContainer.innerHTML = JSON.stringify(newValue, null, 4); 
    betBody.appendChild(betContainer);
});

function displayBets(data) {
    let betContainer = document.createElement("div");
    let betType = document.createTextNode(data.type);
    let betGame = document.createTextNode(data.game);
    
}
