# 🚀 API ENDPOINTS WITH SAMPLE JSON

Base URL: `https://trustedge-backend.vercel.app/api/v1`
Local: `http://localhost:5000/api/v1`

---

## 🔐 1. AUTHENTICATION ENDPOINTS

### 1.1 Register User

```http
POST /api/v1/auth/register
Content-Type: application/json
```

**JSON Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123!",
  "phone": "01712345678",
  "address": "123 Main Street, Dhaka"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "673123abc...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

### 1.2 Login User

```http
POST /api/v1/auth/login
Content-Type: application/json
```

**JSON Body:**

```json
{
  "email": "john@example.com",
  "password": "Password123!"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "673123abc...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Cookie:** `refreshToken` will be set automatically

---

### 1.3 Create Admin (First User)

```http
POST /api/v1/auth/register
Content-Type: application/json
```

**JSON Body:**

```json
{
  "name": "Admin User",
  "email": "admin@trustedge.com",
  "password": "Admin123!",
  "role": "admin",
  "phone": "01712345678",
  "address": "Admin Office, Dhaka"
}
```

---

## 📦 2. CATEGORY ENDPOINTS

### 2.1 Create Category (Admin Only)

```http
POST /api/v1/category
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**JSON Body:**

```json
{
  "name": "Electronics",
  "description": "Electronic devices and gadgets",
  "image": "https://images.unsplash.com/photo-1498049794561-7780e7231661"
}
```

**More Examples:**

```json
{
  "name": "Clothing",
  "description": "Fashion and apparel",
  "image": "https://images.unsplash.com/photo-1445205170230-053b83016050"
}
```

```json
{
  "name": "Books",
  "description": "Books and educational materials",
  "image": "https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
}
```

```json
{
  "name": "Home & Kitchen",
  "description": "Home appliances and kitchen items",
  "image": "https://images.unsplash.com/photo-1556912173-3bb406ef7e77"
}
```

---

### 2.2 Get All Categories

```http
GET /api/v1/category
```

**No body needed**

---

### 2.3 Get Single Category

```http
GET /api/v1/category/:id
```

**Example:** `/api/v1/category/673123abc...`

---

### 2.4 Update Category (Admin Only)

```http
PUT /api/v1/category/:id
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**JSON Body:**

```json
{
  "name": "Electronics & Gadgets",
  "description": "Updated description"
}
```

---

### 2.5 Delete Category (Admin Only)

```http
DELETE /api/v1/category/:id
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## 🛍️ 3. PRODUCT ENDPOINTS

### 3.1 Create Product (Admin Only)

```http
POST /api/v1/products
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**JSON Body:**

```json
{
  "name": "iPhone 15 Pro Max",
  "description": "Latest Apple flagship smartphone with A17 Pro chip, titanium design, and advanced camera system",
  "price": 139999,
  "category": "CATEGORY_ID_HERE",
  "brand": "Apple",
  "stock": 50,
  "images": [
    "https://images.unsplash.com/photo-1696446702183-cbd49b3a42c5",
    "https://images.unsplash.com/photo-1592286927505-c6c4a04cf206"
  ],
  "specifications": {
    "screen": "6.7 inch Super Retina XDR",
    "processor": "A17 Pro",
    "ram": "8GB",
    "storage": "256GB",
    "camera": "48MP + 12MP + 12MP",
    "battery": "4422mAh"
  },
  "tags": ["smartphone", "apple", "flagship", "5g"],
  "featured": true
}
```

**More Product Examples:**

**Laptop:**

```json
{
  "name": "MacBook Pro 14 M3",
  "description": "Professional laptop with M3 chip, stunning Liquid Retina XDR display",
  "price": 249999,
  "category": "CATEGORY_ID_HERE",
  "brand": "Apple",
  "stock": 30,
  "images": ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8"],
  "specifications": {
    "processor": "Apple M3 Pro",
    "ram": "16GB",
    "storage": "512GB SSD",
    "display": "14.2 inch Liquid Retina XDR",
    "graphics": "18-core GPU"
  },
  "tags": ["laptop", "macbook", "professional"],
  "featured": true
}
```

**T-Shirt:**

```json
{
  "name": "Premium Cotton T-Shirt",
  "description": "100% organic cotton, comfortable fit, available in multiple colors",
  "price": 1299,
  "category": "CATEGORY_ID_HERE",
  "brand": "Ecstasy",
  "stock": 100,
  "images": ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"],
  "specifications": {
    "material": "100% Organic Cotton",
    "sizes": "S, M, L, XL, XXL",
    "colors": "Black, White, Navy, Gray"
  },
  "tags": ["tshirt", "casual", "cotton"],
  "featured": false
}
```

**Book:**

```json
{
  "name": "Clean Code",
  "description": "A Handbook of Agile Software Craftsmanship by Robert C. Martin",
  "price": 2500,
  "category": "CATEGORY_ID_HERE",
  "brand": "Prentice Hall",
  "stock": 25,
  "images": ["https://images.unsplash.com/photo-1544947950-fa07a98d237f"],
  "specifications": {
    "author": "Robert C. Martin",
    "pages": "464",
    "language": "English",
    "publisher": "Prentice Hall",
    "isbn": "978-0132350884"
  },
  "tags": ["programming", "software", "coding"],
  "featured": true
}
```

---

### 3.2 Get All Products

```http
GET /api/v1/products
```

**Query Parameters (Optional):**

```
?page=1
&limit=10
&sortBy=price
&sortOrder=asc
&minPrice=1000
&maxPrice=50000
&category=CATEGORY_ID
&brand=Apple
&search=iphone
&featured=true
```

**Examples:**

```
GET /api/v1/products?featured=true
GET /api/v1/products?category=673123abc&sortBy=price&sortOrder=desc
GET /api/v1/products?search=laptop&minPrice=50000&maxPrice=150000
```

---

### 3.3 Get Single Product

```http
GET /api/v1/products/:id
```

---

### 3.4 Update Product (Admin Only)

```http
PUT /api/v1/products/:id
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**JSON Body:**

```json
{
  "price": 135999,
  "stock": 45,
  "featured": false
}
```

---

### 3.5 Delete Product (Admin Only)

```http
DELETE /api/v1/products/:id
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## 👤 4. USER ENDPOINTS

### 4.1 Get All Users (Admin Only)

```http
GET /api/v1/users
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

### 4.2 Get My Profile

```http
GET /api/v1/users/profile
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

### 4.3 Update My Profile

```http
PUT /api/v1/users/profile
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**JSON Body:**

```json
{
  "name": "John Doe Updated",
  "phone": "01798765432",
  "address": "New Address, Gulshan, Dhaka"
}
```

---

### 4.4 Change Password

```http
PUT /api/v1/users/change-password
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**JSON Body:**

```json
{
  "currentPassword": "Password123!",
  "newPassword": "NewPassword456!"
}
```

---

### 4.5 Update User Role (Admin Only)

```http
PUT /api/v1/users/:id/role
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**JSON Body:**

```json
{
  "role": "admin"
}
```

---

### 4.6 Delete User (Admin Only)

```http
DELETE /api/v1/users/:id
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## ⭐ 5. REVIEW ENDPOINTS

### 5.1 Create Review

```http
POST /api/v1/review
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**JSON Body:**

```json
{
  "product": "PRODUCT_ID_HERE",
  "rating": 5,
  "comment": "Excellent product! Highly recommended. Fast delivery and great quality.",
  "images": ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e"]
}
```

**More Examples:**

```json
{
  "product": "PRODUCT_ID_HERE",
  "rating": 4,
  "comment": "Good product but slightly expensive. Worth the money though!"
}
```

```json
{
  "product": "PRODUCT_ID_HERE",
  "rating": 3,
  "comment": "Average product. Could be better for the price."
}
```

---

### 5.2 Get Product Reviews

```http
GET /api/v1/review/product/:productId
```

**Query Parameters:**

```
?page=1&limit=10&sortBy=createdAt&sortOrder=desc
```

---

### 5.3 Update Review

```http
PUT /api/v1/review/:id
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**JSON Body:**

```json
{
  "rating": 5,
  "comment": "Updated: Best product ever! Changed my mind after using it more."
}
```

---

### 5.4 Delete Review (Own or Admin)

```http
DELETE /api/v1/review/:id
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

### 5.5 Admin Approve Review

```http
PUT /api/v1/review/:id/approve
Authorization: Bearer YOUR_ADMIN_ACCESS_TOKEN
```

---

### 5.6 Admin Unpublish Review

```http
PUT /api/v1/review/:id/unpublish
Content-Type: application/json
Authorization: Bearer YOUR_ADMIN_ACCESS_TOKEN
```

**JSON Body:**

```json
{
  "reason": "Inappropriate content or spam"
}
```

---

## 👍 6. VOTE ENDPOINTS

### 6.1 Upvote Review

```http
POST /api/v1/votes/upvote
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**JSON Body:**

```json
{
  "review": "REVIEW_ID_HERE"
}
```

---

### 6.2 Downvote Review

```http
POST /api/v1/votes/downvote
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**JSON Body:**

```json
{
  "review": "REVIEW_ID_HERE"
}
```

---

### 6.3 Remove Vote

```http
DELETE /api/v1/votes/remove/:reviewId
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

### 6.4 Get Vote Counts

```http
GET /api/v1/votes/counts/:reviewId
```

**Response:**

```json
{
  "success": true,
  "data": {
    "upvotes": 15,
    "downvotes": 2,
    "totalVotes": 17
  }
}
```

---

### 6.5 Get User's Vote

```http
GET /api/v1/votes/user-vote/:reviewId
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## 💬 7. COMMENT ENDPOINTS

### 7.1 Create Comment

```http
POST /api/v1/comments
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**JSON Body (Top-level comment):**

```json
{
  "review": "REVIEW_ID_HERE",
  "content": "Great review! Very helpful information. Thanks for sharing!"
}
```

**JSON Body (Reply to comment):**

```json
{
  "review": "REVIEW_ID_HERE",
  "content": "I agree with your point!",
  "parentComment": "PARENT_COMMENT_ID"
}
```

---

### 7.2 Get Review Comments

```http
GET /api/v1/comments/review/:reviewId
```

**Query Parameters:**

```
?page=1&limit=20
```

---

### 7.3 Get Comment Replies

```http
GET /api/v1/comments/:commentId/replies
```

---

### 7.4 Update Comment

```http
PUT /api/v1/comments/:id
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**JSON Body:**

```json
{
  "content": "Updated comment text"
}
```

---

### 7.5 Delete Comment (Soft Delete)

```http
DELETE /api/v1/comments/:id
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

### 7.6 Hard Delete Comment (Admin Only)

```http
DELETE /api/v1/comments/:id/hard
Authorization: Bearer YOUR_ADMIN_ACCESS_TOKEN
```

---

## 🏥 8. HEALTH CHECK

### 8.1 Health Check

```http
GET /api/v1/health
```

**Response:**

```json
{
  "success": true,
  "message": "TrustEdge API is running",
  "data": {
    "status": "healthy",
    "database": "connected",
    "timestamp": "2025-11-10T..."
  }
}
```

---

## 📝 POSTMAN COLLECTION SETUP

### Step 1: Create Environment Variables

```
base_url = https://trustedge-backend.vercel.app/api/v1
access_token = (will be set after login)
category_id = (will be set after creating category)
product_id = (will be set after creating product)
review_id = (will be set after creating review)
```

### Step 2: Test Flow (Order matters!)

1. **Register Admin:**

   ```
   POST {{base_url}}/auth/register
   Body: Admin registration JSON
   ```

2. **Login:**

   ```
   POST {{base_url}}/auth/login
   Save: accessToken to environment variable
   ```

3. **Create Category:**

   ```
   POST {{base_url}}/category
   Header: Authorization: Bearer {{access_token}}
   Body: Category JSON
   Save: category _id to environment variable
   ```

4. **Create Product:**

   ```
   POST {{base_url}}/products
   Header: Authorization: Bearer {{access_token}}
   Body: Product JSON (use {{category_id}} in category field)
   Save: product _id to environment variable
   ```

5. **Register Normal User:**

   ```
   POST {{base_url}}/auth/register
   Body: User registration JSON
   ```

6. **Login as User:**

   ```
   POST {{base_url}}/auth/login
   Update: access_token
   ```

7. **Create Review:**

   ```
   POST {{base_url}}/review
   Header: Authorization: Bearer {{access_token}}
   Body: Review JSON (use {{product_id}})
   ```

8. **Test All Endpoints!**

---

## 🔑 QUICK START GUIDE

### 1. Create Admin (First Time)

```json
POST /api/v1/auth/register
{
  "name": "Admin",
  "email": "admin@trustedge.com",
  "password": "Admin123!",
  "role": "admin",
  "phone": "01712345678",
  "address": "Dhaka"
}
```

### 2. Login & Get Token

```json
POST /api/v1/auth/login
{
  "email": "admin@trustedge.com",
  "password": "Admin123!"
}
```

**Copy the `accessToken` from response**

### 3. Create Category

```json
POST /api/v1/category
Headers: Authorization: Bearer YOUR_TOKEN
{
  "name": "Electronics",
  "description": "Electronic devices",
  "image": "https://images.unsplash.com/photo-1498049794561-7780e7231661"
}
```

**Copy the `_id` from response**

### 4. Create Product

```json
POST /api/v1/products
Headers: Authorization: Bearer YOUR_TOKEN
{
  "name": "iPhone 15 Pro",
  "description": "Latest iPhone",
  "price": 139999,
  "category": "PASTE_CATEGORY_ID_HERE",
  "brand": "Apple",
  "stock": 50,
  "images": ["https://images.unsplash.com/photo-1696446702183-cbd49b3a42c5"],
  "tags": ["smartphone", "apple"],
  "featured": true
}
```

### 5. Test Get Products

```
GET /api/v1/products
```

**You should see your product!** 🎉

---

**Save this file for reference!** 📚
