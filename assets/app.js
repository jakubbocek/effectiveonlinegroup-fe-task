/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import "./styles/app.scss";

// start the Stimulus application
import "./bootstrap";

document.addEventListener("DOMContentLoaded", function (event) {
  async function gallery() {
    try {
      const [abstract, cars, nature, all] = await Promise.all([
        fetch("/filter-wallpapers?category=abstract"),
        fetch("/filter-wallpapers?category=cars"),
        fetch("/filter-wallpapers?category=nature"),
        fetch("/filter-wallpapers?category=all"),
      ]);
      const abstractData = await abstract.json();
      const carsData = await cars.json();
      const natureData = await nature.json();
      const allData = await all.json();

      return [abstractData, carsData, natureData, allData];
    } catch (err) {
      console.error(err);
    }
  }

  gallery()
    .then((data) => {
      const div_list = document.querySelectorAll(".itemBox");
      const div_array = [...div_list];
      div_array.forEach((div, index) => {
        if (index <= 3) {
          div.setAttribute("data-item", "abstract");
        } else if (index > 3 && index <= 7) {
          div.setAttribute("data-item", "cars");
        } else {
          div.setAttribute("data-item", "nature");
        }
      });
    })
    .catch((err) => {
      console.error(err);
    });

  let list = document.querySelectorAll(".list");
  let itemBox = document.querySelectorAll(".itemBox");

  for (let i = 0; i < list.length; i++) {
    list[i].addEventListener("click", function () {
      for (let j = 0; j < list.length; j++) {
        list[j].classList.remove("active");
      }
      this.classList.add("active");

      let dataFilter = this.getAttribute("data-filter");

      for (let k = 0; k < itemBox.length; k++) {
        itemBox[k].classList.remove("active");
        itemBox[k].classList.add("hide");

        if (
          itemBox[k].getAttribute("data-item") == dataFilter ||
          dataFilter == "all"
        ) {
          itemBox[k].classList.remove("hide");
          itemBox[k].classList.add("active");
        }
      }
    });
  }
});
