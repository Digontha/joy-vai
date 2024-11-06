"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; // Use useRouter from 'next/router' for dynamic routing

const EditBlog = () => {
    const [formData, setFormData] = useState({
        title_english: '',
        title_bangla: '',
        image: '',
        description_english: '',
        description_bangla: '',
        category: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { id } = router.query; // Access dynamic route param (id)

    // Fetch the blog data when the component is mounted
    useEffect(() => {
        const fetchBlogData = async () => {
            if (id) { // Ensure the ID is available before making the request
                try {
                    const response = await axios.get(`http://localhost:3001/api/v1/blog/${id}`);
                    if (response.data.success) {
                        setFormData(response.data.data); // Fill form data with existing blog info
                    } else {
                        setError("Failed to load blog data");
                    }
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching blog:', error);
                    setError("Failed to load blog data");
                    setLoading(false);
                }
            }
        };

        fetchBlogData(); // Fetch blog data if ID is available
    }, [id]); // Re-run the effect when the ID changes

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
            const response = await axios.put(`http://localhost:3001/api/v1/blog/${id}`, formData, {
                withCredentials: true, 
            });
            if (response.data.success) {
                alert('Blog updated successfully!');
                router.push('/'); // Redirect to homepage or blog list after successful update
            } else {
                alert('Failed to update blog: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error updating blog:', error);
            alert('An error occurred while updating the blog.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <section className='flex justify-center items-center h-screen'>
            <div className="p-6 bg-white text-black rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-center mb-4">Edit Blog</h2>
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
                        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Update Blog
                    </button>
                </form>
            </div>
        </section>
    );
};

export default EditBlog;
