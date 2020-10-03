$(document).ready(function () {
  // Start your code from here
  let temas = [
    "Cat",
    "Dog",
    "Zebra",
    "Axolotl",
    "Snake",
    "Eagle",
    "Anglerfish",
    "Goblinshark"
  ];

  temas.map((animal) => {
    $("#animal-buttons").append(
      `<input type="submit" id="animal" value="${animal}">`)
  });

  // Agregar boton
  $("#add-animal").on("click", function (event) {
    event.preventDefault();
    let input = $("#animal-input").val();
    if (input.trim() !== "") {
      $("#animal-buttons").append(
        `<input type="submit" id="animal" value="${input}">`
      );
    }
    $("#animal-input").val("");
  });


  $("#animal-buttons").on("click", "#animal", function () {
    $("#animals").html("");
    let limit = 10;

    var req = {
      url: `https://api.giphy.com/v1/gifs/search?q=${this.value}&limit=${limit}&api_key=a5j5MRfqmT2wdDH1PL7dYKCKCOvqS6NU`,
      success: (gifs) => {
        for (let x = 0; x < limit; x++) {
          console.log(gifs.data[x])
          let image = $(`<img alt="animal gif">`);
          let rating = $(`<p> Rating: ${gifs.data[x].rating}</p>`);

          image.attr("src", gifs.data[x].images.fixed_height_still.url);
          image.attr("data-still", gifs.data[x].images.fixed_height_still.url);
          image.attr("data-animate", gifs.data[x].images.fixed_height.url);
          image.attr("data-inMove", "no");
          image.addClass("gif");

          //put image and rate
          let animalGif = $('<div>');
          animalGif.append(rating);
          animalGif.append(image);
          $("#animals").append(animalGif);
        }
      },
      error: function () {
        console.log("Error in GET request");
      }
    };
    $.ajax(req);
  });

  //mover Gif
  $("body").on("click", ".gif", function () {
    let inMove = ["yes", "no"];
    let src = ["data-animate", "data-still"]
    let option = ($(this).attr("data-inMove") === "no") ? 0 : 1;
    $(this).attr("src", $(this).attr(`${src[option]}`));
    $(this).attr("data-inMove", `${inMove[option]}`);
  });
});
