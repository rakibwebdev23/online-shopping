import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import OrderView from '../OrderView/OrderView';
import './Order.css';
import { allDeleteData, removeShoppingDb } from '../../utilities/storage';
import { Link, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Orders = () => {
    const savedCart = useLoaderData();
    console.log(savedCart);
    const [cart, setCart] = useState(savedCart);
    const handleRemoveCart = (id) =>{
        const remaining = cart.filter(product => product.id !== id);
        setCart(remaining);
        removeShoppingDb(id);
    }
    const handleClearData = () =>{
        setCart([]);
        allDeleteData();
    }
    return (
        <div className='shop-container'>
            <div className='review-container'>
                {
                    cart.map (product => <OrderView 
                        key={product.id}
                        product ={product}
                        handleRemoveCart = {handleRemoveCart}
                    ></OrderView>)
                }
            </div>
            <div className='cart-container'>
                <Cart
                    cart = {cart} 
                    handleClearData={handleClearData}  
                    
                >
                    <Link  to="/checkout">
                        <button className='proceed'>Proceed Checkout<FontAwesomeIcon  icon={faTrashAlt}/></button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;