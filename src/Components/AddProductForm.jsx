import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useDataContext } from './DataContext';
import '../App.css';

export function AddProductForm() {
    const queryClient = useQueryClient();
    const { setNewData } = useDataContext();

    const addProductMutation = useMutation(
        (newProduct) => fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        }),
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries('products');
            },
        }
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, description, price } = e.target.elements;

        if (!name.value.trim() || !description.value.trim() || !price.value.trim()) {
            alert('Please fill all inputs');
            return;
        }

        await addProductMutation.mutateAsync({
            name: name.value,
            description: description.value,
            price: price.value,
        });

        setNewData(prevState => ([
            {
                name: name.value,
                description: description.value,
                price: price.value,
            }, ...prevState]))
        name.value = '';
        description.value = '';
        price.value = '';
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" name="description" required />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" name="price" step="0.01" required />
                </div>
                <button type="submit" disabled={addProductMutation.isLoading}>
                    {addProductMutation.isLoading ? 'Adding...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
};
