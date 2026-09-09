import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import ProjectModule from './project';

const TodoModule = (function () {
    // Private variables and functions go here
    let todos = [];

    loadFromStorage()

    // Private helper functions
    function validateTodo(todoData) {
        // title must not be ''
        if (!todoData.title || todoData.title.trim() === '') return false;
        if (!todoData.description) return false;
        return true;
    }

    function saveToStorage() {
        // localStorage logic
        const todoString = JSON.stringify(todos);
        localStorage.setItem('todos', todoString);
    }

    function loadFromStorage() {
        const data = localStorage.getItem('todos');

        if (data) {
            const loadedTodos = JSON.parse(data);
            todos = loadedTodos;
        }
    }

    // Public interface
    return {
        create: function (title, description, dueDate, priority, projectId) {
            // Ensure default project exists
            if (ProjectModule.getAll().length === 0) {
                ProjectModule.create('General', '', '', true);
            }
            // create and return a todo object
            const todoData = { title, description, dueDate, priority };

            if (!validateTodo(todoData)) {
                // Handle invalid data
                return false;
            };

            // Proceed with creation if valid
            const todo = {
                // rest of object from todoData
                ...todoData,
                id: uuidv4(),
                createdAt: new Date().toISOString()

            };

            todos.push(todo);
            saveToStorage();
            return todo;

        },
        getAll: function () {
            return todos;
        },
        update: function (id, updates) {
            const todoToUpdate = todos.find((todo) => todo.id === id);

            if (!todoToUpdate) return false;

            // 1. Create a merged object that combines the existing todo with the updates
            const updatedTodo = {
                ...todoToUpdate,
                ...updates
            };
            // 2. Validate this merged object using your existing validateTodo() function
            if (!validateTodo(updatedTodo)) return false;
            // 3. If validation passes, proceed; if not, return false

            // 4. Find the index of the todo in the todos array
            const todoToUpdateIndex = todos.findIndex(todo => todo.id === id);
            // 5. Replace the old todo with the updated todo
            todos[todoToUpdateIndex] = updatedTodo;
            // 6. Save to storage
            saveToStorage();
            // 7. Return the updated todo (or true for success)
            return updatedTodo;
        },
        delete: function (id) {
            const todoToDelete = todos.find(todo => todo.id === id);

            if (todoToDelete) {
                const index = todos.findIndex(todo => todo.id === id);
                todos.splice(index, 1);
                saveToStorage();
                return true;
            } else {
                return false;
            }
        },
        reset: function () {
            todos = [];
            localStorage.removeItem('todos');
        }
    };
})();

export default TodoModule;