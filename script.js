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