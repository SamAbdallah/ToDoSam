// On app load, get all tasks from localStorage
    window.onload = loadTasks;

    // On form submit add task
    document.querySelector("form").addEventListener("submit", e => {
      e.preventDefault();
      addTask();
    });

    function loadTasks() {
      let time = new Date().toISOString()
      let title = document.getElementById("title").value
      let description = document.getElementById("desc").value
      let point = document.getElementById("point").value
      // check if localStorage has any tasks
      // if not then return
      if (localStorage.getItem("tasks") == null) return;

      // Get the tasks from localStorage and convert it to an array
      let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
      console.log(tasks);

      // Loop through the tasks and add them to the list
      tasks.forEach((task,index) => {
        const list = document.querySelector("ul");
        const li = document.createElement("li");
        li.innerHTML = `
           <input type="text" value="${index}" class="task">
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
      let title = document.getElementById("title").value
      let description = document.getElementById("desc").value
      let point = document.getElementById("point").value
      const task = {title:title,description:description,point:point,time:time,completed:false}
      const list = document.querySelector("ul");
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


