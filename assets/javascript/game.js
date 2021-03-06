$(document).ready(function() {
    // VARIABLES
    var hero;
    var opponent;
    var herosInitAttack;
    var bodyCount;
    var totalOpponents;
    var isHeroSelected;
    var inBattleMode;
    var isGameOver;
    var bgm1 = new Audio("assets/sounds/HP8.mp3");
    var bgm2 = new Audio("assets/sounds/HP1.mp3");
    var bgm3 = new Audio("assets/sounds/HP2.mp3");
    var line = new Audio;
    var spell = new Audio;


    // FUNCTIONS
    function startGame() {
        hero = {};
        opponent = {};
        herosInitAttack = 0;
        bodyCount = 0;
        totalOpponents = 3;
        isHeroSelected = false;
        inBattleMode = false;
        isGameOver = false;
        bgm2.pause();
        displayCharStats();
        $("#instruction").text("Select Your Character");
        $(".selection").collapse("show");
        $(".heroSpace").collapse("hide");
        $(".opponentSpace").collapse("hide");
        $("#attackBtn").addClass("invisible");
        $("#restartBtn").addClass("invisible");
        $(".charLabel").addClass("invisible");
        $("#narrationText").text("(turn sound on for music)");
        stopAudio();
        bgm1.play()
        bgm1.loop = true;
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
        $("#attackBtn").on("click", onAttackClick);
        $("#restartBtn").on("click", startGame);
    }

    function onSelectCardClick() {
        var clickedChar = $(this);
        var house = readHouse(clickedChar);
        $("#narrationText").empty();
        if (!inBattleMode) {
            assignDuellers(clickedChar, house);
        } else if (isDead(opponent)) {
            opponent = Object.assign({}, characters[clickedChar.attr("id")]);
            // console.log("NEW OPPONENT: " + JSON.stringify(opponent)); // test
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
            $(".charLabel").removeClass("invisible");
            hero = Object.assign({}, characters[clickedCharB.attr("id")]);
            // console.log("HERO: " + JSON.stringify(hero)); // test
            isHeroSelected = true;
            herosInitAttack = hero.attack;
            $("." + houseA).parent().collapse("hide");
            makeHeroCard();
            $("#instruction").text("Select your opponent");
        } else {
            opponent = Object.assign({}, characters[clickedCharB.attr("id")]);
            // console.log("OPPONENT: " + JSON.stringify(opponent)); // test
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
        line.pause();
        line = new Audio(hero.lines[Math.floor(Math.random() * hero.lines.length)]);
        line.play();
    }

    function makeOpponentCard() {
        $("#opponentCard img").attr("src", opponent.image).attr("alt", opponent.name);
        $("#opponentCard .nameText").text(opponent.name);
        $("#opponentCard .healthText").text(" " + opponent.health);
        var cardId = "#opponentCard";
        assignCardColor(opponent.house, cardId);
        $(".opponentSpace").collapse("show");
        line.pause();
        line = new Audio(opponent.lines[Math.floor(Math.random() * opponent.lines.length)]);
        line.play();
    }

    function assignCardColor(houseB, cardIdA) {
        if (houseB === "gryffindor") {
            $(cardIdA).css("background-color", "rgb(209, 4, 4)");
        } else if (houseB === "slytherin") {
            $(cardIdA).css("background-color", "rgb(31, 146, 31)");
        }
    }

    function startBattleRound() {
        // console.log("start battle round"); //test
        $("#instruction").empty();
        $("#narrationText").empty();
        $("#attackBtn").removeClass("invisible").prop("disabled", false);
        // console.log("HERO ATTACK: " + hero.attack + ", OPPONENT COUNTERATTACK: " + opponent.counterattack); //test
        // console.log("HERO HEALTH: " + hero.health + ", OPPONENT HEALTH: " + opponent.health); //test
    }

    function onAttackClick() {
        // console.log("attack button clicked"); //test
        $("#narrationText").html(`You attacked ${opponent.name} for <em>${hero.attack}</em> damage.<br>${opponent.name} counterattacked for <em>${opponent.counterattack}</em> damage.`);
        changePlayerStats();
        // console.log("HERO ATTACK: " + hero.attack + ", OPPONENT COUNTERATTACK: " + opponent.counterattack); //test
        // console.log("HERO HEALTH: " + hero.health + ", OPPONENT HEALTH: " + opponent.health); //test
        checkWinLoss();
        line.pause();
        spell.pause();
        if (!isGameOver) {
            spell = new Audio(hero.spells[Math.floor(Math.random() * hero.spells.length)]);
            spell.play();
        }
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
            isGameOver = true;
            stopAudio();
            $("#narrationText").text("You are defeated! Practice your spells and try again.");
            $("#restartBtn").removeClass("invisible").prop("disabled", false);
            $("#attackBtn").prop("disabled", true);
            bgm3.play();
        } else if (isDead(opponent) && bodyCount < (totalOpponents - 1)) { // won round
            bodyCount++;
            $("#narrationText").text("Opponent defeated! Select next opponent.");
            $("#attackBtn").prop("disabled", true);
        } else if (isDead(opponent) && bodyCount >= (totalOpponents - 1)) { // won game
            isGameOver = true;
            stopAudio();
            $("#narrationText").text("You have defeated all opponents! HAIL THE HERO OF HOGWARTS!");
            $("#restartBtn").removeClass("invisible").prop("disabled", false);
            $("#attackBtn").prop("disabled", true);
            bgm2.play();
        } else return;
    }

    function stopAudio() {
        bgm1.pause();
        bgm2.pause();
        bgm3.pause();
        line.pause();
        spell.pause();
    }

    // OBJECTS
    var characters = {
        harry: { name: "Harry Potter", house: "gryffindor", health: 105, attack: 5, counterattack: 4, image: "assets/images/harry.jpg", lines: ["assets/sounds/harry01.mp3"], spells: ["assets/sounds/harry-sp01.mp3", "assets/sounds/harry-sp02.mp3", "assets/sounds/harry-sp03.mp3", "assets/sounds/harry-sp04.mp3"] },
        hermione: { name: "Hermione Granger", house: "gryffindor", health: 110, attack: 5, counterattack: 10, image: "assets/images/hermione.jpg", lines: ["assets/sounds/hermione01.mp3"], spells: ["assets/sounds/hermione-sp01.mp3", "assets/sounds/hermione-sp02.mp3", "assets/sounds/hermione-sp03.mp3", "assets/sounds/hermione-sp04.mp3"] },
        molly: { name: "Molly Weasley", house: "gryffindor", health: 140, attack: 6, counterattack: 20, image: "assets/images/molly.jpg", lines: ["assets/sounds/molly01.mp3"], spells: ["assets/sounds/molly-sp01.mp3", "assets/sounds/molly-sp02.mp3", "assets/sounds/molly-sp03.mp3", "assets/sounds/molly-sp04.mp3"] },
        voldemort: { name: "Voldemort", house: "slytherin", health: 160, attack: 6, counterattack: 15, image: "assets/images/voldie.jpg", lines: ["assets/sounds/voldie01.mp3", "assets/sounds/voldie02.mp3", "assets/sounds/voldie03.mp3", "assets/sounds/voldie04.mp3", "assets/sounds/voldie05.mp3"], spells: ["assets/sounds/voldie-sp01.mp3", "assets/sounds/voldie-sp02.mp3", "assets/sounds/voldie-sp03.mp3", "assets/sounds/voldie-sp04.mp3"] },
        bellatrix: { name: "Bellatrix Lestrange", house: "slytherin", health: 150, attack: 6, counterattack: 10, image: "assets/images/bellatrix.jpg", lines: ["assets/sounds/bellatrix01.mp3", "assets/sounds/bellatrix02.mp3", "assets/sounds/bellatrix03.mp3", "assets/sounds/bellatrix04.mp3"], spells: ["assets/sounds/bellatrix-sp01.mp3", "assets/sounds/bellatrix-sp02.mp3", "assets/sounds/bellatrix-sp03.mp3", "assets/sounds/bellatrix-sp04.mp3", "assets/sounds/bellatrix-sp05.mp3"] },
        draco: { name: "Draco Malfoy", house: "slytherin", health: 100, attack: 5, counterattack: 3, image: "assets/images/draco.jpg", lines: ["assets/sounds/draco01.mp3"], spells: ["assets/sounds/draco-sp01.mp3", "assets/sounds/draco-sp02.mp3", "assets/sounds/draco-sp03.mp3", "assets/sounds/draco-sp04.mp3"] },
    }

    // CALLS
    startGame();
    setupEventHandlers();
});