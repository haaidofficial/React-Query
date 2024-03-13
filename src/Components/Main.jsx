import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Products } from './Products';
import { AddProductForm } from './AddProductForm';
import '../App.css';

const queryClient = new QueryClient();

export function Main() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className='main-container'>
                <div>
                    <h2>Add New Product</h2>
                    <AddProductForm />
                </div>
                <div>
                    <h1>Product Information</h1>
                    <Products />
                </div>
            </div>
        </QueryClientProvider>
    );
}

