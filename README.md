# Project README

## Video Demonstration
This video demonstrates the successful implementation of the Task Tracker app. You can click on the thumbnail or directly access the video from this Google Drive link:
https://drive.google.com/file/d/1-zc2tc18mOBjRqcWqIgOQd2-lxm6BKFD/view?usp=sharing

[![Task Tracker Video](./frontend/public/taskthumbnail.png)](https://drive.google.com/file/d/1-zc2tc18mOBjRqcWqIgOQd2-lxm6BKFD/view?usp=sharing)

## Repo Layout

This repository is organized into the following directories and files:

**frontend/**: Contains all the frontend code for the application.
  - **node_modules/**: Contains installed dependencies.
  - **.gitignore**: Specifies files and directories ignored by Git.
  - **.env**: Stores environment variables.
  - **pages/**: Contains Next.js pages for the frontend.
  - **components/**: Holds reusable React components.
  - **public/**: Contains static assets like images or fonts.
  - **api/**: Holds API routes for the backend.
  - **utils/**: Contains utility functions used across the project.


**backend/**: Contains all the backend code for the application.
  - **server.js**: The main server file that initializes the application and connects to the MongoDB database.
  - **routes/**: Contains the route files for the various task-related endpoints.
    - **taskRoutes.js**: Handles task-related routes such as creating, updating, deleting, and fetching tasks.
    - **userRoutes.js**: Handles user related routes like login and register.

  - **models/**: Contains the Mongoose schema for the `Task` model.
    - **task.js**: Defines the schema for the tasks stored in the MongoDB database.
    - **User.js**: Defines the schema for the users stored in the MongoDB database.

  - **tests/**: Contains all unit and integration tests for the application.
    - **test.js**: Contains tests for the task routes and functionality.

## Architecture of the Frontend Code Files

### Frontend (Next.js)
- **React Components**: Utilizes React components for building UIs, offering reusable and modular design elements.
- **Next.js**: Employs Next.js for server-side rendering to improve performance and SEO.
- **TypeScript**: Adds type safety to the application, reducing runtime errors and enhancing developer experience.
- **Pages (`frontend/src/app`)**: Contains Next.js pages that render different routes of the application. Each page corresponds to a specific URL and is represented by a React component.
- **Components (`frontend/src/components`)**: Holds reusable React components used across multiple pages, enabling code reuse and consistency.
- **API Routes (`frontend/src/app/api`)**: Contains endpoints facilitating communication between the frontend and backend.


## Architecture of the Backend Code Files
### Backend (Node.js and Express.js)
- **Server Initialization**: The `server.js` file sets up the Express application and connects it to a MongoDB database.
- **Task Routes**: The routes for task-related operations are defined in `taskRoutes.js`, which handles HTTP requests for tasks (such as getting tasks, creating tasks, etc.).
- **User Routes**: The routes for user-related operations are defined in `userRoutes.js`, which handles HTTP requests for users (such as login and registering a user.).
- **Task Model**: The `task.js` model defines the MongoDB schema for tasks, including fields for title, description, dueDate, status, and a history of task changes.
- **User Model**: The `User.js` model defines the MongoDB schema for Users, including fields for username, email and password.
- **Unit Tests**: The tests in `test.js` are used to validate the functionality of the task-related routes and ensure that the server operates correctly under different conditions.

## Project Status

### Working Features
All the features listed below are fully implemented and functional:

#### Core Features
1. **Get All Tasks**: Retrieves all tasks from the database.
2. **Get Task by ID**: Retrieves a task by its ID.
3. **Create a New Task**: Creates a new task and saves it to the database.
4. **Update a Task**: Updates an existing task with new data.
5. **Task History**: Retrieves the history of a task (all changes made to the task over time).
6. **Manage Task History**: Automatically saves changes made to a task in its history whenever it is updated.

#### Additional Features
7. **Register User**: Users can register by entering a username, email, and password.
8. **User Login**: Users can log in to access their tasks.
9. **Delete Task**: Deletes a task by its ID.
10. **Overdue Tasks**: Retrieves tasks that are overdue.

### Summary
- **Status**: All features are fully functional.


## Required Features

### 1. **Get all tasks**
- **HTTP Request**: `GET /api/tasks`
- **Description**: Retrieves all tasks from the database.
- **Unit Test(s)**:
  - `GET /api/tasks` should return a list of all tasks.
  - Tests for a database failure when fetching tasks.
  
### 2. **Get task by ID**
- **HTTP Request**: `GET /api/tasks/:id`
- **Description**: Retrieves a task by its ID.
- **Unit Test(s)**:
  - `GET /api/tasks/:id` should return the task for the given ID.
  - Tests for a 404 error if the task is not found.

### 3. **Create a new task**
- **HTTP Request**: `POST /api/tasks`
- **Description**: Creates a new task and saves it to the database.
- **Unit Test(s)**:
  - `POST /api/tasks` should create a new task and return the task data.
  - Tests for invalid input (e.g., missing title).

### 4. **Update a task**
- **HTTP Request**: `PUT /api/tasks/:id`
- **Description**: Updates an existing task with new data.
- **Unit Test(s)**:
  - `PUT /api/tasks/:id` should update the task and return the updated data.
  - Tests for a 404 error if the task is not found.

### 5. **Task History**
- **HTTP Request**: `GET /api/tasks/history/:id`
- **Description**: Retrieves the history of a task (all changes made to the task over time).
- **Unit Test(s)**:
  - `GET /api/tasks/history/:id` should return the history of the task for the given ID.
  - Tests for a 404 error if the task history is not found.

### 6. **Manage Task History **
- **Description**: Whenever a task is updated via the `PUT` method, the changes are saved in the task's history. The updated task data, along with any changes made, is stored in the history automatically.
- **Unit Test(s)**:
  - `PUT /api/tasks/:id` should save changes made to the task in the history.
  -- `GET /api/tasks/history/:id` should return the history of the task for the given ID.
  - Tests for a 404 error if the task history is not found.



## Additional Features

### 7. **Register user**
- **HTTP Request**: `POST /api/users/register`
- **Description**: User can register by entering username, email and password.
- **Unit Test(s)**:
  - `POST /api/users/register` Tests that api registers a new user successfully
  -  should return 404 if email already in use

### 7. **User Login **
- **HTTP Request**: `POST /api/users/login`
- **Description**: User can login to access their tasks
- **Unit Test(s)**:
  - `POST /api/users/login` Tests that user can login successfully
  -  should return 404 if invalid credentials or email does not exist.

### 7. **Delete Task**
- **HTTP Request**: `DELETE /api/tasks/:id`
- **Description**: Deletes a task by its ID.
- **Unit Test(s)**:
  - `DELETE /api/tasks/:id` Tests that the task is successfully deleted and the correct status is returned.
  -  should return 404 if task not deleted

### 8. **Overdue Tasks**
- **HTTP Request**: `GET /api/tasks/overdue`
- **Description**: Retrieves tasks that are overdue.
- **Unit Test(s)**:
  - `GET /api/tasks/overdue` Tests that overdue tasks are correctly identified based on the `dueDate`.
  -  should return an empty array if no tasks are overdue

  
# Setting Up and Running the Project
### Setting Up and Running the Frontend
To run the Frontend , follow these steps:

1. Download the entire project and navigate to frontend folder.
2. Run the following command to install all required packages:


   ```bash
   npm install

3. For frontend, make a .env file inside frontend directory and include the following in it: NEXTAUTH_URL="http://localhost:3000/" NEXTAUTH_SECRET="abcd1234"


4. Run the following command to start the frontend


   ```bash
   npm run dev

5. The server will run on http://localhost:3000.




### Setting Up and Running the Backend Server

To run the server for testing, follow these steps:

1. Ensure MongoDB is running on your local machine. The server connects to MongoDB using the URI `mongodb://localhost:27017/project3100`.
2. Start the server:
   ```bash
   node server.js

3. The server will run on http://localhost:4000.


## Running Unit Tests

To run the unit tests:

1. Navigate to the **tests/** folder:
   ```bash
   cd tests

2. Run the tests using npm:

    ```bash
    npx jest test.js

### Note you need to be in the tests folder to run the test by using npm test

All tests are working correctly and have been implemented to ensure the proper functionality of the task routes and operations.
