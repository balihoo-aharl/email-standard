var	gulp = require('gulp'),
	processhtml = require('gulp-processhtml'),
	premailer = require('gulp-premailer'),
	mustache = require('gulp-mustache'),
	mailgun = require('gulp-mailgun'),
	notify = require('gulp-notify'),
	rename = require('gulp-rename'),
	del = require('del');

var paths = {
		template: './src/main.mustache',
		ink: './src/ink.css',
    styles: './src/styles.css',
		tmp: './tmp/',
		build: './assets/',
		data: './sampledata/default.json'
	};

gulp.task('build', function() {
	return gulp.src(paths.template)
		.pipe(processhtml())
		.pipe(gulp.dest(paths.tmp))
		.pipe(premailer())
		.pipe(gulp.dest(paths.build))
		.pipe(notify({ message: 'Build task complete'}));
});

gulp.task('mustache', function() {
	return gulp.src(paths.template)
		.pipe(mustache(paths.data))
		.pipe(rename({ extname: '.html' }))
		.pipe(processhtml())
		.pipe(gulp.dest(paths.tmp))
		.pipe(premailer())
		.pipe(gulp.dest(paths.tmp));
});

gulp.task('watch', ['build'], function () {
	gulp.watch([paths.template, paths.styles], ['build']);
});

gulp.task('sendmail', ['mustache'], function () {
	var mailgunconfig = require('./config/mailgun'); // private
	gulp.src( paths.tmp + 'main.html') // Modify this to select the HTML file(s)
		.pipe(mailgun(mailgunconfig));
});

// This Cleans up the temporary files.
gulp.task('clean', function(cb) {
	del([paths.tmp, paths.build], cb)
});

gulp.task('default', function() {
	console.log(
		'\n'
		+ 'Whoa there buddy. This script doesn\'t do anything by default. See available commands below.\n'
		+ '\033[1;33mAVAILABLE COMMANDS:\033[0m\n'
		+ '\033[0;32mwatch:\033[0m Watch the source files and compile new files to the assets directory.\n'
		+ '\033[0;32mbuild:\033[0m This compiles the source files to the assets directory, no watching involved.\n'
		+ '\033[0;32msendmail:\033[0m This sends out a test email using mailgun and the credentials in config/mailgun.js.\n'
		+ '\033[0;32mclean:\033[0m Clean up the tmp and assets directory.'
		+ '\n'
	);
});
