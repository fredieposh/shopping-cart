import {useState} from 'react';
import { Outlet } from 'react-router';
import Navbar from './components/Navbar.jsx';
import Content from './components/Content.jsx';
import './App.css';

function App() {
  const [cartProducts, setCartProducts] = useState({});
  const [redDotQuantity, setRedDotQuantity] = useState(0);

  function handleRedDot(quantity) {
    const redDotElement = document.querySelector('.red-dot');

    if (!redDotElement.classList.contains('visible')) {
      redDotElement.classList.add('visible');
    };
    
    setRedDotQuantity(redDotQuantity + +quantity);

  }
  
  function removeItemFromCart(productObj) {
    const productIdToRemove = productObj.id;
    const newCart = {...cartProducts};
    delete newCart[productIdToRemove];
  
    setCartProducts(newCart);
  }

  function handleCartChange({ productObj, quantity }) {
    const productId = productObj.id;
    console.log(quantity);

    if(isProductIdInCartsProducts(productId)) {
      const oldCartObj = cartProducts[productId];
      const newCartObj = changeQuantity(oldCartObj, oldCartObj.quantity, quantity);
      updateCart(newCartObj, productId);
      return;
    };

    updateCart({productObj, quantity:+quantity}, productId);
    return;
  };

  function isProductIdInCartsProducts(id) {
    return Object.keys(cartProducts).includes(''+id);
  };

  function updateCart(obj, productId) {
      const updatedCart = {...cartProducts};
      updatedCart[productId]= obj;
      setCartProducts(updatedCart);
  }

  function changeQuantity(cartObj,currentQuantity, quantity) {
    const newQuantity = +currentQuantity + +quantity;
    const newObj = {...cartObj, quantity: newQuantity};
    return newObj;
  };

  return (
    <>
      <Navbar redDotQuantity={redDotQuantity} setRedDotQuantity={setRedDotQuantity}/>
      <Content>
        <Outlet context={[cartProducts, handleCartChange, removeItemFromCart, handleRedDot]}/>
      </Content>
    </>
  );
};

export default App