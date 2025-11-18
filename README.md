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

### 🔎  Filtering
Users can filter products by:
- **Brand**
- **Color**

### ↕️ Sorting
Sort products by:
- Price: Low → High  
- Price: High → Low  
- Name: A → Z  
- Name: Z → A  

Sorting + filtering combined produces clean UX behavior.

## 🛒 Cart System 

The project uses **Zustand** (practicing) to handle cart logic:

### Cart Features
- Add items to cart  
- Remove items  
- Update quantities  
- Persistent cart state during navigation  
- Cart drawer UI


---

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- React Router v7
- TailwindCSS
- ContextAPI
- Zustand
- React Hook Form
- Zod

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- JWT Auth
- Bcrypt

---

## 🔐 Test Accounts

### 👤 Regular User
- **Email:** test@abv.bg  
- **Password:** 123456  

### 🛠️ Admin User
- **Email:** admin@abv.bg  
- **Password:** 123456  

Use these accounts to test login, restricted routes, and admin item management.

---

## 🔒 Admin Panel

### Admin can:
- Add items  
- Edit items  
- Delete items  
- View users  

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

## 🚀 How to Run the Project

### 1. Clone the repo

```sh
git clone git@github.com:shefket-mustafa/Modern-Store.git
```

### 2. Locate the project

```sh
cd Modern-Store
```


### 3. Install dependencies in both client and server folders and start

```sh
cd client 
npm install
npm run dev

cd server
 npm install
npm run dev
```
The App should be running now!

---


## 🎯 Future Improvements
- Search bar
- Price range filter
- Pagination
- Wishlist / favorites
- Ratings & reviews
- Order system + checkout

---

