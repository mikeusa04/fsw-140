import React, {useState} from 'react';
import axios from 'axios';

export default function Products () {
  const [name, setName] = useState("")
  const [sort, setSort] = useState('')
  const [products, setProducts] = useState([])
  
  function searchByName () {
    axios.get(`/products/search/${name}`)
    .then(res => {
      setProducts(res.data)
      displayProducts(res.data)
    })
  }

  function getProducts () {
    axios.get('/products')
    .then(res => {
      setProducts(res.data)
      displayProducts(res.data)
    })
  }

  function displayProducts (arr) {
    clear()
    arr.map(item => {
      let ol = document.createElement('ol')
      let nameli = document.createElement('li')
      let priceli = document.createElement('li')
      let amountli = document.createElement('li')
      nameli.innerHTML = `${item.ProductName}`
      priceli.innerHTML = `Price: $${item.RetailPrice}`
      amountli.innerHTML = `Hurry! Only ${item.QuantityOnHand} left!`
      ol.appendChild(nameli)
      ol.appendChild(priceli)
      ol.appendChild(amountli)
      let root = document.getElementById('products')
      root.append(ol)
    })
  }

  function clear(){
    let root = document.getElementById('products')
    root.innerHTML = ""
  }

  function sortNameAtoZ () {
    const newList = products.sort((a,b) => (a.ProductName > b.ProductName ? 1 : -1))
    displayProducts(newList)
  }

  function sortNameZtoA () {
    const newList = products.sort((a,b) => a.ProductName > b.ProductName ? -1 : 1)
    displayProducts(newList)
  }

  function sortPriceLowToHi () {
    const newList = products.sort((a, b) => a.RetailPrice - b.RetailPrice)
    displayProducts(newList)
  }

  function sortPriceHiToLow () {
    const newList = products.sort((a, b) => b.RetailPrice - a.RetailPrice)
    displayProducts(newList)
  }

  function sortBy () {
    
    if(sort === 'a') {
      sortPriceHiToLow()
    } else if (sort === 'b'){
      sortPriceLowToHi()
    } else if (sort === 'c'){
      sortNameAtoZ()
    } else if (sort === 'd'){
      sortNameZtoA()
    }

  }


  return (
    <div className="displayarea">
      <h1>Products</h1>
      <div>
        <label>Search By Name
          <input placeholder="Type Name of Product" type='text' onChange = {(e) => setName(e.target.value)}/>
          <button onClick={searchByName}>Search</button>
        </label>
        
      </div>
      <div>
        <label >Sort By: 
          <select name = 'sort' onChange={(event) => setSort(event.target.value)}>
            <option value=""></option>
            <option value='a'>Price High to Low</option>
            <option value='b'>Price Low to High</option>
            <option value='c'>A-Z</option>
            <option value='d'>Z-A</option>
          </select>
        </label>
        <button onClick = {sortBy}>Submit</button>
      </div>
      





      <button onClick = {getProducts}>View All Products</button>
      <div id="products"></div>
    </div>
  )
}