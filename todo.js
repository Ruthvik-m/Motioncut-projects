// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task));
  }
  
  // Save tasks to local storage
  function saveTasks() {
    const tasks = Array.from(document.querySelectorAll('#task-list li')).map(li => ({
      text: li.querySelector('span').textContent,
      completed: li.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Add a new task
  function addTask(task) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = task.text;
    li.appendChild(span);
  
    const completeButton = document.createElement('button');
    completeButton.textContent = task.completed ? 'Undo' : 'Complete';
    completeButton.classList.add(task.completed ? 'undo' : 'complete');
    completeButton.addEventListener('click', () => toggleTaskCompletion(li));
    li.appendChild(completeButton);
  
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit');
    editButton.addEventListener('click', () => editTask(li));
    li.appendChild(editButton);
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(li));
    li.appendChild(deleteButton);
  
    if (task.completed) {
      li.classList.add('completed');
    }
  
    document.getElementById('task-list').appendChild(li);
    saveTasks();
  }
  
  // Toggle task completion
  function toggleTaskCompletion(li) {
    li.classList.toggle('completed');
    const completeButton = li.querySelector('button.complete, button.undo');
    completeButton.textContent = li.classList.contains('completed') ? 'Undo' : 'Complete';
    completeButton.classList.toggle('undo');
    completeButton.classList.toggle('complete');
    saveTasks();
  }
  
  // Edit a task
  function editTask(li) {
    const span = li.querySelector('span');
    const newText = prompt('Edit task:', span.textContent);
    if (newText !== null) {
      span.textContent = newText;
      saveTasks();
    }
  }
  
  // Delete a task
  function deleteTask(li) {
    li.remove();
    saveTasks();
  }
  
  // Add a new task
  document.getElementById('add-task').addEventListener('click', () => {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      addTask({ text: taskText, completed: false });
      taskInput.value = '';
    }
  });
  
  // Load tasks from local storage on page load
  loadTasks();