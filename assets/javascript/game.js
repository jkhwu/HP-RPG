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
        $("#instruction").html("Select Your Character");
        $(".selection").collapse("show");
        $(".duelSpace").collapse("show"); // change this to "hide" later
        $("#attackBtn").attr("disabled", "true");
        $("#narration-text").empty();
        // $("#restart-btn").hide(); // turn this on later
    }

    function setupEventHandlers() {
        $(".gryffindor").on("click", onGryffindorClick);
        $(".slytherin").on("click", onSlytherinClick);
        $("#attackBtn").on("click", onAttackClick);
        $("#restartBtn").on("click", startGame);
    }

    function onGryffindorClick() {
        if (inBattleMode) return;
        if (!isHeroSelected) {
            hero = $(this).attr("id");
            isHeroSelected = true;
            console.log("hero: " + hero);
            //     makeHeroCard(hero);
        } else {
            opponent = $(this).attr("id");
            console.log("opponent: " + opponent);
            //     makeOpponentCard(opponent);
        }
        $(".gryffindor").parent().collapse("hide");
    }

    function onSlytherinClick() {
        if (inBattleMode) return;
        if (!isHeroSelected) {
            hero = $(this).attr("id");
            isHeroSelected = true;
            console.log("hero: " + hero);

        } else {
            opponent = $(this).attr("id");
            console.log("opponent: " + opponent);
            //     makeOpponentCard(opponent);
        }
        $(".slytherin").parent().collapse("hide");
    }

    function makeHeroCard(heroX) {

    }

    function makeOpponentCard(opY) {

    }

    function onAttackClick() {
        if (!inBattleMode) return;
    }


    // OBJECTS
    var characters = {
        harry: { name: "Harry Potter", house: "gryffindor", maxHealth: 15, initAttack: 2, image: "assets/images/harry.jpg" },
        hermione: { name: "Hermione Granger", house: "gryffindor", maxHealth: 25, initAttack: 3, image: "assets/images/hermione.jpg" },
        molly: { name: "Molly Weasley", house: "gryffindor", maxHealth: 50, initAttack: 5, image: "assets/images/molly.jpg" },
        voldemort: { name: "Voldemort", house: "slytherin", maxHealth: 60, initAttack: 5, image: "assets/images/voldie.jpg" },
        bellatrix: { name: "Bellatrix Lestrange", house: "slytherin", maxHealth: 40, initAttack: 4, image: "assets/images/bellatrix.jpg" },
        draco: { name: "Draco Malfoy", house: "slytherin", maxHealth: 15, initAttack: 1, image: "assets/images/draco.jpg" }
    }

    // CALLS
    startGame();
    setupEventHandlers();
});

// TO DO
// fix displayed health on selection cards