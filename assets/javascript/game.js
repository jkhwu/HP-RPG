$(document).ready(function() {
    // VARIABLES
    var hero;
    var opponent;
    var isHeroSelected;
    var inBattleMode;
    var isGameOver;

    // FUNCTIONS
    function startGame() {
        hero = {};
        opponent = {};
        isHeroSelected = false;
        inBattleMode = false;
        isGameOver = false;
        displayCharStats();
        $("#instruction").html("Select Your Character");
        $(".selection").collapse("show");
        $(".heroSpace").collapse("hide");
        $(".opponentSpace").collapse("hide");
        $("#attackBtn").hide();
        $("#restartBtn").hide();
        $(".charLabel").hide();
        $("#narrationText").empty();
    }

    function displayCharStats() {
        $("#harryHealthText").html(" " + characters.harry.health);
        $("#hermioneHealthText").html(" " + characters.hermione.health);
        $("#mollyHealthText").html(" " + characters.molly.health);
        $("#voldemortHealthText").html(" " + characters.voldemort.health);
        $("#bellatrixHealthText").html(" " + characters.bellatrix.health);
        $("#dracoHealthText").html(" " + characters.draco.health);
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

    function assignDuellers(clickedCharX, houseX) {
        if (!isHeroSelected) {
            hero = Object.assign({}, characters[clickedCharX.attr("id")]);
            console.log("HERO: " + JSON.stringify(hero)); // test
            isHeroSelected = true;
            $("." + houseX).parent().collapse("hide");
            makeHeroCard(hero);
            $(".heroSpace").collapse("show");
        } else {
            opponent = Object.assign({}, characters[clickedCharX.attr("id")]);
            console.log("OPPONENT: " + JSON.stringify(opponent)); // test
            clickedCharX.parent().collapse("hide");
            makeOpponentCard(opponent);
            inBattleMode = true;
            startBattleRound(hero, opponent);
            $(".opponentSpace").collapse("show");
        }
    }

    function isDead(playerX) {
        if (playerX.health <= 0) return true;
        else return false;
    }

    function makeHeroCard(heroX) {
        $("#heroCard img").attr("src", heroX.image).attr("alt", heroX.name);
        $("#heroCard .nameText").html(heroX.name);
        $("#heroCard .healthText").html(heroX.health);
        var cardId = "#heroCard";
        assignCardColor(heroX.house, cardId);
    }

    function makeOpponentCard(opY) {
        $("#opponentCard img").attr("src", opY.image).attr("alt", opY.name);
        $("#opponentCard .nameText").html(opY.name);
        $("#opponentCard .healthText").html(opY.health);
        var cardId = "#opponentCard";
        assignCardColor(opY.house, cardId);
    }

    function assignCardColor(houseX, cardIdX) {
        if (houseX === "gryffindor") {
            $(cardIdX).css("background-color", "rgb(209, 4, 4)");
        } else if (houseX === "slytherin") {
            $(cardIdX).css("background-color", "rgb(31, 146, 31)");
        }
    }

    function startBattleRound(heroX, opY) {
        console.log("start battle round"); //test
        $("#attackBtn").show();
        console.log("HERO ATTACK: " + heroX.attack + ", OPPONENT ATTACK: " + opY.attack); //test

        opY.health = 0; //test
        console.log("HERO HEALTH: " + heroX.health + ", OPPONENT HEALTH: " + opY.health); //test

    }

    function onAttackClick() {
        if (!inBattleMode) return;
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