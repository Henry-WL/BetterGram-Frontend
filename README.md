# Project: ChatMe Application

[Visit The App](https://chat-me-7fz3.onrender.com/) (Please allow a few minutes for the server to start, you may have to click logout in the top right, then login as guest)

[Backend Repository](https://github.com/BulletToothTony/chat-app-backend)

## Demo video

https://streamable.com/rnj0br

## Table of Contents
- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Demo Screenshots](#demo-screenshots)
- [Mobile Screenshots](#mobile-screenshots)
- [Contact](#contact)

## About The Project

'ChatMe' is a full stack application allowing users to sign-up and add users to chat to in real-time. The application is fully responsive allowing use on mobile and desktop.

#### Built With

#### - React.js, Tailwind and DaisyUI

## Key Features

#### Authentication and Authorization with JWTs
The ChatMe app implements authentication and authorization using JSON Web Tokens (JWTs). Upon login, the backend auth server issues a JWT, which is stored on the client-side. This token is sent in the request headers for routes that require authentication, ensuring secure access to protected resources.

#### Real-time Chat
Chatting with other users is the one of the key components of the app. After adding a user as a friend the two users can chat to each other in private. Other users will not be able to see their chat.

#### Editing Profile
Users can edit their own profile if they are logged in, changing their username, email and password are all available, all updates are shown in real time. If a user edits their username this will update across their chats.

#### Responsive Design
The app is designed to be responsive across various devices, including desktops, tablets, and smartphones. This ensures optimal usability and accessibility regardless of screen size or device type.

## Demo Screenshots


<img width="1725" alt="Screenshot 2024-05-29 at 15 56 02" src="https://github.com/BulletToothTony/chat-app-frontend/assets/58192857/9fa95685-9832-44cc-b8de-1786b0315142">

<img width="1725" alt="Screenshot 2024-05-29 at 15 58 56" src="https://github.com/BulletToothTony/chat-app-frontend/assets/58192857/0d116541-98a6-43d8-bd72-ae6fdfd24e6b">

<img width="1725" alt="Screenshot 2024-05-29 at 15 55 18" src="https://github.com/BulletToothTony/chat-app-frontend/assets/58192857/ce291c9e-83d4-4e36-b4c1-021123034a57">

<img width="1725" alt="Screenshot 2024-05-29 at 15 56 30" src="https://github.com/BulletToothTony/chat-app-frontend/assets/58192857/57a92dea-d09c-4673-9f77-118f9f3f7ef2">

<img width="1725" alt="Screenshot 2024-05-29 at 15 56 54" src="https://github.com/BulletToothTony/chat-app-frontend/assets/58192857/ca3f713f-3540-4417-bf5b-5dc86730e8fd">

<img width="1725" alt="Screenshot 2024-05-29 at 15 57 15" src="https://github.com/BulletToothTony/chat-app-frontend/assets/58192857/063e4ed3-2e22-48ba-a53c-00ad6312a0f0">

## Mobile Screenshots

<img width="376" alt="Screenshot 2024-05-30 at 22 58 47" src="https://github.com/BulletToothTony/chat-app-frontend/assets/58192857/09cd5e06-0c12-476b-99e9-ef0b316e5183">
<img width="377" alt="Screenshot 2024-05-30 at 22 58 18" src="https://github.com/BulletToothTony/chat-app-frontend/assets/58192857/33cf63d6-1e07-445c-8d5b-b1816b8e9267">

<img width="378" alt="Screenshot 2024-05-30 at 22 59 44" src="https://github.com/BulletToothTony/chat-app-frontend/assets/58192857/abaa73f5-0131-4496-a304-91e3b086f589">
<img width="378" alt="Screenshot 2024-05-30 at 23 00 06" src="https://github.com/BulletToothTony/chat-app-frontend/assets/58192857/be9c1a8d-f97a-409d-bbc8-227ac45bdbcf">


<img width="379" alt="Screenshot 2024-05-30 at 23 00 20" src="https://github.com/BulletToothTony/chat-app-frontend/assets/58192857/5c05ff9f-3027-4fd2-8d8e-62172e2a92fc">
<img width="375" alt="Screenshot 2024-05-30 at 23 00 34" src="https://github.com/BulletToothTony/chat-app-frontend/assets/58192857/7fc08394-080f-4785-97eb-91c1109b3da1">




## Local install and setup

- Clone git repository to your local machine, install dependencies with npm install

- You will need the URL of your backend whether this is being run locally or on a server is up to you

- Create a .env file in the top level of the cloned repo

- Add the following variables to the env file and add the required keys / URLS

  VITE_BACKEND_URL=http://localhost:5001/api

- Run npm start to start the application

## Contact

[LinkedIn](https://www.linkedin.com/in/henry-westhoff-lewis-b18a91196/)



