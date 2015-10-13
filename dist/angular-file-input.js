(function () {
  'use strict';
  angular.module('angularFileInput', [])
  .directive('ngFileInput', ['$compile', '$http', '$templateCache', '$parse', function ($compile, $http, $templateCache, $parse) {
    return {
      restrict: 'E',
      require: '?ngModel',
      scope: {
        callback: '&',
        mode: '@',
        tmpl: '='
      },
      template: '<input ng-hide="tmpl" type="file" />',
      link: function (scope, elem, attrs, ngModel) {
        var input = elem.find('input')[0];
        var modeRef = {
          'array-buffer': 'ArrayBuffer',
          'binary-string': 'BinaryString',
          'data-url': 'DataURL',
          'text': 'Text'
        };
        function parse (c) {
          var f = c.split('data:')[1];
          var splited = f.split(';');
          var mimetype = splited[0] || 'text/plain';
          var secondSplit = splited[1].split(',');
          var encoding = secondSplit[0]
          var content = secondSplit[1];
          return {
            mimetype: mimetype,
            encoding: encoding,
            content: content
          };
        }
        function readSingleFile (evt) {
          var f = evt.target.files[0]; 
          if (f) {
            var r = new FileReader();
            r.onload = function (e) { 
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
              if (ngModel) {
                ngModel.$setViewValue(file);
              }
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
        if (scope.tmpl) {
          $http.get(scope.tmpl, {
            cache: $templateCache
          }).then(function(result) {
            var html = result.data;
            var el = angular.element(html);
            el[0].onclick = function () {
              input.click();
            };
            $compile(el)(scope);
            elem.append(el);
          });
        }
      }
    }
  }]);
}).call(this);