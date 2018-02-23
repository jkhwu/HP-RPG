$(document).ready(function() {
    // VARIABLES
    var hero;
    var opponent;
    var bodyCount;
    var totalOpponents;
    var isHeroSelected;
    var inBattleMode;
    var isGameOver;

    // FUNCTIONS
    function startGame() {
        hero = {};
        opponent = {};
        bodyCount = 0;
        totalOpponents = 3;
        isHeroSelected = false;
        inBattleMode = false;
        isGameOver = false;
        displayCharStats();
        $("#instruction").text("Select Your Character");
        $(".selection").collapse("show");
        $(".heroSpace").collapse("hide");
        $(".opponentSpace").collapse("hide");
        $("#attackBtn").hide();
        $("#restartBtn").hide();
        $(".charLabel").hide();
        $("#narrationText").empty();
    }

    function displayCharStats() {
        $("#harryHealthText").text(" " + characters.harry.health);
        $("#hermioneHealthText").text(" " + characters.hermione.health);
        $("#mollyHealthText").text(" " + characters.molly.health);
        $("#voldemortHealthText").text(" " + characters.voldemort.health);
        $("#bellatrixHealthText").text(" " + characters.bellatrix.health);
        $("#dracoHealthText").text(" " + characters.draco.health);
    }

    function setupEventHandlers() {
        $(".selection > .card").on("click", onSelectCardClick);
        // $(".slytherin").on("click", onSlytherinClick);
        $("#attackBtn").on("click", onAttackClick);
        $("#restartBtn").on("click", startGame);
    }

    function onSelectCardClick() {
        var clickedChar = $(this);
        var house = readHouse(clickedChar);
        if (!inBattleMode) {
            assignDuellers(clickedChar, house);
        } else if (isDead(opponent)) {
            opponent = Object.assign({}, characters[clickedChar.attr("id")]);
            console.log("NEW OPPONENT: " + JSON.stringify(opponent)); // test
            clickedChar.parent().collapse("hide");
            makeOpponentCard(opponent);
            startBattleRound(hero, opponent);
            $(".opponentSpace").collapse("show");
        } else return;
    }

    function readHouse(clickedCharX) {
        if (clickedCharX.hasClass("gryffindor")) return "gryffindor";
        else if (clickedCharX.hasClass("slytherin")) return "slytherin";
        else return;
    }

    function assignDuellers(clickedCharY, houseX) {
        if (!isHeroSelected) {
            hero = Object.assign({}, characters[clickedCharY.attr("id")]);
            console.log("HERO: " + JSON.stringify(hero)); // test
            isHeroSelected = true;
            $("." + houseX).parent().collapse("hide");
            makeHeroCard(hero);

        } else {
            opponent = Object.assign({}, characters[clickedCharY.attr("id")]);
            console.log("OPPONENT: " + JSON.stringify(opponent)); // test
            clickedCharY.parent().collapse("hide");
            makeOpponentCard(opponent);
            inBattleMode = true;
            startBattleRound(hero, opponent);

        }
    }

    function isDead(playerX) {
        if (playerX.health <= 0) return true;
        else return false;
    }

    function makeHeroCard(heroX) {
        $("#heroCard img").attr("src", heroX.image).attr("alt", heroX.name);
        $("#heroCard .nameText").text(heroX.name);
        $("#heroCard .healthText").text(heroX.health);
        var cardId = "#heroCard";
        assignCardColor(heroX.house, cardId);
        $(".heroSpace").collapse("show");
    }

    function makeOpponentCard(opX) {
        $("#opponentCard img").attr("src", opX.image).attr("alt", opX.name);
        $("#opponentCard .nameText").text(opX.name);
        $("#opponentCard .healthText").text(opX.health);
        var cardId = "#opponentCard";
        assignCardColor(opX.house, cardId);
        $(".opponentSpace").collapse("show");
    }

    function assignCardColor(houseY, cardIdX) {
        if (houseY === "gryffindor") {
            $(cardIdX).css("background-color", "rgb(209, 4, 4)");
        } else if (houseY === "slytherin") {
            $(cardIdX).css("background-color", "rgb(31, 146, 31)");
        }
    }

    function startBattleRound(heroY, opY) {
        console.log("start battle round"); //test
        $("#attackBtn").show();
        console.log("HERO ATTACK: " + heroY.attack + ", OPPONENT ATTACK: " + opY.attack); //test

        opY.health = 0; //test
        console.log("HERO HEALTH: " + heroY.health + ", OPPONENT HEALTH: " + opY.health); //test

    }

    function onAttackClick() {
        if (isGameOver) return;
        checkWinLoss(hero, opponent);
    }

    function checkWinLoss(heroZ, opZ) {
        if (isDead(heroZ)) { // lost
            isGameOver = true;
            $("#narrationText").text("You are defeated! Practice your spells and try again.");
            $("#restartBtn").show();
        } else if (isDead(opZ) && bodyCount < (totalOpponents - 1)) { // won round
            bodyCount++;
            $("#narrationText").text("Opponent defeated! Select next opponent.");
        } else if (isDead(opZ) && bodyCount >= (totalOpponents - 1)) { // won game
            isGameOver = true;
            $("#narrationText").text("You have defeated all Death Eaters! ALL HAIL THE SAVIOR OF HOGWARTS!");
            $("#restartBtn").show();
        } else return;
    }



    // OBJECTS
    var characters = {
        harry: { name: "Harry Potter", house: "gryffindor", health: 110, attack: 5, counterAttack: 4, image: "assets/images/harry.jpg" },
        hermione: { name: "Hermione Granger", house: "gryffindor", health: 120, attack: 8, counterAttack: 4, image: "assets/images/hermione.jpg" },
        molly: { name: "Molly Weasley", house: "gryffindor", health: 140, attack: 5, counterAttack: 4, image: "assets/images/molly.jpg" },
        voldemort: { name: "Voldemort", house: "slytherin", health: 180, attack: 5, counterAttack: 25, image: "assets/images/voldie.jpg" },
        bellatrix: { name: "Bellatrix Lestrange", house: "slytherin", health: 150, attack: 20, counterAttack: 4, image: "assets/images/bellatrix.jpg" },
        draco: { name: "Draco Malfoy", house: "slytherin", health: 100, attack: 8, counterAttack: 5, image: "assets/images/draco.jpg" }
    }

    // CALLS
    startGame();
    setupEventHandlers();
});

// TO DO
// fix displayed health on selection cards
// figure out how to avoid flashing hidden content when refreshing
// remove console.logs
// formatting