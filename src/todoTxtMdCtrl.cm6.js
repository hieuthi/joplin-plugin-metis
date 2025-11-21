const TodoTxt = require('todotxt-parser-js');
const { EditorSelection } = require("@codemirror/state");

function plugin(CodeMirror) {
	if (CodeMirror.cm6 == null)
		return;

	CodeMirror.defineExtension('todoTxtAction', function (message) {
		const editor = CodeMirror.editor;
		const params = message.split(':');

		var lineIdx = parseInt(params[1]) + 1; // Lines in CM6 are 1-indexed
		var line = editor.state.doc.line(lineIdx);

		switch (params[0]) {
			case 'toggleStatus':
				toggleStatus(editor, line);
				break;
			case 'changePriority':
				changePriority(editor, line, params[2]);
				break;
			case 'selectLine':
				selectLine(editor, line);
				break;
			default:
				break;
		}
	});
}

function toggleStatus(editor, line) {
	var todo = TodoTxt.parseLine(line.text);
	if (todo.isCompleted()) {
		if (todo.getCompletionDate()) {
			todo.setCompletionDate(null);
		}
		todo.unsetCompleted();
	} else {
		if (todo.getCreationDate()) {
			const datetime = (new Date()).toISOString();
			todo.setCompletionDate(datetime.slice(0, 10));
		}
		todo.setCompleted();
	}

	editor.dispatch({
		changes: {
			from: line.from,
			to: line.to,
			insert: todo.toString(),
		}
	});
}

function changePriority(editor, line, priority) {
	var todo = TodoTxt.parseLine(line.text);
	todo.setPriority(priority == '~' ? null : priority);
	editor.dispatch({
		changes: {
			from: line.from,
			to: line.to,
			insert: todo.toString(),
		}
	});
}

function selectLine(editor, line) {
	editor.dispatch({
		selection: EditorSelection.single(line.from, line.to),
		scrollIntoView: true,
	});
}

module.exports = {
	default: function (_context) {
		return {
			plugin: plugin,
			codeMirrorResources: [],
			codeMirrorOptions: {},
			assets: function () {
				return [
					{
						mime: "text/css",
						inline: true,
						text: `.cm-todo-done, .cm-todo-meta, .cm-todo-date { color: var(--joplin-color-faded);}
							.cm-todo-priority { font-weight: bold; }
							.cm-todo-prior-A { color: rgb(247, 210, 110); font-weight: bold; }
							.cm-todo-prior-B { color: rgb(152, 104, 1); font-weight: bold; }
							.cm-todo-prior-C { color: rgb(80, 161, 79); font-weight: bold; }
							.cm-todo-prior-D { color: rgb(21, 91, 218); font-weight: bold; }
							.cm-todo-project { background-color: rgb(247, 210, 110); color: black}
							.cm-todo-context { color: rgb(152, 104, 1) }
						`
					}
				];
			},
		}
	}
}

