const addToData = id =>{
    let shoppingCart = getShoppingCart();
    const quantity = shoppingCart[id];
    if(quantity){
        shoppingCart[id] = quantity + 1;
    }
    else{
        shoppingCart[id] = 1;
    }
    localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
}
const getShoppingCart = () =>{
    let shoppingCart = {};
    const storeCart = localStorage.getItem('shopping-cart');
    if(storeCart){
        shoppingCart = JSON.parse(storeCart);
    }
    return shoppingCart;
}
const removeShoppingDb = (id) =>{
    const shoppingCart = getShoppingCart();
    if(shoppingCart){
        delete shoppingCart[id];
        localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
    }
}
const allDeleteData = () =>{
    localStorage.removeItem('shopping-cart');
}
export{addToData, getShoppingCart, removeShoppingDb, allDeleteData}