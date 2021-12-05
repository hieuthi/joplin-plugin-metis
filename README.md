# Metis

Metis is an open-source Task Manager Plugin for Joplin based on [Todo.txt]((http://todotxt.org/)) specification.

Todo.txt format is chosen as it provides a reliable fallback when the plugin is not available for use (for example when using Joplin Mobile).

Metis is currently in development, more features and fixes will be added in the future but as it is a hobby project it will take a while.
If you found a bug or want to request a feature you can put it in [issues](https://github.com/hieuthi/joplin-plugin-metis/issues). As I want to keep Metis simple, elaborated features will unlikely be implemented.

![screencap](https://raw.githubusercontent.com/hieuthi/joplin-plugin-metis/main/docs/metis-v0.1.1-screencap.gif)

## Usage
Current version only has a handful of features but it is enough to realize a basic task manager application:
- Render fenced text into HTML-based Todo List by adding `todotxt` as language
- Inline markdown and HTML tags can be rendered inside the block
- Checkbox to toggle the completion status of a task
- Sorting: syntax `sort:<field>:<order>` with `<order>` take value `asc` or `desc` and can be omitted to fallback to a default value. Current version supports these `<fields>`: `status`, `priority`, `creationDate`, `completionDate`, and `default`. The `sort:default` is a magic keyword that will be turned into `sort:priority:desc sort:status:asc`.
- Filtering: syntax `filter:<field>:<value1>,<value2>`. Current supported `<field>` are: `status` (`x` or `o`), `priority` (`A`, `B`,..., `~`), `project`, and `context`. In case of `project` and `context` you can omit `+` and `@` from your keywords.
- You can add multiple sorting and filtering queries to narrow down your list.

## Library
I have developed and published an open-source javascript library for parsing todo.txt format as a component of this project [todotxt-parser-js](https://github.com/hieuthi/todotxt-parser-js).

## License
[MIT](https://raw.githubusercontent.com/hieuthi/joplin-plugin-metis/main/LICENSE)
