# Task Board

> A one page website where users can add tasks to a kanban board for task management
> Live demo [_here_](https://gaylemcclure.github.io/task-board/).

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Usage](#usage)
* [Contact](#contact)



## General Information
This task board can be used to create and keep track of tasks and their progress. With the data being saved in local storage, you can add tasks, refresh/close the page and when you come back your tasks will be in the same place. 



## Technologies Used
- HTML
- CSS
- Javascript
- jQuery
- jQuery UI
- Bootstrap


## Features
List the ready features here:
- Add Task modal popup using Bootstrap
- Modal fields include title, date, description and button
- Date field uses a jQuery UI datepicker 
- Clicking Add Task will;
   - add a timestamp id to the task
   - add a status to place it in the To Do column
   - create a card to show on the ui
   - save the task to local storage array
   - compare the due date with todays date and add appropiate class/styling
- You will then be directed to the blog page to view all saved entries
- All entries show the title as entered in the input, content, and username. 
- A footer is at the bottom of the blog page, with links to portfolio, this blog and my email
- On both pages there is a light/dark mode that can be activated
- The Sun shows light mode with white background and black text. When clicking the sun button it switches to dark mode, 
  black background and white text. 
- A back button on the blog page to return to the entry screen, 


## Screenshots
![Form page](./Assets/media/blog2.png)
![Blog page](./Assets/media/blog1.png)
![Form page](./Assets/media/blog-validation.png)
![Form page](./Assets/media/blog-validation2.png)
![Form page](./Assets/media/blog-dark.png)


## Usage
1. Input username into field
2. Input blog title
3. Input blog content
4. Click Submit
5. Check the page has moved to blog page
6. Check that all blogs from local storage are there
7. Click the sun icon
8. Check if it transitions to dark mode. 

Validation:
1. Click submit before inputting anything
2. Check that a text line for each missing input appears
3. Fill in username input
4. Click submit again
5. Check that only 2 text lines remain
6. Repeat for all fields. 



## Contact
Created by Gayle McClure.

