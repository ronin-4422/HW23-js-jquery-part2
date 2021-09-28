let input = $('#input');
let $todoList = $('.to-do-list');
let $create = $('#create');
 function createTodos(todos) {
    let list = $.map(todos, (elem) => {
        let status = elem.completed === false ? "in-progress" : "confirmed"
        return `<li class="${status}" data-id="${elem.id}" data-title="${elem.title}" data-complited="${elem.completed}">${elem.title}<button type="submit" id="delete">delete</button></li>`
    });
    $create.html(list);
};


let getTodos = $.get('http://localhost:3000/todos', function() {
	console.log('success');
})

.done(function(todos){
createTodos(todos);	
})

.fail(function(){
    console.log('error');
})

function eventTodos(e){
	e.preventDefault();
	let value = input.attr('value');
	console.log(value);

	post = {
		"title": value,
		"completed": false
	}
	
	let lastElementId = getTodos.responseJSON[getTodos.responseJSON.length-1].id;
	 li = `<span><li id = ${lastElementId+1} data-id = ${lastElementId+1} data-status = ${post.completed} class = "notDone"> ${post.title}</li><button id = ${lastElementId+1} class = "deleteButton">X</button></span>`;

	 let allList = $('#create').html();
	 allList += li;
	
	 $('#create').html(allList);

	addTodo(post);
	input.val('');

}

function addTodos(){
	$.ajax( {
        url: "http://localhost:3000/todos",
        type: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
		data: {
            "title": input.value,
            "completed": false
        } 
	})
}

$('.to-do-list').on('click', () => {
    if (e.target.tagName === 'LI') {
        let elemId = e.target.getAttribute('data-id')
        let elemTitle = e.target.getAttribute('data-title')
        $.ajax({
            type: "PUT",
            url: "http://localhost:3000/todos/"+elemId,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            data: {
                "title": `${elemTitle}`,
                "completed": true
            }
            
        })
    }
})

$('.to-do-list').on('click', (e) => {
    e.preventDefault();
    if (e.target.tagName === 'BUTTON') {
        let elemId = e.target.closest('li').getAttribute('data-id')
        $ajax( {
            type: "DELETE",
		    url: "http://localhost:3000/todos/"+elemId,
		    success: () => {console.log('item deleted')},
		    error: (error) => {console.log('error', error)}
        })
    }
})

