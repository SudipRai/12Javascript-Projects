// ****** SELECT ITEMS **********

const alert=document.querySelector(".alert");
const form=document.querySelector(".grocery-form");
const grocery=document.getElementById("grocery")
const submitBtn=document.querySelector(".submit-btn")
const container=document.querySelector(".grocery-container")
const list=document.querySelector(".grocery-list")
const clearBtn=document.querySelector(".clear-btn")

// edit option
let editElement;
let editFlag=false;
let editId=""

// ****** EVENT LISTENERS **********
form.addEventListener("submit", addItem)
clearBtn.addEventListener("click",clearItems)



// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault()
    const value=grocery.value
    console.log(value)
    const id=new Date().getTime().toString()
    if(value && !editFlag){
        const element=document.createElement("artcle")
        element.classList.add("grocery-item")
        const attr=document.createAttribute("data-id")
        attr.value=id
        element.setAttributeNode(attr);
        element.innerHTML=` <p class="title">${value}</p>
        <div class="btn-container">
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>`
        const deleteBtn=element.querySelector(".delete-btn")
        const editBtn=element.querySelector(".edit-btn")
        deleteBtn.addEventListener("click",deleteItem)
        editBtn.addEventListener("click",editItem)

        list.appendChild(element)
        displayAlert("item added","success")
        container.classList.add("show-container")
        addtoLocalStorage(id,value)
        setBacktoDefault()
    }
    else if(value && editFlag){
        editElement.innerHTML=value
        displayAlert("value changed","success")
        editLocalStorage(editId,value)
        setBacktoDefault()
    }
    else{
        displayAlert("Enter Value", "danger")
    }
}


function clearItems(){
    const items=document.querySelectorAll(".grocery-item")
    if(items.length>0){
        items.forEach(function(item){
            list.removeChild(item)
        })
    }
    container.classList.remove("show-container")
    displayAlert("empty list", "danger")
    setBacktoDefault()
    localStorage.removeItem("list")
}

// display alert
function displayAlert(text,action){
    alert.textContent=text
    alert.classList.add(`alert-${action}`)
    setTimeout(function(){
        alert.textContent=""
        alert.classList.remove(`alert-${action}`)
    },1000)
}


function deleteItem(e){
    const element=e.currentTarget.parentElement.parentElement
    const id=element.dataset.id
    list.removeChild(element)
    if(list.children.length===0){
        container.classList.remove("show-container")
    }
    displayAlert("item removed", "danger")
    setBacktoDefault()
    removeFromLocalStorage(id)

}
function editItem(e){
    const element=e.currentTarget.parentElement.parentElement
    editElement=e.currentTarget.parentElement.previousElementSibling
    grocery.value=editElement.innerHTML
    editFlag=true
    editId=element.dataset.id
    submitBtn.textContent="Edit"

}

function setBacktoDefault(){
    grocery.value=""
    editFlag=false;
    editId=""
    submitBtn.textContent="submit"
}
// ****** LOCAL STORAGE **********

function addtoLocalStorage(id,value){

}

function removeFromLocalStorage(id){

}

function editLocalStorage(id,value){

}

// ****** SETUP ITEMS **********
