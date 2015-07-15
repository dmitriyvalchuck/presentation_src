// `Backbone.sync`: Overrides persistence storage with dummy function. This enables use of `Model.destroy()` without raising an error.
Backbone.sync = function(method, model, success, error){
    success();
};

/* Post Model */
$.blog.Post = Backbone.Model.extend({
    defaults: {
        'title': '',
        'text': '',
        'date': ''
    }
});

/* Posts Collection */
$.blog.PostsList = Backbone.Collection.extend({
    model: $.blog.Post
});

/* Post View */
$.blog.PostView = Backbone.View.extend({
    tagName: 'li',
    className: 'hidden',

    events: {
        'click .edit':  'editing',
        'click .delete': 'deleting',
        'click .save':  'saving',
        'click .cancel': 'canceling'
    },

    initialize: function(){
        _.bindAll(this, 'render', 'unrender', 'editing', 'saving', 'canceling', 'deleting');

        this.model.bind('change', this.render);
        this.model.bind('remove', this.unrender);

        this.template = _.template($('#post-template').html());
    },

    render: function(){
        var post = this.model.toJSON();

        var dt = {};
        dt.full = $.blog.formatDate(post.date, '%Y-%M-%d %H:%m'); //2013-04-10 18:30
        dt.day  = $.blog.formatDate(post.date, '%Y/%M/%d'); //2013/04/10
        dt.time = $.blog.formatDate(post.date, '%H:%m'); //2013/04/10

        post.dt = dt;

        $(this.el).html(this.template(post));

        return this;
    },

    unrender: function(){
        var unrenderedHtml = $(this.el);
        unrenderedHtml.fadeOut(function(){
            unrenderedHtml.remove();
        });
    },

    editing: function(e){
        var block = $(e.target).parent();

        var showEl = block.find('.edt-shw');
        var hideEl = block.find('.edt-hid');

        hideEl.hide();
        showEl.show();
    },

    saving: function(e){
        var data = $(e.target).parent();

        var edited = {
            'title': data.find('.title').val(),
            'text': data.find('.text').val(),
            'date': this.model.date
        };

        this.model.set(edited);
    },

    canceling: function(e){
        var block = $(e.target).parent();

        var showEl = block.find('.edt-shw');
        var hideEl = block.find('.edt-hid');

        showEl.hide();
        hideEl.show();
    },

    deleting: function(){
        this.model.destroy();
    }
});

/* Posts Collection View */
$.blog.PostsListView = Backbone.View.extend({
    el: $('#posts'),

    events: {
        'click button#add': 'addItem'
    },

    initialize: function(){
        _.bindAll(this, 'render', 'addItem', 'appendItem');

        this.collection = new $.blog.PostsList();
        this.collection.bind('add', this.appendItem);

        this.template = _.template($('#add-form-template').html());

        this.render();
    },

    render: function(){
        var self = this;

        $(this.el).html(this.template(null));

        _(this.collection.models).each(function(item){
            self.appendItem(item);
        }, this);

        return this;
    },

    addItem: function(e){
        var item = new $.blog.Post();
        var data = $(e.target).parent();

        item.set({
            'title': data.find('.title').val(),
            'text': data.find('.text').val(),
            'date': new Date().getTime()
        });

        this.collection.add(item);
    },

    appendItem: function(item){
        var postView = new $.blog.PostView({
            model: item
        });

        var renderedHtml = $(postView.render().el);
        $(this.el).append(renderedHtml);
        renderedHtml.fadeIn(function(){
            renderedHtml.show();
        });

        /* clear adding form fields */
        var addForm = $('#add-form');
        addForm.find('.title').val('');
        addForm.find('.text').val('');
    }
});

