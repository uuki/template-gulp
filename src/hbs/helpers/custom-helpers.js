// http://assemble.io/docs/Custom-Helpers.html
module.exports.register = function (Handlebars, options)  {
  Handlebars.registerHelper('foo', function (str)  {
    return  str
  })
}