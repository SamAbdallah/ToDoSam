    // On app load, get all tasks from localStorage
    window.onload = loadTasks;

    // On form submit add task
    document.querySelector("form").addEventListener("submit", e => {
      e.preventDefault();
      addTask();
    });

    function loadTasks() {
      let time = new Date().toISOString()
      let title = $('#title').val()
      let description =$('#desc').val()
      let point = $('#point').val()
      // check if localStorage has any tasks
      // if not then return
      if (localStorage.getItem("tasks") == null) return;

      // Get the tasks from localStorage and convert it to an array
      let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
      console.log(tasks);

      // Loop through the tasks and add them to the list
      tasks.forEach((task,index) => {
        const list = document.querySelector("ul"); //jquery: $("ul)
        const li = document.createElement("li");
        li.innerHTML = `
          <input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked' : ''}>
          <input type="text" value="${task.title}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
          <input type="text" value="${task.description}" class="task" >
          <input type="text" value="${task.point}" class="task">
          <input type="text" value="${task.time}" class="task">
          <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
        list.insertBefore(li, list.children[0]);
      });
    }

    function addTask() {
      let time = new Date().toISOString()
      // let title = document.getElementById("title").value //
      let title=$('#title').val()
      // let description = document.getElementById("desc").value //
      let description=$('#desc').val()
      // let point = document.getElementById("point").value
      let point=$('#point').val()
      const task = {title:title,description:description,point:point,time:time,completed:false}
      const list = document.querySelector("ul"); //$("ul")
      // return if task is empty
      if (task.value === "") {
        alert("Please add some task!");
        return false;
      }
      // add task to local storage
      localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), task]));

      // create list item, add innerHTML and append to ul
      const li = document.createElement("li");
      li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
      <input type="text" value="${title}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
      <input type="text" value="${description}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
      <input type="text" value="${point}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
      <input type="text" value="${time}" class="task">
      <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
      list.insertBefore(li, list.children[0]);
      // clear input
      task.value = "";
    }

    function taskComplete(event) {
      let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
      tasks.forEach(task => {
        if (task.task === event.nextElementSibling.value) {
          task.completed = !task.completed;
        }
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      event.nextElementSibling.classList.toggle("completed");
      console.log("sette")
    }

    function removeTask(event) {
      let title =$('#title').val()
      let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
      tasks.forEach(task => {
        if (task.title === event.parentNode.children[1].value) {
          // delete task
          tasks.splice(tasks.indexOf(task), 1);
        }
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      event.parentElement.remove();
      console.log(tasks);

    }

    // store current task to track changes
    var currentTask = null;

    // get current task
    function getCurrentTask(event) {
      currentTask = event.value;
    }

    // edit the task and update local storage
    function editTask(event) {
      let title = document.getElementById("title").value     //// let title=$('#title').val()
      let description = document.getElementById("desc").value    //$('#desc').val()
      let point = document.getElementById("point").value    //$('#point').val()
      let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
      // check if task is empty
      if (event.value === "") {
        alert("Task is empty!");
        event.value = currentTask;
        return;
      }
      // update task
      tasks.forEach(task => {
        if (task.title === currentTask) {
          task.title = event.value;
        }
        if (task.description === currentTask) {
          task.description = event.value;
        }
        if (task.point === currentTask) {
          task.point = event.value;
        }
      });
      // update local storage
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
