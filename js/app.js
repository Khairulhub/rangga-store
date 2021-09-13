const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)                                      //url   "js/data.json"
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();


/* 
req:1 ========> html line 35  =  box fix 
req:2 ====> js line 16  = pic show
req:3 ====> html line 53  =   $ sign erease
req:4 ====> js line 52 =  total update
req:5 ====> js line 63   =   price in use point up to 2 sot
req:8 ====> js line 34 & 35   = rating add      
req:9 ====> css line 27   =       search bar make clear
req:10 ====> html line 8  = change name rangga
req:11 ====> css line 46 = box color change on hover
req:12 ====> html line 96  && js line 100= modal add
*/

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <h5>Rate: ${product.rating.rate}</h5>
      <h5>count: ${product.rating.count}</h5>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" onclick="detailsBtn('${product.id}')" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  // const converted = parseInt(element);
  const converted = parseFloat(element);          //req no 4
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  // document.getElementById(id).innerText = Math.round(total);       
  document.getElementById(id).innerText = total.toFixed(2);          //req no 5
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => { 
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
  getInputValue("price"); + getInputValue("delivery-charge") + getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

/* modal add */
const detailsBtn= (id) =>{
  fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res=>res.json())
            .then(data=>displayDetails(data))
};

const displayDetails =(data) =>{
  console.log(data);
  const showDetails = document.getElementById("exampleModalLabel");
  showDetails.innerText=data.title;
  const imgAdd = document.getElementById("modal-pic")
  imgAdd.innerHTML=`
  <div class="row">
      <div class="col"><img style="height: 200px;" class="img-fluid" src="${data.image}" alt=""></div>
      <div class="col"><h5>Description</h5><p>${data.description}</p></div>
  </div>
  <h5>Category: ${data.category}</h5>
  <h5>Rating: ${data.rating.rate}</h5>
  <h5>Rating:$${data.price}</h5>
  `
}