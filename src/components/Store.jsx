import { useState, useEffect, Fragment } from 'react'
import {useOutletContext} from 'react-router';
import './Store.css'

export default function Store() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartProducts, handleCartChange] = useOutletContext();
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
                    <Card productObject={product} key={product.id} handleCartChange={handleCartChange}/>
                    )}
        </div>
    );
};

function Card({ productObject, handleCartChange }) {
    const [quantity, setQuantity] = useState(0);
    return (
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
                <label htmlFor={'quantity-'+productObject.id}>quantity:</label>
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
            <button onClick={() =>
                quantity > 0 && handleCartChange({productObj: productObject, quantity})}> add to cart</button>
        </div>
    )
}

