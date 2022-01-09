const TodoTxt = require('todotxt-parser-js');

function plugin(CodeMirror) {
	const mode = {
		start: [
			{ regex: /\s*x\s.*$/, sol: true, token: "todo-done" },
			{ regex: /\s*\(A\)/, sol: true, token: "todo-prior-A" },
			{ regex: /\s*\(B\)/, sol: true, token: "todo-prior-B" },
			{ regex: /\s*\(C\)/, sol: true, token: "todo-prior-C" },
			{ regex: /\s*\(D\)/, sol: true, token: "todo-prior-D" },
			{ regex: /\s*\([E-Z]\)/, sol: true, token: "todo-priority" },
			{ regex: /(\@[A-Za-z0-9]+)/, sol: true, token: "todo-context" },
			{ regex: /(\s+)(\@[A-Za-z0-9]+)/, token: [null, "todo-context"] },
			{ regex: /(\+[A-Za-z0-9]+)/, sol: true, token: "todo-project" },
			{ regex: /(\s+)(\+[A-Za-z0-9]+)/, token: [null,"todo-project"] },
			{ regex: /(\s+)([A-Za-z][A-Za-z0-9]*:[^\s:]+)*$/, token: [null, "todo-meta"] },
			{ regex: /([1-2]\d{3}[-/\\.](0?[1-9]|1[012])[-/\\.](0[1-9]|[12]\d|3[01]))/, token: "todo-date" },

		],
	}

	CodeMirror.defineSimpleMode("todotxt", mode);
	// CodeMirror.defineSimpleMode("archive-todotxt", mode);

	CodeMirror.defineExtension('todoTxtAction', function(message) {
		const params = message.split(':');
		switch (params[0]){
			case 'toggleStatus':
				var lineIdx = parseInt(params[1]);
				var line    = this.getLine(lineIdx);
				var todo    = TodoTxt.parseLine(line);

				if (todo.isCompleted()) {
					if (todo.getCompletionDate) {
						todo.setCompletionDate(null);
					}
					todo.unsetCompleted();
				} else {
					if (todo.getCreationDate()){
						const datetime = (new Date()).toISOString();
						todo.setCompletionDate(datetime.slice(0,10));
					}
					todo.setCompleted();
				}
				this.replaceRange(todo.toString(),CodeMirror.Pos(lineIdx,0),CodeMirror.Pos(lineIdx,line.length));
				break;
			case 'changePriority':
				var lineIdx  = parseInt(params[1]);
				var priority = params[2] == '~' ? null : params[2];
				var line     = this.getLine(lineIdx);
				var todo     = TodoTxt.parseLine(line);

				todo.setPriority(priority);
				this.replaceRange(todo.toString(),CodeMirror.Pos(lineIdx,0),CodeMirror.Pos(lineIdx,line.length));
				break;
			case 'selectLine':
				var lineIdx = parseInt(params[1]);
				var line    = this.getLine(lineIdx);
				var start   = line.search(/[^\s]/);
				var end     = line.search(/[^\s](?=[\s]*$)/);

				this.setSelection(CodeMirror.Pos(lineIdx,start),CodeMirror.Pos(lineIdx,end+1));
				break;
			default:
				break;

		}
	});
}

module.exports = {
	default: function(_context) {
		return {
			plugin: plugin,
			codeMirrorResources: [],
			codeMirrorOptions: {},
			assets: function() {
				return [
					{	mime: "text/css",
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