var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");

//ha3ml productList 3ashan lw 3amlt save aktr mn product may3mloosh override 3ala b3d f asagylo f array ykoon 3andy 
var productList = []; //dh nafs ely bygyly mn backend array of objectsss


if (localStorage.getItem("productsArray") != null) {
    var productList = JSON.parse(localStorage.getItem("productsArray"));
    displayProduct();
}


//3amlt function dy 3ashan a cal it or fire it lama (onclick)byta3 button el html
function addProduct() {
    //3amlt object 3ashan a group related varaibles dool gowah fy memory w a3raf a call them aw acess on them anytime
    var product = {
        name:productName.value,
        price:productPrice.value,
        category:productCategory.value,
        description:productDescription.value
    }

    //ha3ml push fy array byta3y 3asahn y save products fyh
    productList.push(product);
    console.log(productList);
    
    //ba7wel el array ely a5dtoo string awel 3ashan a save it k string fy local storage
    localStorage.setItem("productsArray", JSON.stringify(productList));

    clearInputsValue();

    displayProduct();
}

//3amlna clear inputs value 3asahn awel madoos 3ala button y3ml clear ly hagat ely 3andy 3asahan y7asn user friendly
function clearInputsValue() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDescription.value = "";
}

function displayProduct() {
    var cartona = "";
    for (var i = 0; i < productList.length; i++){   
        cartona +=`                            <div class="col-md-4">
                                        <div class="card position-relative">
                                            <img src="image/iphone-17.webp" class="card-img-top" alt="iphone17">
                                            <div class="card-body">
                                                <span class="badge text-bg-primary p-2 position-absolute top-0 end-0 m-2 fs-6">${productList[i].category}</span>
                                                <h3 class="card-title">${productList[i].name}</h3>
                                                <p class="card-text">${productList[i].description}
                                                </p>
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <h3 class="text-primary">${productList[i].price}EGP</h3>
                                                    <div class="d-flex">
                                                        <button onclick="deleteProduct(${i})" id="deleteProduct" class="btn btn-outline-danger rounded-end-0">
                                                            <i class="fas fa-trash"></i>
                                                        </button>
                                                        <button id="updateProduct" class="btn btn-outline-warning rounded-start-0">
                                                            <i class="fas fa-edit"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
    }
    document.getElementById("rowData").innerHTML = cartona;
}


//function byta3t el delete (hatysta2bl el i ely gylha mn line 60 el i byta3t el product nafso ely hamsahoo w hatsamyh index)
function deleteProduct(index) {
     productList.splice(index, 1);    //lw dh 3amlto mn 8yyr line byta3 79 ely howa dsplay prodcut haymsa7 f3lm el product byta3y bs mn 8yyr maymsa7o mn display byta3na
    displayProduct(productList);
     localStorage.setItem("productsArray", JSON.stringify(productList));    //3ashan lama ymsa7 el product yshylo kaman mn localstorage (3ashan lama agy a3ml refresh mayzahrlyysh tani)
}

