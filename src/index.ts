import joplin from 'api';
import { ContentScriptType } from "api/types";

joplin.plugins.register({
	onStart: async function() {
		await joplin.contentScripts.register(
			ContentScriptType.MarkdownItPlugin,
			'todoTxtMd',
			'./todoTxtMdRule.js'
		);
		await joplin.contentScripts.register(
			ContentScriptType.CodeMirrorPlugin,
			'todoTxtMdCtrl',
			'./todoTxtMdCtrl.js'
		);
		await joplin.contentScripts.onMessage('todoTxtMd', (message:any) => {
			joplin.commands.execute('editor.execCommand', {
				name: 'todoTxtAction', args: [message]
			});
			joplin.commands.execute('editor.focus');
		});
	},
});
