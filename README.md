# 🧡 VibeWear — Modern Clothing E-commerce Store

A modern full-stack **ecommerce web application** built with **React, TypeScript, Node.js, Express, and MongoDB**.  
Includes full product management, shopping features, admin tools, dynamic filtering, sorting, animations, and a clean responsive UI.

---

## 🚀 Features

### 🛍️ Shopping Experience
- Browse clothing for **Men / Women**
- Subcategories include:
  - T-shirts
  - Jeans
  - Sweatshirts
  - Sweatpants
- Dynamic shop page layout
- Smart automatic titles based on category/subcategory
- Live product count

### 🔎 Advanced Filtering
Users can filter products by:
- **Brand**
- **Color**

Filtering includes:
- Multi-select
- Unique values (automatically deduplicated)
- Works seamlessly with sorting

### ↕️ Sorting
Sort products by:
- Price: Low → High  
- Price: High → Low  
- Name: A → Z  
- Name: Z → A  

Sorting + filtering combined produces clean UX behavior.

---

## 🧪 Core Logic (Frontend)

### 🧩 Helper Functions
- **`filterProducts.ts`** → applies filtering logic  
- **`sortProducts.ts`** → applies sorting logic  
- Processing order: *filter → sort → render*

### 🧠 State Management
- Custom **Shop Context** (`useShop`)
- Stores:
  - Filters
  - Sort mode
  - Shop title
  - Drawer / UI state

### 🎨 UI / UX
- Built with **TailwindCSS**
- Animations with **Framer Motion**
- Mobile sliding drawer for filters
- Responsive product grid
- Clean, minimal interface

---

## 🔐 Admin Panel

Admins can:
- Add products  
- Edit products  
- Delete products  
- Manage users  

### Admin Item Creation (Frontend + Backend)
Each product supports:
- **name**
- **price**
- **brand**
- **colors** (comma-separated → array)
- **category** (men/women)
- **subcategory** (validated based on category)
- **imageUrl**
- **description**
- **sizes** (comma-separated → array)
- **stockQuantity**

### Zod Schema Validation
- Full validation of admin input
- Category/subcategory relation validated with `refine`
- Automatic coercion of numbers, arrays, colors, etc.

---

## 🗄️ Backend (Node + Express + MongoDB)

### API Endpoints
| Method | Route | Description |
|--------|--------|-------------|
| POST | `/admin/add-item` | Create new product |
| PATCH | `/admin/editItemAdmin/:id` | Edit product |
| DELETE | `/admin/delete-item/:id` | Delete product |
| GET | `/admin/users` | List users |
| GET | `/items` | Public route for shop products |

### Backend Highlights
- Full JWT authentication  
- Admin-protected routes  
- MongoDB models for:
  - Users
  - Products (AdminItemModel)
- Validation layer through request body + Zod on frontend

---

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- React Router v7
- TailwindCSS
- Framer Motion
- React Hook Form
- Zod

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- JWT Auth

---

## 📂 Project Structure

