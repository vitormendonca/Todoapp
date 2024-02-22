const btnaddnewtask = document.getElementById('btnnewtask');
const newtasktxt = document.getElementById('newtaskinput');
const ultasks = document.getElementById('ultasklist');
let liArray = [];
let deleteinput;

const addnewtask = () => {
    if(newtasktxt.value !== ''){
        //show ul
        ultasks.classList.remove('d-hidden');
        //create div, li
        const newli = document.createElement('li');
        const newdivlista = document.createElement('div');
        //apend div and li to the ul
        ultasks.appendChild(newdivlista);
        newdivlista.appendChild(newli);
        //set the newli value equals to the txt input value provided
        newli.textContent = newtasktxt.value;   
        //check lyArray items exist, and check if the last element has the same value of the input text value provided
            if(liArray.length > 0){
                liArray.forEach((li) => {
                    if(li.querySelector('li').textContent == newtasktxt.value){
                        alert('this task has already been created');
                    }
                })
            }
        // add newli element to the liArray array
        liArray.push(newdivlista);
        // resets txt input value
        newtasktxt.value = '';  
        // setting class of marging and posistiong to the ul and li
        newli.classList.add('my-2');
        ultasks.classList.add('my-3', 'd-flex','flex-column', 'col-sm-4', 'justify-content-between');
        newdivlista.classList.add('my-1','d-flex','flex-row', 'justify-content-between');
        // create a new element button which will delete the li
        const deleteinput = document.createElement('button');
        deleteinput.textContent =  'x'; 
        deleteinput.classList.add('btn', 'btn-danger', 'mx-1');
        // adding the btn to the newdiv, having li as a sibling;
        newdivlista.appendChild(deleteinput);
    }else{
        alert('Digite sua task.')
    }
}   
btnaddnewtask.addEventListener('click', addnewtask);
newtasktxt.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        addnewtask();
    }
  })


    ultasks.addEventListener('click',(event) => {
        if(event.target.textContent == 'x'){
            liArray.forEach((li) => {
                if(li.querySelector('li').textContent == event.target.previousSibling.textContent){
                  let indexli = liArray.indexOf(li);
                  liArray.splice(indexli,1);
                }
            })
            event.target.parentElement.remove();     
        }    
        if(ultasks.children.length == 0){
            ultasks.classList.remove('d-flex');
            ultasks.classList.add('d-hidden');
        }
    });


const filterInput = document.getElementById('filterinput');

const filterTodos = (filteredtext) => {
    console.log("Filtering with:", filteredtext);
    liArray.forEach((li) => { 
        let taskText = li.textContent.toLowerCase();
        if (taskText.includes(filteredtext)) {
            li.classList.remove('d-none'); // Remove 'd-none' class to show the element
            li.classList.add('d-flex');   // Add 'd-flex' class to ensure it's displayed as a flex item
        } else {
            li.classList.add('d-none');    // Add 'd-none' class to hide the element
            li.classList.remove('d-flex'); // Remove 'd-flex' class to prevent it from being displayed
        }   
    });
}


 
filterInput.addEventListener('keyup', () => {   
    let letters = filterInput.value.trim();
    filterTodos(letters.toLowerCase());   
})  