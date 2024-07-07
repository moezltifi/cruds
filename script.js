let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let count = document.getElementById("count")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let category = document.getElementById("category")
let submit = document.getElementById("submit")

function getTotal(){
    if(price.value !=''){
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
    console.log(dataPro);
}