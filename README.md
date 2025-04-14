# BlogMS - Blog Management System 


## Project Overview

BlogMS is a Blog Management System backend built with Node.js and Express. It provides core functionality for managing blog posts, user authentication, comments, images etc.

## Implemented Features

### 1. User Authentication
- User registration with username, email, and password
- User login with JWT token generation
- Protected routes using JWT authentication

### 2. Blog Post Management
- Create new blog posts
- Get all posts or single post
- Update existing posts
- Delete posts
- Image upload for posts (single image per post)

### 3. Comments System
- Add comments to posts
- View all comments for a post
- Delete comments (only by comment author)

### 4. API Documentation
- Complete Swagger UI documentation
- Interactive API testing interface

## Technology Stack

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: SQLite with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **File Uploads**: Multer
- **API Documentation**: Swagger UI

### Development Tools
- **Package Manager**: npm
- **Environment Management**: dotenv
- **Process Manager**: nodemon (development)

## API Documentation

Access Swagger UI when server is running:
`http://localhost:3000/api-docs`

### API Endpoints

###  Authentication

| Method | Endpoint           | Description                | Auth Required |
|--------|--------------------|----------------------------|---------------|
| POST   | `/auth/register`   | Register a new user        | No            |
| POST   | `/auth/login`      | Login existing user        | No            |

###  Blog Posts

| Method | Endpoint         | Description                | Auth Required |
|--------|------------------|----------------------------|---------------|
| POST   | `/posts`         | Create new post            | Yes           |
| GET    | `/posts`         | Get all posts              | No            |
| GET    | `/posts/:id`     | Get single post            | No            |
| PUT    | `/posts/:id`     | Update post                | Yes           |
| DELETE | `/posts/:id`     | Delete post                | Yes           |

###  Comments

| Method | Endpoint                  | Description                | Auth Required |
|--------|---------------------------|----------------------------|---------------|
| POST   | `/comments`               | Create new comment         | Yes           |
| GET    | `/comments/post/:postId`  | Get comments for post      | No            |
| DELETE | `/comments/:id`           | Delete comment             | Yes           |


## Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blogms-backend.git
   cd blogms-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (see below)

4. Start the server:
   ```bash
   npm run dev
   ```

## Running the Project

### Development Mode
```bash
npm run dev
```
- Server runs at `http://localhost:3000`
- Swagger docs at `http://localhost:3000/api-docs`

### Production Mode
```bash
npm start
```

## Environment Variables

Create `.env` file in root directory:

```env
PORT=3000
DB_STORAGE=./database.sqlite
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=30d
```

## Output Screenshots
![Screenshot (30)](https://github.com/user-attachments/assets/0c8251ed-4429-43af-b22a-8a1b9de6ec5a)

![Screenshot (29)](https://github.com/user-attachments/assets/6e254a5d-6a34-4a8b-925c-1f7360baf791)

![Screenshot (27)](https://github.com/user-attachments/assets/a45876d9-cae2-4f1e-a0ff-214703e6e8d3)
![Screenshot (28)](https://github.com/user-attachments/assets/a35a468e-7b46-4464-aa46-68c277a46753)

etc...
