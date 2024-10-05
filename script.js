// ************************* MAKE PROJECTS *****************************
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
    const linkMain = item.link_site || item.link_git;
    // console.log(linkMain);
    return `
           
            
           <div class="work_item">
            <a href=${linkMain} target="_blank">
                  <div class="img-container ${item.filter}">
                      <img src=${item.img} alt=${item.title}/>
                      
                  </div>

                  <div class="work_text text">
                    
                    <div class="work_label">
                        <div class="item_category">${item.category_main}</div>
                        <div class="work_social">
                              <a
                              href=${item.link_git} target="_blank"
                              class="social_item icon-github"
                              ></a>
                              <a
                              href=${item.link_site} target="_blank"
                              class="social_item icon-sphere ${item.site}"
                              ></a>
                        </div>
                    </div>

                    <div><p class="text800">${item.title}</p>
                    <p class="text_p" align="justify">${item.par}</p>
                    </div>

                  </div> 

            </a>
          </div>

          `;
    // <div class="social_item_git icon-github ${item.git}"></div>
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

// *************************** SIZE BUTTONS *****************************

function min() {
  const myElement = document.documentElement;
  const rootStyles = getComputedStyle(myElement);
  let size = parseInt(rootStyles.getPropertyValue('--main-size'));
  if(size <= 10){size = 10} else {size = size - 1;}
  console.log(size);
  myElement.style.setProperty('--main-size', size + 'px');
}

function max() {
  let myElement = document.documentElement;
  let size = parseInt(getComputedStyle(myElement).getPropertyValue('--main-size'));
  if(size >= 26){size = 26} else {size = size + 1;}
  console.log(size);
  myElement.style.setProperty('--main-size', size + 'px');
}
function norm() {
  let myElement = document.documentElement;
  myElement.style.setProperty('--main-size', 14 + 'px');
}

// ************************** DARK MODE *********************************

const change_mode = document.querySelector(".switch_dark");
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
    document.getElementById("slider").checked = true;
  }
};
