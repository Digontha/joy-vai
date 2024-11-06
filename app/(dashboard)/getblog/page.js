"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const GetBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/blog', {
                    withCredentials: true, // include credentials if required
                });

                if (response.data.success) {
                    setBlogs(response.data.data);
                } else {
                    setError("Failed to load blogs");
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setError("Failed to load blogs");
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/v1/blog/${id}`, {
                withCredentials: true, // include credentials if required
            });
            setBlogs(blogs.filter((blog) => blog._id !== id));
        } catch (error) {
            console.error("Error deleting blog:", error);
            setError("Failed to delete blog");
        }
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='text-black text-2xl'>
            <h1 className='text-4xl text-center mb-10'>Blog List</h1>
            <ul className='text-lg mt-4'>
                <div className='grid grid-cols-2 gap-4'>
                    {blogs.map((blog) => (
                        <li key={blog._id} className='mb-6 border-b pb-4'>
                            <Image src={blog.image} alt={blog.title_english} width={100} height={100} className='w-full h-64 object-cover mb-4' />
                            <h2 className='font-bold text-3xl'>{blog.title_english}</h2>
                            <h3 className='font-bold text-2xl text-gray-700'>{blog.title_bangla}</h3>
                            <p className='text-gray-600 mt-2'>{blog.description_english}</p>
                            <p className='text-gray-600 mt-2'>{blog.description_bangla}</p>
                            <span className='text-gray-500 text-sm'>{blog.category}</span>
                            <div className="flex gap-4 mt-4">
                                <button 
                                    onClick={() => handleEdit(blog._id)} 
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDelete(blog._id)} 
                                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </div>
            </ul>
        </div>
    );
};

export default GetBlog;
