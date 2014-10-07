(function(){
'use strict';

$.fn.serializeObject = function(){
  return this.serializeArray().reduce(function(acum, i){
    acum[i.name] = i.value;
    return acum;
  }, {});
};

var SiteModel = Backbone.Model.extend({
  defaults: {
    url: '',
    title: '',
    tags: ''
  },

  urlRoot: 'http://tiny-pizza-server.herokuapp.com/collections/bookmarks'
});

// var UrlListView = Backbone.View.extend({
//   tagName: 'ul',
//
// });

var FormView = Backbone.View.extend({
  tagName: 'form',

  template: _.template($('#form-template').text()),

  events: {
    'submit': 'saveSite'
  },

  saveSite: function(){
    var site = new SiteModel();
    event.preventDefault();
    var data = this.$el.serializeObject();
    site.save(data);
  },

  initialize: function(options) {
    options = options || {};
    this.$container = options.$container;
    this.$container.append(this.$el);
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model));
  }
});

var AppRouter = Backbone.Router.extend({
  initialize: function(){
    new FormView({
      model: new SiteModel(),
      $container: $('.form-container')
    });
  }
});

$(document).ready(function(){
  var appRouter = new AppRouter();
  Backbone.history.start();
});

})();
