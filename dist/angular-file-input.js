(function () {
	'use strict';
	angular.module('angularFileInput', [])
	.directive('ngFileInput', function () {
		return {
			restrict: 'E',
			scope: {
				callback: '&',
				mode: '@'
			},
			template: '<input type="file" />',
			link: function (scope, elem, attrs) {
				var input = elem.find('input')[0];
				var modeRef = {
					'array-buffer': 'ArrayBuffer',
					'binary-string': 'BinaryString',
					'data-url': 'DataURL',
					'text': 'Text'
				};
				function parse (c) {
					var f = c.split('data:')[1];
					var mimetype = f.split(';')[0];
					var encoding = f.split(';')[1].split(',')[0]
					var content = f.split(';')[1].split(',')[1];
					return {
						mimetype: mimetype,
						encoding: encoding,
						content: content
					};
				}
				function readSingleFile(evt) {
					var f = evt.target.files[0]; 
					if (f) {
						var r = new FileReader();
						r.onload = function(e) { 
							var contents = e.target.result;
							var file = {};
							if (scope.mode == 'data-url') {
								file = parse(contents);
							} else {
								file.content = contents
							}
							file.name = f.name;
							file.size = f.size;
							scope.content = file;
							scope.callback({
								file: file
							});
							scope.$apply();
						};
						if (!scope.mode) {
							scope.mode = 'data-url';
						}
						if (r['readAs' + modeRef[scope.mode]]) {
							r['readAs' + modeRef[scope.mode]](f);
						}
					}
				}
				input.addEventListener('change', readSingleFile, false);
			}
		}
	});
}).call(this);