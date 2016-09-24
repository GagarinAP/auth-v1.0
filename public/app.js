var Blog = Backbone.Model.extend({
	urlRoot:'/users'
});

var Blogs = Backbone.Collection.extend({
	url: '/users'
});

var blogs = new Blogs();

var BlogView = Backbone.View.extend({
	model: new Blog(),	
	initialize: function() {
		this.template = _.template($('.blogs-list-template').html());
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

var BlogsView = Backbone.View.extend({
	model: new Blogs(),
	el: $('#blogs-list'),
	initialize: function() {		
		this.model.on('add', this.render, this);		
		this.model.fetch();
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(blog) {
			self.$el.append((new BlogView({model: blog})).render().$el);
		});
		return this;
	}
});

var blogsView = new BlogsView();

$(document).ready(function() {
	$('.add-blog').on('click', function() {
		var blog = new Blog({
			login: $('.login-input').val(),
			password: $('.password-input').val()			
		});
		$('.login-input').val('');
		$('.password-input').val('');
	
		blogs.add(blog);
		blog.save();
	});
});