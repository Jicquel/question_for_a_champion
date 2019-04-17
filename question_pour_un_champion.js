var compteur = {
    actualiserCouleurs: function () {
        this.colors.forEach(function (value, index) {
            if (compteur.timers[index] == 0) {
                $("#timer-" + index).addClass("alert alert-warning");
                $("#timer-" + index).removeClass("alert-danger alert-info");
            } else {
                if (value === "blue") {
                    $("#timer-" + index).addClass("timer_blue alert alert-info");
                    $("#timer-" + index).removeClass("timer_red alert-danger");
                } else {
                    $("#timer-" + index).addClass("timer_red alert alert-danger");
                    $("#timer-" + index).removeClass("timer_blue alert-info");
                }
            }
        });
    },
    decrementeCompteur: function () {
        if (this.timers[this.current_timer] > 0)
            this.timers[this.current_timer]--;

        if (this.timers[this.current_timer] == 0) {
            if (this.current_timer >= this.timers.length) {
                alert("END!");
                this.stopCompteur();
                return;
            }
            this.current_timer++;
        }

    },
    beginCompteur: function () {
        compteur.actualiserDivs();
        this.interval_id = setInterval(function () {
            compteur.decrementeCompteur();
            compteur.actualiserDivs();
        }, 1000);
    },
    stopCompteur: function () {
        clearInterval(this.interval_id)
    },
    actualiserDivs: function () {
        this.actualiserCouleurs();
        this.timers.forEach(function (value, index) {
            $("#timer-" + index).text(value);
        });
    },
    toggleCurrentTimer: function () {

        this.colors[this.current_timer] = this.colors[this.current_timer] === "red" ? "blue" : "red";
        console.log(this.colors[this.current_timer]);
        this.actualiserCouleurs();
    },
    setBeginningColor: function (blue_begins) {
        for (var i = 0; i < this.colors.length; i++) {
            if (blue_begins)
                this.colors[i] = "blue";
            else
                this.colors[i] = "red";
            blue_begins = !blue_begins;
        }
    },
    timers: [10, 8, 6, 4, 3, 2, 1],
    colors: ["blue", "red", "blue", "red", "blue", "red", "blue"],
    current_timer: 0,
    interval_id: 0,
    match_has_begun: false
}


$(document).ready(function () {

    compteur.actualiserDivs();

    compteur.setBeginningColor($('#blue_begins').is(":checked"))
    compteur.actualiserCouleurs();

    $("#blue_begins").change(function (e) {
        compteur.setBeginningColor($(this).is(":checked"));
        compteur.actualiserCouleurs();
    });

    $("#start_stop").click(function (e) {
        e.preventDefault();
        if (compteur.match_has_begun) {
            compteur.stopCompteur();
            $(this).text("Start")
            compteur.match_has_begun = false;
        } else {
            compteur.beginCompteur();
            $(this).text("Stop")
            compteur.match_has_begun = true;
        }

    });

    $("#stop").click(function (e) {
        e.preventDefault();
        compteur.beginCompteur();
    });

    $("#toggle").click(function (e) {
        compteur.toggleCurrentTimer();
    });
});