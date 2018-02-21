$(document).ready(function() {
    // VARIABLES
    console.log("connected");
    var inBattleMode;
    var isHeroSelected;
    var isOpponentSelected;

    // FUNCTIONS
    function startGame() {
        var inBattleMode;
        var isHeroSelected;
        var isOpponentSelected;
        $("#select-instruction").html("Select Your Character");
        $(".select").collapse("show");
        $(".duel-space").collapse("show"); // change this to "hide" later
        $("#attack-btn").attr("disabled", "true");
        $("#narration-text").empty();
    }

    // OBJECTS
    var characters = {
        harry: { name: "Harry", house: "gryffindor", maxHealth: 20, initAttack: 2, image: "assets/images/harry.jpg" },
        hermione: { name: "Hermione", house: "gryffindor", maxHealth: 30, initAttack: 3, image: "assets/images/hermione.jpg" },
        molly: { name: "Molly", house: "gryffindor", maxHealth: 50, initAttack: 5, image: "assets/images/molly.jpg" },
        voldemort: { name: "Voldemort", house: "slytherin", maxHealth: 50, initAttack: 5, image: "assets/images/voldie.jpg" },
        bellatrix: { name: "Bellatrix", house: "slytherin", maxHealth: 30, initAttack: 4, image: "assets/images/bellatrix.jpg" },
        draco: { name: "Draco", house: "slytherin", maxHealth: 20, initAttack: 1, image: "assets/images/draco.jpg" }
    }

    // CALLS
    startGame();
    addYourCharacterListener();





});