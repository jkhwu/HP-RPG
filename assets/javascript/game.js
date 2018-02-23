$(document).ready(function() {
    // VARIABLES
    var hero;
    var opponent;
    var isHeroSelected;
    var inBattleMode;

    // FUNCTIONS
    function startGame() {
        hero = {};
        opponent = {};
        isHeroSelected = false;
        inBattleMode = false;
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
        $("#harryHealthText").html(" " + characters.harry.maxHealth);
        $("#hermioneHealthText").html(" " + characters.hermione.maxHealth);
        $("#mollyHealthText").html(" " + characters.molly.maxHealth);
        $("#voldemortHealthText").html(" " + characters.voldemort.maxHealth);
        $("#bellatrixHealthText").html(" " + characters.bellatrix.maxHealth);
        $("#dracoHealthText").html(" " + characters.draco.maxHealth);
    }

    function setupEventHandlers() {
        $(".gryffindor").on("click", onGryffindorClick);
        $(".slytherin").on("click", onSlytherinClick);
        $("#attackBtn").on("click", onAttackClick);
        $("#restartBtn").on("click", startGame);
    }

    function onGryffindorClick() {
        var clickedChar = $(this);
        var house = "gryffindor";
        assignDuellers(clickedChar, house);
    }

    function onSlytherinClick() {
        var clickedChar = $(this);
        var house = "slytherin";
        assignDuellers(clickedChar, house);
    }

    function assignDuellers(clickedCharX, houseX) {
        if (inBattleMode) return;
        if (!isHeroSelected) {
            console.log("HERO: " + JSON.stringify(hero)); // test
            hero = Object.assign({}, characters[clickedCharX.attr("id")]);
            isHeroSelected = true;
            $("." + houseX).parent().collapse("hide");
            makeHeroCard(hero);
            $(".heroSpace").collapse("show");
        } else {
            console.log("OPPONENT: " + JSON.stringify(opponent)); // test
            opponent = Object.assign({}, characters[clickedCharX.attr("id")]);
            clickedCharX.parent().collapse("hide");
            makeOpponentCard(opponent);
            startBattleMode(hero, opponent);
            $(".opponentSpace").collapse("show");
        }
    }

    function makeHeroCard(heroX) {
        console.log(heroX.image);
        $("#heroCard img").attr("src", heroX.image).attr("alt", heroX.name);
        $("#heroCard .nameText").html(heroX.name);
        $("#heroCard .healthText").html(heroX.maxHealth);
        var cardId = "#heroCard";
        assignCardColor(heroX.house, cardId);
    }

    function makeOpponentCard(opY) {
        $("#opponentCard img").attr("src", opY.image).attr("alt", opY.name);
        $("#opponentCard .nameText").html(opY.name);
        $("#opponentCard .healthText").html(opY.maxHealth);
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

    function startBattleMode(heroX, opY) {
        if (!isHeroSelected) return;
        console.log("start battle mode");
        inBattleMode = true;
        $("#attackBtn").show();
        var heroAttack = heroX.initAttack;
        var opAttack = opY.counterAttack;
        console.log(heroAttack, opAttack);

    }

    function onAttackClick() {
        if (!inBattleMode) return;
    }


    // OBJECTS
    var characters = {
        harry: { name: "Harry Potter", house: "gryffindor", maxHealth: 15, initAttack: 2, counterAttack: 4, image: "assets/images/harry.jpg" },
        hermione: { name: "Hermione Granger", house: "gryffindor", maxHealth: 25, initAttack: 3, counterAttack: 4, image: "assets/images/hermione.jpg" },
        molly: { name: "Molly Weasley", house: "gryffindor", maxHealth: 50, initAttack: 5, counterAttack: 4, image: "assets/images/molly.jpg" },
        voldemort: { name: "Voldemort", house: "slytherin", maxHealth: 60, initAttack: 5, counterAttack: 4, image: "assets/images/voldie.jpg" },
        bellatrix: { name: "Bellatrix Lestrange", house: "slytherin", maxHealth: 40, initAttack: 4, counterAttack: 4, image: "assets/images/bellatrix.jpg" },
        draco: { name: "Draco Malfoy", house: "slytherin", maxHealth: 15, initAttack: 1, counterAttack: 4, image: "assets/images/draco.jpg" }
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