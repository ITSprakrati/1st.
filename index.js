let todo = [];

        // Current filter state
        let currentFilter = 'all';

        // Compact mode state
        let isCompact = false;

        // Get DOM elements
        let taskInput = document.getElementById('taskInput');
        let addBtn = document.getElementById('addBtn');
        let taskList = document.getElementById('taskList');
        let filterBtns = document.querySelectorAll('.filter-btn');
        let toggleBtn = document.getElementById('toggleBtn');

        // Load todos from memory on page load
        function loadTodos() {
            renderTasks();
        }

        // Add new task - using push() like your original logic
        function addTask() {
            let taskTitle = taskInput.value.trim();
            
            if (taskTitle === '') {
                alert('Please enter a task!');
                return;
            }
            
            // Using push() to add task to array
            todo.push({
                title: taskTitle,
                completed: false
            });
            
            taskInput.value = '';
            renderTasks();
        }

        // Delete task - using splice() like your original logic
        function deleteTask(index) {
            // Using splice() to remove task from array
            todo.splice(index, 1);
            renderTasks();
        }

        // Toggle task completion
        function toggleComplete(index) {
            // Update completed status using array index
            todo[index].completed = !todo[index].completed;
            renderTasks();
        }

        // Edit task
        function editTask(index) {
            let taskItem = document.querySelectorAll('.task-item')[index];
            let taskText = taskItem.querySelector('.task-text');
            let btnGroup = taskItem.querySelector('.btn-group');
            
            // Create input field for editing
            let input = document.createElement('input');
            input.type = 'text';
            input.className = 'task-input';
            input.value = todo[index].title;
            
            // Replace text with input
            taskItem.replaceChild(input, taskText);
            
            // Create save and cancel buttons
            let saveBtn = document.createElement('button');
            saveBtn.className = 'save-btn';
            saveBtn.textContent = 'Save';
            
            let cancelBtn = document.createElement('button');
            cancelBtn.className = 'cancel-btn';
            cancelBtn.textContent = 'Cancel';
            
            // Clear existing buttons
            btnGroup.innerHTML = '';
            btnGroup.appendChild(saveBtn);
            btnGroup.appendChild(cancelBtn);
            
            // Save button click
            saveBtn.addEventListener('click', function() {
                let newTitle = input.value.trim();
                if (newTitle !== '') {
                    // Update task title using array index
                    todo[index].title = newTitle;
                    renderTasks();
                }
            });
            
            // Cancel button click
            cancelBtn.addEventListener('click', function() {
                renderTasks();
            });
            
            input.focus();
        }

        // Render tasks - using loops like your original logic
        function renderTasks() {
            taskList.innerHTML = '';
            
            // Loop through todo array
            for (let i = 0; i < todo.length; i++) {
                let task = todo[i];
                
                // Filter logic using conditionals
                if (currentFilter === 'completed' && !task.completed) {
                    continue;
                }
                if (currentFilter === 'pending' && task.completed) {
                    continue;
                }
                
                // Create task item
                let li = document.createElement('li');
                li.className = 'task-item';
                
                // Checkbox
                let checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = task.completed;
                checkbox.addEventListener('click', function() {
                    toggleComplete(i);
                });
                
                // Task text
                let span = document.createElement('span');
                span.className = 'task-text';
                if (task.completed) {
                    span.className += ' completed';
                }
                span.textContent = task.title;
                
                // Button group
                let btnGroup = document.createElement('div');
                btnGroup.className = 'btn-group';
                
                // Edit button
                let editBtn = document.createElement('button');
                editBtn.className = 'edit-btn';
                editBtn.textContent = 'Edit';
                editBtn.addEventListener('click', function() {
                    editTask(i);
                });
                
                // Delete button
                let deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.textContent = 'Delete';
                deleteBtn.addEventListener('click', function() {
                    deleteTask(i);
                });
                
                btnGroup.appendChild(editBtn);
                btnGroup.appendChild(deleteBtn);
                
                li.appendChild(checkbox);
                li.appendChild(span);
                li.appendChild(btnGroup);
                
                taskList.appendChild(li);
            }
        }

        // Filter tasks
        for (let i = 0; i < filterBtns.length; i++) {
            filterBtns[i].addEventListener('click', function() {
                // Remove active class from all buttons
                for (let j = 0; j < filterBtns.length; j++) {
                    filterBtns[j].classList.remove('active');
                }
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Set current filter
                currentFilter = this.getAttribute('data-filter');
                
                // Render tasks with new filter
                renderTasks();
            });
        }

        // Toggle compact view
        toggleBtn.addEventListener('click', function() {
            isCompact = !isCompact;
            if (isCompact) {
                document.body.classList.add('compact');
            } else {
                document.body.classList.remove('compact');
            }
        });

        // Add task on button click
        addBtn.addEventListener('click', addTask);

        // Add task on Enter key press
        taskInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTask();
            }
        });

        // Load todos when page loads
        loadTodos();
