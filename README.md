# EduMastery
A site where you can learn seamlessly.

https://github.com/user-attachments/assets/07788de5-deae-4e10-88b5-ac4d774b4803

## Table of Contents
- [Introduction](#introduction)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)

## Introduction
Edu-mastery-app is a platform designed to provide a seamless learning experience through video content. The application enables users to access educational content efficiently and enjoyably.


## Technologies
The project leverages a modern tech stack to deliver a robust and scalable learning platform:

- **Frontend**
  - TypeScript
  - Next.js
  - Tailwind CSS
  - React

- **Backend**
  - Express.js
  - Node.js
  - PostgreSQL
  - Prisma ORM

- **Authentication**
  - NextAuth
  - Google OAuth

- **Cloud Services**
  - AWS S3 for video and file storage

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (v16 or later)
- npm (v8 or later)
- PostgreSQL database

---

## Installation
To install and set up the project locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/Harbinder04/Edu-mastery-app.git
    ```
2. Navigate to the project directory:
    ```sh
    cd Edu-mastery-app
    ```
---
## Usage
### Frontend Setup
Navigate to the client directory.

Add required .env variables to the respected folders: 

    ```sh
     cd client
     npm install
    ```
    
  ### Environment Configuration for frontend
  Create a `.env` file in the root directory of the client with the following template:
    ```env
     GOOGLE_CLIENT_ID=add google cient id
     GOOGLE_CLIENT_SECRET=goodle client secret
     DATABASE_URL=postgress db url
     NEXTAUTH_URL="http://localhost:3000/"
    ```
  ```sh
  npm run dev
  ```

### Uploader Service

```sh
cd uploaderService
npm install
```
### Environment Configuration for Upload Service
Create a `.env` file in the root directory of the uploaderService with the following template:
```env
   AWS_ACCESS_KEY_ID=bucket_key
   AWS_SECRET_ACCESS_KEY=bucket_secret
   AWS_REGION=region
   AWS_BUCKET_NAME=bucket_name
   PORT=8080
```
### WatchService 

```sh
cd watchService
npm install
```
### Environment Configuration for Watch Service
Create a `.env` file in the root directory of the watchService with the following template:
```env
   AWS_ACCESS_KEY_ID=bucket_key
   AWS_SECRET_ACCESS_KEY=bucket_secret
   AWS_REGION=region
   AWS_BUCKET_NAME=bucket_name
```
### Database - Prisma folder
```sh
cd db
npx prisma generate
```
### Environment Configuration for Database
Create a `.env` file in the root directory of the db with the following template:
```env
  DATABASE_URL=postgres_url
```
