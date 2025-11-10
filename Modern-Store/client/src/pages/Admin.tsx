    import {  motion } from "framer-motion";
    import { useEffect, useState } from "react";
import type { AdminItemType, allUsersType } from "../../types";
import AddItemModal from "../modals/admin/AddItemModal";

    export default function Admin(){
        const BASE_URL = import.meta.env.VITE_BASE_URL;
         const [allItems, setAllItems] = useState<AdminItemType[]>([]);
         const [allUsers, setAllUsers] = useState<allUsersType[]>([]);
          const token = localStorage.getItem('token');
    const [fetchAgain, setFetchAgain] = useState(false);

        
            useEffect(() => {
               
        
                    const fetchAllItems = async () => {
        
                        
                         try{
                        if (!token) {
                            throw new Error('No token found');
                        }
                        
                        const res = await fetch(`${BASE_URL}/admin/items`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            "Authorization": `Bearer ${token}`
                        }})
                        const data = await res.json();
                        const items = data?.items ?? [];
                        setAllItems(items);
                    }catch(err){
                        throw new Error('Authentication token not found. Please log in again.');
                    }

                    }
                        fetchAllItems()
            },[])

            useEffect(() => {
                if(fetchAgain){
                    const fetchAllItems = async () => {
        
                        
                         try{
                        if (!token) {
                            throw new Error('No token found');
                        }
                        
                        const res = await fetch(`${BASE_URL}/admin/items`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            "Authorization": `Bearer ${token}`
                        }})
                        const data = await res.json();
                        const items = data?.items ?? [];
                        setAllItems(items);
                        setFetchAgain(false);
                    }catch(err){
                        throw new Error('Authentication token not found. Please log in again.');
                    }

                    }
                        fetchAllItems()
                }
            },[fetchAgain]) 
                    
            const deleteItemsHandler = async (id: string) => {
               try{
                const response = await fetch(`${BASE_URL}/admin/delete-item/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token ? `Bearer ${token}` : ''
                    }
                });

                if (!response.ok) {
                  const text = await response.text();
                  throw new Error(text || 'Failed to delete item.');
                }

                setAllUsers((prev) => prev.filter((user) => user._id !== id));
               }catch(err){
                // surface a friendly error in console and optionally UI
                console.error(err);
                throw new Error('Failed to delete item. Please try again.');
               }
            }

              const deleteUsersHandler = async (id: string) => {
               try{
                const response = await fetch(`${BASE_URL}/admin/delete-user/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token ? `Bearer ${token}` : ''
                    }
                });

                if (!response.ok) {
                  const text = await response.text();
                  throw new Error(text || 'Failed to delete user.');
                }
                console.log(response);
                
                setAllUsers((prev) => prev.filter((users) => users._id !== id));
               }catch(err){
                // surface a friendly error in console and optionally UI
                console.error(err);
                throw new Error('Failed to delete item. Please try again.');
               }
            }

            useEffect(() => {

                const fetchAllUsers = async () => {
                    try{
                        if (!token) {
                            throw new Error('No token found');
                        }
                        
                        const res = await fetch(`${BASE_URL}/admin/users`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            "Authorization": `Bearer ${token}`
                        }})
                        const data = await res.json();
                        const users = data?.users ?? [];
                        setAllUsers(users);
                    }catch(err){
                        throw new Error('Authentication token not found. Please log in again.');
                    }
                }
                fetchAllUsers();
            },[])
        

                const [activityTab, setActivityTab] =  useState<"Items" | "Users">("Users")
                const [addItemModalOpen, setAddItemModalOpen] = useState(false);
                console.log(allItems);
                

        return(
            <div className="min-h-screen bg-gray-50 p-8">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-100"
        >
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Panel</h1>
            <p className="text-gray-500 mb-8">Manage users and store data here.</p>

            <div className="flex gap-5 p-5 ">
                <button onClick={() => setActivityTab("Users")} className={`${activityTab === "Users" ? "border-2 bg-neutral-300" : ""} bg-neutral-200 cursor-pointer px-3 py-1 rounded-lg`}>Users</button>
                <button onClick={() => setActivityTab("Items")} className={`${activityTab === "Items" ? "border-2 bg-neutral-300" : ""} bg-neutral-200 cursor-pointer px-3 py-1 rounded-lg`}>Items</button>
            </div>

            {/* // Users Section */}
            <div className={`${activityTab === "Users" ? "block" : "hidden" }`}>
            {allUsers.length === 0 ? (
            <p className="text-gray-400">No users found.</p>
            ) : (
            <div className="overflow-x-auto">
                <table className="min-w-full text-left border-collapse">
                <thead>
                    <tr className="bg-orange-500 text-white">
                    <th className="py-2 px-4 rounded-tl-lg">#</th>
                    <th className="py-2 px-4">Username</th>
                    <th className="py-2 px-4">Email</th>
                    <th className="py-2 px-4 rounded-tr-lg">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers.map((u, i) => (
                    <tr
                        key={u._id}
                        className="odd:bg-gray-50 even:bg-white border-b hover:bg-orange-50 transition"
                    >
                        <td className="py-2 px-4">{i + 1}</td>
                        <td className="py-2 px-4 font-medium">{u.username}</td>
                        <td className="py-2 px-4">{u.email}</td>
                        <td className="py-2 px-4">
                        <button onClick={() => deleteUsersHandler(u._id)} className="text-red-500 hover:underline cursor-pointer">
                            Delete
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}
            </div>


            <div className={`${activityTab === "Items" ? "block" : "hidden" }`}>
                {allItems.length === 0 ? (
            <p className="text-gray-400">No items found.</p>
            ) : (
            <div className="overflow-x-auto overflow-y-auto max-h-96">
                <table className="min-w-full text-left border-collapse">
                <thead>
                    <tr className="bg-orange-500 text-white">
                    <th className="py-2 px-4 rounded-tl-lg">#</th>
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Price</th>
                    <th className="py-2 px-4  w-2">In Stock </th>
                    <th onClick={() => setAddItemModalOpen(true)} className="py-2 px-4 text-lg rounded-tr-lg w-2 cursor-pointer hover:text-black active:bg-orange-600 transition"
                    >+</th>
                    </tr>
                </thead>
                <tbody>
                    {allItems.map((u, i) => (
                    <tr
                        key={u._id}
                        className="odd:bg-gray-50 even:bg-white border-b hover:bg-orange-50 transition"
                    >
                        <td className="py-2 px-4">{i + 1}</td>
                        <td className="py-2 px-4 font-medium">{u.name}</td>
                        <td className="py-2 px-4">{u.price}</td>
                        <td className="py-2 px-4">{u.stockQuantity}</td>
                        <td className="py-2 px-4">
                        <button onClick={() => deleteItemsHandler(u._id)} className="text-red-500 cursor-pointer hover:underline">
                            Delete
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}
            </div>
        </motion.div>

        <AddItemModal addItemModalOpen={addItemModalOpen} setAddItemModalOpen={setAddItemModalOpen} setFetchAgain={setFetchAgain}/>
       
        </div>
    );
        
    }