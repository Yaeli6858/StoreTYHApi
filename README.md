#  StoreTYH — Full-Stack E-Commerce API

> A full-stack e-commerce web application for the **TYH Nation** merchandise store, built with a React frontend and a RESTful Node.js/Express API backed by MongoDB. Features JWT-based authentication, role-based access control, and a per-user shopping cart.

---

##  Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Data Models](#data-models)
- [Authentication & Authorization](#authentication--authorization)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Frontend Pages & Routes](#frontend-pages--routes)
- [State Management](#state-management)
- [Product Categories](#product-categories)
- [Security Considerations](#security-considerations)
- [Known Limitations & Future Improvements](#known-limitations--future-improvements)

---

## Overview

StoreTYH is a monorepo project split into two parts:

- **`/server`** — Express.js REST API with MongoDB (Mongoose) and JWT authentication
- **`/client/my-app`** — React SPA consuming the API, using Redux for global state and MUI for UI components

The store sells branded TYH merchandise across four categories: Clothing, Gifts, Accessories ("Schomnces"), and Sport.

---

## Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | LTS | Runtime |
| Express | ^5.1.0 | HTTP framework |
| MongoDB + Mongoose | ^8.15.1 | Database & ODM |
| JSON Web Token (JWT) | ^9.0.2 | Stateless authentication |
| bcrypt | ^6.0.0 | Password hashing |
| dotenv | ^16.5.0 | Environment config |
| cors | ^2.8.5 | Cross-origin requests |
| nodemon | ^3.1.10 | Dev auto-reload |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | ^19.1.0 | UI library |
| React Router DOM | ^7.6.2 | Client-side routing |
| Redux Toolkit | ^2.8.2 | Global state management |
| React Redux | ^9.2.0 | React bindings for Redux |
| MUI (Material UI) | ^7.1.1 | Component library |
| Axios | ^1.10.0 | HTTP client |
| jwt-decode | ^4.0.0 | Decode JWT on client |
| Styled Components | ^6.1.19 | CSS-in-JS styling |
| Emotion | ^11.14.0 | MUI style engine |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (React)                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │ HomePage │  │ Products │  │   Cart   │  │ Auth Pages │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └─────┬──────┘  │
│       └─────────────┴──────────────┴──────────────┘         │
│                      Axios + Redux                           │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP (REST)
                           │ Bearer JWT
┌──────────────────────────▼──────────────────────────────────┐
│                     SERVER (Express)                         │
│                                                              │
│  /api/auth        /api/prod          /api/cart               │
│  ┌──────────┐    ┌──────────┐       ┌──────────┐            │
│  │  Auth    │    │  Prod    │       │  Cart    │            │
│  │ Controller│   │ Controller│      │ Controller│           │
│  └────┬─────┘    └────┬─────┘       └────┬─────┘            │
│       │               │                  │                   │
│  verifyJWT       verifyJWTadmin     verifyJWT                │
│  (for protected   (Admin only)      (All users)              │
│   routes)                                                     │
└──────────────────────────┬──────────────────────────────────┘
                           │ Mongoose ODM
┌──────────────────────────▼──────────────────────────────────┐
│                       MongoDB Atlas                          │
│   Collections:  users  │  products                          │
│   (cart is embedded in the User document)                   │
└─────────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
StoreTYHApi/
├── client/
│   └── my-app/
│       ├── public/
│       │   ├── index.html
│       │   ├── manifest.json
│       │   └── pics/
│       │       ├── Clothing/       # 8 product images
│       │       ├── Gifts/          # 12 product images
│       │       ├── Schomnces/      # 10 accessory images
│       │       └── Sport/          # 7 sport product images
│       └── src/
│           ├── App.js              # Root router
│           ├── index.js            # React entry point
│           ├── index.css
│           ├── components/
│           │   ├── HomePage/
│           │   │   └── HomePage.js
│           │   ├── buttons/
│           │   │   ├── Counter.js          # Qty increment/decrement
│           │   │   └── PasswordField.js    # Show/hide password
│           │   ├── cart/
│           │   │   ├── Cart.js             # Cart page
│           │   │   └── OneProductInCart.js # Single cart item row
│           │   ├── connect/
│           │   │   ├── Login.js
│           │   │   └── Register.js
│           │   ├── products/
│           │   │   ├── AddProduct.js       # Admin: add product
│           │   │   ├── Product.js          # Product card
│           │   │   ├── ProductsPage.js     # Catalog with pagination
│           │   │   ├── SingleProduct.js    # Product detail
│           │   │   └── UpdateProduct.js    # Admin: edit product
│           │   └── shared/
│           │       ├── AvatarButton.js     # User menu / avatar
│           │       ├── Footer.js
│           │       ├── Header.js           # Nav bar
│           │       └── Layout.js           # Page wrapper with Outlet
│           └── redux/
│               ├── store.js
│               └── slices/
│                   └── userSlice.js        # Auth state
│
└── server/
    ├── server.js               # Entry point
    ├── .env                    # Environment variables
    ├── config/
    │   ├── corsOptions.js      # CORS whitelist
    │   └── dbConn.js           # MongoDB connection
    ├── Controllers/
    │   ├── authControl.js      # register, login
    │   ├── prodControl.js      # CRUD products
    │   └── cartControl.js      # Cart operations
    ├── middleWare/
    │   ├── verifyJWT.js        # Auth middleware (any user)
    │   └── verifyJWTadmin.js   # Auth middleware (Admin only)
    ├── models/
    │   ├── User.js             # User schema (with embedded cart)
    │   ├── Products.js         # Product schema
    │   └── Cart.js             # Cart item sub-schema
    └── routes/
        ├── authRoute.js
        ├── productRoute.js
        └── cartRoute.js
```

---

## API Reference

All endpoints are prefixed with `/api`. The server runs on port `7001` by default.

### Auth — `/api/auth`

| Method | Endpoint | Auth | Body | Description |
|--------|----------|------|------|-------------|
| `POST` | `/api/auth/Register` | ❌ Public | `{ userName, password, name, email, phone? }` | Register a new user |
| `POST` | `/api/auth/Login` | ❌ Public | `{ userName, password }` | Login and receive access token |

**Login response:**
```json
{
  "accessToken": "<JWT>"
}
```

The JWT payload includes: `_id`, `name`, `role`, `userName`, `email`.

---

### Products — `/api/prod`

| Method | Endpoint | Auth | Query / Body | Description |
|--------|----------|------|------|-------------|
| `GET` | `/api/prod` | ❌ Public | `?page=1&category=Clothing` | Get paginated products (6 per page) |
| `GET` | `/api/prod/:id` | ❌ Public | — | Get single product by ID |
| `POST` | `/api/prod` | ✅ Admin | `{ name, price, description?, category }` | Add new product |
| `PUT` | `/api/prod` | ✅ Admin | `{ id, name, price, description?, category }` | Update product |
| `DELETE` | `/api/prod` | ✅ Admin | `{ id }` | Delete product |

**GET `/api/prod` response:**
```json
{
  "products": [ { "_id": "...", "name": "...", "price": 0, "category": "...", "description": "..." } ],
  "total": 42
}
```

---

### Cart — `/api/cart`

All cart routes require a valid user JWT (`Bearer <token>`).

| Method | Endpoint | Auth | Body | Description |
|--------|----------|------|------|-------------|
| `GET` | `/api/cart` | ✅ User | — | Get current user's cart |
| `POST` | `/api/cart` | ✅ User | `{ id, qty }` | Add product to cart (or increase qty if exists) |
| `PUT` | `/api/cart` | ✅ User | `{ id, count }` | Update item quantity |
| `DELETE` | `/api/cart` | ✅ User | `{ id }` | Remove item from cart |

> Cart is stored as an **embedded sub-document array** inside the User document — no separate cart collection.

---

## Data Models

### User

```javascript
{
  userName:  String,   // required, unique
  password:  String,   // required, bcrypt-hashed
  name:      String,   // required
  email:     String,   // required
  phone:     String,   // optional
  role:      "User" | "Admin",  // default: "User"
  active:    Boolean,  // default: true (soft-delete capable)
  cart:      [CartItem],        // embedded array
  createdAt: Date,
  updatedAt: Date
}
```

### Product

```javascript
{
  name:        String,  // required
  description: String,
  price:       Number,  // required
  category:    String,  // required (Clothing | Gifts | Schomnces | Sport)
  createdAt:   Date,
  updatedAt:   Date
}
```

### CartItem (embedded in User)

```javascript
{
  prodId:      ObjectId,  // ref: Product
  name:        String,    // required
  count:       Number,    // required, default: 1
  price:       Number,    // required
  description: String,
  category:    String,
  createdAt:   Date,
  updatedAt:   Date
}
```

---

## Authentication & Authorization

The app uses **stateless JWT authentication** — no refresh tokens, no sessions.

```
┌──────────┐     POST /api/auth/Login     ┌──────────────┐
│  Client  │ ──────────────────────────► │    Server    │
│          │ ◄────────────────────────── │              │
│          │     { accessToken: JWT }     │  Signs JWT   │
│          │                             │  with secret │
│  Stores  │                             └──────────────┘
│  token   │
│  in Redux│     Subsequent requests:
│  state   │     Authorization: Bearer <JWT>
└──────────┘
```

**Two middleware layers:**

| Middleware | File | Checks |
|---|---|---|
| `verifyJWT` | `middleWare/verifyJWT.js` | Valid token → any authenticated user |
| `verifyJWTadmin` | `middleWare/verifyJWTadmin.js` | Valid token **+ `role === "Admin"`** |

**Protected routes summary:**
- Cart (all operations) → `verifyJWT`
- Product write operations (POST/PUT/DELETE) → `verifyJWTadmin`
- Product reads (GET) → public

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+
- MongoDB Atlas account (or local MongoDB instance)

### 1. Clone the repository

```bash
git clone https://github.com/Yaeli6858/StoreTYHApi.git
cd StoreTYHApi
```

### 2. Setup the Server

```bash
cd server
npm install
```

Create a `.env` file (see [Environment Variables](#environment-variables)), then:

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The server starts on `http://localhost:7001`.

### 3. Setup the Client

```bash
cd ../client/my-app
npm install
npm start
```

The React dev server starts on `http://localhost:3000`.

---

## Environment Variables

Create a file at `server/.env` with the following:

```env
# MongoDB connection string (Atlas or local)
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>

# JWT secret — use a long, random string in production
ACCESS_TOKEN_SECRET=your_super_secret_jwt_key_here

# Server port (optional, defaults to 7001)
PORT=7001
```

> ⚠️ **Never commit `.env` to version control.** The repository's `.gitignore` already excludes it on the server side.

---

## Frontend Pages & Routes

| Path | Component | Auth Required | Description |
|---|---|---|---|
| `/` | `HomePage` | ❌ | Landing page |
| `/Products` | `ProductsPage` | ❌ | Product catalog with pagination & category filter |
| `/Products/:id` | `SingleProduct` | ❌ | Product detail view |
| `/Cart` | `Cart` | ✅ | User shopping cart |
| `/Login` | `Login` | ❌ | Login form |
| `/Register` | `Register` | ❌ | Registration form |

All routes are wrapped in the `Layout` component (Header + Footer + `<Outlet />`).

---

## State Management

Redux Toolkit is used for global auth state via a single slice:

**`redux/slices/userSlice.js`** manages:
- The logged-in user object (decoded from JWT)
- Login / logout actions

The access token is decoded client-side using `jwt-decode` to extract user info (`_id`, `name`, `role`, `userName`, `email`) and stored in the Redux store. The raw token is sent in the `Authorization` header on every protected API call via Axios.

---

## Product Categories

The store is organized into four categories, each with dedicated product images located in `public/pics/`:

| Category | Slug | Example Products |
|---|---|---|
| Clothing | `Clothing` | Hoodie, Bucket Hat, Yarmulka, Pajamas, Slides |
| Gifts | `Gifts` | School Bag, Travel Mug, Phone Case, Blanket, Apron |
| Accessories | `Schomnces` | Keychain, Bracelet, Stickers, LED Glasses, Air Tag |
| Sport | `Sport` | Yoga Mat, Football, Pickleball Set, Water Bottle |

---

## Security Considerations

The following items should be addressed before deploying to a production environment:

1. **JWT expiration** — The current implementation signs tokens without an `expiresIn` option. Tokens never expire. Add `{ expiresIn: '1d' }` to `jwt.sign()` and implement a refresh token mechanism.

2. **Refresh tokens** — There is no refresh token flow. Implement httpOnly cookie-based refresh tokens for production.

3. **`.env` in repository** — The `server/.env` file is present in the uploaded source. Ensure secrets are rotated and the file is removed from git history.

4. **Input validation** — Controllers check for required fields but do not validate types, lengths, or sanitize inputs. Consider adding `express-validator` or `joi`.

5. **Error handling** — No global error handler is registered. Unhandled promise rejections can crash the server. Wrap async controllers in a try/catch or use a wrapper utility like `express-async-errors`.

6. **Rate limiting** — No rate limiting on auth endpoints. Add `express-rate-limit` to prevent brute-force attacks.

7. **HTTPS** — Ensure the production server runs behind HTTPS (e.g., via a reverse proxy like Nginx or a platform like Railway/Render).

---

## Known Limitations & Future Improvements

| Area | Current State | Suggested Improvement |
|---|---|---|
| Token expiry | No expiration | Add `expiresIn` + refresh token flow |
| Image storage | Static files in `/public` | Migrate to Cloudinary or S3 |
| Cart persistence | Embedded in User doc | Consider a separate Cart collection for scalability |
| Search | Not implemented | Add full-text search with MongoDB Atlas Search |
| Order history | Not implemented | Add an Orders model and checkout flow |
| Email notifications | Not implemented | Add nodemailer for order confirmations |
| Unit tests | None | Add Jest + Supertest for API tests |
| Admin UI | Inline forms in React | Build a dedicated admin dashboard |
| Pagination | Server-side (6/page) | Add infinite scroll or more flexible page sizes |

---

## License

This project is a student project for the TYH Nation merchandise store. All rights reserved by the author.

---

*Built  by [Yaeli6858](https://github.com/Yaeli6858)*
