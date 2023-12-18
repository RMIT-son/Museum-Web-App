# Museum-Web-App 
## Project Description
MERN Stack Museum Web Application Project for BITS (Building IT Systems) - COSC2634 at RMIT University 

## Project Folder Structure
```
project-root/  
|-- client/  
|   |-- public/  
|   |   |-- index.html  
|   |-- src/  
|   |   |-- assets/  
|   |   |-- components/  
|   |   |-- pages/  
|   |   |-- services/  
|   |   |-- styles/  
|   |   |-- App.js
|   |   |-- app.js
|   |   |-- ...
|-- server/  
|   |-- controllers/  
|   |-- middleware/  
|   |-- models/  
|   |-- routers/  
|   |-- services/  
|   |-- app.js
|-- tests/  
|   |-- client/  
|   |   |-- ... (client-side tests)
|   |-- server/  
|   |   |-- ... (server-side tests)
|-- config/  
|   |-- config.js (configuration files)
|-- scripts/  
|   |-- deployment.js
|-- package.json  
|-- .gitignore  
|-- README.md  
```

## Installation

Follow these steps to install and run the project locally:

1. Clone the repository: `git clone <repository_url>`
2. Navigate to the project directory: `cd <project_directory>`
3. Install the necessary dependencies: `npm install`
4. Create a `.env` file in the root directory of the project and add the following environment variables:

```properties
MONGODB_URI=mongodb+srv://root:pwd12345@museum-app.pxby5he.mongodb.net/?retryWrites=true&w=majority
PORT=3000

SECRET=a long, randomly-generated string stored in env
BASEURL=http://localhost:3000
CLIENTID=GOUFIF6HOuo8CWKc32YTJ9wYdic5d5zR
ISSUER=https://dev-dathoangquoc.jp.auth0.com
```

Replace `<username>`, `<password>`, and `<dbname>` with your MongoDB username, password, and database name respectively. TOKEN_SECRET should be a secret string used to sign JSON Web Tokens, and PORT is the port number your server will run on.  

5. Run the project: `npm start`

## Usage


## Group Members
1. [Member 1]()
2. [Member 2]()
3. [Member 3]()
4. [Member 4]()
5. [Member 5]()
6. [Member 6]()
7. [Member 7]()
