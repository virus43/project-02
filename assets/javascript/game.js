//////////////////////////////////////////////////VARIABLES//////////////////////////////////////////////////

allPlayers = {
    playerOne: {},
    playerTwo: {}
};
// var playerOne = {};
// var playerTwo = {};
var playerOneDie, playerTwoDie;
var ranDieOne = Math.ceil(Math.random() * 6);
var ranDieTwo = Math.ceil(Math.random() * 6);
var playerOneOwnedProperties = [];
var playerTwoOwnedProperties = [];
var playerOnePositionCounter = 0;
var playerTwoPositionCounter = 0;
var position;
var startMove;
var hideInterval;
var showInterval;
var imageURL = "";
var ranChanceCard;
var currentProperty;
var randomChanceCard;
var otherPlayer;
var diceAudio = document.getElementById("audiotagDice");
var yoshiAudio = document.getElementById("audiotagYoshi");
var jailAudio = document.getElementById("audiotagJail");
var errorAudio = document.getElementById("audiotagError");
var getMoneyAudio = document.getElementById("audiotagGo");
var buyAudio = document.getElementById("audiotagBuy");
var noMoneyAudio = document.getElementById("audiotagNoMoney");
var marioAudio = document.getElementById("audiotagMario");
var dieElementID;
var dieImageElementID;
var interactionImageID;
var interactionProperty;
var interactionPriceText;
var interactionContinueButton;
var interactionNoButton;
var interactionYesButton;
var interactionBuyText;
var interactionRentText;
var interactionPropertyText;
var interactionRent;
var rentOwed;
var interactionBuy;
var interactionChanceName;
var interactionChanceAction;
var interactionChanceAmount;
var interactionAlert;
var playerOneClickFlag = false;
var playerTwoClickFlag = false;

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBil3HmHCgYinAp2i7mn25moVuL93TO8vo",
    authDomain: "monopoly-project-84b8d.firebaseapp.com",
    databaseURL: "https://monopoly-project-84b8d.firebaseio.com",
    projectId: "monopoly-project-84b8d",
    storageBucket: "monopoly-project-84b8d.appspot.com",
    messagingSenderId: "114995654498"
};
firebase.initializeApp(config);

var database = firebase.database();
// // var playerOne = {
// //     name : "",
// //     turn : "",
//       missTurn : "",
// //     cash : 1000,
// //     currentPosition : "",
//         firstroll
//         token

// // };

// var player2 = {
//     name : "",
//     playerTurn : "",
//     cash : 1000,
//     currentPosition : ""
// };

var boardPosition = ['go', 'palletTown', 'viridianCity', 'chance3', 'rainbowRoad', 'sherbertLand', 'offTrack', 'kongoJungle',
    'gorillaGlacier', 'chance4', 'corneria', 'temple', 'BS', 'mushroom', 'starRoad', 'chance1', 'tourian',
    'brinstar', 'jail', 'mumbo', 'clanker', 'chance2', 'koholint', 'hyrule', 'go'
];


var nonProperties = ['go', 'chance3', 'offTrack', 'chance4', 'BS', 'chance1', 'jail', 'chance2']

// objects for each property

var allProperties = {
    go: {
        name: "GO!",
        action: "Pass go...",
        value: "collect $200!!",
        price: 200,
        rent: 0,
        owner: '',
        url: 'assets/images/prop-imgs/go.jpg'
    },
    palletTown: {
        name: "pallet town",
        price: 60,
        rent: 30,
        owner: '',
        pair: 'viridianCity',
        url: 'assets/images/prop-imgs/ptown.png'
    },
    viridianCity: {
        name: "viridian City",
        price: 60,
        rent: 30,
        owner: '',
        pair: 'palletTown',
        url: 'assets/images/prop-imgs/viridianCity.png'
    },
    rainbowRoad: {
        name: "rainbow Road",
        price: 100,
        rent: 50,
        owner: '',
        pair: 'sherbertLand',
        url: 'assets/images/prop-imgs/rainbow.png'
    },
    sherbertLand: {
        name: "Sherbert Land",
        price: 120,
        rent: 60,
        owner: '',
        pair: 'rainbowRoad',
        url: 'assets/images/prop-imgs/sherbert.png'
    },
    offTrack: {
        name: "Off Track!",
        action: "Off Track",
        value: "Pay fine of $100",
        price: -100,
        rent: 0,
        owner: '',
        url: 'assets/images/prop-imgs/in-jail.jpg'
    },
    kongoJungle: {
        name: "Kongo Jungle",
        price: 140,
        rent: 70,
        owner: '',
        pair: 'gorillaGlacier',
        url: 'assets/images/prop-imgs/kongo.jpeg'
    },
    gorillaGlacier: {
        name: "Gorilla Glacier",
        price: 160,
        rent: 80,
        owner: '',
        pair: 'kongoJungle',
        url: 'assets/images/prop-imgs/glacier.jpeg'
    },
    corneria: {
        name: "Corneria",
        price: 180,
        rent: 90,
        owner: '',
        pair: 'temple',
        url: 'assets/images/prop-imgs/corneria.jpeg'
    },
    temple: {
        name: "Temple",
        price: 200,
        rent: 100,
        owner: '',
        pair: 'corneria',
        url: 'assets/images/prop-imgs/temple.jpg'
    },
    chance1: {
        name: "Chance! Take a chance card and follow the instructions.",
        price: 0,
        rent: 0,
        owner: '',
        url: 'assets/images/prop-imgs/chance.jpg'
    },  
    chance2: {
        name: "Chance! Take a chance card and follow the instructions.",
        price: 0,
        rent: 0,
        owner: '',
        url: 'assets/images/prop-imgs/chance.jpg'
    },
    chance3: {
        name: "Chance! Take a chance card and follow the instructions.",
        price: 0,
        rent: 0,
        owner: '',
        url: 'assets/images/prop-imgs/chance.jpg'
    },
    chance4: {
        name: "Chance! Take a chance card and follow the instructions.",
        price: 0,
        rent: 0,
        owner: '',
        url: 'assets/images/prop-imgs/chance.jpg'
    },
    mushroom: {
        name: "Mushroom Kingdom",
        price: 220,
        rent: 110,
        owner: '',
        pair: 'starRoad',
        url: 'assets/images/prop-imgs/mushroom.jpeg'
    },
    starRoad: {
        name: "Star Road",
        price: 240,
        rent: 120,
        owner: '',
        pair: 'mushroom',
        url: 'assets/images/prop-imgs/star.jpeg'
    },
    tourian: {
        name: "Tourian",
        price: 260,
        rent: 130,
        owner: '',
        pair: 'brinstar',
        url: 'assets/images/prop-imgs/tourian.jpeg'
    },
    brinstar: {
        name: "Brinstar",
        price: 280,
        rent: 140,
        owner: '',
        pair: 'tourian',
        url: 'assets/images/prop-imgs/brinstar.jpeg'
    },
    BS: {
        name: "hit by a blue shell",
        action: "Lose one turn",
        value: "",
        price: 0,
        rent: 0,
        owner: '',
        url: 'assets/images/prop-imgs/BS.jpg'
    },
    jail: {
        name: "Busted!",
        action: "out of lives",
        value: "Pay fine of $80",
        price: -80,
        rent: 0,
        owner: '',
        url: 'assets/images/prop-imgs/jenny.png'
    },
    mumbo: {
        name: "Mumbo's Mountain",
        price: 320,
        rent: 150,
        owner: '',
        pair: '',
        url: 'assets/images/prop-imgs/mumbo.jpeg'
    },
    clanker: {
        name: "Clanker's Cavern",
        price: 300,
        rent: 160,
        owner: '',
        pair: 'mumbo',
        url: 'assets/images/prop-imgs/clanker.jpeg'
    },
    koholint: {
        name: "Koholint Island",
        price: 350,
        rent: 180,
        owner: '',
        pair: 'koholint',
        url: 'assets/images/prop-imgs/koholint.jpg'
    },
    hyryle: {
        name: "Hyrule",
        price: 400,
        rent: 200,
        owner: '',
        pair: 'koholint',
        url: 'assets/images/prop-imgs/hyrule.jpeg'
    }
};
// Object  for chance cards
var chanceCard = [{
        name: 'Buy a Pokeball',
        action: 'Purchased Ball.',
        value: -20
    },
    {
        name: 'perk: find rupees!',
        action: 'Rupees Found!',
        value: 100
    },
    {
        name: 'your paper missed the stoop',
        action: 'Pay a Fine',
        value: -30
    },
    {
        name: 'Enter the Mushroom Kingdom.',
        action: 'Pay the toll.',
        value: -50
    },
    {
        name: 'Take a plane ride.',
        action: 'Pay Funky Kong.',
        value: -250
    },
    {
        name: 'beat the boss.',
        action: 'Pay day!',
        value: 300
    },
    {
        name: 'buy a super potion',
        action: 'heal your pokemon',
        value: -100
    },
    {
        name: 'defeat dracula.',
        action: 'paid by thankfull townsfolk.',
        value: 80
    },
    {
        name: 'unlock the golden gun',
        action: 'Unlocked.',
        value: -150
    },
    {
        name: 'Zombies ate my neighbors.',
        action: 'Buy weapons.',
        value: -200
    }
];

//////////////////////////////////////////////////FUNCTIONS//////////////////////////////////////////////////

//Click start on the Title page
$('#start').on('click', function() {
    event.preventDefault();
    $('.containerStart').hide();
    $('.containerInstructions').show();
});

//Play again and reset the game
$('#resetGame').on('click', function() {
    event.preventDefault();
    ranDieOne = Math.ceil(Math.random() * 6);
    ranDieTwo = Math.ceil(Math.random() * 6);
    allPlayers.playerOne = {};
    allPlayers.playerTwo = {};
    playerOneOwnedProperties = [];
    playerTwoOwnedProperties = [];
    playerOnePositionCounter = 0;
    playerTwoPositionCounter = 0;
    $('#playerOneGameOwnedPropertiesDiv').empty();
    $('#playerTwoGameOwnedPropertiesDiv').empty();
    $('#playerOneDie').attr('src', 'assets/images/dice/BeforeRolled.png').removeClass('die');
    $('#playerTwoDie').attr('src', 'assets/images/dice/BeforeRolled.png').removeClass('die');
    $('.containerEndGame').hide();
    $('.containerInstructions').show();
});

//Click continue on the Instructions screen
$(document).on('click', '#instructionsGoToGame', function() {
    event.preventDefault();

    // This is so we can have a button on screen 4, Main Game, to view/show the instructions mid-game on click of another button, if we want.
    if ($(this).attr('data-gamestart') == 'no') {
        $('.containerInstructions').hide();
        $('.containerPlayers').show();
        $(this).attr('data-gamestart', 'yes');
    }
});

$(document).on('click', '#instructionsGoToGame', function() {
    event.preventDefault();

    // This is so we can have a button on screen 4, Main Game, to view/show the instructions mid-game on click of another button, if we want.
    if ($(this).attr('data-gamestart') == 'no') {
        $('.containerInstructions').hide();
        $('.containerPlayers').show();
        $(this).attr('data-gamestart', 'yes');
    }
});

//Player One die roll on the Player Info screen
$(document).one('click', '#playerOneDie', function() {
    diceAudio.pause();
    diceAudio.currentTime = 0;
    if (ranDieOne == ranDieTwo) {
        ranDieOne = Math.ceil(Math.random() * 6);
    } else {
        playerOneDie = ranDieOne;
        diceAudio.play();
        $('#playerOneDie').attr('src', 'assets/images/dice/' + ranDieOne + '.png').addClass('die');
        allPlayers.playerOne.firstroll = ranDieOne;
    }
});

//Player Two die roll on the Player Info screen
$(document).one('click', '#playerTwoDie', function() {
    diceAudio.pause();
    diceAudio.currentTime = 0;
    if (ranDieTwo == ranDieOne) {
        ranDieTwo = Math.ceil(Math.random() * 6);
    } else {
        playerTwoDie = ranDieTwo;
        diceAudio.play();
        $('#playerTwoDie').attr('src', 'assets/images/dice/' + ranDieTwo + '.png').addClass('die');
        allPlayers.playerTwo.firstroll = ranDieTwo;
    }
});

//CLick submit on the Player Info screen
$(document).on('click', '#submitPlayerInfo', function() {
    event.preventDefault();
    if ($('#playerOneName').val() == '' || $('#playerTwoName').val() == '') {
        errorAudio.play();
        alert('Please enter a name for both players.');
    } else if (allPlayers.playerOne.firstroll == undefined || allPlayers.playerTwo.firstroll == undefined) {
        errorAudio.play();
        alert('Please click the die to roll for each player.')
    } else {
        allPlayers.playerOne.name = $('#playerOneName').val();
        allPlayers.playerTwo.name = $('#playerTwoName').val();
        allPlayers.playerOne.currentPosition = "go";
        allPlayers.playerTwo.currentPosition = "go";
        allPlayers.playerOne.cash = 1000;
        allPlayers.playerTwo.cash = 1000;
        $('.containerPlayers').hide();

        $('#playerOneGameName').text(allPlayers.playerOne.name);
        $('#playerTwoGameName').text(allPlayers.playerTwo.name);
        $('#playerOneGameCash').text(allPlayers.playerOne.cash);
        $('#playerTwoGameCash').text(allPlayers.playerTwo.cash);
        displayPlayerPiece('playerOne', boardPosition[playerOnePositionCounter], 'show');
        displayPlayerPiece('playerTwo', boardPosition[playerOnePositionCounter], 'show');

        if (playerOneDie > playerTwoDie) {
            allPlayers.playerOne.turn = true;
            allPlayers.playerTwo.turn = false;
            $("#playerTwoGameDie").hide();
            $("#playerTwoGameDieImage").hide();
        } else {
            allPlayers.playerOne.turn = false;
            allPlayers.playerTwo.turn = true;
            $("#playerOneGameDie").hide();
            $("#playerOneGameDieImage").hide();
        }
        $('.containerMainGame').show();
    }

});

//Game Start - Player1 rolls dice
$(document).on('click', '#playerOneGameDieImage', function() {

    if (playerOneClickFlag) return;

    allPlayers.playerTwo.turn = 'false';
    allPlayers.playerOne.turn = 'true';
    alreadyMissedTurn = 0;
    startMove = playerOnePositionCounter;

    ranDieOne = Math.ceil(Math.random() * 6);

    diceAudio.play();
    $('#playerOneGameDieImage').attr('src', 'assets/images/dice/' + ranDieOne + '.png').addClass('die');
    // displayPlayerPiece('player1',boardPosition[playerOnePositionCounter],'hide');
    playerOnePositionCounter = playerOnePositionCounter + ranDieOne; //ranDieOne;
    allPlayers.playerOne.currentPosition = boardPosition[playerOnePositionCounter];
    // displayPlayerPiece('player1',boardPosition[playerOnePositionCounter],'show');

    hideInterval = setInterval(function() { displayPlayerPiece('playerOne', boardPosition[startMove], 'hide', playerOnePositionCounter); }, 800);
    showInterval = setInterval(function() { displayPlayerPiece('playerOne', boardPosition[startMove + 1], 'show', playerOnePositionCounter); }, 1000);

    playerOneClickFlag = true;
})

//Game Start - Player2 rolls dice
$(document).on('click', '#playerTwoGameDieImage', function() {

    if (playerTwoClickFlag) return;

    allPlayers.playerTwo.turn = 'true';
    allPlayers.playerOne.turn = 'false';
    alreadyMissedTurn = 0;
    startMove = playerTwoPositionCounter;
    ranDieTwo = Math.ceil(Math.random() * 6);
    diceAudio.play();
    $('#playerTwoGameDieImage').attr('src', 'assets/images/dice/' + ranDieTwo + '.png').addClass('die');
    // displayPlayerPiece('player2',boardPosition[playerTwoPositionCounter],'hide');
    playerTwoPositionCounter = playerTwoPositionCounter + ranDieTwo; //ranDieTwo;
    allPlayers.playerTwo.currentPosition = boardPosition[playerTwoPositionCounter];
    // displayPlayerPiece('player2',boardPosition[playerTwoPositionCounter],'show');

    hideInterval = setInterval(function() { displayPlayerPiece('playerTwo', boardPosition[startMove], 'hide', playerTwoPositionCounter); }, 800);
    showInterval = setInterval(function() { displayPlayerPiece('playerTwo', boardPosition[startMove + 1], 'show', playerTwoPositionCounter); }, 1000);

    playerTwoClickFlag = true;
})


//Move player pieces one property at a time to new property location on the board based on the die roll
function displayPlayerPiece(player, property, display, playerPositionCounter) {

    if (startMove == 24 && player == 'playerOne' && display == 'hide') {
        startMove = 0;
        playerPositionCounter = playerPositionCounter - 24;
        playerOnePositionCounter = playerOnePositionCounter - 24;
        allPlayers.playerOne.cash += 200;
        $('#playerOneGameCash').text(allPlayers.playerOne.cash);
        getMoneyAudio.play();
    }
    if (startMove == 24 && player == 'playerTwo' && display == 'hide') {
        startMove = 0;
        playerPositionCounter = playerPositionCounter - 24;
        playerTwoPositionCounter = playerTwoPositionCounter - 24;
        allPlayers.playerTwo.cash += 200;
        $('#playerTwoGameCash').text(allPlayers.playerTwo.cash);
        getMoneyAudio.play();
    }

    position = "#" + player + "-" + property;
    console.log(position, display, property, startMove, playerPositionCounter);
    if (startMove == (playerPositionCounter)) {
        clearInterval(hideInterval);
        clearInterval(showInterval);
        display = 'show';
        if (property == boardPosition[playerPositionCounter]) {
            playerEvent(player, property);
        }
    }

    if (display == 'show') {
        $(position).show();
        startMove++;
    } else if (display == 'hide') {
        $(position).hide();
    }
}

//Display the appropriate content in the dynamic player event window for player to take action
function playerEvent(player, property) {
    // $(document).on('click','#playerOneGameDieImage');
    // $(document).on('click','#playerTwoGameDieImage');
    playerOneClickFlag = false;
    playerTwoClickFlag = false;

    currentProperty = property;
    interactionElementID = '#' + player + '-interactions';
    console.log(interactionElementID, property);
    dieElementID = '#' + player + 'GameDie';
    dieImageElementID = '#' + player + 'GameDieImage';
    interactionImageID = '#' + player + 'InteractionsImage';
    interactionProperty = '#' + player + 'InteractionProperty';
    interactionPriceText = '#' + player + 'InteractionPrice';
    interactionContinueButton = '#' + player + 'InteractionContinue';
    interactionNoButton = '#' + player + 'InteractionNo';
    interactionYesButton = '#' + player + 'InteractionYes';
    interactionBuyText = '#' + player + 'InteractionBuyText';
    interactionRentText = '#' + player + 'InteractionRentText';
    interactionPropertyText = '#' + player + 'InteractionPropertyText';
    interactionRent = '#' + player + 'Rent';
    interactionBuy = '#' + player + 'Buy';
    interactionChanceName = '#' + player + 'ChanceName';
    interactionChanceAction = '#' + player + 'ChanceAction';
    interactionChanceAmount = '#' + player + 'ChanceAmount';
    interactionAlert = '#' + player + 'Alert';

    if (player == "playerOne") {
        ownedProperty = "playerTwoOwnedProperties";
    } else {
        ownedProperty = "playerOneOwnedProperties";
    }
    $('#playerOneGameDieImage').attr('src', 'assets/images/dice/BeforeRolled.png').removeClass('die');
    $('#playerTwoGameDieImage').attr('src', 'assets/images/dice/BeforeRolled.png').removeClass('die');
    $(dieElementID).hide();
    $(dieImageElementID).hide();

    //if player lands on a Property, excluding corner squares and chances
    if (nonProperties.indexOf(property) < 0) {

        //if Property is not already owned
        if (allProperties[property].owner == '') {

            $(interactionChanceName).hide();
            $(interactionChanceAction).hide();
            $(interactionChanceAmount).hide();
            $(interactionImageID).attr('src', allProperties[property].url);
            $(interactionAlert).hide();
            $(interactionProperty).text(allProperties[property].name);
            $(interactionPriceText).text(allProperties[property].price);
            $(interactionNoButton).text('No').removeClass('btn-warning').addClass('btn-danger').css('width', '80px').css('margin-left', '5%');
            $(interactionContinueButton).hide();
            $(interactionRent).hide();
            $(interactionImageID).show();
            $(interactionBuy).show();
            $(interactionNoButton).show();
            $(interactionYesButton).show();
            $(interactionElementID).show();
        }
        //if Property is already owned
        else {

            if (allProperties[currentProperty].owner == player) {
                $(interactionImageID).hide();
                $(interactionYesButton).hide();
                $(interactionBuy).hide();
                $(interactionAlert).hide();
                $(interactionChanceName).hide();
                $(interactionChanceAction).hide();
                $(interactionChanceAmount).hide();
                $(interactionContinueButton).hide();
                $(interactionNoButton).text('Continue').removeClass('btn-danger').addClass('btn-warning').css('width', '90px').css('margin-left', '30%');
                $(interactionPropertyText).text('You own ' + allProperties[currentProperty].name + '.').show();
                $(interactionRentText).text(' No rent due').show();
                $(interactionRent).show();
                $(interactionNoButton).show(); //USE No button
                $(interactionElementID).show();
            } else {
                if (eval(ownedProperty).indexOf(currentProperty) >= 0 && eval(ownedProperty).indexOf(allProperties[currentProperty].pair) >= 0) {
                    rentOwed = allProperties[currentProperty].rent + ((allProperties[currentProperty].rent) * .5);
                } else {
                    rentOwed = allProperties[currentProperty].rent;
                }
                $(interactionImageID).hide();
                $(interactionNoButton).hide();
                $(interactionYesButton).hide();
                $(interactionBuy).hide();
                $(interactionAlert).hide();
                $(interactionChanceName).hide();
                $(interactionChanceAction).hide();
                $(interactionChanceAmount).hide();
                $(interactionPropertyText).text(allProperties[property].name + ' is owned by the other player. $').show();
                $(interactionRentText).text(rentOwed + ' rent is due.').show();
                $(interactionRent).show();
                $(interactionContinueButton).text('Pay Rent').show();
                $(interactionElementID).show();
            }

        }
    }
    //if square is a corner or Chance square
    else {

        //if square is Off Track or Yoshi or Jail or Go
        if (property == "offTrack" || property == "BS" || property == "jail" || property == "go") {
            if (property == "BS") {
                yoshiAudio.play();
            } else if (property == "offTrack") {
                marioAudio.play();
            } else if (property == "jail") {
                jailAudio.play();
            } else if (property == "go") {
                getMoneyAudio.play();
            }
            $(interactionImageID).hide();
            $(interactionNoButton).hide();
            $(interactionYesButton).hide();
            $(interactionBuy).hide();
            $(interactionRent).hide();
            $(interactionAlert).hide();
            $(interactionChanceName).text(allProperties[property].name);
            $(interactionChanceAction).text(allProperties[property].action);
            $(interactionChanceAmount).text(allProperties[property].value);
            $(interactionContinueButton).text('Continue');
            $(interactionChanceName).show();
            $(interactionChanceAction).show();
            $(interactionChanceAmount).show();
            $(interactionContinueButton).show();
            $(interactionElementID).show();
        }
        //if square is a chance card
        else {
            ranChanceCard = Math.floor(Math.random() * 9);
            randomChanceCard = chanceCard[ranChanceCard];
            chanceName = chanceCard[ranChanceCard].name;

            $(interactionImageID).hide();
            $(interactionNoButton).hide();
            $(interactionYesButton).hide();
            $(interactionBuy).hide();
            $(interactionRent).hide();
            $(interactionAlert).hide();
            $(interactionChanceName).text(chanceName);
            $(interactionChanceAction).text(chanceCard[ranChanceCard].action);

            if (chanceCard[ranChanceCard].value < 0) {
                $(interactionChanceAmount).text('You owe $' + ((chanceCard[ranChanceCard].value) * -1));
            } else {
                $(interactionChanceAmount).text('You get $' + chanceCard[ranChanceCard].value);
            }
            $(interactionContinueButton).text('Continue');
            $(interactionChanceName).show();
            $(interactionChanceAction).show();
            $(interactionChanceAmount).show();
            $(interactionContinueButton).show();
            $(interactionElementID).show();
        }
    }
}

//When player clicks Yes to buy property
$(document).on('click', '.interactionYesButton', function() {
    var noMoneycounter;

    if ($(this).attr('data-player') == "one") {
        player = "playerOne";
    } else {
        player = "playerTwo";
    }

    if (allPlayers[player].cash < allProperties[currentProperty].price || ((allPlayers[player].cash) - (allProperties[currentProperty].price)) < 0) {
        noMoneyAudio.play();
        $(interactionChanceName).hide();
        $(interactionChanceAction).hide();
        $(interactionChanceAmount).hide();
        $(interactionYesButton).hide();
        $(interactionRent).hide();
        $(interactionBuy).hide();
        $(interactionAlert).text('Unfortunately, you do not have enough money to buy ' + allProperties[currentProperty].name);
        $(interactionContinueButton).hide();
        $(interactionBuy).hide();
        $(interactionImageID).hide();
        $(interactionNoButton).text('Continue').removeClass('btn-danger').addClass('btn-warning').css('width', '90px').css('margin-left', '30%');
        $(interactionAlert).show();
        $(interactionNoButton).show();
        $(interactionElementID).show();
        noMoneycounter++;
    } else {
        buyAudio.play();

        allProperties[currentProperty].owner = player;
        allPlayers[player].cash = (allPlayers[player].cash) - (allProperties[currentProperty].price);
        $('#' + player + 'GameCash').text(allPlayers[player].cash);
        if ($(this).attr('data-player') == "one") {
            player = "playerOne";
            var url = allProperties[currentProperty].url;
            allProperties[currentProperty].owner = player;
            playerOneOwnedProperties.push(currentProperty);
            $('#playerOneGameOwnedPropertiesDiv').append($('<img>').attr('class', 'propertiesOwnedImage').attr('src', url).attr('title', allProperties[currentProperty].name));
        } else {
            player = "playerTwo";
            var url = allProperties[currentProperty].url;
            allProperties[currentProperty].owner = player;
            playerTwoOwnedProperties.push(currentProperty);
            $('#playerTwoGameOwnedPropertiesDiv').append($('<img>').attr('class', 'propertiesOwnedImage').attr('src', url).attr('title', allProperties[currentProperty].name));
        }

        playerInteractionModule = '#' + player + '-interactions';
        $(playerInteractionModule).hide();

        switchPlayer(player, 'false');
    }

})

//when player clicks no to buy a property
$(document).on('click', '.interactionNoButton', function() {
    if ($(this).attr('data-player') == "one") {
        player = "playerOne";

    } else {
        player = "playerTwo";
    }
    playerInteractionModule = '#' + player + '-interactions';
    $(playerInteractionModule).hide();

    switchPlayer(player, 'false')
})

//player clicks on Chance continue or Pay Rent button 
$(document).on('click', '.interactionContinueButton', function() {
    if ($(this).attr('data-player') == "one") {
        player = "playerOne";
        otherPlayer = "playerTwo";
    } else {
        player = "playerTwo";
        otherPlayer = "playerOne";
    }

    //Corner Squares
    if (currentProperty == "offTrack" || currentProperty == "BS" || currentProperty == "jail" || currentProperty == "go") {
        if (currentProperty == "BS") {
            allPlayers[player].missTurn = true;
        } else if (currentProperty == 'go') {
            allPlayers[player].cash = (allPlayers[player].cash) + 200;
            $('#' + player + 'GameCash').text(allPlayers[player].cash);
        } else if (currentProperty == "offTrack") {
            if (((allPlayers[player].cash) - 100) < 0) {
                allPlayers[player].cash = 0;
                // alert(player+' Losses');
                gameOver(player);
            } else {
                allPlayers[player].cash = (allPlayers[player].cash) - 100;
                $('#' + player + 'GameCash').text(allPlayers[player].cash);
            }
        } else if (currentProperty == "jail") {
            if (((allPlayers[player].cash) - 80) < 0) {
                allPlayers[player].cash = 0;
                // alert(player+' Losses');
                gameOver(player);
            } else {
                allPlayers[player].cash = (allPlayers[player].cash) - 80;
                $('#' + player + 'GameCash').text(allPlayers[player].cash);
            }
        }
    }
    //IF Chance Card and ELSE Rent due
    else {
        if (allProperties[currentProperty].owner == '') {
            if ((allPlayers[player].cash) + (chanceCard[ranChanceCard].value) < 0) {
                allPlayers[player].cash = 0;
                // alert(player+' Losses');
                gameOver(player);
            } else {
                allPlayers[player].cash = (allPlayers[player].cash) + (chanceCard[ranChanceCard].value);
                $('#' + player + 'GameCash').text(allPlayers[player].cash);
            }

        } else {
            if ((allPlayers[player].cash) - (rentOwed) < 0) {
                allPlayers[player].cash = 0;
                // alert(player+' Losses');
                gameOver(player);
            } else {
                allPlayers[player].cash = (allPlayers[player].cash) - (rentOwed);
                $('#' + player + 'GameCash').text(allPlayers[player].cash);
                getMoneyAudio.play();
                allPlayers[otherPlayer].cash = (allPlayers[otherPlayer].cash) + (rentOwed);
                $('#' + otherPlayer + 'GameCash').text(allPlayers[otherPlayer].cash);
            }
        }
    }


    playerInteractionModule = '#' + player + '-interactions';
    $(playerInteractionModule).hide();
    switchPlayer(player, 'false');
})

//switch turns, miss a turn
function switchPlayer(player, value) {
    if (player == 'playerOne') {
        if (allPlayers.playerTwo.missTurn == true) {
            allPlayers.playerOne.turn = true;
            allPlayers.playerTwo.turn = value;
            allPlayers.playerTwo.missTurn = false;
        } else {
            allPlayers.playerOne.turn = value;
            allPlayers.playerTwo.turn = true;
        }

    } else if (player == 'playerTwo') {
        if (allPlayers.playerOne.missTurn == true) {
            allPlayers.playerTwo.turn = true;
            allPlayers.playerOne.turn = value;
            allPlayers.playerOne.missTurn = false;
        } else {
            allPlayers.playerOne.turn = true;
            allPlayers.playerTwo.turn = value;
        }

    }


    if (allPlayers.playerOne.turn == true) {
        $("#playerOneGameDie").show();
        $("#playerOneGameDieImage").show();
    } else if (allPlayers.playerTwo.turn == true) {
        $("#playerTwoGameDie").show();
        $("#playerTwoGameDieImage").show();
    }
}

//Game over page displays
function gameOver(player) {
    if (player == "playerOne") {
        otherPlayer = "playerTwo";
        winner = (allPlayers[otherPlayer].name).toUpperCase();
        loser = (allPlayers[player].name).toUpperCase();
        $('#winnerImg').attr('src', $('#winnerImg').attr('data-playerOne'));
    } else {
        otherPlayer = "playerOne";
        winner = (allPlayers[otherPlayer].name).toUpperCase();
        $('#winnerImg').attr('src', $('#winnerImg').attr('data-playerTwo'));
        loser = (allPlayers[player].name).toUpperCase();
    }
    playerOneEndPosition = '#playerOne-' + allPlayers.playerOne.currentPosition;
    playerTwoEndPosition = '#playerTwo-' + allPlayers.playerTwo.currentPosition;

    $('#instructionsGoToGame').attr('data-gamestart', 'no');
    $('.containerMainGame').hide();
    $(playerOneEndPosition).hide();
    $(playerTwoEndPosition).hide();
    $('.winner').text(winner);
    $('.loser').text(loser);
    $('.containerEndGame').show();
}

database.ref('highscores').limitToLast(1).on('child_added', function(snapshot) {
    var p = $('<p>');
    var winnerScore = snapshot.val().name + ': ';
    winnerScore += snapshot.val().cash;
    p.text(winnerScore);
    $('#winnerScore').html(p);
});

database.ref('highscores').orderByChild('cash').limitToLast(10).on('child_added', function(snapshot) {
    var p = $('<p>');
    var highScores = snapshot.val().name + ': ';
    highScores += snapshot.val().cash;
    p.text(highScores);
    $('#scores').prepend(p);
});

$(document).on('click', '#modalButton', function() {
    var name = winner;
    var cash = allPlayers[otherPlayer].cash;

    console.log(name);
    console.log(cash);

    database.ref('highscores').push({
        name: name,
        cash: cash
    })
    $('#highScoresModal').show();
})

$(document).on('click', '#closeModal', function() {
    $('#highScoresModal').hide();
})

// $(document).click(function(event) {
//     if(event.target == $('#highScoresModal')){
//         $('#highScoresModal').hide();
//     }

// })