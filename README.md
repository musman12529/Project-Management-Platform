# Project README

## Repo Layout

This repository is organized into the following directories and files:

- **backend/**: Contains all the backend code for the application.
  - **server.js**: The main server file that initializes the application and connects to the MongoDB database.
  - **routes/**: Contains the route files for the various task-related endpoints.
    - **taskRoutes.js**: Handles task-related routes such as creating, updating, deleting, and fetching tasks.
  - **models/**: Contains the Mongoose schema for the `Task` model.
    - **task.js**: Defines the schema for the tasks stored in the MongoDB database.
  - **tests/**: Contains all unit and integration tests for the application.
    - **test.js**: Contains tests for the task routes and functionality.


## Architecture of the JavaScript Code Files

- **Server Initialization**: The `server.js` file sets up the Express application and connects it to a MongoDB database.
- **Task Routes**: The routes for task-related operations are defined in `taskRoutes.js`, which handles HTTP requests for tasks (such as getting tasks, creating tasks, etc.).
- **Task Model**: The `task.js` model defines the MongoDB schema for tasks, including fields for title, description, dueDate, status, and a history of task changes.
- **Unit Tests**: The tests in `test.js` are used to validate the functionality of the task-related routes and ensure that the server operates correctly under different conditions.


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

  

  ## Setting Up and Running the Server

To run the server for testing, follow these steps:

1. Ensure MongoDB is running on your local machine. The server connects to MongoDB using the URI `mongodb://localhost:27017/project3100`.
2. Start the server:
   ```bash
   node server.js

3. The server will run on http://localhost:3000.


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
