var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productImage = document.getElementById("productImage");
var productSearch = document.getElementById("productSearch");

var editBtn = document.getElementById("editBtn");
var addBtn = document.getElementById("addBtn");

//ha3ml productList 3ashan lw 3amlt save aktr mn product may3mloosh override 3ala b3d f asagylo f array ykoon 3andy 
var productList = []; //dh nafs ely bygyly mn backend array of objectsss


if (localStorage.getItem("productsArray") != null) {
    var productList = JSON.parse(localStorage.getItem("productsArray"));
    displayProduct();
}


//3amlt function dy 3ashan a cal it or fire it lama (onclick)byta3 button el html
function addProduct() {
    if (validateName() && validatePrice() && validateCategory()) {
            //3amlt object 3ashan a group related varaibles dool gowah fy memory w a3raf a call them aw acess on them anytime
    var product = {
        name:productName.value,
        price:productPrice.value,
        category:productCategory.value,
        description: productDescription.value,
        //lazm .files 3ashan y acess 3ala file mn gowa el os 3andk ya5ood mno el image
        //**note** hena URL.createObjectURL 3aml url 3ashan ykoon refrence ly image ely hay7otha fy local machine byta3k msh hay3raf y3mlo save 3ala locaclstorage laa ha acess 3alyh mn loacl machine mn url lw 3awz tysta5dmo mn localc storage (base64)
        Image: productImage.files.length > 0
       ? URL.createObjectURL(productImage.files[0]) 
       : "../image/default.jpg"

    }

    //ha3ml push fy array byta3y 3asahn y save products fyh
    productList.push(product);
    console.log(productList);
    
    //ba7wel el array ely a5dtoo string awel 3ashan a save it k string fy local storage
    localStorage.setItem("productsArray", JSON.stringify(productList));

    validateName();
    
    clearInputsValue();

    displayProduct();
    }
}

//3amlna clear inputs value 3asahn awel madoos 3ala button y3ml clear ly hagat ely 3andy 3asahan y7asn user friendly
function clearInputsValue() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDescription.value = "";
    productImage.value = "";
    productName.classList.remove("is-valid");
    productPrice.classList.remove("is-valid");
    productCategory.classList.remove("is-valid");
}

function displayProduct(array = productList) {
    var cartona = "";
    for (var i = 0; i < array.length; i++) { 
        var realIndex = productList.indexOf(array[i]);
        cartona += `
        <div class="col-md-4">
            <div class="card position-relative">
                <img src="${array[i].Image}" class="card-img-top" alt="iphone17">
                <div class="card-body">
                    <span class="badge text-bg-primary p-2 position-absolute top-0 end-0 m-2 fs-6">${array[i].category}</span>
                    <h3 class="card-title">${array[i].name}</h3>
                    <p class="card-text">${array[i].description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <h3 class="text-primary">${array[i].price} EGP</h3>
                        <div class="d-flex">
                            <button onclick="deleteProduct(${realIndex})" class="btn btn-outline-danger rounded-end-0">
                                <i class="fas fa-trash"></i>
                            </button>
                            <button onclick="getProductUpdate(${realIndex})" class="btn btn-outline-warning rounded-start-0">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }
    document.getElementById("rowData").innerHTML = cartona;
}



//function byta3t el delete (hatysta2bl el i ely gylha mn line 60 el i byta3t el product nafso ely hamsahoo w hatsamyh index)
function deleteProduct(index) {
    productList.splice(index, 1);    //lw dh 3amlto mn 8yyr line byta3 67 ely howa display prodcut haymsa7 f3lm el product byta3y bs mn 8yyr maymsa7o mn display byta3na
    displayProduct(productList);
    localStorage.setItem("productsArray", JSON.stringify(productList));    //3ashan lama ymsa7 el product yshylo kaman mn localstorage (3ashan lama agy a3ml refresh mayzahrlyysh tani)
}



function SearchForProductFunc() {
    console.log(productSearch.value);
    var searchArray = []; //array dh ha5azn fyh el products el gedyda ely b search 3alyha
    for (var i = 0; i<productList.length; i++){
        if (productList[i].name.toLowerCase().includes(productSearch.value.trim().toLowerCase())) {
            searchArray.push(productList[i]);
        }
    }
    displayProduct(searchArray);
}

//3ashan tykoon bridge mabyyn el getProductUpdate w updateProduct
var updatedIndex;
function getProductUpdate(index) {
    // Fill the input fields with the existing product data
    //mn a5er ba3ml Set el value ely mawgooda foo2 bel mawgooda fy product list bel index ely e5tarto lama dost 3la el edit
  productName.value = productList[index].name;
  productPrice.value = productList[index].price;
  productCategory.value = productList[index].category;
    productDescription.value = productList[index].description;

    //hena ba2olo fy card byta3t el product awel maydoos 3ala zorar edit haycall function getProductUpdate w hy remove button byta3 add product mn form w y7oot makano update button
    addBtn.classList.add("d-none");
    editBtn.classList.remove("d-none");
    updatedIndex = index; //hena 3ashan y pass index ely fy parameter getProductUpdate w y3mlo zy bridge kda ywadyh ly updateProduct function
}


function updateProduct() {
    productList[updatedIndex].name = productName.value;
    productList[updatedIndex].price = productPrice.value;
    productList[updatedIndex].category = productCategory.value;
    productList[updatedIndex].description = productDescription.value;
    displayProduct(productList);
    localStorage.setItem("productsArray", JSON.stringify(productList));
    clearInputsValue();
    addBtn.classList.remove("d-none");
    editBtn.classList.add("d-none");
}

function validateName() {
    var regex = /^\w{3,}$/;
    var alertNameMsg = document.getElementById("alertNameMsg");
    if (regex.test(productName.value)) {      
        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid");
        alertNameMsg.classList.add("d-none");
        return true;
    }
    else {
        productName.classList.remove("is-valid");
        productName.classList.add("is-invalid");
        alertNameMsg.classList.remove("d-none");
        return false;
    }
}

function validatePrice() {
    var regex = /^\d{3,}$/;
    var alertPriceMsg = document.getElementById("alertPriceMsg");
    if (regex.test(productPrice.value)) {      
        productPrice.classList.add("is-valid");
        productPrice.classList.remove("is-invalid");
        alertPriceMsg.classList.add("d-none");
        return true;
    }
    else {
        productPrice.classList.remove("is-valid");
        productPrice.classList.add("is-invalid");
        alertPriceMsg.classList.remove("d-none");
        return false;
    }
}


function validateCategory() {
    var regex = /^(Mobile|TV|Laptop)$/i;
    var alertCategoryMsg = document.getElementById("alertCategoryMsg");
    if (regex.test(productCategory.value)) {      
        productCategory.classList.add("is-valid");
        productCategory.classList.remove("is-invalid");
        alertCategoryMsg.classList.add("d-none");
        return true;
    }
    else {
        productCategory.classList.remove("is-valid");
        productCategory.classList.add("is-invalid");
        alertCategoryMsg.classList.remove("d-none");
        return false;
    }
}

