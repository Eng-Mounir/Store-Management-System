var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");

//ha3ml productList 3ashan lw 3amlt save aktr mn product may3mloosh override 3ala b3d f asagylo f array ykoon 3andy 
var productList = []; //dh nafs ely bygyly mn backend array of objectsss

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
    
    clearInputsValue();
}

//3amlna clear inputs value 3asahn awel madoos 3ala button y3ml clear ly hagat ely 3andy 3asahan y7asn user friendly
function clearInputsValue() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDescription.value = "";
}


