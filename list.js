// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}
// Load tasks from LocalStorage
document.addEventListener("DOMContentLoaded", loadTasks);

// Add a close button and click event to each existing list item
function initializeListItem(item) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    item.appendChild(span);

    span.onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
        saveTasks();
    };

    item.addEventListener('dblclick', function () {
        let newText = prompt("Edit your task:", item.firstChild.textContent.trim());
        if (newText) {
            item.firstChild.textContent = newText;
            saveTasks();
        }
    });
}

// Save tasks to LocalStorage
function saveTasks() {
    var tasks = [];
    var items = document.querySelectorAll("#myUL li");
    items.forEach(item => {
        tasks.push({ text: item.firstChild.textContent.trim(), checked: item.classList.contains("checked") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from LocalStorage
function loadTasks() {
    var savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        var li = document.createElement("li");
        li.textContent = task.text;
        if (task.checked) li.classList.add("checked");
        document.getElementById("myUL").appendChild(li);
        initializeListItem(li);
    });
}

// Add a new task
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("myUL").appendChild(li);
        initializeListItem(li);
        saveTasks();
    }
    document.getElementById("myInput").value = "";
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        saveTasks();
    }
}, false);