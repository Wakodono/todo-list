import { v4 as uuidv4 } from 'uuid';
/* Project object:
- id (unique identifier)
- name (project title) 
- description (project details)
- dueDate (project deadline)
- createdAt (timestamp)
- todos (array of todo IDs that belong to this project)
- isDefault (boolean to mark the default project) */

const ProjectModule = (function () {
    let projects = [];

    loadFromStorage();

    function validateProject(projectData) {
        if (!projectData.name || projectData.name.trim() === '') {
            return false;
        } else {
            return true;
        };
    }

    function saveToStorage() {
        const projectString = JSON.stringify(projects);
        localStorage.setItem('projects', projectString);
    }

    function loadFromStorage() {
        const data = localStorage.getItem('projects');

        if (data) {
            const loadedProjects = JSON.parse(data);
            projects = loadedProjects;
        }
    }

    return {
        create: function (name, description, dueDate, isDefault = false) {
            const projectData = {
                name,
                description,
                dueDate,
                todos: [],
                isDefault
            };

            if (!validateProject(projectData)) return false;

            const project = {
                ...projectData,
                id: uuidv4(),
                createdAt: new Date().toISOString()
            };

            projects.push(project);
            saveToStorage();

            return project
        },
        getAll: function () {
            return projects;
        },
        update: function (id, updates) {
            const projectToUpdate = projects.find(project => project.id === id);

            if (!projectToUpdate) return false;

            const updatedProject = {
                ...projectToUpdate,
                ...updates
            };

            if (!validateProject(updatedProject)) return false;

            const projectToUpdateIndex = projects.findIndex(project => project.id === id);
            projects[projectToUpdateIndex] = updatedProject;

            saveToStorage();

            return updatedProject;
        },
        delete: function (id) {
            const projectToDelete = projects.find(project => project.id === id);

            if (projectToDelete) {
                const index = projects.findIndex(project => project.id === id);
                projects.splice(index, 1);
                saveToStorage();
                return true;
            } else {
                return false;
            }
        },
        reset: function () {
            projects = [];
            localStorage.removeItem('projects');
        },
        assignTodoToProject: function (todoId, projectId, todos) {
            // 1. Find the todo by ID
            const todoToAssign = todos.find(todo => todo.id === todoId);
            // 2. Find the project by ID
            const project = projects.find(project => project.id === projectId)
            // 3. Validate both exist
            if (!todoToAssign || !project) return false;
            // 4. Add todo ID to project's todos array
            project.todos.push(todoId);
            // 5. Save project to storage
            saveToStorage();
            // 6. Return success/failure
            return true;
        }
    }
})();

export default ProjectModule;