# Project Overview

This semester's project will be implementation of a task-tracking tool as a web application with a server portion and an browser/HTML front end.  The front end should provide both a "list" view of tasks and a kanban-style "board" view of tasks.

This style of tool can be found in your github dashboard by creating a "project" under the projects tab of any repository. These github projects have a list and board view as mentioned above.

A feature to be implemented that github projects does not support is viewing the state of the tasks at any given point in the past.

Your server/application will have to support the following features:

* entering new tasks
* maintaining history of all tasks
* requesting details of a specific task
* updating information of a particular task
* retrieving the task details history (at a specified point in time)
* maintaining history of all tasks
* retrieving details of multiple tasks

Your front-end client will have to support the following features:

* display of tasks in list and board format
* board columns representing state of a task
* ability to move task from one state/column to another state/column
* ability to enter and edit task details

Your application will support additional features of your own choice, such as:

* multiple users logging on to a shared board
* task assignment of users to different tasks
* creation of new status categories (board columns)
* sorting task display by some attributes
* and other features you should come up with

You should also consider any features you may not be able to implement, but would make good extensions to your app: for example, advanced charting and analysis of stock performance.

# Part I (due Oct 8, 2024)

In the project doc folder, create a project proposal called `proposal.md` which will outline your plans for design and implementing the term project.  Do not limit your proposal to things you already know how to do; we have to cover a lot of material in writing web apps in the course.  This plan is preliminary, so we expect it to change and be revised over time as your learn more and come up with additional ideas.

Your proposal should have the following sections:

## Description

One or two paragraphs describing the project overall from the user's perspective and the developer's perspective.

### Screens

Two or more drawings/diagrams showing what the web GUI interface will look like for the users. The drawings should be in a format to be incorporated as an image into the proposal markdown document. Label and explain the images.

## Features

List the features your application will have and those you are suggesting in a table like this:  


|ID |Name|Short Description|Server or Client|
|--|----|---------|---------|
|01|Entering tasks|User creates new task|Both|
|02|Task history|Database maintains all task history|Server|
|...|...|...|...|
|08|board and list display|two types of view|Client|


You should come up with a total 25 or more features, including those provided by these instructions. It's OK to use classmates as a source of feature ideas, but prepare your owb document. And do not forget to **include an attributions document** in your doc folder to acknowledge any substantial help you receive.

Any features that require a lengthy explanation you can add a long description section after the table.

## Implementation

### Tools and packages

List the tools and packages you expect to use. If you expect to need a tool or package that you cannot currently identify, simply describe what you are looking for. Use a bullet list such as this:

* nodejs for server implementation
* mongo database server
* expressjs web app framework

### App API

List the API calls you expect to support with your server and a brief description, for example

1. GET /task?id=*taskid*  
   * respond with the task details for the specified task as a json object
   * 404 if the taskid is invalid 

## Submission

push your doc/proposal.md document to the project repo before the due date expires. Include an attributions document in the project doc folder.







