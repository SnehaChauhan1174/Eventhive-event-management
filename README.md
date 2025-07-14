# 🎉 EventHive

EventHive is a full-featured event management web application designed to simplify the process of organizing, discovering, and participating in events. Whether you're a host planning a conference, concert, or workshop—or a user looking for events to attend—EventHive provides a smooth and intuitive experience for all.

Users can browse through a list of upcoming events, register or pay for participation, write reviews, and even create their own events with images and details. The platform is secured with robust authentication and features seamless integration with Razorpay for handling payments.

Built using the MERN-style architecture (MongoDB, Express.js, Node.js) along with EJS templating, EventHive is ideal for learning full-stack development and showcasing your skills with real-world features like authentication, RESTful routing, and secure payments.

Deployed on Render:
https://eventhive-arsz.onrender.com
---

## 📁 Project Structure

| Folder          | Description                                             |
| --------------- | ------------------------------------------------------- |
| `controllers/`  | Route handlers for events, users, reviews, etc.         |
| `models/`       | Mongoose schemas for MongoDB collections                |
| `routes/`       | Express routing logic                                   |
| `views/`        | EJS templates for rendering pages                       |
| `public/`       | Static files (CSS, JS, images)                          |
| `uploads/`      | Temporary/local image storage                           |
| `utils/`        | Reusable utility functions  |
| `middleware.js` | Custom middleware (authentication, authorization)       |


---

## 🚀 Features

- 👤 User Authentication (Login/Signup)
- 📅 Create, Edit, View, and Delete Events
- 💳 Razorpay Payment Integration
- 🌐 EJS-based templating for dynamic views
- ⭐ Event Reviews and Ratings
- 🔒 Form validation with Joi
- 📤 File/image upload capability

---

## 🛠️ Tech Stack

- **Frontend**: EJS, HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Payments**: Razorpay
- **Validation**: Joi
- **Authentication**: Passport.js or similar


---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/EventHive.git
cd EventHive
```
### 2. Install Depenedencies
```bash
npm install
```
### 3. Configure environment variables
```bash

DB_URL=your_mongodb_connection_string
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
### 4. Run the app
```bash
node app.js
```


🙌 Acknowledgements
Express.js
MongoDB
Razorpay
Passport.js
Bootstrap

Made by Sneha Chauhan...

