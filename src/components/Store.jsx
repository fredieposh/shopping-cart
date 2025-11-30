import { useState, useEffect, Fragment } from 'react'
import {useOutletContext, useLocation} from 'react-router';
import './Store.css'

export default function Store() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartProducts, handleCartChange, removeItemFromCart] = useOutletContext();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                if (response.status >= 400) throw new Error("Server Error");
                const result = await response.json();

                setData(result);
            } catch(error) {
                setError(error);
            } finally {
                setIsLoading(false);
            };
        };

        fetchData();
    }, []);

    if(isLoading) {
        return(
            <div className="loading-spinner">
                <svg 
                style={{height: '50px',}}
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24"><title>loading</title><path 
                d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
                </svg>
                <p>Loading...</p>
            </div>
        );
    };

    if(error) {
        return(
            <div>
                <p>Oops!...</p>
                <p>{error}</p>
                <p>Please refresh</p>
            </div>
        );
    }

    return(
        <div className="cards-container">
            {data.map((product) =>
                    <Card 
                    key={product.id} 
                    productObject={product} 
                    handleCartChange={handleCartChange}
                    removeItemFromCart={removeItemFromCart}
                    />
                    )}
        </div>
    );
};

export function Card({ productObject, handleCartChange, cartQuantity, removeItemFromCart }) {
    const initialQantity = cartQuantity ? cartQuantity : 0;
    const [quantity, setQuantity] = useState(initialQantity);
    const location = useLocation();

    return (
        <>
        {
        location.pathname === '/shop' ?
            <div className="product-card">
                <div className="product-title">
                    <p>{productObject.title}</p>
                </div>
                <div className="product-image">
                    <img
                    src={productObject.image}
                    alt={productObject.title}
                    style={{height: "100px", width: "100px"}}
                    />
                </div>
                <div className='product-quantity'>
                    <label htmlFor={'quantity-'+productObject.id}>{'Quantity: '}</label>
                    <input
                    type='number'
                    name={'quantity-'+productObject.id}
                    id={'quantity-'+productObject.id}
                    min='0'
                    max='10'
                    step='1'
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}/>
                </div>
                <div className='product-price'>
                    {'Price ' + productObject.price + '$'}
                </div>
                <button onClick={() =>
                    quantity > 0 && handleCartChange({productObj: productObject, quantity})}> add to cart</button>
            </div>
        :
            <div className="product-cart-card">
                <div className="product-info">
                    <div className="product-title">
                        <p>{productObject.title}</p>
                    </div>
                    <div className="product-image">
                        <img
                        src={productObject.image}
                        alt={productObject.title}
                        style={{height: "100px", width: "100px"}}
                        />
                    </div>
                </div>
                <div className="product-amounts">
                    <div className='product-quantity'>
                        <label htmlFor={'quantity-'+productObject.id}>quantity:&nbsp;</label>
                        <input
                        type='number'
                        name={'quantity-'+productObject.id}
                        id={'quantity-'+productObject.id}
                        min='0'
                        max='10'
                        step='1'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}/>
                    </div>
                    <div className='amount-buttons'>
                        <button
                        onClick={() => {
                            const newQantity = quantity - cartQuantity;
                            quantity > 0 ? 
                            handleCartChange({productObj: productObject, quantity: newQantity}) : 
                            removeItemFromCart(productObject)
                        }
                        }> update
                        </button>
                        <button
                        onClick={() =>
                            removeItemFromCart(productObject)
                        }> remove
                        </button>
                    </div>
                </div>
                    <div className="totals">
                        total: {quantity * productObject.price + ' $'}
                    </div>
            </div>
        }
        </>
    )
}

