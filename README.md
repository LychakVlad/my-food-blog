<a name="readme-top"></a>

<br />
<div align="center">
  <a href="https://my-food-blog-two.vercel.app/" target='_blank'>

https://github.com/LychakVlad/my-food-blog/assets/110523693/b38967b5-480b-4e8b-b22c-ecf00e2199ba

<h3 align="center">My Recipe Blog</h3>
  <p align="center">
A place to store and share your favorite recipes effortlessly.
    <br />
    <a href="https://github.com/LychakVlad/my-food-blog"><strong>Explore the code »</strong></a>
    <br />
    <br />
    <a href="https://my-food-blog-two.vercel.app/">View Demo</a>
  </p>
</div>
<!-- ABOUT THE PROJECT -->

## Overview

My Recipe Blog is a web application built to help users organize and share their favorite recipes. It provides a platform for users to create, edit, and delete recipes, as well as leave ratings and comments on others' recipes. The website is designed with a clean and intuitive interface, making it easy for users to manage their recipes and quickly access them whenever needed from any device.

## Technologies Used

### Frontend

- Next.js
- React
- Tailwind CSS
- TypeScript

### Backend

- Node.js
- Express.js
- MongoDB and Mongoose
- AWS S3

### Authentication

- NextAuth.js

### Form Handling

- React Hook Form

### Hosting

- Vercel (Frontend)
- AWS EC2 (Backend)

## Testing

- End-to-End (E2E) Tests: Core functionality covered with Cypress.
- Unit Tests: React components covered with Jest.

## Features

- Create recipes with multiple inputs using React Hook Form.
- Save recipe photos using AWS S3 and Node.js.
- Edit or delete recipes easily.
- Leave ratings and comments on recipes.
- User authentication to create and save personal recipes.

## AWS S3 Image API

This project includes a small API built with Node.js and Express to manage images stored on AWS S3. The API provides endpoints to store, delete, and request images. This functionality is crucial for handling recipe photos in the My Recipe Blog application.

### Endpoints

#### 1. Upload Image

- **Endpoint:** `/api/images`
- **Method:** `POST`
- **Description:** Uploads an image to AWS S3.

#### 2. Delete Image

- **Endpoint:** `/api/images/:key`
- **Method:** `DELETE`
- **Description:** Deletes an image from AWS S3.

#### 3. Get Image

- **Endpoint:** `/api/images/:key`
- **Method:** `GET`
- **Description:** Retrieves an image from AWS S3.

## Purpose

This website is designed for individuals who are passionate about maintaining a healthy diet and want a convenient place to store and access their favorite recipes. Whether you're a cooking enthusiast or someone trying to adopt a healthier lifestyle, My Recipe Blog simplifies the process of managing and sharing your culinary creations.

## Contact

Vladislav Lychak - [@LinkedIn](https://www.linkedin.com/in/vladislav-lychak/) - lycakvladislav@gmail.com

Project Link: [https://my-food-blog-two.vercel.app/](https://my-food-blog-two.vercel.app/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
