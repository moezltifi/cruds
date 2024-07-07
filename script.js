let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let count = document.getElementById("count")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let category = document.getElementById("category")
let submit = document.getElementById("submit")
let tbody = document.getElementById("tbody")

function getTotal(){
    if((price.value !='') && (ads.value !='') && (taxes.value !='')){
        total.innerHTML=Number(price.value) + Number(taxes.value) + Number(ads.value) - Number(discount.value)
        total.style.background= "#040";
    }
    else{
        total.innerHTML=''
        total.style.background= "#a00d02";
    }
}

let dataPro ;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
 dataPro = [];
}

submit.onclick = function(){
    if((price.value !='') && (ads.value !='') && (taxes.value !='') && (title.value !='') && (category.value !='')){
    let newPro ={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value
    }
    dataPro.push(newPro)
    localStorage.setItem('product', JSON.stringify(dataPro))
        title.value = ''
        price.value = ''
        taxes.value = ''
        ads.value = ''
        discount.value = ''
        total.innerHTML = ''
        total.style.background= "#a00d02";
        count.value = ''
        category.value = ''
}
showData()
}

function showData(){
    let table =''
    for(let i=0; i<dataPro.length; i++){
        table +=
            `<tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update">update</button></td>
                    <td><button id="delete">delete</button></td>
            </tr>`
        }
        tbody.innerHTML= table
}
showData()
