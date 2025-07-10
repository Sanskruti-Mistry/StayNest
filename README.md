# 🏡 StayNest – Airbnb Clone

StayNest is a full-stack web application that mimics core Airbnb functionalities. Users can sign up, log in, explore listings, leave reviews, and securely create or manage their own properties. With Mapbox integration, users can view exact property locations, and Cloudinary ensures efficient image handling.

## 🌟 Features

* 🔐 **User Authentication** using Passport.js
* 🏠 **Add New Listing** with title, description, price, and location
* ✏️ **Edit/Delete Listing** *(Only by the owner who created it)*
* 🧭 **Map Integration** with Mapbox to display locations
* 📷 **Image Uploads** via Multer & Cloudinary
* 💬 **Reviews & Comments** allowed for all logged-in users
* 💡 **Flash Messages** for actions like login, logout, error, etc.
* 🔧 **Modular MVC structure**: Routes, Controllers, Models

---

## 🛠 Tech Stack

| Frontend             | Backend & Database                     | Tools & APIs      |
| -------------------- | -------------------------------------- | ----------------- |
| HTML, CSS, Bootstrap | Node.js, Express.js, MongoDB, Mongoose | Mapbox            |
| EJS Templating       | Passport.js (Auth), Multer, Joi        | Cloudinary, Axios |
|                      | connect-mongo, dotenv, cookie-parser   |                   |

---

## 📁 Project Structure

```
StayNest/
├── models/             # Mongoose Schemas
├── routes/             # Express Route Handlers
├── controllers/        # Route Logic (Modularized)
├── views/              # EJS Templates
├── public/             # Static Assets (CSS, JS, Images)
├── utils/              # Middleware & Helper Functions
├── app.js              # Entry Point
├── .env                # Environment Variables (local)
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Sanskruti-Mistry/StayNest.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
MAPBOX_TOKEN=your_mapbox_token
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
DB_URL=your_mongo_connection_string
SESSION_SECRET=your_session_secret
```

### 4. Run the Application

```bash
nodemon app.js
```

App will run at: `http://localhost:3000`

---

## 🔐 Authorization & Access

* 🔓 **Anyone (with account)** can:

  * View listings
  * Leave a review or comment

* 🔐 **Only Listing Owner** can:

  * Edit or delete their own listings


## 🧠 Future Enhancements

* 🛏 Booking calendar & availability system
* 📌 Advanced search with filters (price range, location, date)
* 📈 Admin dashboard for analytics
* ❤️ Wishlist / Favorites feature

## Screenshots
<img width="1891" height="859" alt="Screenshot 2025-07-10 203601" src="https://github.com/user-attachments/assets/dfcdf348-485d-43f8-bd65-408b0b4575f1" />
