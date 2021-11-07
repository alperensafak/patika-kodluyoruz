let todo = document.getElementById("task")
let addButton = document.getElementById("liveToastBtn")
let listDOM = document.getElementById("list")

let list = document.querySelector('ul')
list.addEventListener('click', function (check) {
    if (check.target.tagName === 'LI') {
        check.target.classList.toggle('checked')
    }
})

addButton.addEventListener("click", () => {
    if (todo.value) {
        loadStorage(todo.value)
        const listItem = document.createElement("li")
        const valueItem = document.createElement('span');
        const deleteItem = document.createElement("span")
        deleteItem.classList.add("close");
        deleteItem.innerHTML = "X"
        valueItem.classList.add('value');
        valueItem.innerHTML = todo.value
        listItem.append(valueItem);
        listItem.append(deleteItem)
        listDOM.append(listItem)
        todo.value = ""

        deleteItem.onclick = function (e) { deleteByElement(e); }
        $(".success").toast("show");
    } else {
        $(".error").toast("show");

    }
})

function deleteByElement(e) {
    let parent = e.target.parentElement;
    let value = parent.getElementsByClassName('value')[0].textContent.trim();
    dltStorage(value);
    parent.remove()
}


function loadStorage(prm) {
    let str = JSON.parse(localStorage.getItem("todo"))
    let toDos;
    if (!str) {
        toDos = []
    } else {
        toDos = getStorage()
    }
    toDos.push(prm)
    localStorage.setItem("todo", JSON.stringify(toDos))
}

function getStorage() {
    let toDo = JSON.parse(localStorage.getItem("todo"))
    return toDo;
}


function loadedPage() {
    let toDo = getStorage();
    if (toDo) {
        let html
        for (let i = 0; i < toDo.length; i++) {
            html = `<li>
            <span class="value">${toDo[i]}</span>
            <span class="close">X</span>
            </li>`
            listDOM.innerHTML += html
        }
    }
}

function dltStorage(prm) {
    let toDo = getStorage()
    toDo.forEach((element, id) => {
        if (element === prm) {
            toDo.splice(id, 1);
        }
    })
    localStorage.setItem("todo", JSON.stringify(toDo))
}

(function() {
    let close = document.getElementsByClassName("close")
    let i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = (e) => deleteByElement(e);
    }
})();

loadedPage()