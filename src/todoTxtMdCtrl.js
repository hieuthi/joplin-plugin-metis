const TodoTxt = require('todotxt-parser-js');

function plugin(CodeMirror) {
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
				];
			},
		}
	}
}