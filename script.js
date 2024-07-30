// ***********************************************************
// get parent element
const worksContent = document.querySelector(".works_content");
const btnContainer = document.querySelector(".btn-container");

// display all items when page loads
window.addEventListener("DOMContentLoaded", function () {
  diplayItems(items);
  displayButtons();
});

function diplayItems(items) {
  let displayWorks = items.map(function (item) {
    return `<div class="work_item">
                <a href=${item.link} target="_blank">
                  <div class="img-container">
                    <img src=${item.img} alt=${item.title}/>
                    <div class="social_item_git icon-github ${item.git}"></div>
                  </div>
                  <div class="work_text text">
                    <div class="item_category">${item.category}</div>
                    <div class="item_info"><p>${item.title}</p></div>
                  </div>
                </a>
              </div>`;
  });
  // to srting
  displayWorks = displayWorks.join("");
  worksContent.innerHTML = displayWorks;
}

function displayButtons() {
  // const categories = ["all", "C", "C++", "JS"]
  // auto categories:
  const categories = items.reduce(
    function (values, item) {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["all"] // add +1 category
  );

  // add buttons categories
  const categoryBtns = categories
    .map(function (category) {
      return `<div class="item_category text" id=${category}>
            ${category}
          </div>`;
    })
    .join("");
  btnContainer.innerHTML = categoryBtns;

  const filterBtns = btnContainer.querySelectorAll(".item_category");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const category = btn.id;

      // all works with category
      const works_items = items.filter(function (item) {
        if (item.category === category) {
          return item;
        }
      });

      if (category === "all") {
        diplayItems(items);
      } else {
        diplayItems(works_items);
      }
    });
  });
}

// ***********************************************************
// dark mode
const change_mode = document.querySelector(".hello_btn");
change_mode.onclick = function () {
  const dark_mode = document.querySelector("html");
  dark_mode.classList.toggle("dark_mode");
  // Сохранение состояния в localStorage
  localStorage.setItem("darkMode", dark_mode.classList.contains("dark_mode"));
};

// Проверка состояния при загрузке страницы
window.onload = function () {
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode === "true") {
    document.querySelector("html").classList.add("dark_mode");
  }
};
