let array = [];

let filterState = "all";

document.getElementById("filter_state").addEventListener("change", changeFilterState);

function changeFilterState(event) {
  filterState = event.target.value;

  List();
}

document.getElementById("delete_all").addEventListener("click", deleteAll);

function deleteAll() {
  array.splice(0, array.length);
  List();
}


document.getElementById("delete_completed").addEventListener("click", deleteCompleted);

function deleteCompleted() {
  for (let i = array.length - 1; i >= 0; i--) {
    const task = array[i];
    if (task.state === "completada") {
      array.splice(i, 1);
    }
  }

  List();
}


document.getElementById("add").addEventListener("click", addTask);

function addTask() {
  if (array.length >= 5) {
    alert("Tienes demasiadas tareas, ¡termina una antes!");
    return;
  }

  const inputNameTask = document.querySelector("#name_task");

  if (array) {
    addTasktoList({
      text: inputNameTask.value,
      state: "pending"
    });
  }

  inputNameTask.value = "";
  inputNameTask.setAttribute("placeholder", "Más tareas, ñam, ñam!");
}

function addTasktoList(task) {
  array.push(task);

  List();
}
function eliminate() {
  this.parentElement.remove();
  
};

List();

function List() {
  const ul = document.getElementsByTagName("ul")[0];
  ul.innerHTML = "";

  for (const task of array) {
    if (filterState === "all" || filterState === task.state) {
      const li = document.createElement("li");
      li.className="listName";
      const spanTexto = document.createElement("span");
      spanTexto.appendChild(document.createTextNode(task.text));
      spanTexto.classList.add("content");
      li.appendChild(spanTexto);

      spanTexto.onclick = function () {
        if (task.state === "pending") {
          task.state = "completed";
        } else {
          task.state = "pending";
        }

        List();
      };

      if (task.state === "completed") {
        li.classList.add("completed");
      }

      const span = document.createElement("span");

      span.onclick = function () {
        const newArray = [];

        for (let i = 0; i < array.length; i++) {
          if (array[i] !== task) {
            newArray.push(task);
          }
        }

        array = newArray;
        List();
      };

      span.className = "close";

      span.appendChild(document.createTextNode("\u00D7"));
      span.onclick = eliminate;

      li.append(span);
      ul.appendChild(li);
    }
  }
}
List();