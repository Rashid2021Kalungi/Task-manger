window.onload = function () {
    restoreDiv();
};

document.addEventListener('DOMContentLoaded', function() {
    function toggleDropdown() {
        const date = document.getElementById('date');
        const isDisplayed = date.style.display === 'block';
        
        if (isDisplayed) {
            date.style.display = 'none'; 
        } else {
            date.style.display = 'block';
        }
    }
    window.toggleDropdown = toggleDropdown;
});

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

const nextBtn = document.createElement('button');
const newField1 = document.createElement('input');
const nextBtn2 = document.createElement('button');
const nextBtn1 = document.createElement('button');
const date = document.getElementById('date');
const body = document.querySelector('.body');
const deadLine = document.createElement('input');
const displayDate = document.getElementById('displayDate');
const startDate = document.createElement('input');
const datenow = new Date();

function datenew() {
    if (!date.value) {
        displayDate.innerHTML = formatDate(datenow);
    } else {
        const selectedDate = new Date(date.value);
        displayDate.innerHTML = formatDate(selectedDate);
    }
}

date.addEventListener('input', datenew);
document.addEventListener('DOMContentLoaded', datenew);

function newField() {
    const btn = document.getElementById('new');
    const fieldContainer = document.querySelector('.inputfield');
    
    newField1.type = 'text';
    newField1.placeholder = 'Enter task'; 
    fieldContainer.appendChild(newField1);
    
    nextBtn.innerText = 'Next';
    nextBtn.style.display = 'flex';
    nextBtn.className = 'nextBtn';
    fieldContainer.appendChild(nextBtn);
    
    nextBtn.onclick = newInput;
    
    function newInput() {
        startDate.type = 'text';
        startDate.placeholder = 'Select start date';

        startDate.addEventListener('focus', function() {
            startDate.type = 'date';
        });

        startDate.addEventListener('blur', function() {
            if (startDate.value === '') {
                startDate.type = 'text';
            }
        });

        nextBtn1.innerText = 'Next';
        nextBtn1.className = 'nextBtn';
        fieldContainer.appendChild(startDate);
        fieldContainer.appendChild(nextBtn1);

        nextBtn.remove();
        nextBtn1.onclick = nField;
        
        function nField() {
            deadLine.type = 'text';
            deadLine.placeholder = 'Select End date';

            deadLine.addEventListener('focus', function() {
                deadLine.type = 'date';
            });

            deadLine.addEventListener('blur', function() {
                if (deadLine.value === '') {
                    deadLine.type = 'text';
                }
            });

            nextBtn2.innerText = 'Save';
            nextBtn2.className = 'nextBtn';
            fieldContainer.appendChild(deadLine);
            fieldContainer.appendChild(nextBtn2);
            
            nextBtn1.remove();
            nextBtn2.onclick = save;
        }
    }
}
function save() {
    const btn = document.getElementById('new');
    btn.style.display = 'block';

    nextBtn2.remove();
    newField1.remove();
    startDate.remove();
    deadLine.remove();

    // Retrieve existing tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    // If tasks is not an array, reinitialize it as an empty array
    if (!Array.isArray(tasks)) {
        console.warn('Tasks stored in localStorage is not an array. Resetting to an empty array.');
        tasks = [];
    }

    // Create a new task object
    let task = {
        newField1: newField1.value,
        startDate: startDate.value,
        deadLine: deadLine.value
    };

    // Add the new task to the tasks array
    tasks.push(task);

    // Store the updated tasks array in localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Create task container and append task data to a table
    let storageDiv = document.querySelector('.storage');
    if (!storageDiv) {
        storageDiv = document.createElement('div');
        storageDiv.className = 'storage';
        document.body.appendChild(storageDiv);
    }
    
        const taskContainer = document.createElement('div');
        taskContainer.className = 'taskcontainer';
    
        const table = document.createElement('table');
        const row = document.createElement('tr');
    
        // Create table cells for each task property
        const taskNameCell = document.createElement('td');
        taskNameCell.textContent = task.newField1;
        row.appendChild(taskNameCell);
    
        const startDateCell = document.createElement('td');
        startDateCell.textContent = task.startDate;
        row.appendChild(startDateCell);
    
        const deadLineCell = document.createElement('td');
        deadLineCell.textContent = task.deadLine;
        row.appendChild(deadLineCell);
    
        table.appendChild(row);
        taskContainer.appendChild(table);
        storageDiv.appendChild(taskContainer);
    }
    
    function restoreDiv() {
        let storageDiv = document.querySelector('.storage');
        if (!storageDiv) {
            storageDiv = document.createElement('div');
            storageDiv.className = 'storage';
            document.body.appendChild(storageDiv);
        }
    
        let tasks = localStorage.getItem('tasks');
        if (tasks) {
            try {
                tasks = JSON.parse(tasks);
                if (!Array.isArray(tasks)) {
                    throw new Error("Tasks data is not an array");
                }
            } catch (error) {
                console.error('Tasks retrieved from localStorage is not an array. Resetting tasks.');
                tasks = []; 
                localStorage.setItem('tasks', JSON.stringify(tasks)); 
            }
        } else {
            tasks = [];
        }
    
        // Loop through the tasks array and display each task in a table
        tasks.forEach(task => {
            const table = document.createElement('table');
            const row = document.createElement('tr');
    
            // Create table cells for each task property
            const taskNameCell = document.createElement('td');
            taskNameCell.textContent = task.newField1;
            row.appendChild(taskNameCell);
    
            const startDateCell = document.createElement('td');
            startDateCell.textContent = task.startDate;
            row.appendChild(startDateCell);
    
            const deadLineCell = document.createElement('td');
            deadLineCell.textContent = task.deadLine;
            row.appendChild(deadLineCell);
    
            table.appendChild(row);
            storageDiv.appendChild(table);
        });
    }
            


// Button handling
const btn = document.getElementById('new');
let isClicked = false;
btn.addEventListener('click', function() {
    isClicked = true;

    if (isClicked) {
        btn.style.display = 'none';
    }
});