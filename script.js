$(document).ready(function () {
    "use strict"
    var Storige = [];
    $("i").hover(
        function () {
            $(this).addClass("starshover");
            $(this).prevAll().addClass("starshover");
        }, function () {
            $(this).removeClass("starshover");
            $(this).prevAll().removeClass("starshover");
        });
    $("i").click(function () {
        $(this).nextAll().removeClass("starsclick");
        $(this).addClass("starsclick");
        $(this).prevAll().addClass("starsclick");
        var x = $(this).prevAll().length + 1;

        $.post("rewiewforcomputersstars.html",
            {
                name: $(this).siblings("h5").text(),
                stars: x
            }, function (data, status) {
                console.log("Data: " + data + "\nStatus: " + status);
            });
    });
    $(".reviewbtn").click(function myFunction() {
        $(this).text("View your review");
        var x = $(this).siblings("h5").text();

        for (var i = 0; i < Storige.length; i++) {
            if (Storige[i].product==x) {
                $("#reviwform")[0][0].value=Storige[i].name;
                $("#reviwform")[0][1].value=Storige[i].surname;
                $("#reviwform")[0][2].value=Storige[i].email;
                $("#reviwform")[0][3].value=Storige[i].text;

                Storige.splice(i, 1);
            }
        }
        $("#Header").text("Plaese write a full review on " + x);
        $("#cardtitle").text(x);
        $(".reviewsrc").attr("src", x + ".jpg");
        $("#overlay").attr("style", "display: block;");
        
        
    });
    $("#reviwform").submit(function (e) {

        e.preventDefault();

        var form = $(this);

        $.ajax({
            type: "POST",
            url: "rewiewforcomputers.html",
            data: form.serialize(), 
            success: function (data) {
                console.log(data); 
            }
        });
        $("#overlay").attr("style", "display: none;");

    });
    $("#save").click(function (e) {

        var form = $(this);
        Storige.push({ product: $("#cardtitle").text(), name: $("#reviwform")[0][0].value, surname: $("#reviwform")[0][1].value, email: $("#reviwform")[0][2].value, text: $("#reviwform")[0][3].value })
        $("#overlay").attr("style", "display: none;");
        for (var i = 0; i < 4; i++) {
            $("#reviwform")[0][i].value="";
        }

    });
});
