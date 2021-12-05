document.addEventListener('joplin-noteDidUpdate', makeTodoViewActionable );

if (/WebKit/i.test(navigator.userAgent)) { // sniff
		var _timer = setInterval(function() {
				if (/loaded|complete/.test(document.readyState)) {
						makeTodoViewActionable()
				}
		}, 10);
}

function makeTodoViewActionable() {
	if (_timer) clearInterval(_timer);

	const todoTxts = document.getElementsByClassName('todotxt');
	for (var i=0; i<todoTxts.length; i++){
		const todoTxt = todoTxts[i];
		const todos = todoTxt.getElementsByClassName('todo');
		for (var j=0; j<todos.length; j++){
			const todo    = todos[j];
			const lineIdx = todo.getAttribute("data-lineIdx");

			const checkbox   = todo.getElementsByClassName('todo-checkbox')[0].getElementsByTagName('input')[0];
			const editButton = todo.getElementsByClassName('todo-edit')[0];

			checkbox.onclick = function (){ 
				setTimeout(()=> {webviewApi.postMessage('todoTxtMd', `toggleStatus:${lineIdx}`)}, 170);
			}
			editButton.onclick = function () {
				webviewApi.postMessage('todoTxtMd', `selectLine:${lineIdx}`);
			}
		}
	}
}