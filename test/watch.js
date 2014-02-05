var should = require('should'),
		Watchable = require('../'),
		async = require('async');

describe('Watchable', function(){

	var watchable = new Watchable({a: 1});

	describe('Local Watch', function(){

		it("should have worked", function watchLocal(done){
			watchable._watch('a', function(propertyName, oldValue, newValue){
				oldValue.should.eql(1);
				newValue.should.eql(2);
				done();
			});

			watchable.a = 2;
		});

	});

	describe('Remote Watch', function(){

		var foreignObject = {x: 5}; // Foreign Object

		it("should have worked", function watchRemote(done){
			watchable._watch('x', function(propertyName, oldValue, newValue){
				oldValue.should.eql(5);
				newValue.should.eql(10);
				done();
			}, null, foreignObject);

			foreignObject.x = 10;
		});

	});

	describe('Sandboxing', function(){

		var sandboxObject = {a: ''};

		it("should have worked", function sandbox(done){

			watchable._watch('a', function(propertyName, oldValue, newValue){
				oldValue.should.eql('');
				newValue.should.eql('foreign');
				done();
			}, null, sandboxObject);

			sandboxObject.a = 'foreign';
		});

	});

});