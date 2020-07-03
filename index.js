import _ from "lodash";


let input = document.querySelector('.list_input');
let button = document.querySelector('.list_add_button');
let list = document.querySelector('.to_do_list');
let content = document.querySelector('.to_do_list_content');

// reset test
const reset = document.querySelector('.reset_b');

const to_do_list = Array();



if (to_do_list.length == 0) {
    list.style.display = 'none';
}
else if (to_do_list.length > 0) {
    list.style.display = 'block';
}

// put input in the to-do list
const add_list = () => {
    if (input != null) {
        if (!to_do_list.includes(input.value)) {
            
            // insert the input in the list (UI)
            //const list_content = `<li class="to_do_list_content">${input.value}</li>`;

            var list_content = document.createElement("li");
            list_content.className = "to_do_list_content";
            list_content.textContent = input.value;
            list.appendChild(list_content);
            

            var span = document.createElement("SPAN");
            var txt = document.createTextNode("\u00D7");

            span.className = "delete";
            span.appendChild(txt);
            list_content.appendChild(span);

            //<span class="delete">&times;</span>

            //to_do_list.push(list_content);
            to_do_list.push(input.value);
            list.style.display = 'block';
            

            // store input in the database
            //window.localStorage.setItem("tasks", to_do_list.join(" "));
            window.localStorage.setItem("tasks", to_do_list);
            console.log(to_do_list);
            console.log(localStorage);
        }
        else {
            alert('You have not finished this thing.');
        
        // make same list bounce to alert

        //const n = to_do_list.indexOf(input.value);
        //document.getElementsByClassName('to_do_list_content')[n]
        //.setAttribute('data-micron', 'bounce');
        }
    }
    
    input.value = '';
}

const d_button = document.querySelector('.delete');

// Insert input with button and enter key
button.addEventListener('click', add_list);
input.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        add_list();
    }
});

const done_list = (content) => {
    // make it done with clicking
    if (content.target.tagName === 'LI') {
        content.target.classList.toggle('checked');
    }   
}

const condition = (word) => {
    return (word);
}

const delete_list = (content) => {
    var span = content.target;
    if (span.tagName === 'SPAN') {
        var list_value = span.parentElement.childNodes[0];
        var i = to_do_list.indexOf(span.parentElement.childNodes[0]);
        console.log(list_value);
       // console.log(i);
        to_do_list.filter(condition(list_value));
        var r = _.remove(array, function(n) {
            return (n != list_value);
          });
        //window.localStorage.setItem("tasks", to_do_list.join(" "));
        window.localStorage.clear();
        window.localStorage.setItem("tasks", to_do_list);
        console.log(localStorage);
        console.log(to_do_list);

        content.target.parentElement.style.display = 'none';

    }

    if (to_do_list.length == 0) {
        list.style.display = 'none';
    }
}

list.addEventListener('click', done_list, false);
list.addEventListener('click', delete_list);



const readList = () => {
    if (window.localStorage.getItem("tasks") == null) {
        console.log("db is empty");
    }
    
    else {
        var savedDb = localStorage.getItem("tasks");

        if (savedDb) this.to_do_list = savedDb;
        //to_do_list.push(savedDb);
        //list.innerHTML += savedDb;
        list.style.display = 'block';

        for (var i = 0; i < to_do_list.length; i++) {
            list.innerHTML += '<li class="to_do_list_content">' +
            to_do_list[i] + '<span class="delete">&times;</span></li>';
            
        }
        console.log(to_do_list);
        console.log(localStorage);
       // list.insertAdjacentHTML('beforeend', savedDb);
    }

}


reset.addEventListener('click', function() {
    window.localStorage.clear();
    for (var i = 0; i < to_do_list.length; i++) {
        to_do_list.shift();
    }
    list.style.display = 'none';

});

window.onload = readList();





