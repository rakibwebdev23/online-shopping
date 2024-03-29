import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToData, allDeleteData, getShoppingCart } from '../../utilities/storage';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        for (const id in storedCart) {
            const addedProduct = products.find(product => product.id === id);
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart);
    }, [products])

    const handleAddToCart = (product) => {
        // const newCart = [...cart, product];
        let newCart = [];
        const exits = cart.find(pd => pd.id === product.id);
        if (!exits) {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else {
            exits.quantity = exits.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exits];
        }
        setCart(newCart);
        addToData(product.id);
    }
    const handleClearData = () => {
        setCart([]);
        allDeleteData();
    }
    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className='cart-container'>
                <Cart
                    handleClearData={handleClearData}
                    cart={cart}
                >
                    <Link to="/orders">
                        <button className='proceed'>Review Orders<FontAwesomeIcon  icon={faTrashAlt}/></button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;