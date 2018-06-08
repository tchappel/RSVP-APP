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

    /*Function that creates a new DOM Element, 
    assigns it a property with some value, 
    then return the new DOM Element; */ 
    const create_new_DOM_element = (element_type, element_property, property_value) =>{
    const element = document.createElement(element_type);
    element[element_property] = property_value;
    return element;
    }

    const li = document.createElement('li');

    /*Function that creates a new DOM Element, 
    assigns it a property with some value,
    appends the new DOM Element to the list item li, 
    then return the new DOM Element; */ 
    const append_to_li = (element_type, element_property, property_value) =>{
        const element = create_new_DOM_element(element_type, element_property, property_value);
        li.appendChild(element);
        return element;
    }    
    
    append_to_li('span', 'textContent', text);
    append_to_li('label', 'textContent', 'Confirmed')
        .appendChild(create_new_DOM_element('input', 'type', 'checkbox'));
    append_to_li('button', 'textContent', 'edit');  
    append_to_li('button', 'textContent', 'remove');    
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


// DELETE or EDIT/SAVE LIST ITEMS: Event Handler that listens for click on the list item remove, edit and save buttons;

ul.addEventListener('click', (e) =>{

    if (e.target.tagName == 'BUTTON'){
        const button = e.target;
        li = button.parentNode;
        const remove_li = () => ul.removeChild(li);
        const edit_name = () => {
            const span = li.firstElementChild;
            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.value = span.textContent;
            li.insertBefore(newInput, span);
            li.removeChild(span);
            button.textContent = 'save';
        }
        const save_name = () => {
            const newInput = li.firstElementChild;
            const span = document.createElement('span');
            span.textContent = newInput.value;
            li.insertBefore(span, newInput);
            li.removeChild(newInput);
            button.textContent = 'edit';
        }
        if(button.textContent == 'remove'){            
            remove_li();
        } else if (button.textContent == 'edit'){
            edit_name();
        } else if (button.textContent == 'save'){
            save_name();
        }
    }
});


// Event Handler that filters out invitees that are not confirmed, and sets their display property as "none";

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