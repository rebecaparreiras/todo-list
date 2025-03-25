// 1. Create array to store todos
// 2. When we click 'Add',
// 3. Get text from textbox
// 4. Add it to array
// 5. Display each value in the page
// 5.a. Loop through the array
// 5.b. Create HTML code for each todo
// 5.c. Put HTML on web page

// Main idea:
// 1. Save the data (array)
// 2. Generate the HTML (loop)
// 3. Make it interactive 

let todoList = JSON.parse(localStorage.getItem('js-todo-list')) || [];

renderTodoList();

function renderTodoList() {
    let todoListHTML = '';

    // loops through each index of the array
    for (let i = 0; i < todoList.length; i++) {
        const todoObject = todoList[i];
        const { name, dueDate } = todoObject;
        // const name = todoObject.name;
        // const dueDate = todoObject.dueDate;
        const html = `
            <div class="item-list">${name}</div>
            <div class="item-list">${dueDate}</div>
            <button onclick="
                todoList.splice(${i}, 1);
                saveTodo();
                renderTodoList();
            "
            class="delete-btn"
            >Delete</button>
        `;
        todoListHTML += html;
    }

    document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}

function addTodo() {
    const inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value;

    const dateInputElement = document.querySelector('.js-due-date-input');
    const dueDate = dateInputElement.value;

    const errorElement = document.querySelector('.js-error-message');

    if (name === "" || dueDate === "") {
        errorElement.textContent = "Please, fill out all fields.";
        return;
    }
    
    todoList.push({ name, dueDate });
    // name: name,
    // dueDate: dueDate

    saveTodo();

    inputElement.value = ''; 
    // make the text in the textbox become empty after clicking 'Add'

    renderTodoList();
}

function saveTodo() {
    localStorage.setItem('js-todo-list', JSON.stringify(todoList));
}

// Remove warning message when interacting with the inputs 
document.querySelector('.js-name-input').addEventListener('input', () => {
    document.querySelector('.js-error-message').textContent = "";
});

document.querySelector('.js-due-date-input').addEventListener('input', () => {
    document.querySelector('.js-error-message').textContent = "";
});