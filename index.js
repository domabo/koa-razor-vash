/**
 * Module dependencies.
 */
var vash = require('vash');
var path = require('path');

/**
 * Add a render() method to koa that allows
 * you to render almost any templating engine.
 *
 * Example:
 *
 *   app.use(views('./example', {
 *     html: 'underscore'
 *   }));
 *
 *   // in your route handler
 *   this.body = yield this.render('index');
 *
 * @param {String} path
 * @param {String} ext (optional)
 * @param {Object} opts (optional)
 * @return {Function} middleware
 * @api public
 */

module.exports = function (dir) {
 
  // get render function
  renderFn = render(dir);

  // middleware
  return function *views(next) {
    this.render = renderFn;

    yield next;
  }
}

/**
 * Determine `render()` function.
 * 
 * @param {String} path
 * @param {Object} opts
 * @return {Generator} view
 * @api private
 */

function render (dir) {
   return function (view,  model){
      var options = model || [];
       options.settings = [];
       options.settings.views=dir;
       options.settings["view engine"]="vash.html";
       
     return function(callback){
         vash.renderFile(view, options, callback);
      }
   }
}
