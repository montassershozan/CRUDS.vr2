var productname = document.getElementById('productname');
var alert1 = document.querySelector('#alert1');
var popupSec = document.querySelector('.popup-sec');
var productcategory = document.getElementById('productcategory');
var alert2 = document.querySelector('#alert2');
var productprice = document.getElementById('productprice');
var alert3 = document.querySelector('#alert3');
var productdescription = document.getElementById('productdescription');
var alert4 = document.querySelector('#alert4');
var tbdy = document.getElementById('tbdy');
var searchbtn = document.getElementById('searchbtn');
var addproductbtn = document.getElementById('addproduct');
var clearbtn = document.getElementById('clear');

var indexcontainer = 0;

addproductbtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (addproductbtn.innerHTML != `update product`) {
        createOperation();
    } else {
        updateOperation2(indexcontainer)
        addproductbtn.innerHTML = `add product`;
    }
});
clearbtn.addEventListener('click', function (e) {
    e.preventDefault();
    clearOperation();
});


var convertto = JSON.parse(localStorage.getItem('productarrypush'));
if (convertto != null) {
    var productarry = JSON.parse(localStorage.getItem('productarrypush'));
    displayOperation();
} else {
    var productarry = [];
    var product = {};
}

/* Create Operation*/
function createOperation() {
    product = {
        productname: productname.value,
        productcategory: productcategory.value,
        productprice: productprice.value,
        productdescription: productdescription.value
    }
    if (productNameValidate() == true && productCategoryValidate()== true && productPriceValidate()== true && productDescriptionValidate()== true) {
        productarry.push(product);
        var productarrypush = JSON.stringify(productarry)
        localStorage.setItem('productarrypush', productarrypush)
        retriveOperation();
        clearOperation();
    } else {
        popupSec.classList.remove('d-none');
    }
}
popupSec.addEventListener('click' , function (e) {
    e.stopPropagation();
    popupSec.classList.add('d-none');
  })
/*Clear Operation*/

function clearOperation() {
    productname.value = "";
    productcategory.value = "";
    productprice.value = null;
    productdescription.value = "";
}

/*Retrive Operation*/

function retriveOperation() {
    var trs = "";
    for (var i = 0; i < productarry.length; i++) {
        trs = `
        <tr>
        <td>${i + 1}</td>
        <td>${productarry[i].productname}</td>
        <td>${productarry[i].productcategory}</td>
        <td>${productarry[i].productprice}</td>
        <td>${productarry[i].productdescription}</td>
        <td><button class="btn btn-info text-light" onclick="updateOperation1(${i});"><i class="fa-solid fa-pen-to-square"></i></button></td>
        <td><button class="btn btn-danger" onclick="deleteOperation(${i});"><i class="fa-solid fa-trash"></i></button></td>
        </tr>
        `
    }
    tbdy.innerHTML += trs;
}

/*Display Operation*/

function displayOperation() {
    var trs = "";
    for (var i = 0; i < productarry.length; i++) {
        trs += `
        <tr>
        <td>${i + 1}</td>
        <td>${productarry[i].productname}</td>
        <td>${productarry[i].productcategory}</td>
        <td>${productarry[i].productprice}</td>
        <td>${productarry[i].productdescription}</td>
        <td><button class="btn btn-info text-light" onclick="updateOperation1(${i});"><i class="fa-solid fa-pen-to-square"></i></button></td>
        <td><button class="btn btn-danger" onclick="deleteOperation(${i});"><i class="fa-solid fa-trash"></i></button></td>
        </tr>
        `
    }
    tbdy.innerHTML = trs;
}

/*Delete Operation*/

function deleteOperation(indx) {
    productarry.splice(indx, 1);
    var productarrypush = JSON.stringify(productarry)
    localStorage.setItem('productarrypush', productarrypush)
    displayOperation();
}

/*Search Operation*/

searchbtn.addEventListener('keyup', searchOperation);
function searchOperation() {
    var searchword = searchbtn.value;
    var trs = "";
    for (var i = 0; i < productarry.length; i++) {
        if (productarry[i].productname.toLowerCase().includes(searchword.toLowerCase())) {
            trs += `
        <tr>
        <td>${i + 1}</td>
        <td>${productarry[i].productname}</td>
        <td>${productarry[i].productcategory}</td>
        <td>${productarry[i].productprice}</td>
        <td>${productarry[i].productdescription}</td>
        <td><button class="btn btn-info text-light" onclick="updateOperation1(${i});"><i class="fa-solid fa-pen-to-square"></i></button></td>
        <td><button class="btn btn-danger" onclick="deleteOperation(${i});"><i class="fa-solid fa-trash"></i></button></td>
        </tr>
        `
        }
    }
    tbdy.innerHTML = trs;
}

/*Update Operation*/

function updateOperation1(ind) {
    indexcontainer = ind;
    productname.value = productarry[ind].productname;
    productcategory.value = productarry[ind].productcategory;
    productprice.value = productarry[ind].productprice;
    productdescription.value = productarry[ind].productdescription;
    addproductbtn.innerHTML = `update product`;
}
function updateOperation2(ind) {
    productarry.splice(ind, 1, product = {
        productname: productname.value,
        productcategory: productcategory.value,
        productprice: productprice.value,
        productdescription: productdescription.value
    })
    var convertarrtostr = JSON.stringify(productarry);
    localStorage.setItem('productarrypush', convertarrtostr);
    displayOperation();
}

/*validation operations*/

/*Product Name Validation*/

function productNameValidate() {
    var productNameRegex = /^[A-Z][a-z]{5,10}$/;
    var nameValue = productname.value;
    if (productNameRegex.test(nameValue)) {
        productname.classList.add('is-valid');
        productname.classList.remove('is-invalid');
        alert1.classList.add('d-none');
        return true;
    } else {
        productname.classList.add('is-invalid');
        alert1.classList.remove('d-none');
        return false;
    }
}
productname.addEventListener('blur', productNameValidate);

/*Product Category Validation*/

function productCategoryValidate() {
    var productCategoryRegex = /^[0-9](c)[0-9]?$/;
    var categoryValue = productcategory.value;
    if (productCategoryRegex.test(categoryValue)) {
        productcategory.classList.add('is-valid');
        productcategory.classList.remove('is-invalid');
        alert2.classList.add('d-none');
        return true;
    } else {
        productcategory.classList.add('is-invalid');
        alert2.classList.remove('d-none');
        return false;
    }
}
productcategory.addEventListener('blur', productCategoryValidate);

/*Product Price Validation */

function productPriceValidate() {
    var productPriceRegex = /^[0-9]{2,5}$/;
    var priceValue = productprice.value;
    if (productPriceRegex.test(priceValue)) {
        productprice.classList.add('is-valid');
        productprice.classList.remove('is-invalid');
        alert3.classList.add('d-none');
        return true;
    } else {
        productprice.classList.add('is-invalid');
        alert3.classList.remove('d-none');
        return false;
    }
}
productprice.addEventListener('blur', productPriceValidate);

/*Product Description Validation */

function productDescriptionValidate() {
    var productDescriptionRegex = /[a-zA-z]{5,10}$/;
    var descriptionValue = productdescription.value;
    if (productDescriptionRegex.test(descriptionValue)) {
        productdescription.classList.add('is-valid');
        productdescription.classList.remove('is-invalid');
        alert4.classList.add('d-none');
        return true;
    } else {
        productdescription.classList.add('is-invalid');
        alert4.classList.remove('d-none');
        return false;
    }
}
productdescription.addEventListener('blur', productDescriptionValidate);