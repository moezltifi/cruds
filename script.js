let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let count = document.getElementById("count");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let category = document.getElementById("category");
var submit = document.getElementById("submit");
let tbody = document.getElementById("tbody");
let btnDelete = document.getElementById("btnDelete");
let pageMode = localStorage.getItem("mode") || "dark";
let lightDarkModeContent = localStorage.getItem("lightDarkModeContent");
let searchMood = "title";
let mode = "create";
let tmp;

function clearForm() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  total.style.background = "#a00d02";
  count.value = "";
  category.value = "";
}

let dataPro = [];
if (localStorage.product) {
  dataPro = JSON.parse(localStorage.product);
}
showData();

function getTotal() {
  if (price.value != "" && ads.value != "" && taxes.value != "") {
    total.innerHTML =
      Number(price.value) +
      Number(taxes.value) +
      Number(ads.value) -
      Number(discount.value);
    total.style.background = "#070";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

submit.onclick = function () {
  if (
    price.value != "" &&
    ads.value != "" &&
    taxes.value != "" &&
    title.value != "" &&
    category.value != ""
  ) {
    let newPro = {
      title: title.value,
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value,
    };
    if (mode === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      mode = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    localStorage.setItem("product", JSON.stringify(dataPro));
    clearForm();
  }
  showData();
};

function showData() {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `<tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateItems(${i})" id="update">update</button></td>
                    <td><button onclick="deleteItems(${i})" id="delete">delete</button></td>
            </tr>`;
  }
  tbody.innerHTML = table;
  if (dataPro.length > 0) {
    btnDelete.style.display = "block";
  } else {
    btnDelete.style.display = "none";
  }
}
showData();

function deleteItems(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

function deleteAllItems() {
  localStorage.removeItem("product");
  dataPro = [];
  showData();
}

function updateItems(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  count.style.display = "none";
  submit.innerHTML = "Update";
  getTotal();
  mode = "update";
  tmp = i;
  scroll({
    top: 0,
  });
}

function getSearchMood(id) {
  if (id === "searchTitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
}

function searchData(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value.trim())) {
        table += `<tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateItems(${i})" id="update">update</button></td>
                    <td><button onclick="deleteItems(${i})" id="delete">delete</button></td>
                </tr>`;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.includes(value.trim())) {
        table += `<tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateItems(${i})" id="update">update</button></td>
                    <td><button onclick="deleteItems(${i})" id="delete">delete</button></td>
                </tr>`;
      }
    }
  }
  tbody.innerHTML = table;
}
 
function applyClassOnElements(elements, className, action) {
    for (let i = 0; i < elements.length; i++) {
        if (action === "add") {
            elements[i].classList.add(className);
        } else {
            elements[i].classList.remove(className);
        }
    }
}

function setMode(mode) {
    var inputs = document.getElementsByTagName("input");
    var buttons = document.getElementsByTagName("button");
    var smalls = document.getElementsByTagName("small");
    var lightDarkMode = document.getElementById("lightDarkModeBtn");

    if (mode === "light") {
        document.body.classList.add("body");
        applyClassOnElements(inputs, "input", "add");
        applyClassOnElements(buttons, "button", "add");
        applyClassOnElements(smalls, "small", "add");
        lightDarkMode.innerHTML = `<i id="sun" class="material-icons">sunny</i>
`;
    } else {
        document.body.classList.remove("body");
        applyClassOnElements(inputs, "input", "remove");
        applyClassOnElements(buttons, "button", "remove");
        applyClassOnElements(smalls, "small", "remove");
        lightDarkMode.innerHTML = `<i id="moon" class="fa fa-moon-o"></i>`;
    }
}

function lightMode() {
    pageMode = pageMode === "dark" ? "light" : "dark";
    setMode(pageMode);

    localStorage.setItem("mode", pageMode);
    localStorage.setItem("lightDarkModeContent", document.getElementById("lightDarkModeBtn").innerHTML);
}

window.onload = function() {
    if (lightDarkModeContent) {
        document.getElementById("lightDarkModeBtn").innerHTML = lightDarkModeContent;
    }
    setMode(pageMode);
};
document.addEventListener('click', toggleButtonClass);
document.addEventListener('keyup', toggleButtonClass);
function toggleButtonClass() {
    var buttons = document.getElementsByTagName("button");
    if (pageMode === "light") {
        applyClassOnElements(buttons, "button", "add");
    } else {
        applyClassOnElements(buttons, "button", "remove");
    }
}
