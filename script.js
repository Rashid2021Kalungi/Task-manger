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
const nextBtn=document.createElement('button');
const newField1 = document.createElement('input');
const nextBtn2 = document.createElement('button');
const nextBtn1 = document.createElement('button');
const date = document.getElementById('date');
const body=document.querySelector('.body');
const deadLine=document.createElement('input');
const displayDate=document.getElementById('displayDate');
const startDate = document.createElement('input');
const datenow=new Date();
function datenew(){
    if(!date.value){
        displayDate.innerHTML=formatDate(datenow);
    }
    else{
        const selectedDate = new Date(date.value);
        displayDate.innerHTML = formatDate(selectedDate);
    }
}
date.addEventListener('input', datenew);
document.addEventListener('DOMContentLoaded', datenew);
function newField() {
    const btn = document.getElementById('new');
    const fieldContainer = document.querySelector('.inputfield');
    fieldContainer.style.display='grid';
    fieldContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
    newField1.type = 'text';
    newField1.placeholder = 'Enter task'; 
    fieldContainer.appendChild(newField1);
    nextBtn.innerText='Next';
    nextBtn.style.display='flex';
    nextBtn.className="nextBtn";
    fieldContainer.appendChild(nextBtn);
    nextBtn.onclick=newInput;
   
    function newInput() {
        startDate.type = 'text'; // Set initially as 'text'
        startDate.placeholder = 'Select start date';

        // Switch to 'date' on focus
        startDate.addEventListener('focus', function() {
            startDate.type = 'date';
        });

        // If the user doesn't select a date, switch back to 'text'
        startDate.addEventListener('blur', function() {
            if (startDate.value === '') {
                startDate.type = 'text';
            }
        });
        nextBtn1.innerText = 'Next';
        nextBtn1.className='nextBtn';
        fieldContainer.appendChild(startDate);
        fieldContainer.appendChild(nextBtn1);

        nextBtn.remove();
        nextBtn1.onclick=nField;
        function nField(){
            deadLine.type='text';
            deadLine.placeholder = 'Select End date';

            // Switch to 'date' on focus
            deadLine.addEventListener('focus', function() {
                deadLine.type = 'date';
            });

            // If the user doesn't select a date, switch back to 'text'
            deadLine.addEventListener('blur', function() {
                if (deadLine.value === '') {
                    deadLine.type = 'text';
                }
            });

            
            nextBtn2.innerText = 'Save';
            nextBtn2.className='nextBtn';
            fieldContainer.appendChild(deadLine);
            fieldContainer.appendChild(nextBtn2);
            nextBtn1.remove();
            nextBtn2.onclick=save;
            function save() {
                const btn = document.getElementById('new');
                btn.style.display = 'block';

                // Remove the input fields and buttons
                nextBtn2.remove();
                newField1.remove();
                startDate.remove();
                deadLine.remove();

                // Create and append the storageDiv if it doesn't exist
                let storageDiv = document.querySelector('.storage');
                if (!storageDiv) {
                    storageDiv = document.createElement('div');
                    storageDiv.className = 'storage';
                    document.body.appendChild(storageDiv); 
                    localStorage.setItem('storageDiv', 'true');
                }

                // Store task data
                let task = {
                    newField1: newField1.value,
                    startDate: startDate.value,
                    deadLine: deadLine.value
                };

                // Create task container and append task data
                const taskContainer = document.createElement('div');
                taskContainer.className = 'taskcontainer';
                storageDiv.appendChild(taskContainer);

                taskContainer.textContent = `Task:  ${task.newField1}, Start Date: ${task.startDate}, Deadline: ${task.deadLine}`;
                localStorage.setItem('tasks', JSON.stringify(task));
            }
        }
    }
}

function restoreDiv() {
    if (localStorage.getItem('storageDiv')) {
        const storageDiv = document.createElement('div');
        storageDiv.className = 'storage'; 
        document.body.appendChild(storageDiv); 
        const task = JSON.parse(localStorage.getItem('tasks'));

        if (task) {
            const taskContainer = document.createElement('div');
            taskContainer.className = 'taskcontainer';
            storageDiv.appendChild(taskContainer);
            taskContainer.textContent = `Task: ${task.newField1}, Start Date: ${task.startDate}, Deadline: ${task.deadLine}`;
        }
        console.log(task);
    }
}
restoreDiv();

const btn = document.getElementById('new');
let isClicked = false;
btn.addEventListener('click', function() {
    isClicked = true;

    if (isClicked) {
        btn.style.display='none';
    }
});
