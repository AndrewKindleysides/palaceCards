var fs = require('fs'),
    handlebars = require('handlebars');

module.exports = function (res, model, template) {
    fs.readFile(template, 'utf-8', function (error, source) {
        var template = handlebars.compile(source);
        var html = template(model);
        res.send(html);
    });
}
