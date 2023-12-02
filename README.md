<a name="readme-top"></a>

<br />
<div align="center">
  <a href="https://my-food-blog-two.vercel.app/" target='_blank'>
    <img src="./client/assets/images/main-screen.png" alt="main-page-screen" width='900'>
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

[![Next.js][nextjs-badge]][nextjs-url] [![React][react-badge]][react-url] [![Tailwind CSS][tailwind-badge]][tailwind-url] [![TypeScript][typescript-badge]][typescript-url] [![Node.js][nodejs-badge]][nodejs-url] [![Express.js][expressjs-badge]][expressjs-url] [![MongoDB][mongodb-badge]][mongodb-url] [![AWS S3][aws-s3-badge]][aws-s3-url] [![NextAuth.js][nextauthjs-badge]][nextauthjs-url]

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

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[Next.js][nextjs-url]: https://nextjs.org/
[React][react-url]: https://reactjs.org/
[Tailwind CSS][tailwind-url]: https://tailwindcss.com/
[TypeScript][typescript-url]: https://www.typescriptlang.org/
[Node.js][nodejs-url]: https://nodejs.org/
[Express.js][expressjs-url]: https://expressjs.com/
[MongoDB][mongodb-url]: https://www.mongodb.com/
[Mongoose][mongoose-url]: https://mongoosejs.com/
[AWS S3][aws-s3-url]: https://aws.amazon.com/s3/
[NextAuth.js][nextauthjs-url]: https://next-auth.js.org/
[nextjs-badge]: https://img.shields.io/badge/Next.js-20232A?style=for-the-badge&logo=next.js&logoColor=61DAFB
[react-badge]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[tailwind-badge]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[typescript-badge]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[nodejs-badge]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[expressjs-badge]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[mongodb-badge]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[aws-s3-badge]: https://img.shields.io/badge/AWS_S3-569A31?style=for-the-badge&logo=amazon-aws&logoColor=white
[nextauthjs-badge]: https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=next.js&logoColor=61DAFB
