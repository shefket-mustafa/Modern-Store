    import {  motion } from "framer-motion";
    import { useState } from "react";
    import { mockProducts } from "../data/mockProducts";
import AddItemModal from "../modals/admin/AddItemModal";

    export default function Admin(){

        const users = [
            { id: '1', username: 'john_doe', email: 'john_doe@abv.bg'},
            { id: '2', username: 'jane_smith', email: 'johna_doe@abv.bg'},
            { id: '3', username: 'mane_smith', email: 'jmane_doe@abv.bg'}
                ]

                const [activityTab, setActivityTab] =  useState<"Items" | "Users">("Users")
                const [addItemModalOpen, setAddItemModalOpen] = useState(false);

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
            {users.length === 0 ? (
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
                    {users.map((u, i) => (
                    <tr
                        key={u.id}
                        className="odd:bg-gray-50 even:bg-white border-b hover:bg-orange-50 transition"
                    >
                        <td className="py-2 px-4">{i + 1}</td>
                        <td className="py-2 px-4 font-medium">{u.username}</td>
                        <td className="py-2 px-4">{u.email}</td>
                        <td className="py-2 px-4">
                        <button className="text-red-500 hover:underline">
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
                {mockProducts.length === 0 ? (
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
                    {mockProducts.map((u, i) => (
                    <tr
                        key={u.id}
                        className="odd:bg-gray-50 even:bg-white border-b hover:bg-orange-50 transition"
                    >
                        <td className="py-2 px-4">{i + 1}</td>
                        <td className="py-2 px-4 font-medium">{u.name}</td>
                        <td className="py-2 px-4">{u.price}</td>
                        <td className="py-2 px-4">
                        <button className="text-red-500 hover:underline">
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

        <AddItemModal addItemModalOpen={addItemModalOpen} setAddItemModalOpen={setAddItemModalOpen} />
       
        </div>
    );
        
    }