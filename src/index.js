import TodoModule from './todo.js';
import ProjectModule from './project.js';
import UIModule from './ui.js';
import './style.css';


/* // COMPLETED TESTS - COMMENTED OUT
const newTodo = TodoModule.create('Complete project', 'Finish the todo app implementation', '2024-02-01', 'high');
console.log('Created todo priority:', newTodo.priority);

// Check todos immediately after creation
const todosAfterCreate = TodoModule.getAll();
console.log('Todos immediately after creation:', todosAfterCreate);
console.log('First todo priority from getAll:', todosAfterCreate[0]?.priority);

// Test update function
console.log('About to update todo with ID:', newTodo.id);
console.log('Todos right before update:', TodoModule.getAll()[0]?.priority);

const updatedTodo = TodoModule.update(newTodo.id, {
    title: 'Updated Test Todo',
    priority: 'medium'
});

console.log('Updated result:', updatedTodo);

// Verify the update worked
const allTodosAfterUpdate = TodoModule.getAll();
console.log('Todos after update', allTodosAfterUpdate);

// Test delete function
const deleteResult = TodoModule.delete(newTodo.id);
console.log('Delete result:', deleteResult);

// Verify deletion worked
const todosAfterDelete = TodoModule.getAll();
console.log('Todos after delete:', todosAfterDelete);

// Test project module CRUD operations
console.log('=== PROJECT MODULE TESTING ===');

// Test create
const project1 = ProjectModule.create('Work Projects', 'All work-related tasks', '2024-12-31');
console.log('Created project 1:', project1);

const project2 = ProjectModule.create('Personal Goals', 'Personal development tasks', '2024-06-30');
console.log('Created project 2:', project2);

// Test getAll
const allProjects = ProjectModule.getAll();
console.log('All projects:', allProjects);

// Test update
const updatedProject = ProjectModule.update(project1.id, {
    name: 'Work Projects Updated',
    dueDate: '2024-11-30'
});
console.log('Updated project:', updatedProject);

// Test delete
const deletePeoject = ProjectModule.delete(project2.id);
console.log('Delete result:', deletePeoject);

// Verify final state
const finalProjects = ProjectModule.getAll();
console.log('Final projects:', finalProjects);

// Test validation
console.log('=== VALIDATION TESTING ===');

// Should fail (no name)
const invalidProject = ProjectModule.create('', 'This should fail', '2024-12-31');
console.log('Invalid project result:', invalidProject);

// Should succeed
const validProject = ProjectModule.create('Valid Project', 'This should work', '2024-12-31');
console.log('Valid project result:', validProject);

// Test the assignTodoToProject method
console.log('=== TESTING TODO-PROJECT ASSIGNMENT ===');

// Create a project first
const testProject = ProjectModule.create('Test Project', 'A project to test assignment', '2024-12-31');
console.log('Created test project:', testProject);

// Create a todo
const testTodo = TodoModule.create('Test Todo', 'A todo to assign to project', '2024-01-15', 'high');
console.log('Created test todo:', testTodo);

// Get current todos and projects
const currentTodos = TodoModule.getAll();
const currentProjects = ProjectModule.getAll();
console.log('Current todos:', currentTodos);
console.log('Current projects:', currentProjects);

// Assign the todo to the project
const assignmentResult = ProjectModule.assignTodoToProject(testTodo.id, testProject.id, currentTodos);
console.log('Assignment result:', assignmentResult);

// Verify the assignment worked
const projectsAfterAssignment = ProjectModule.getAll();
console.log('Projects after assignment:', projectsAfterAssignment);
console.log('Project todos array:', projectsAfterAssignment[0]?.todos);

// Test assigning to non-existent project (should fail)
const fakeAssignment = ProjectModule.assignTodoToProject(testTodo.id, 'fake-id', currentTodos);
console.log('Fake assignment result:', fakeAssignment);
*/

/* // Test default project creation - COMPLETED
console.log('=== TESTING DEFAULT PROJECT CREATION ===');

// Reset both modules to start fresh
TodoModule.reset();
ProjectModule.reset();

// Check initial state
console.log('Initial projects:', ProjectModule.getAll());
console.log('Initial todos:', TodoModule.getAll());

// Create a todo (this should trigger default project creation)
const testTodo3 = TodoModule.create('Test Todo', 'This should create a default project', '2024-01-15', 'high');
console.log('Created todo:', testTodo3);

// Check if default project was created
const projectsAfterTodo = ProjectModule.getAll();
console.log('Projects after creating todo:', projectsAfterTodo);
console.log('Default project created:', projectsAfterTodo[0]?.isDefault);
console.log('Default project name:', projectsAfterTodo[0]?.name);

// Create another todo (should not create another default project)
const testTodo2 = TodoModule.create('Test Todo 2', 'This should not create another default project', '2024-01-16', 'medium');
console.log('Created second todo:', testTodo2);

// Check projects again
const projectsAfterSecondTodo = ProjectModule.getAll();
console.log('Projects after second todo:', projectsAfterSecondTodo);
console.log('Number of projects:', projectsAfterSecondTodo.length);
*/

// Render UI
// TodoModule.create('First Todo', 'My first task', '2024-12-31', 'high');

console.log('About to render projects...');
const projects = ProjectModule.getAll();
console.log('Projects to render:', projects);
UIModule.renderProjects(projects);
console.log('Finished rendering');

// Render todos
const todos = TodoModule.getAll();
UIModule.renderTodos(todos);

UIModule.setupTodoForm();
UIModule.setupProjectForm();
UIModule.projectModalController();
UIModule.assignToProjectModalController();