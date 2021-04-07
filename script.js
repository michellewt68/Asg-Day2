//get element
const productsList=document.getElementById('products')
const foundations="http://makeup-api.herokuapp.com/api/v1/products.json?brand=nyx&product_type=foundation"
const searchbar=document.getElementById('searchBar')

let hpProducts=[]
searchbar.addEventListener('keyup',(e)=>{
    //ubah searchstring dan productname smua ke lowercase biar bisa dicompare
    const searchString=e.target.value.toLowerCase();

    const filteredProduct= hpProducts.filter(product=>{
        return product.name.toLowerCase().includes(searchString)
    })
    displayProducts(filteredProduct)
})
const loadProducts= async()=>{
    try{
        const response=await fetch(foundations)
        hpProducts=await response.json();
        displayProducts(hpProducts)
        console.log(hpProducts)
    }catch(error){
        console.error(error);
    }
}

const displayProducts = products =>{
    const string= products.map(product=>{
        return `
        <li>
            <h2>${product.name}</h2>
            <img src="${product.image_link}"></img><br>
            <span>$${product.price}</span>
            <p>${product.description}</p>
        </li>`
    })
    .join('')
    productsList.innerHTML=string
}
loadProducts();