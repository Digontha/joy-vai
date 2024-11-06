"use client";
import { useState } from 'react';
import axios from 'axios';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenu,
    SidebarProvider
} from '@/components/ui/sidebar';
import { Home as HomeIcon, Inbox as InboxIcon, Menu as MenuIcon, LogOut as LogOutIcon } from "lucide-react";
import React from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { useRouter } from 'next/navigation';

const SidebarDash = () => {
    const router = useRouter();
    const items = [
        {
            title: "Create Blog",
            url: "/createblog",
            icon: <HomeIcon />,
        },
        {
            title: "Your Blog",
            url: "/getblog",
            icon: <InboxIcon />,
        },
    ];
    axios.defaults.withCredentials = true;
    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/v1/auth/logout', {withCredentials: true});

            if (response.status === 200) {
                
                router.push('/login');
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("An error occurred during logout:", error);
        }
    };

    return (
        <SidebarProvider>
            <div className="flex">
                {/* Sidebar for medium (md) and larger screens */}
                <div className="hidden md:flex">
                    <Sidebar className="fixed top-0 left-0 h-full bg-white shadow-lg">
                        <SidebarContent className="flex flex-col h-full">
                            <div className="flex items-center justify-between p-4 bg-black text-white">
                                <h1 className="text-lg font-bold">My App</h1>
                            </div>
                            <SidebarGroup>
                                <SidebarGroupLabel className="mt-4">Application</SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {items.map((item) => (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton asChild>
                                                    <a href={item.url} className="flex items-center p-2 hover:bg-gray-200">
                                                        {item.icon}
                                                        <span className="ml-2">{item.title}</span>
                                                    </a>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                        {/* Logout Button */}
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild>
                                                <button onClick={()=>{handleLogout()}} className="flex items-center p-2 hover:bg-gray-200">
                                                    <LogOutIcon className="w-5 h-5" />
                                                    <span className="ml-2">Logout</span>
                                                </button>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                    </Sidebar>
                </div>

                {/* Drawer for small screens */}
                <Drawer>
                    <DrawerTrigger asChild>
                        <button className="md:hidden text-gray-600 hover:text-blue-600 focus:outline-none fixed z-50 top-4 left-4">
                            <MenuIcon className="w-6 h-6" />
                        </button>
                    </DrawerTrigger>

                    <DrawerContent side="left" className="md:hidden">
                        <DrawerHeader className="pb-4">
                            <DrawerTitle className="text-lg font-bold border-b-2 border-black">Menu</DrawerTitle>
                        </DrawerHeader>
                        <div className="flex flex-col p-4 space-y-4">
                            {items.map((item) => (
                                <a
                                    key={item.title}
                                    href={item.url}
                                    className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded"
                                >
                                    {item.icon}
                                    <span className="ml-2">{item.title}</span>
                                </a>
                            ))}
                            {/* Logout Button in Drawer */}
                            <button
                                onClick={handleLogout}
                                className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded"
                            >
                                <LogOutIcon className="w-5 h-5" />
                                <span className="ml-2">Logout</span>
                            </button>
                        </div>
                        <DrawerClose className="absolute right-4 top-4 text-gray-700">
                            &times;
                        </DrawerClose>
                    </DrawerContent>
                </Drawer>

              
            </div>
        </SidebarProvider>
    );
};

export default SidebarDash;
