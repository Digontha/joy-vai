"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const Createblog = () => {
    const [formData, setFormData] = useState({
        title_english: '',
        title_bangla: '',
        image: '',
        description_english: '',
        description_bangla: '',
        category: '',
    });
    
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/v1/blog', formData, {
                withCredentials: true, 
            });
            if (response.data.success) {
                alert('Place created successfully!');
                setFormData({
                    title_english: '',
                    title_bangla: '',
                    image: '',
                    description_english: '',
                    description_bangla: '',
                    category: '',
                });
            } else {
                alert('Failed to create place: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error creating place:', error);
            if (error.response?.status === 401) {
                alert('You are not authorized. Please log in again.');
                router.push('/login'); 
            } else {
                alert('An error occurred while creating the place.');
            }
        }
    };
    


    return (
        <section className='flex justify-center items-center h-screen'>
            <div className=" p-6 bg-white text-black rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-center mb-4">Create a New Place</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title_english"
                        placeholder="Title (English)"
                        value={formData.title_english}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="text"
                        name="title_bangla"
                        placeholder="Title (Bangla)"
                        value={formData.title_bangla}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="url"
                        name="image"
                        placeholder="Image URL"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <textarea
                        name="description_english"
                        placeholder="Description (English)"
                        value={formData.description_english}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <textarea
                        name="description_bangla"
                        placeholder="Description (Bangla)"
                        value={formData.description_bangla}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="" disabled>Select Category</option>
                        <option value="nature">Nature</option>
                        <option value="historical">Historical</option>
                        <option value="cultural">Cultural</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                        Create Blog
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Createblog;