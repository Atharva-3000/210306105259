import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [categoryName, setCategoryName] = useState('');
    const [top, setTop] = useState(undefined);
    const [minPrice, setMinPrice] = useState(undefined);
    const [maxPrice, setMaxPrice] = useState(undefined);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = process.env.ACCESS_TOKEN;  
            if (!token) {
              console.log(token);
                throw new Error('REACT_APP_ACCESS_TOKEN is not defined');
            }
            const response = await axios.post('http://localhost:3000/categories', {
                categoryName,
                top,
                minPrice,
                maxPrice
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setProducts(response.data);
            console.log(response.data);
        } catch (err) {
            setError(err.message || 'An error occurred while fetching products');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchProducts();
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-black text-center mb-8 border">Product Filter</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Category Name:
                    </label>
                    <input
                        type="text"
                        value={categoryName}
                        onChange={e => setCategoryName(e.target.value)}
                        className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Top:
                    </label>
                    <input
                        type="number"
                        value={top}
                        onChange={e => setTop(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 text-black rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Min Price:
                    </label>
                    <input
                        type="number"
                        value={minPrice}
                        onChange={e => setMinPrice(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 text-black rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Max Price:
                    </label>
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={e => setMaxPrice(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 text-black rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Fetch Products
                </button>
            </form>

            {loading && <p className="text-center mt-4">Loading...</p>}
            {error && <p className="text-center text-red-500 mt-4">{error}</p>}

            <div className="mt-8">
                {products.length > 0 && (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {products.map((product, index) => (
                            <li key={index} className="bg-white p-4 rounded-lg shadow-lg">
                                <p className="font-bold">{product.name}</p>
                                <p>${product.price}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Home;
