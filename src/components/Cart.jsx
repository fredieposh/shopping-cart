import { Card } from './Store.jsx';
import { useOutletContext } from 'react-router'
import './Cart.css'

export default function Cart() {
    const [cartProducts, handleCartChange, removeItemFromCart] = useOutletContext();
    
    function getProductKeyes() {
        return Object.keys(cartProducts);
    };

    function isCartPopulated() {
        return Object.keys(cartProducts)[0] ? true : false;
    };

    function getTotalItemsCount() {
        return productKeys.reduce((totalItems, key) => totalItems + cartProducts[key].quantity, 0);
    };

    function getTotalItemsPrice() {
        return productKeys.reduce((totalPrice, key) => 
            totalPrice + cartProducts[key].quantity * cartProducts[key].productObj.price, 0);
    };
    
    const productKeys = getProductKeyes();

    return (
        <div className="cart-container">
            <div className="products-container">
                {isCartPopulated()
                ? 
                productKeys.map(key =>
                     <Card
                     key={key}
                     productObject={cartProducts[key].productObj}
                     handleCartChange={handleCartChange}
                     cartQuantity={cartProducts[key].quantity}
                     removeItemFromCart={removeItemFromCart}
                     />
                    )
                : <div className='empty-cart'><h3>Your cart is empty</h3></div>
                }
            </div>
            <div className="totals-container">
                <div className='totals-header'>
                    <h2>Cart Summary</h2>
                </div>
                <div className="totals-summary"> 
                    {
                        isCartPopulated() ?
                        <div className='totals-info'>
                            <p>{'Total items: ' + getTotalItemsCount()}</p>
                            <p>{'Total price: ' + getTotalItemsPrice() + '$'}</p>
                        </div>
                        :
                        <h3>No items on cart</h3>
                    }
                </div>
            </div>
        </div>
    );
}
