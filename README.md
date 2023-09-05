# Kanban_Board_Task_Management

Kanban board is inspired by platforms like Trello for task management.
This application should seamlessly allow users to manage tasks among different stages of completion.

# ⭐Project Overview :- 

## 1) 💻Application Interface :- 
### Desktop screen:- 

<div align="center">
    <img src="https://github.com/Hemantk1234/Kanban_Board_Task_Management/assets/125623888/54435d7d-e271-4eb0-931d-c75cc7898661" width="400px style="margin-right: 5px;"</img>
    <img src="https://github.com/Hemantk1234/Kanban_Board_Task_Management/assets/125623888/22c436cd-1fae-4631-8918-b9d45f193431" width="400px style="margin-right: 5px;"</img>
    <img src="https://github.com/Hemantk1234/Kanban_Board_Task_Management/assets/125623888/c1235719-c2e1-4038-9efa-036fa0f39d83" width="400px style="margin-right: 5px;"</img>
    <img src="https://github.com/Hemantk1234/Kanban_Board_Task_Management/assets/125623888/ceafc3a5-2b68-4c8b-99b8-a4490bea8839" width="400px style="margin-right: 5px;"</img>
    <img src="https://github.com/Hemantk1234/Kanban_Board_Task_Management/assets/125623888/cf0f5be9-7cc2-4fb4-b93b-c250b00a8d60" width="400px style="margin-right: 5px;"</img>
</div>

### Mobile Screen:- 
<div align="center">
    <img src="https://github.com/Hemantk1234/Kanban_Board_Task_Management/assets/125623888/df888989-ed26-4246-a9bb-57de758c04a1" width="260px style="margin-right: 5px;"</img>
    <img src="https://github.com/Hemantk1234/Kanban_Board_Task_Management/assets/125623888/5dd0aaf6-11e3-46b1-8887-a5d62a2af6f7" width="260px style="margin-right: 5px;"</img>
    <img src="https://github.com/Hemantk1234/Kanban_Board_Task_Management/assets/125623888/ff4f8472-c1f6-4062-86ce-6e1d52450efc" width="260px style="margin-right: 5px;"</img>
</div>

## 2) 🔗 Live Demo :- 
A live URL to view and test the application [Kanban_Board_Task_Management](https://kanban-task-management-board.netlify.app/).

## 3) 💁‍♂️Getting Started :- 
To set up a local copy of this project, follow these instructions:

- Clone this repository:

```shell
   git clone https://github.com/Hemantk1234/Kanban_Board_Task_Management.git
```

### Client Deployment :- 
The client side of this project is built using React and is deployed on Netlify. To deploy the client, follow these steps:-

- Navigate to `client` directory
```shell
   cd client
```
- Install dependencies :- 
```shell
    npm install
```
- Build the project :-
```shell
    npm run build
```

- Deploy to Netlify :-
- Create an account on Netlify.
- Connect your GitHub repository to Netlify.
- Configure the build settings in the Netlify dashboard.
- Deploy the site.

### Server Deployment :- 
The server side of this project uses MongoDB Atlas for the database and is hosted on Render.com. To deploy the server, follow these steps :-

- Create a MongoDB Atlas cluster and obtain your connection string.
- Set up your environment variables:-
- Create a `.env` file in the `server` directory and store your secrets key there.
```js
    PORT=5000
    MONGODB_URL=<your_mongodb_url>
    PASSWORD_SECRET_KEY=<your_password_secret_key>
    TOKEN_SECRET_KEY=<your_token_secret_key>
```
- Note:- Make sure to include `.env` in your `.gitignore` file to avoid exposing it in your version control.

- Navigate to the `server` directory :-
```shell
   cd server
```
- Install dependencies :- 
```shell
    npm install
```
- Start the server :-
```shell
    npm start
```

## 4) 🤝Follow Me:

> [LinkedIn](https://www.linkedin.com/in/hemant-kumbhalkar-87393b235/)

I hope you like the project. Thank you for reading 👍:)
