#Angular File Input

Simple angular js directive to handle the File Reader API.

## Usage

Check the demo folder (demo/index.html) for examples.

## Installation

```
bower install simple-angular-file-input
```

## Module dependency

```js
angular
.module('app', ['angularFileInput'])
```

Files to be used in production are located in the folder "angular-file-input/dist"

## Including the required files (js and css)

```html
<script src="angular-file-input.min.js"></script> 
```

## Docs

The directive supports three parameters:

- mode: the file reader mode to be used;
- callback: a callback function with the file object
- ng-model: bind the file object to a ng-model (see demo/ngmodel.html)

Available mode options:

- data-url: read file content as data url
- array-buffer: read file content as data buffer
- binary-string: read file content as a binary string
- text: read file content as text/plain 

If you do not provide a mode, it will assume "data-url" as default.

## The File object response

The file object used in the callback function will have the following properties:

- name
- size
- content
- mimetype
- encoding (only available in "data-url" mode)

Samples
-------------------------

```html
<ng-file-input mode="data-url" callback="callback(file)"></ng-file-input>
<ng-file-input mode="data-url" ng-model="file"></ng-file-input>
<ng-file-input mode="array-buffer" callback="callback(file)"></ng-file-input>
<ng-file-input mode="binary-string" callback="callback(file)"></ng-file-input>
<ng-file-input mode="text" callback="callback(file)"></ng-file-input>
```

Custom buttom view
-----------------------
You can specify a template file to be used as the button view, its firts element/node should be a button or a link.

```html
<!-- button.html  -->
<button>Custom Upload Button</button>
```

```html
<ng-file-input mode="data-url" callback="callback(file)" tmpl="'button.html'"></ng-file-input>
```

License
-------------------------
Angular File Input is licensed under MIT License.
