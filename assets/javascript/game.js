$(document).ready(function() {
    // VARIABLES
    var hero;
    var opponent;
    var herosInitAttack;
    var bodyCount;
    var totalOpponents;
    var isHeroSelected;
    var inBattleMode;
    // var isGameOver;

    // FUNCTIONS
    function startGame() {
        hero = {};
        opponent = {};
        herosInitAttack = 0;
        bodyCount = 0;
        totalOpponents = 3;
        isHeroSelected = false;
        inBattleMode = false;
        // isGameOver = false;
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
            makeOpponentCard();
            startBattleRound();
            $(".opponentSpace").collapse("show");
        } else return;
    }

    function readHouse(clickedCharA) {
        if (clickedCharA.hasClass("gryffindor")) return "gryffindor";
        else if (clickedCharA.hasClass("slytherin")) return "slytherin";
        else return;
    }

    function assignDuellers(clickedCharB, houseA) {
        if (!isHeroSelected) {
            hero = Object.assign({}, characters[clickedCharB.attr("id")]);
            console.log("HERO: " + JSON.stringify(hero)); // test
            isHeroSelected = true;
            herosInitAttack = hero.attack;
            $("." + houseA).parent().collapse("hide");
            makeHeroCard();
        } else {
            opponent = Object.assign({}, characters[clickedCharB.attr("id")]);
            console.log("OPPONENT: " + JSON.stringify(opponent)); // test
            clickedCharB.parent().collapse("hide");
            makeOpponentCard();
            inBattleMode = true;
            startBattleRound();
        }
    }

    function isDead(playerA) {
        if (playerA.health <= 0) return true;
        else return false;
    }

    function makeHeroCard() {
        $("#heroCard img").attr("src", hero.image).attr("alt", hero.name);
        $("#heroCard .nameText").text(hero.name);
        $("#heroCard .healthText").text(" " + hero.health);
        var cardId = "#heroCard";
        assignCardColor(hero.house, cardId);
        $(".heroSpace").collapse("show");
    }

    function makeOpponentCard() {
        $("#opponentCard img").attr("src", opponent.image).attr("alt", opponent.name);
        $("#opponentCard .nameText").text(opponent.name);
        $("#opponentCard .healthText").text(" " + opponent.health);
        var cardId = "#opponentCard";
        assignCardColor(opponent.house, cardId);
        $(".opponentSpace").collapse("show");
    }

    function assignCardColor(houseB, cardIdA) {
        if (houseB === "gryffindor") {
            $(cardIdA).css("background-color", "rgb(209, 4, 4)");
        } else if (houseB === "slytherin") {
            $(cardIdA).css("background-color", "rgb(31, 146, 31)");
        }
    }

    function startBattleRound() {
        console.log("start battle round"); //test
        $("#narrationText").empty();
        $("#attackBtn").show().prop("disabled", false);
        // opB.health = 0; //test
        console.log("HERO ATTACK: " + hero.attack + ", OPPONENT COUNTERATTACK: " + opponent.counterattack); //test
        console.log("HERO HEALTH: " + hero.health + ", OPPONENT HEALTH: " + opponent.health); //test
    }

    function onAttackClick() {
        console.log("attack button clicked"); //test
        $("#narrationText").html(`You attacked ${opponent.name} for ${hero.attack} damage.<br>${opponent.name} counterattacked for ${opponent.counterattack} damage.`);
        changePlayerStats();
        console.log("HERO ATTACK: " + hero.attack + ", OPPONENT COUNTERATTACK: " + opponent.counterattack); //test
        console.log("HERO HEALTH: " + hero.health + ", OPPONENT HEALTH: " + opponent.health); //test
        checkWinLoss();
    }

    function changePlayerStats() {
        hero.health -= opponent.counterattack;
        opponent.health -= hero.attack;
        $("#heroCard .healthText").text(" " + hero.health);
        $("#opponentCard .healthText").text(" " + opponent.health);
        hero.attack += herosInitAttack;
    }

    function checkWinLoss() {
        if (isDead(hero)) { // lost
            // isGameOver = true;
            $("#narrationText").text("You are defeated! Practice your spells and try again.");
            $("#restartBtn").show().prop("disabled", false);
            $("#attackBtn").prop("disabled", true);
        } else if (isDead(opponent) && bodyCount < (totalOpponents - 1)) { // won round
            bodyCount++;
            $("#narrationText").text("Opponent defeated! Select next opponent.");
            $("#attackBtn").prop("disabled", true);
        } else if (isDead(opponent) && bodyCount >= (totalOpponents - 1)) { // won game
            // isGameOver = true;
            $("#narrationText").text("You have defeated all opponents! HAIL THE HERO OF HOGWARTS!");
            $("#restartBtn").show().prop("disabled", false);
            $("#attackBtn").prop("disabled", true);
        } else return;
    }



    // OBJECTS
    var characters = {
        harry: { name: "Harry Potter", house: "gryffindor", health: 105, attack: 5, counterattack: 4, image: "assets/images/harry.jpg" },
        hermione: { name: "Hermione Granger", house: "gryffindor", health: 110, attack: 5, counterattack: 10, image: "assets/images/hermione.jpg" },
        molly: { name: "Molly Weasley", house: "gryffindor", health: 140, attack: 6, counterattack: 20, image: "assets/images/molly.jpg" },
        voldemort: { name: "Voldemort", house: "slytherin", health: 160, attack: 6, counterattack: 15, image: "assets/images/voldie.jpg" },
        bellatrix: { name: "Bellatrix Lestrange", house: "slytherin", health: 150, attack: 6, counterattack: 10, image: "assets/images/bellatrix.jpg" },
        draco: { name: "Draco Malfoy", house: "slytherin", health: 100, attack: 5, counterattack: 3, image: "assets/images/draco.jpg" }
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