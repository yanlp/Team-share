/*
	gulp project
	@author:yanliping
*/
'use strict';
// import gulp from 'gulp';
// import gulpLoadPlugins from 'gulp-load-plugins';
// import fs from 'fs';
// import replaceTask from 'gulp-replace-task';
// import browserSync from 'browser-sync';
let gulp = require('gulp');
let gulpLoadPlugins = require('gulp-load-plugins');
let fs  = require('fs');
let replaceTask =  require('gulp-replace-task');
let browserSync = require('browser-sync');

let $ = gulpLoadPlugins({
	'gulp-requirejs-optimize': 'reuqirejsOptimize'
});

gulp.task('sass', function() {
	let conf = [

	]
	return gulp.src(['./kuayu/scss/*.scss'])
		.pipe($.sourcemaps.init())
		.pipe($.error(conf)).on("error", $.sass.logError)
		.pipe(gulp.dest('./kuayu/css'))
});
gulp.task('browserSync', function() {
	browserSync.init([
		'!./bower-components',
		'!./node_modules',
		'./*/css/**/*.scss',
		'./*/html/**/*.html',
		'./*/js/**/*.js'
	], {
		server: {
			baseDir: './'
		},
		ghostMode: false
	})
});
gulp.task('watch', function() {
	gulp.watch(['!./bower-components', '!./node_modules', './*/scss/*.scss'], ['sass'], function(event) {
		console.log(event)
	})
});
gulp.task('default', ['browserSync', 'watch'],function() {

})