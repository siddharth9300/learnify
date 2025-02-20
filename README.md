# 🚀 Learnify - Online Learning Platform  

Learnify is a modern and comprehensive online learning platform designed for students, instructors, and administrators. It offers a seamless and interactive learning experience with powerful features.  

---

## 🌟 Features  

- 🔐 **User Authentication** – Secure JWT-based login & registration  
- 📚 **Course Management** – Instructors can create, update, and delete courses  
- 🎥 **Lecture Management** – Add video lectures for students  
- 👥 **User Roles**:  
  - **Admin** – Manages users & platform settings  
  - **Instructor** – Creates & manages courses  
  - **Student** – Enrolls in & views courses  
- 📝 **Enrollment System** – Students can enroll & unenroll from courses  
- 📊 **Dashboard** – Personalized insights & activity tracking  
- 🔄 **Profile Management** – Users can update their profiles  
- 🎨 **Responsive Design** – Works across all devices  
- 👤 **User Management** – Admins can manage users  
- 🔑 **Password Management** – Users can change passwords securely  

---

## 🛠️ Technologies Used  

### **Frontend (React.js)**  
- ⚛️ **React** – Component-based UI development  
- 🚀 **React Router** – Client-side navigation  
- 🌐 **Axios** – API calls  
- 🔥 **React Hot Toast** – Notifications  
- 🎨 **Tailwind CSS** – Styling  
- 🎭 **React Icons** – Icon sets  

### **Backend (Node.js + Express)**  
- 🖥️ **Node.js** – JavaScript runtime  
- 🌍 **Express.js** – Backend framework  
- 🗃️ **Mongoose** – MongoDB modeling  
- 🔒 **bcryptjs** – Password hashing  
- 🔑 **jsonwebtoken (JWT)** – Authentication  
- 📦 **multer** – File uploads  
- ⚙️ **dotenv** – Environment variables   

### **Database**  
- 🏢 **MongoDB** – NoSQL database  

---

## 🚀 Setup Instructions  

### 🔧 **Prerequisites**  
- Install **Node.js** & **npm**  
- Install & run **MongoDB**  

### 🎯 **Backend Setup**  

1. Navigate to the `backend` directory:  
    ```bash
    cd backend
    ```

2. Install dependencies:  
    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:  
    ```env
    MONGO_URI=<Your MongoDB Connection URI>
    JWT_SECRET=<Your JWT Secret Key>
    ADMIN_TOKEN=your_admin_access_token  
    PORT=5000
    ```

4. Run the backend server:  
    ```bash
    npm start
    ```

### 🎨 **Frontend Setup**  

1. Navigate to the `frontend` directory:  
    ```bash
    cd frontend
    ```

2. Install dependencies:  
    ```bash
    npm install
    ```

3. Run the frontend application:  
    ```bash
    npm run dev
    ```

---

## 🔗 API Endpoints  

### **User Routes**  
- `POST /api/users/register` – Register a new user  
- `POST /api/users/login` – Login  
- `GET /api/users/profile` – Get logged-in user profile  
- `GET /api/users/:userId` – Get user by ID  
- `PUT /api/users/:userId` – Update user  
- `DELETE /api/users/:userId` – Delete user  
- `PUT /api/users/change-password/:userId` – Change password  

### **Course Routes**  
- `GET /api/courses` – Get all courses  
- `POST /api/courses` – Create a course *(Instructor only)*  
- `PUT /api/courses/:courseId` – Update a course *(Instructor only)*  
- `DELETE /api/courses/:courseId` – Delete a course *(Instructor only)*  
- `POST /api/courses/enroll` – Enroll in a course *(Student only)*  
- `POST /api/courses/unenroll` – Unenroll from a course *(Student only)*  
- `GET /api/courses/:courseId/lectures` – Get lectures *(Protected)*  
- `POST /api/courses/:courseId/lectures` – Add a lecture *(Instructor only)*  

### **Dashboard Routes**  
- `GET /api/dashboard` – Get dashboard data *(Protected)*  


🔗 **Follow & Star the Repository if you found it useful!** ⭐
