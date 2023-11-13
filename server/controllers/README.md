# Controllers

The `server/controllers` directory contains all the controller functions for the application. Each file in this directory corresponds to a specific entity or feature of the application, such as users, posts, comments, etc.  

Controller functions are responsible for handling HTTP requests from the client, calling the appropriate service functions to perform the necessary business logic, and then sending the response back to the client.  

Each controller function is associated with a specific URL path and HTTP method. For example, a `GET` request to `/users` might be handled by a function in the `userController.js` file that retrieves a list of all users.  

To start the server and make these routes available, use the command `npm start` from the root directory of the project.  