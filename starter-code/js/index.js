// Sandra

function deleteItem(e){

  e.currentTarget.parentNode.parentNode.remove();

  // updates the total price in case the whole row was removed and we already added the value from that
  // row to the total amount
  getTotalPrice();
}

function toTwoDecimals(rawValue){
  var twoDecimalsValue = parseFloat(Math.round(rawValue * 100)/100).toFixed(2);
  return twoDecimalsValue;
}

// all the prices
var productPrices = document.getElementsByClassName('single-item-price');

// all the products
var allTheProducts = document.getElementsByClassName('product-name'); 

// all product quantities
var allQuantities = document.getElementsByClassName('quantity-input');

var updatedPricesArray = []

function getPriceByProduct(){
  for(i = 0; i<allTheProducts.length; i++ ){
    var totalIndividualPrice = Number(productPrices[i].innerHTML) * allQuantities[i].value;
    document.getElementsByClassName('total-individual-price')[i].innerHTML = totalIndividualPrice;
  }

}

// all total individual prices (after we multiply price of single product and quantity that user inserted)
updatedPricesArray = document.getElementsByClassName('total-individual-price');

//Add Total Product Prices and Update Total Price
function addTotalProductPrice(a, b) {
  return a + b;
}

function getTotalPrice() {
  getPriceByProduct();

  var pricesArray = [];
  for(i = 0; i < allTheProducts.length; i++) {
    var singleProductPriceValue = Number(updatedPricesArray[i].innerHTML);
    pricesArray.push(singleProductPriceValue);
  }
var total = pricesArray.reduce(addTotalProductPrice, 0);
document.getElementById('theTotal').innerHTML = total

}

// 1st
function createQuantityInput(){
  // create quantity input field
  var quantityInputField = document.createElement("input");
  quantityInputField.setAttribute("type", "text");
  quantityInputField.setAttribute("class", "quantity-input");
  quantityInputField.setAttribute("placeholder", "0");

  // return quantity input
  return quantityInputField;
}

// function createDeleteButton(){

// }

function createIndividualPrice(){
  var priceDiv = document.createElement('div');
  priceDiv.setAttribute("class", "col-lg-2")
  var dollarSignSpan = document.createElement("span");
  dollarSignSpan.setAttribute("class", "dollar-sign");
  dollarSignSpan.innerHTML = "$";
  var totalIndPrice = document.createElement("span");
  totalIndPrice.setAttribute("class", "total-individual-price");
  totalIndPrice.innerHTML = "0";
console.log("nandan")
  // insert spans on DOM
  priceDiv.appendChild(dollarSignSpan);
  priceDiv.appendChild(totalIndPrice);
  return priceDiv;
}

// 2nd
function createQuantityNode(){
  var quantityNode = document.createElement('div');
  quantityNode.setAttribute("class", "col-lg-4")
  var label = document.createElement("label");
  label.innerHTML = "QTY";

  var quantity = createQuantityInput();

  quantityNode.appendChild(label);
  quantityNode.appendChild(quantity);

  // console.log("quantity node is: ", quantityNode)
  return quantityNode
}

function createSinglePriceNode(newPrice){
  var singlePriceDiv = document.createElement('div');
  singlePriceDiv.setAttribute("class", "col-lg-2")

  var dollarSignSpan = document.createElement("span");
  dollarSignSpan.setAttribute("class", "dollar-sign");
  dollarSignSpan.innerHTML = "$";

  var singlePrice = document.createElement("span");
  singlePrice.setAttribute("class", "single-item-price");
  singlePrice.innerHTML = newPrice;

  singlePriceDiv.appendChild(dollarSignSpan);
  singlePriceDiv.appendChild(singlePrice);

  return singlePriceDiv;
}
// function createItemNode(dataType, itemData){

// }

// create name
function createNameNode(newName){
  var nameDiv = document.createElement("div");
  nameDiv.setAttribute("class", "col-lg-2")
  var nameSpan = document.createElement("span");
  nameSpan.setAttribute("class", "product-name");
  nameSpan.innerHTML = newName;
  nameDiv.appendChild(nameSpan)
  return nameDiv;
}

// 3rd
function createNewItemRow(itemName, itemPrice){
  var productRow = document.createElement('div');
  var productName = createNameNode(itemName);
  var productPrice = createSinglePriceNode(itemPrice);
  var quantityNode = createQuantityNode();
  var indvidualTotalPrice = createIndividualPrice();
// console.log("quantityNode is: ====", quantityNode)
productRow.append(productName);
productRow.append(productPrice);

  productRow.append(quantityNode);
  productRow.append(indvidualTotalPrice);

  // console.log("product row: ", productRow)
  return productRow;
} 

// 4th
function createNewItem(){
  var newProductName = document.getElementById('new-product-name').value;
  var newProductPrice = document.getElementById('new-product-price').value;

  var newItem = createNewItemRow(newProductName, newProductPrice);
  console.log("new item is: ", newItem)
  var newDiv = document.getElementById('create');
  console.log("new div is: ", newDiv);

  newDiv.parentNode.insertBefore(newItem, newDiv)

  document.getElementById('new-product-name').value = "";
  document.getElementById('new-product-price').value = "";
}

window.onload = function(){
  var calculatePriceButton = document.getElementById('calc-prices-button');
  var createItemButton = document.getElementById('new-item-create');
  var deleteButtons = document.getElementsByClassName('btn-delete');
  calculatePriceButton.onclick = getTotalPrice;
  createItemButton.onclick = createNewItem;

  for(var i = 0; i<deleteButtons.length ; i++){
     deleteButtons[i].onclick = deleteItem;
   }
};
