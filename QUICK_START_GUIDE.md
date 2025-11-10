# 🚀 QUICK START - Data Creation Guide

## Step-by-Step: পুরো Data Create করো

### ✅ Step 1: Register Admin

**Endpoint:** `POST /api/v1/auth/register`

**JSON:**

```json
{
  "name": "Admin User",
  "email": "admin@trustedge.com",
  "password": "Admin123!",
  "role": "admin",
  "phone": "01712345678",
  "address": "Dhaka, Bangladesh"
}
```

**Response থেকে copy করো:** Nothing (just verify success)

---

### ✅ Step 2: Login as Admin

**Endpoint:** `POST /api/v1/auth/login`

**JSON:**

```json
{
  "email": "admin@trustedge.com",
  "password": "Admin123!"
}
```

**Response থেকে copy করো:** `accessToken`

**Example Response:**

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**⚠️ Important:** এই `accessToken` সব Admin endpoints এ use করতে হবে!

---

### ✅ Step 3: Create Categories (4টা create করো)

**Endpoint:** `POST /api/v1/category`

**Headers:**

```
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
Content-Type: application/json
```

#### Category 1: Electronics

```json
{
  "name": "Electronics",
  "description": "Electronic devices, gadgets, and accessories",
  "image": "https://images.unsplash.com/photo-1498049794561-7780e7231661"
}
```

**Response থেকে `_id` copy করো** → এটা products এ লাগবে

#### Category 2: Clothing

```json
{
  "name": "Clothing",
  "description": "Fashion and apparel for men and women",
  "image": "https://images.unsplash.com/photo-1445205170230-053b83016050"
}
```

#### Category 3: Books

```json
{
  "name": "Books",
  "description": "Books, novels, and educational materials",
  "image": "https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
}
```

#### Category 4: Home & Kitchen

```json
{
  "name": "Home & Kitchen",
  "description": "Home appliances and kitchen essentials",
  "image": "https://images.unsplash.com/photo-1556912173-3bb406ef7e77"
}
```

---

### ✅ Step 4: Create Products (5-10টা create করো)

**Endpoint:** `POST /api/v1/products`

**Headers:**

```
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
Content-Type: application/json
```

**⚠️ Important:** `category` field এ Step 3 থেকে copy করা `_id` paste করো!

#### Product 1: iPhone

```json
{
  "name": "iPhone 15 Pro Max",
  "description": "Latest Apple flagship smartphone with A17 Pro chip, titanium design, and advanced camera system. Features Dynamic Island, Always-On display, and exceptional battery life.",
  "price": 139999,
  "category": "PASTE_ELECTRONICS_CATEGORY_ID_HERE",
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
    "battery": "4422mAh",
    "os": "iOS 17"
  },
  "tags": ["smartphone", "apple", "5g", "flagship"],
  "featured": true
}
```

#### Product 2: MacBook Pro

```json
{
  "name": "MacBook Pro 14 M3",
  "description": "Professional laptop with M3 chip, stunning Liquid Retina XDR display, and all-day battery life. Perfect for developers and creators.",
  "price": 249999,
  "category": "PASTE_ELECTRONICS_CATEGORY_ID_HERE",
  "brand": "Apple",
  "stock": 30,
  "images": ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8"],
  "specifications": {
    "processor": "Apple M3 Pro",
    "ram": "16GB",
    "storage": "512GB SSD",
    "display": "14.2 inch Liquid Retina XDR",
    "graphics": "18-core GPU",
    "ports": "3x Thunderbolt 4, HDMI, SD Card"
  },
  "tags": ["laptop", "macbook", "professional", "developer"],
  "featured": true
}
```

#### Product 3: AirPods Pro

```json
{
  "name": "AirPods Pro (2nd Generation)",
  "description": "Premium wireless earbuds with active noise cancellation, transparency mode, and spatial audio. Includes USB-C charging case.",
  "price": 24999,
  "category": "PASTE_ELECTRONICS_CATEGORY_ID_HERE",
  "brand": "Apple",
  "stock": 100,
  "images": ["https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7"],
  "specifications": {
    "connectivity": "Bluetooth 5.3",
    "battery": "Up to 6 hours",
    "features": "Active Noise Cancellation, Transparency Mode",
    "waterproof": "IPX4"
  },
  "tags": ["earbuds", "wireless", "anc"],
  "featured": false
}
```

#### Product 4: T-Shirt

```json
{
  "name": "Premium Cotton T-Shirt",
  "description": "100% organic cotton t-shirt with comfortable fit. Breathable fabric perfect for daily wear. Available in multiple colors.",
  "price": 1299,
  "category": "PASTE_CLOTHING_CATEGORY_ID_HERE",
  "brand": "Ecstasy",
  "stock": 150,
  "images": ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"],
  "specifications": {
    "material": "100% Organic Cotton",
    "sizes": "S, M, L, XL, XXL",
    "colors": "Black, White, Navy, Gray",
    "care": "Machine washable"
  },
  "tags": ["tshirt", "casual", "cotton", "basics"],
  "featured": false
}
```

#### Product 5: Jeans

```json
{
  "name": "Slim Fit Denim Jeans",
  "description": "Classic slim fit jeans made from premium denim. Comfortable stretch fabric with modern styling.",
  "price": 2499,
  "category": "PASTE_CLOTHING_CATEGORY_ID_HERE",
  "brand": "Levi's",
  "stock": 80,
  "images": ["https://images.unsplash.com/photo-1542272604-787c3835535d"],
  "specifications": {
    "material": "98% Cotton, 2% Elastane",
    "fit": "Slim Fit",
    "sizes": "28, 30, 32, 34, 36, 38",
    "colors": "Blue, Black"
  },
  "tags": ["jeans", "denim", "casual"],
  "featured": false
}
```

#### Product 6: Clean Code Book

```json
{
  "name": "Clean Code: A Handbook of Agile Software Craftsmanship",
  "description": "Essential programming book by Robert C. Martin. Learn best practices for writing clean, maintainable code.",
  "price": 2500,
  "category": "PASTE_BOOKS_CATEGORY_ID_HERE",
  "brand": "Prentice Hall",
  "stock": 40,
  "images": ["https://images.unsplash.com/photo-1544947950-fa07a98d237f"],
  "specifications": {
    "author": "Robert C. Martin",
    "pages": "464",
    "language": "English",
    "publisher": "Prentice Hall",
    "isbn": "978-0132350884",
    "format": "Paperback"
  },
  "tags": ["programming", "software", "coding", "best-practices"],
  "featured": true
}
```

#### Product 7: Air Fryer

```json
{
  "name": "Digital Air Fryer 5.5L",
  "description": "Cook healthy meals with 85% less oil. Digital touchscreen, 8 preset programs, and easy-to-clean non-stick basket.",
  "price": 8999,
  "category": "PASTE_HOME_KITCHEN_CATEGORY_ID_HERE",
  "brand": "Philips",
  "stock": 60,
  "images": ["https://images.unsplash.com/photo-1585515320310-259814833e62"],
  "specifications": {
    "capacity": "5.5 Liters",
    "power": "1500W",
    "temperature": "80-200°C",
    "programs": "8 Preset Programs",
    "timer": "60 Minutes"
  },
  "tags": ["air-fryer", "kitchen", "healthy-cooking"],
  "featured": true
}
```

---

### ✅ Step 5: Register Normal Users (2-3টা create করো)

**Endpoint:** `POST /api/v1/auth/register`

**⚠️ No Authorization header needed!**

#### User 1:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123!",
  "phone": "01798765432",
  "address": "Mirpur, Dhaka"
}
```

#### User 2:

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "Password123!",
  "phone": "01712345678",
  "address": "Dhanmondi, Dhaka"
}
```

#### User 3:

```json
{
  "name": "Bob Wilson",
  "email": "bob@example.com",
  "password": "Password123!",
  "phone": "01687654321",
  "address": "Gulshan, Dhaka"
}
```

---

### ✅ Step 6: Login as Normal User

**Endpoint:** `POST /api/v1/auth/login`

```json
{
  "email": "john@example.com",
  "password": "Password123!"
}
```

**Response থেকে নতুন `accessToken` copy করো** (user token)

---

### ✅ Step 7: Create Reviews (3-5টা different products এ)

**Endpoint:** `POST /api/v1/review`

**Headers:**

```
Authorization: Bearer USER_ACCESS_TOKEN_HERE
Content-Type: application/json
```

**⚠️ Important:** `product` field এ আগে create করা product এর `_id` paste করো!

#### Review 1: iPhone Review

```json
{
  "product": "PASTE_IPHONE_PRODUCT_ID_HERE",
  "rating": 5,
  "comment": "Excellent phone! The camera quality is outstanding and battery life is amazing. Best iPhone ever made. Highly recommended for anyone looking for a premium smartphone.",
  "images": ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e"]
}
```

#### Review 2: MacBook Review

```json
{
  "product": "PASTE_MACBOOK_PRODUCT_ID_HERE",
  "rating": 5,
  "comment": "Perfect laptop for development work. M3 chip is incredibly fast and the display is gorgeous. Battery lasts all day. Worth every penny!"
}
```

#### Review 3: AirPods Review

```json
{
  "product": "PASTE_AIRPODS_PRODUCT_ID_HERE",
  "rating": 4,
  "comment": "Great sound quality and noise cancellation works well. Slightly expensive but Apple quality is there. Would recommend!"
}
```

#### Review 4: T-Shirt Review

```json
{
  "product": "PASTE_TSHIRT_PRODUCT_ID_HERE",
  "rating": 4,
  "comment": "Good quality cotton. Fits well and comfortable. Price is reasonable. Will buy more colors."
}
```

#### Review 5: Air Fryer Review

```json
{
  "product": "PASTE_AIRFRYER_PRODUCT_ID_HERE",
  "rating": 5,
  "comment": "Life changing! Cooking healthy meals is so easy now. Easy to use and clean. Highly recommended for health-conscious people."
}
```

**Response থেকে review `_id` copy করো** → voting/comments এ লাগবে

---

### ✅ Step 8: Vote on Reviews (Optional)

**Upvote:**

```
POST /api/v1/votes/upvote
Headers: Authorization: Bearer USER_TOKEN
```

```json
{
  "review": "PASTE_REVIEW_ID_HERE"
}
```

**Downvote:**

```
POST /api/v1/votes/downvote
```

```json
{
  "review": "PASTE_REVIEW_ID_HERE"
}
```

---

### ✅ Step 9: Add Comments (Optional)

**Create Comment:**

```
POST /api/v1/comments
Headers: Authorization: Bearer USER_TOKEN
```

**Top-level comment:**

```json
{
  "review": "PASTE_REVIEW_ID_HERE",
  "content": "Great review! Very helpful. Thanks for sharing your experience!"
}
```

**Reply to comment:**

```json
{
  "review": "PASTE_REVIEW_ID_HERE",
  "content": "I agree! This product is amazing.",
  "parentComment": "PASTE_PARENT_COMMENT_ID"
}
```

---

## 🎉 সব শেষ! এখন Test করো:

### ✅ Get All Products:

```
GET /api/v1/products
```

### ✅ Get Categories:

```
GET /api/v1/category
```

### ✅ Get Featured Products:

```
GET /api/v1/products?featured=true
```

### ✅ Search Products:

```
GET /api/v1/products?search=iphone
```

### ✅ Get Product with Reviews:

```
GET /api/v1/products/PRODUCT_ID
```

---

## 📊 Summary - কী কী Create করলে:

```
✅ 1 Admin User
✅ 3 Normal Users
✅ 4 Categories (Electronics, Clothing, Books, Home & Kitchen)
✅ 7 Products (iPhone, MacBook, AirPods, T-Shirt, Jeans, Book, Air Fryer)
✅ 5 Reviews
✅ (Optional) Votes & Comments
```

---

## 🚀 এখন Live Site এ Data দেখতে পারবে!

```
https://trustedge-backend.vercel.app/api/v1/products
https://trustedge-backend.vercel.app/api/v1/category
```

**সব data populate হয়ে যাবে!** 🎊
