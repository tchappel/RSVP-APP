//Global Variables ------------------------------------------------------------------

const form = document.getElementById('registrar');
const input = document.querySelector('input');
const mainDiv = document.querySelector('.main');

const ul = document.getElementById('invitedList');

const div = document.createElement('div');
const filterLabel = document.createElement('label');
filterLabel.textContent = "Hide the invitees who haven't responded";
const filterCheckbox = document.createElement('input');
filterCheckbox.type = 'checkbox';
filterLabel.appendChild(filterCheckbox);
div.appendChild(filterLabel);
mainDiv.insertBefore(div, ul);


//Function that creates a list item for each invited person, with this HTML structure: 
/*    
    <li>
        <span>Invitee Name</span>
        <label>Confirmed<input type="checkbox"></label>
        <button>edit</button>
        <button>remove</button>
    </li>
*/

const createListItem = (text) => {
    const li = document.createElement('li');
    const span = document.createElement('span')
    span.textContent = text;
    li.appendChild(span);
    const label = document.createElement('label');
    label.textContent = 'Confirmed';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    label.appendChild(checkbox);
    li.appendChild(label);
    const editButton = document.createElement('button');
    editButton.textContent = 'edit';
    li.appendChild(editButton);
    const removeButton = document.createElement('button');
    removeButton.textContent = 'remove';
    li.appendChild(removeButton);
    return li;
}


// Event handler that adds list item (as described above) to the <ul>, when user clicks submit button

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let text = input.value;
    input.value = '';
    const li = createListItem(text);    
    ul.appendChild(li);        
});


//Event handler that listen for checkbox state and toggles class 'responded' to the corresponding list item
// the class 'responded' is linked to CSS rules that give a glowing outline to the list item;

ul.addEventListener('change', (e) => {
    const checkbox = e.target;
    let checked = checkbox.checked;
    const li = checkbox.parentNode.parentNode;
    if(checked){
        li.className = 'responded';
    } else {
        li.className = '';
    }
});


// DELETE or EDIT LIST ITEMS: Event Handler that listens for click on the list item remove, edit and save buttons;

ul.addEventListener('click', (e) =>{

    if (e.target.tagName == 'BUTTON'){
        const button = e.target;
        li = button.parentNode;
        if(button.textContent == 'remove'){            
            ul.removeChild(li);
        } else if (button.textContent == 'edit'){
            const span = li.firstElementChild;
            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.value = span.textContent;
            li.insertBefore(newInput, span);
            li.removeChild(span);
            button.textContent = 'save';
        } else if (button.textContent == 'save'){
            const newInput = li.firstElementChild;
            const span = document.createElement('span');
            span.textContent = newInput.value;
            li.insertBefore(span, newInput);
            li.removeChild(newInput);
            button.textContent = 'edit';
        }
    }
});

filterCheckbox.addEventListener('change', (e) => {
    let isChecked = e.target.checked;
    const list = ul.children;
    if (isChecked){
        for (let i = 0; i < list.length; i++){
            let li = list[i];
            if(li.className !== 'responded') {
                li.style.display = 'none';
            }
        }
    } else {
        for (let i = 0; i < list.length; i++){
            let li = list[i];
            li.style.display = 'block';
        }
    }
       
});