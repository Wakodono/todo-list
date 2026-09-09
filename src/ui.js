import ProjectModule from "./project";
import TodoModule from "./todo";

const UIModule = (function () {
    let currentTodoID = null;

    // Private functions
    function handleAssignModalBtnClick(todoId) {
        const modal = document.querySelector('.assign-to-project-modal-container');
        currentTodoID = todoId;
        modal.classList.add('show');

        populateProjectList();
    };

    function createProjectElement(project) {
        const projectDiv = document.createElement('div');

        projectDiv.classList.add('hoverable');
        projectDiv.textContent = project.name;
        projectDiv.addEventListener("click", () => {
            const allTodos = TodoModule.getAll();
            const filteredTodos = allTodos.filter(todo => project.todos.includes(todo.id));
            renderTodos(filteredTodos);
        });

        return projectDiv;
    };

    function createTodoElement(todo) {
        // TODO clear existing content if necessary

        const todoDiv = document.createElement('div');
        const deleteButton = document.createElement('button');

        // create elements for each piece of information
        const titleElement = document.createElement('h3');
        titleElement.textContent = todo.title;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = todo.description;

        const dueDateElement = document.createElement('span');
        dueDateElement.textContent = todo.dueDate;

        const priorityElement = document.createElement('span');
        priorityElement.textContent = todo.priority;
        const priorityLevel = todo.priority.toLowerCase();
        
        if (priorityLevel === 'high') {
            priorityElement.classList.add('priority-high');
        } else if (priorityLevel === 'medium') {
            priorityElement.classList.add('priority-medium');
        } else if (priorityLevel === 'low') {
            priorityElement.classList.add('priority-low');
        }
        
        // create a container for the hidden elements
        const hiddenDetailsContainer = document.createElement('div');

        hiddenDetailsContainer.appendChild(dueDateElement);
        hiddenDetailsContainer.appendChild(priorityElement);

        hiddenDetailsContainer.classList.add('hidden');


        // create a button that will allow us to toggle visibility
        const showDetails = document.createElement('button');
        showDetails.classList.add('hoverable');
        showDetails.textContent = 'more...';

        showDetails.addEventListener('click', () => {
            console.log('I AM THE HIDE EVENT LISTENER AND I HAVE BEEN CLICKED!');
            hiddenDetailsContainer.classList.toggle('hidden')
        });

        const moveToProjectBtn = document.createElement('button');
        moveToProjectBtn.innerText = '+'

        moveToProjectBtn.addEventListener('click', () => {
            handleAssignModalBtnClick(todo.id);
        })


        // Append all elements to the todo div
        todoDiv.appendChild(titleElement);
        todoDiv.appendChild(descriptionElement);
        todoDiv.appendChild(hiddenDetailsContainer);
        todoDiv.appendChild(showDetails);
        todoDiv.appendChild(moveToProjectBtn);

        // create delete button
        deleteButton.textContent = "delete";
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => {
            TodoModule.delete(todo.id);

            todoDiv.remove();
        })

        todoDiv.appendChild(deleteButton);

        return todoDiv;
    };

    function renderProjects(projects) {
        // Display projects as cards
        const projectsList = document.querySelector('#projects-list');

        projects.map((project) => {
            const newProject = createProjectElement(project);
            projectsList.appendChild(newProject);
        });

    };

    function renderTodos(todos) {
        // Display todos as cards
        const todosList = document.querySelector('#todos-list');

        // clear DOM before rendering to avoid unewanted appending
        todosList.innerHTML = '';

        todos.map(todo => {
            const newTodo = createTodoElement(todo);
            todosList.appendChild(newTodo);
        });
    };

    function setupProjectForm() {
        const form = document.querySelector('#project-form');
        const modal = document.querySelector('.project-modal-container');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.querySelector('#project-name').value;
            const description = document.querySelector('#project-description').value;
            const dueDate = document.querySelector('#project-due-date').value;

            ProjectModule.create(name, description, dueDate);

            form.reset();
            modal.classList.remove('show')

            document.querySelector('#projects-list').innerHTML = '';

            const projects = ProjectModule.getAll();
            renderProjects(projects);
        })
    }

    function setupTodoForm() {
        // select the form
        const form = document.querySelector('#add-todo-form');

        console.log('Setting up form:', form)

        // attach an event listener
        form.addEventListener('submit', (e) => {
            console.log('Form submitted!')
            e.preventDefault(); // prevent page refresh

            // Gather values from the inputs
            const title = document.querySelector('#todo-title').value;
            const description = document.querySelector('#todo-description').value;
            const dueDate = document.querySelector('#todo-duedate').value;
            const priority = document.querySelector('#todo-priority').value;

            const newTodo = TodoModule.create(title, description, dueDate, priority);

            const todos = TodoModule.getAll();

            const allProjects = ProjectModule.getAll();

            const defaultProject = allProjects.find(project => project.isDefault === true);

            ProjectModule.assignTodoToProject(newTodo.id, defaultProject.id, todos);

            // Clear the form
            form.reset();

            // Clear existing todos from the DOM
            document.querySelector('#todos-list').innerHTML = '';

            // Re-render all todos

            // renderTodos(TodoModule.getAll(todos));
        });

    };

    function projectModalController() {
        const modal = document.querySelector('.project-modal-container');
        const newProjectButton = document.getElementById('new-project');
        const closeProjectButton = document.querySelector('.close');

        if (!modal || !newProjectButton || !closeProjectButton) {
            console.error('Modal elements not found:', { modal, newProjectButton, closeProjectButton });
            return;
        }

        newProjectButton.addEventListener('click', () => {
            modal.classList.add('show');
        });

        closeProjectButton.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    };

    function populateProjectList() {
        const modal = document.querySelector('.assign-to-project-modal-container');
        const assignModalDiv = document.querySelector('#assign-modal');
        const list = document.createElement('ul');
        list.classList.add('project-list');

        const allProjects = ProjectModule.getAll();

        assignModalDiv.innerHTML = '';
        assignModalDiv.appendChild(list);

        allProjects.map(project => {
            const projectListItem = document.createElement('li');
            projectListItem.textContent = project.name;

            projectListItem.addEventListener('click', () => {
                const allTodos = TodoModule.getAll();
                ProjectModule.assignTodoToProject(currentTodoID, project.id, allTodos)
                modal.classList.remove('show');
                currentTodoID = null
            });

            list.appendChild(projectListItem);
        });
    };

    function assignToProjectModalController() {
        const modal = document.querySelector('.assign-to-project-modal-container');
        const closeProjectAssignModuleBtn = document.querySelector('.close-assign-to-project-module');


        closeProjectAssignModuleBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            currentTodoID = null;
        })
    };

    // Public interface
    return {
        renderProjects,
        renderTodos,
        setupTodoForm,
        setupProjectForm,
        projectModalController,
        assignToProjectModalController,
        handleAssignModalBtnClick
    };
})();

export default UIModule;