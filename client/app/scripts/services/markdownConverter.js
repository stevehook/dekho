'use strict';

angular.module('dekho')
  .service('MarkdownConverter', function() {
    this.toHTML = function (markdownContent) {
      return markdown.toHTML(markdownContent);
    };
  });


