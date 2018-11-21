window.onload = function(){

    // STEP 1:
    // create title
      // get the first element that has class name "title"
      const titleDiv = document.getElementsByClassName("title")[0];
      // since we are using bootstrap inside the row we have to have columns so we are creating new "div"
      const titleCol = document.createElement("div");
      // we are appending that div to its parent div
      titleDiv.appendChild(titleCol);
      // following the same logic, create "h1" and append it to the parent
      const ironTitle = document.createElement("h1");
      titleCol.setAttribute("class", "col-sm-12 col-md-8 offset-md-4");
      titleCol.appendChild(ironTitle);
  
      ironTitle.innerHTML = "Super cool Ironshop";
  
  
      // STEP 5: ////////////////////////////////////////////////////
      // create product name
  
      function createProdName(newName){
        const prodName = document.createElement("span");
        prodName.setAttribute("class", "col-sm-10 col-md-2");
        prodName.innerHTML = newName;
        return prodName;
      }
  
      // create product price
      function createProdPrice(thePrice){
        const prodPrice = document.createElement("span");
        prodPrice.setAttribute("class", "col-sm-10 col-md-2 single-prod-price");
        prodPrice.innerHTML = "$" + thePrice;
        return prodPrice;
      }
  
      // create product quantity: input 
  
      function createQtyInput(){
        const qtyInput = document.createElement("input");
        qtyInput.setAttribute("class", "prod-qty")
        qtyInput.setAttribute("placeholder", "0");
        qtyInput.setAttribute("type", "number");
        return qtyInput;
      }
      // + input and qty append to wrap
      function createProdQtyWrap(){
        
        const prodQtyWrap = document.createElement("span");
        prodQtyWrap.setAttribute("class", "col-sm-10 col-md-4");
  
        const qtyLabel = document.createElement("span");
        qtyLabel.innerHTML = "QTY";
        const inputField = createQtyInput();
        prodQtyWrap.appendChild(qtyLabel);
        prodQtyWrap.appendChild(inputField);
  
        return prodQtyWrap;
      }
  
      // single product total price
  
      function getSingleProdTotalPrice(){
        const singleProdTotal = document.createElement("span");
        singleProdTotal.setAttribute("class", "col-sm-10 col-md-2 single-prod-total");
        singleProdTotal.innerHTML = "$0";
        return singleProdTotal;
      }
  
      // delete button
      function createDeleteButton(){
        const deleteBtn = document.createElement("button");  
        deleteBtn.setAttribute("class", "btn btn-danger delete");
        deleteBtn.innerHTML = "Delete";
        // !!! add onclick to each delete button !!!
        deleteBtn.onclick = deleteItem;
        return deleteBtn;
      }
  
      // create product wrapper div
      function createProdWrapDiv(itemName, itemPrice){
        const prodWrapper = document.createElement("div");
        prodWrapper.setAttribute("class", "row");
        const theName = createProdName(itemName);
        const thePrice = createProdPrice(itemPrice);
        const theQty = createProdQtyWrap();
        const singleTotalPrice = getSingleProdTotalPrice();
        const theDeleteBtn = createDeleteButton();
        prodWrapper.append(theName, thePrice, theQty, singleTotalPrice, theDeleteBtn);
  
        return prodWrapper;
      }
  
      // END OF STEP 5: ////////////////////////////////////////////////////
      
  
      // STEP 2:
  
      let theInputs;
      let singleProdTotals;
      let theProdPrices;
      let deleteButtons;
      function getAllThatINeed(){
        theProdPrices = [...document.getElementsByClassName("single-prod-price")];
        theInputs = [...document.getElementsByClassName("prod-qty")];
        singleProdTotals = [...document.getElementsByClassName("single-prod-total")];
        
        deleteButtons = [...document.getElementsByClassName("delete")]
      }
      // getAllThatINeed();
  
     
      // STEP 6:
      // show/hide button
  
      const enableButtonWrap = document.createElement("div");
      enableButtonWrap.setAttribute("class", "row");
      const enableButton = document.createElement("button");
      enableButton.setAttribute("class", "btn btn-success");
      enableButton.innerHTML = "Show Form";
      enableButtonWrap.appendChild(enableButton);
      const containerDiv = document.getElementsByClassName("container")[0];
      containerDiv.appendChild(enableButtonWrap);
  
  
      enableButton.onclick = function(e){
        const theForm =  document.getElementsByClassName("theForm")[0];
        theForm.setAttribute("class", "row theForm");
        
        if(enableButton.innerHTML === "Disable Form"){
          enableButton.innerHTML = "Show Form";
          enableButton.setAttribute("class", "btn btn-success");
          theForm.setAttribute("class", "row theForm d-none");
        } else {
          enableButton.innerHTML = "Disable Form";  
          enableButton.setAttribute("class", "btn btn-danger");
        }
      }
  
      // STEP 3:
  
      function getSingleTotalPrice(){
        getAllThatINeed();      
        theInputs.forEach((el, i )=> {
          el.addEventListener('input', function (e) {
            singleProdTotals[i].innerHTML = "$" + el.value * (+theProdPrices[i].innerHTML.substr(1));
          });
        })
      }
    
      getSingleTotalPrice();
  
      // STEP 4:
  
      // calculate total
      const theCalcBtn = document.getElementById("calc-btn");
      theCalcBtn.onclick = getTotalPrice;
      function getTotalPrice (){
        getSingleTotalPrice();
        const singleProdPricesArray = singleProdTotals.map(priceDiv => {
          return +priceDiv.innerHTML.substr(1);
        })
  
        const theActualTotal = singleProdPricesArray.reduce((sum, currentValue) => {
          return sum + currentValue;
        });
  
        const actualTotal = document.getElementById("actual-total");
        actualTotal.style.fontWeight = "bold";
        actualTotal.style.fontSize = "20px";
        actualTotal.innerHTML = `Total is: $${theActualTotal}`;
  
      }
  
  
      // STEP 7:
  
      // create new products
      document.getElementById("create-btn").onclick = function(e){
        const newProdName = document.getElementById("new-prod-name").value;
        const newProdPrice = document.getElementById("new-prod-price").value;
        // console.log(newProdName, newProdPrice);
        const newProduct = createProdWrapDiv(newProdName, newProdPrice);
        containerDiv.appendChild(newProduct);
        const calcRow = document.getElementsByClassName("calc")[0];
        containerDiv.insertBefore(newProduct, calcRow);
        document.getElementById("new-prod-name").value = "";
        document.getElementById("new-prod-price").value = "";
        getSingleTotalPrice();
      }
      
  
      // STEP 8:
      // delete
      function deleteItem (e){
          e.target.parentElement.remove();   
          getTotalPrice();   
      }
  
      for (let i=0; i< deleteButtons.length; i++){
        deleteButtons[i].onclick = deleteItem;
      }
  };
  