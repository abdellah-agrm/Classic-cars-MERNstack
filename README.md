# Classic Cars Documentation

Welcome to the documentation for Classic Cars, a web application built with Node.js, Express.js, and React.js. This platform allows users to share information about classic cars, express opinions, and connect with other car enthusiasts. The system includes user authentication, two roles (user and admin), and various features outlined below.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Screen Recording](#screen-recording)
   - [User Home](#user-home)
   - [User Profile](#user-profile)
   - [Admin Dashboard](#admin-dashboard)
4. [Folder Structure](#folder-structure)
5. [Backend Setup](#backend-setup)
6. [Frontend Setup](#frontend-setup)
7. [Authentication](#authentication)
8. [User Role](#user-role)
9. [Admin Dashboard](#admin-dashboard)
   - [Users Page](#users-page)
   - [Collection Page](#collection-page)
   - [Opinions Page](#opinions-page)
   - [Reports Page](#reports-page)
10. [Getting Started](#getting-started)

## Introduction

Classic Cars is designed for car enthusiasts to share information about classic cars. The application implements user authentication, two roles (user and admin), and various features such as adding cars, posting opinions, and reporting issues. The admin dashboard provides insights and tools for managing users, cars, opinions, and reports.

## Features

- User authentication with two roles: user and admin.
- Users can add classic cars pending admin approval.
- User profile management (update information, change profile picture, password, etc.).
- Save favorite cars.
- Post opinions pending admin approval.
- Send reports to admins.
- Admin dashboard with line charts and doughnut charts for statistics.
- Admin pages for managing users, cars, opinions, and reports.

## Screen Recording

### User Home
![Example GIF](previews/home-page.gif)

### User Profile
![Example GIF](previews/profile-page.gif)

### Admin Dashboard
![Example GIF](previews/dashboard-admin.gif)

## Folder Structure

```
classic-cars/
|-- backend/
|   |-- Admin-app/
|   |   |-- Models/
|   |   |-- Routes/
|   |-- Cars-app/
|   |   |-- Models/
|   |   |-- Routes/
|   |-- Favorites/
|   |   |-- Models/
|   |   |-- Routes/
|   |-- Message-app/
|   |   |-- Models/
|   |   |-- Routes/
|   |-- uploads/
|   |   |-- cars/
|   |   |-- profiles/
|   └── User-app/
|       |-- Middleware/
|       |-- Models/
|       └── Routes/
|
|-- frontend/
|   |-- public/
|   |   |-- cars-imgs/
|   |   └── elements-img/
|   └── src/
|       |-- assets/
|       |   |-- css/
|       |   └── fonts/
|       |       └── static/
|       └── Pages/
|           |-- Admin/
|           |   |-- Collection/
|           |   |-- Dashboard/
|           |   |-- Opinions/
|           |   |-- Reports/
|           |   └── Users/
|           |-- NavbarAndFooter/
|           |-- SignPages/
|           └── User/
|               |-- CrudPages/
|               |-- MainHome/
|               └── UsersMenu/
```

## Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create a `.env` file in the root of the backend folder with the following variables:

   ```env
   JWT_SECRET=your-secret-key
   MONGO_URI=mongodb://127.0.0.1:27017/test
   ```

   Replace the placeholder values with your desired configurations.

## Frontend Setup

No additional setup is required for the frontend. It automatically connects to the backend server at `http://localhost:2000`.

## Authentication

Authentication is implemented using JSON Web Tokens (JWT). Users and admins must authenticate to access certain features.

## User Role

Users can add classic cars, manage their profiles, save favorite cars, post opinions, and send reports. All user actions are pending admin approval.

## Admin Dashboard

The Admin Dashboard provides statistical insights and access to manage users, cars, opinions, and reports.

### Users Page

The Users Page displays a table with user details, including a status column (block/unblock), registration date, and actions (block/unblock, delete).

### Collection Page

The Collection Page shows a table of classic cars with details such as model, year, speed, user, creation date, status (pending/approved/rejected), and actions (pending/approve/reject, delete).

### Opinions Page

Similar to the Collection Page, the Opinions Page lists opinions with details and actions.

### Reports Page

The Reports Page provides a table of reported items (users, cars, opinions) with details and actions.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/abdellah-agrm/Classic-cars-MERNstack.git
   cd Classic-cars-MERNstack
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables (see [Backend Setup](#backend-setup)).

4. Start the backend server:

   ```bash
   node index.js
   ```

5. Move to the frontend directory:

   ```bash
   cd frontend
   ```

6. Install frontend dependencies:

   ```bash
   npm install
   ```

7. Start the frontend application:

   ```bash
   npm start
   ```

8. Open your browser and navigate to `http://localhost:2000/sign-up` to access the application.
