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
