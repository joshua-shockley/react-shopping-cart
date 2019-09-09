import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

import { ProductContext } from './contexts/ProductContext.js';
import { CartContext } from './contexts/CartContext';

function App() {
	const [products] = useState(data);
	// this below is setting state from local storage as a ternery statement.. if there is info in local storage for key of "cart" then populate that as state... if empty set state to (cart = []) empty array.. gets info from the useEffect just below storing stringified array into local storage...
	const [cart, setCart] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);
	//setting state (setItem) as the key-'cart' and the value of json.stringify array of cart...then used above to set the state upon page reload.
	useEffect(() => {
		localStorage.setItem('cart',JSON.stringify(cart));
	},[cart]);

	const addItem = item => {
		setCart([...cart, item]);
	};

	const removeItem = id => {
		setCart(cart.filter(item => item.id !== id));
	};

	return (
		<ProductContext.Provider value={{products, addItem}}>
		 <CartContext.Provider value={{cart, removeItem}}>
		<div className="App">
			<Navigation 
			/>

			{/* Routes */}
			<Route
				exact
				path="/"
				
				component={Products}
			/>

			<Route
				path="/cart"
				component={ShoppingCart}
			/>
		</div>
		  </CartContext.Provider>
		 </ProductContext.Provider>
	);
}

export default App;
