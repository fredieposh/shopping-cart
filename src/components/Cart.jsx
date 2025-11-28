import { Card } from './Store.jsx';
import { useOutletContext } from 'react-router'

export default function Cart() {
    const [cartProducts, handleCartChange] = useOutletContext();
    console.log(cartProducts);
    
    function getProductKeyes() {
        return Object.keys(cartProducts);
    };

    function isCartPopulated() {
        return Object.keys(cartProducts)[0] ? true : false;
    };
    
    const productKeys = getProductKeyes();

    return (
        <div className="cart-container">
            <div className="products-container">
                {isCartPopulated()
                ? productKeys.map(key =>
                     <Card
                     key={key}
                     productObject={cartProducts[key].productObj}
                     handleCartChange={handleCartChange}
                     cartQuantity={cartProducts[key].quantity}
                     />
                    )
                : "Your cart is empty"
                }
            </div>
            <div className="totals-container">

            </div>
        </div>
    );
}
