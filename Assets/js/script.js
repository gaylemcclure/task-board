
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
    <li class="ui-state-default ${task.dateStatus} card" id=${task.id} key=${task.id}>
      <div class="card-header">${task.title}</div>
      <div class="card-body">
        <h5 class="card-title">${task.description}</h5>
        <p class="card-text">${task.date}</p>
        <button id="delete-btn" class="btn btn-danger">Delete</button>
      </div>
    </li>
    `)
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  //when refreshed, create a card for each item in local storage
  taskList.map(task => {
    createTaskCard(task)
  })
  //Make the cards moveable between columns
  $( "#todo-cards, #in-progress-cards, #done-cards" ).sortable({
    connectWith: ".connectedSortable",
    receive: function(event, ui) {}
  }).disableSelection();
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  const title = $("#title").val();
  const date = $('#datepicker').val();
  const formatDate = dayjs(date).format('DD/MM/YYYY')
  const descr = $('#description').val();
  const taskId = generateTaskId();
  const dateStatus = handleStatus(date);
  const status = "todo-cards"

  //Create task object to save to local storage
  let taskObj = {
    id: taskId,
    title: title,
    date:formatDate,
    description: descr,
    dateStatus: dateStatus,
    status: status
  }

  //Check if local storage is empty or not and save accordingly
  if (tasks === null) {
    tasks = localStorage.setItem("tasks", JSON.stringify([taskObj]))
  } else if (Array.isArray(tasks)) {
    let taskArr = tasks
    taskArr.push(taskObj)
    localStorage.setItem("tasks", JSON.stringify(taskArr))
  }

  createTaskCard(taskObj)
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
  $('#delete-btn').on("click", (event) => handleDeleteTask(event));
  $( "#todo-cards, #in-progress-cards, #done-cards" ).on("sortreceive", function(event, ui) {
    const movedId = ui.item[0].id;
    const newList = event.currentTarget.id;
    const storage = JSON.parse(localStorage.getItem("tasks"));
    
    const idElement = (element) => element.id.toString() === movedId;
    const findTask = storage.findIndex(idElement)
    storage[findTask].status = newList;
    localStorage.setItem("tasks", JSON.stringify(storage))
    })

  })
// });


function handleStatus(date) {
  const now = dayjs();
  const before = dayjs(date).isBefore(now, 'day')
  const today = dayjs(date).isSame(now, 'day')
  const future = dayjs(date).isAfter(now);
  
  if (before) {
    return "before"
  } else if (today) {
    return "today"
  } else if (future) {
    return "future"
  }
}