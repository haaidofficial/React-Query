import React from 'react';
import { useQuery } from 'react-query';
import { useDataContext } from './DataContext';
import '../App.css';

const fetchProducts = async () => {
    const response = await fetch('https://dummyjson.com/products');
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
};

export function Products() {
    const { newData } = useDataContext();

    const { data, isLoading, isError } = useQuery('products', fetchProducts);


    function syncNewlyAddedProduct(data) {
        let productList = [];

        if(data.products){
            productList = [...newData, ...data.products];
        }
        return { productList, total: productList.length };
    }

    if (isLoading) return <div>
        <div className='loader-container'><div className="loader"></div></div>
    </div>;
    if (isError) return <div>Error fetching products</div>;



    const { productList, total } = syncNewlyAddedProduct(data);
    return (
        <div className='product-list-container'>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px' }}>
                <h2>Products</h2>
                <h5>Total products: {total}</h5>
            </div>
            <ul className="product-list">
                {productList.map((product, index) => (
                    <li className="product-item" key={product.id + index}>
                        <span><b>{index + 1}. </b></span>
                        {product.name} - {product.description} - ${product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

