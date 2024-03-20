
// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  const now = dayjs();
  const id = now.unix()
  return id;

}

// Todo: create a function to create a task card
function createTaskCard(task) {

    $("#todo-cards").append(`
    <div class="card bg-primary">
      <div class="card-header">${task.title}</div>
      <div class="card-body">
        <h5 class="card-title">${task.description}</h5>
        <p class="card-text">${task.date}</p>
        <button id="delete-btn" class="btn btn-primary">Delete</button>
      </div>
    </div>

    `)

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  taskList.map(task => {
    createTaskCard(task)
  })
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  const title = $("#title").val();
  const date = $('#datepicker').val();
  const descr = $('#description').val();
  const taskId = generateTaskId();
  const status = ""

  //Create task object to save to local storage
  let taskObj = {
    id: taskId,
    title: title,
    date:date,
    description: descr,
    status: status
  }

  //Check if local storage is empty or not and save accordingly
  if (taskList === null) {
    localStorage.setItem("tasks", JSON.stringify([taskObj]))
  } else if (Array.isArray(taskList)) {
    taskList.push(taskObj)
    localStorage.setItem("tasks", JSON.stringify(taskList))
  }

  taskList !== null ? renderTaskList() : null;
  //Reset the form and hide modal
  document.querySelector("#modal-form").reset();
 $('#formModal').modal('hide')
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
  console.log(event)
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  taskList !== null ? renderTaskList() : null;
  $('#add-btn').on("click", (event) => handleAddTask(event))
  $("#datepicker").datepicker();
  $('#delete-btn').on("click", (event) => handleDeleteTask(event))
});
