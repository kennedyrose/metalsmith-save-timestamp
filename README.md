# metalsmith-save-timestamp

Metalsmith plugin to save file timestamps as the date in gray matter content.

## Installation

```
$ npm install metalsmith-save-timestamp
```

## Usage

```
const metalsmith = require('metalsmith')
const saveFileTimestamp = require('metalsmith-save-timestamp')

metalsmith(__dirname)
	.use(saveFileTimestamp())
```

You can configure the plugin by passing an object containing options:

```
metalsmith(__dirname)
	.use(saveFileTimestamp(
		pattern: [ 'category/*' ],
		overrideDate: false,
		lastModified: false
	))
```

## Options

- `pattern ` **Array/String** A glob pattern for files to be included. (Default: [ '*\*/\*' ])
- `overrideDate ` **Boolean** Set to true to replace the date field even if it already exists in gray matter. (Default: false)
- `lastModified ` **Boolean** Set to true to also set the `modified` attribute in gray matter. (Default: false)