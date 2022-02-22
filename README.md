# Metis

Metis is an open-source Task Manager Plugin for Joplin based on Todo.txt specification.

[Todo.txt](http://todotxt.org/) format is chosen as it provides a reliable fallback when the plugin is not available for use (for example when using Joplin Mobile).

Metis is currently in development, more features and fixes will be added in the future but as it is a hobby project it will take a while.
If you found a bug or want to request a feature you can put it in [issues](https://github.com/hieuthi/joplin-plugin-metis/issues). As I want to keep Metis simple, elaborated features will unlikely be implemented.

![screencap](https://raw.githubusercontent.com/hieuthi/joplin-plugin-metis/main/docs/metis-v0.1.1-screencap.gif)

## Usage
Current version only has a handful of features but it is enough to realize a basic task manager application:
- Render fenced text into HTML-based Todo List by adding `todotxt` (or `archive-todotxt`) as language
- Todo.txt language mode for CodeMirror fenced text
- Inline markdown and HTML tags can be rendered inside the block
- Todo Item Actions:
  - Toggle checkbox to change the completion status of a task
  - Change priority directly with rendered html
  - Select button to select source text
- Sorting: syntax `sort:<field>:<order>` with `<order>` take value `asc` or `desc` and can be omitted to fallback to a default value. Current version supports these `<field>`: `status`, `priority`, `creationDate`, `completionDate`, and `default`. The `sort:default` is a magic keyword that will be turned into `sort:priority:desc sort:status:asc`.
- Filtering: syntax `filter:<field>:<value1>,<value2>`. Current supported `<field>` are: `status` (`x` or `o`), `priority` (`A`, `B`,..., `~`), `project`, and `context`. In case of `project` and `context` you can omit `+` and `@` from your keywords.
- You can add multiple sorting and filtering queries to narrow down your list.

## Tips & Tricks

### Compact View
You can make the List View more compact by hiding the completion/creation date panel and only show them when mouse is hovering. Just parsing these into your `userstyle.css`. 
```css
li.todo span.todo-panel {
  margin: 0;
  height: 0;
  overflow: hidden;
  transition: height 0.2s ease-out;
}
li.todo:hover span.todo-panel {
  height: 14px;
}
```
You may have to adjust `height: 14px;` depend on your font-size. Note that CSS animation based on height can be a computing intensive task so don't do this if you have very long note.

### Quickly Input Todo Items
Typing a todo item can be tiresome as you have to type special characters like `(`, `)`, and ISO datetimes. However, it is recommended that you will type `creationDate` instead of skipping it as this provides another dimension when you have to review your todo list. Moreover the plugin will automatically fill in `completionDate` if it found the item already has `creationDate` when you toggle the checkbox.

To make typing todo item easier, I have published [Slash Command plugin for Joplin](https://github.com/hieuthi/joplin-plugin-slash-commands). Basically you can type `/todoa`, `/todob`, `/todoc`, `/todod`, or `/todoe` and the Slash Command plugin will unroll it into respective priority and with the current datetime in ISO format for `creationDate`.

### Archive Todo.txt
Using `archive-todotxt` language plate for in-active todo list. There is no different between it and `todotxt`, but it helps searching for active list a lot easier.

Version 0.1.4 and above add a todo.txt language  mode defined for CodeMirror editor which highlight todo.txt syntax. If you don't want syntax highlight you can use archive-todotxt instead of todotxt language plate.

### Line-through Done Items (Editor)
Default stylesheet simply assigns a faded color to done todo items but you can also line-through them by adding following style to your `userchrome.css`:
```css
.cm-todo-done {
    text-decoration: line-through;
}
```

## Library
I have developed and published an open-source javascript library for parsing todo.txt format as a component of this project [todotxt-parser-js](https://github.com/hieuthi/todotxt-parser-js).

## License
[MIT](https://raw.githubusercontent.com/hieuthi/joplin-plugin-metis/main/LICENSE)
