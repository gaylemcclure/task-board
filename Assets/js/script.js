// Retrieve tasks and nextId from localStorage
function getTasks() {
  const taskList = JSON.parse(localStorage.getItem("tasks"));
  // let nextId = JSON.parse(localStorage.getItem("nextId"));

  return taskList;
}

// Function to generate a unique task id
function generateTaskId() {
  const now = dayjs();
  const id = now.unix().toString();
  return id;
}

// Function to create a task card and append to it's relevant column
function createTaskCard(task) {
  $(`#${task.status}`).append(`
    <li class="ui-state-default ${task.dateStatus} card" id=${task.id} key=${task.id}>
      <div class="card-header">${task.title}</div>
      <div class="card-body">
        <h5 class="card-title">${task.description}</h5>
        <p class="card-text">${task.date}</p>
        <button id=${task.id} class="delete-btn btn btn-danger" >Delete</button>
      </div>
    </li>
    `);
}

// Function to render the task list and make cards draggable
function renderTaskList() {
  let taskList = getTasks();
  //when refreshed, create a card for each item in local storage
  taskList.map((task) => {
    createTaskCard(task);
  });
  //Make the cards moveable between columns
  $("#todo-cards, #in-progress-cards, #done-cards")
    .sortable({
      connectWith: ".connectedSortable",
      receive: function (event, ui) {},
    })
    .disableSelection();
}

// Function to handle adding a new task
function handleAddTask(event) {
  let tasks = getTasks();
  const title = $("#title").val();
  const date = $("#datepicker").val();
  const formatDate = dayjs(date).format("DD/MM/YYYY");
  const descr = $("#description").val();
  const taskId = generateTaskId();
  const dateStatus = handleStatus(date);
  const status = "todo-cards";

  //Create task object to save to local storage
  let taskObj = {
    id: taskId,
    title: title,
    date: formatDate,
    description: descr,
    dateStatus: dateStatus,
    status: status,
  };

  //Check if local storage is empty or not and save accordingly
  if (tasks === null) {
    tasks = localStorage.setItem("tasks", JSON.stringify([taskObj]));
  } else if (Array.isArray(tasks)) {
    let taskArr = tasks;
    taskArr.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(taskArr));
  }
  //Create the card for the new task, reset the form and close modal
  createTaskCard(taskObj);
  //resets the add task fields, and ensures you can delete task without refreshing. 
  window.location.reload();
  $("#formModal").modal("hide");
}

// Function to handle deleting a task
function handleDeleteTask(event) {
  let savedTasks = getTasks();
  //removes the task with the selected id from the array, saves back to local storage and removed that card
  savedTasks = savedTasks.filter((task) => task.id !== event.target.id);
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
  $(`li#${event.target.id}`).remove();
}

// Function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const storage = JSON.parse(localStorage.getItem("tasks"));
  const taskIndex = handleFindIndex(storage, ui.item[0].id);
  //Gets the id of the moved task, updates its status and saves to local storage again
  storage[taskIndex].status = event.currentTarget.id;
  localStorage.setItem("tasks", JSON.stringify(storage));
}

// Function to compare dates
function handleStatus(date) {
  const now = dayjs();
  const before = dayjs(date).isBefore(now, "day");
  const today = dayjs(date).isSame(now, "day");
  const future = dayjs(date).isAfter(now);

  if (before) {
    return "before";
  } else if (today) {
    return "today";
  } else if (future) {
    return "future";
  }
}

//Function to find index of task in local storage array
function handleFindIndex(array, compareId) {
  const idElement = (element) => element.id === compareId;
  const findTask = array.findIndex(idElement);

  return findTask;
}

// when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  let taskList = getTasks();
  taskList !== null ? renderTaskList() : null;
  $("#add-btn").on("click", (event) => handleAddTask(event));
  $("#datepicker").datepicker();
  $(".delete-btn").on("click", (event) => handleDeleteTask(event));
  $("#todo-cards, #in-progress-cards, #done-cards").on("sortreceive", (event, ui) => handleDrop(event, ui));
});
