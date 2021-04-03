const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const sass = require('gulp-dart-sass');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');
const livereload = require('gulp-livereload');

const tsServer = ts.createProject('server/tsconfig.json');
const tsClient = ts.createProject('client/tsconfig.json');

const tasks = {};

tasks.server = () => (
	tsServer.src()
	.pipe(plumber())
	.pipe(tsServer())
	// .pipe(uglify())
	.pipe(gulp.dest('server/build'))
	.pipe(livereload())
);

tasks.ts = () => (
	tsClient.src()
	.pipe(plumber())
	.pipe(tsClient())
	// .pipe(uglify())
	.pipe(gulp.dest('client/build'))
	.pipe(livereload())
);

tasks.sass = () => (
	// Exclude files starting with an underscore.
	gulp.src([
		'client/src/**/!(_)*.scss',
		'client/src/**/!(_)*.sass',
	])
	.pipe(plumber())
	.pipe(sass({ includePaths: ['client/src'] }))
	.pipe(autoprefixer({ cascade: false }))
	.pipe(sass({ outputStyle: 'compressed' }))
	.pipe(gulp.dest('client/build'))
	.pipe(livereload())
);

tasks.pug = () => (
	// Exclude files starting with an underscore.
	gulp.src('client/src/**/!(_)*.pug')
	.pipe(plumber())
	.pipe(pug())
	.pipe(gulp.dest('client/build'))
	.pipe(livereload())
);

tasks.watch = () => {
	livereload.listen();
	gulp.watch('client/src/**/*.(scss|sass)', tasks.sass);
	gulp.watch('client/src/**/*.ts', tasks.ts);
	gulp.watch('client/src/**/*.pug', tasks.pug);
};

tasks.build = gulp.parallel(tasks.ts, tasks.sass, tasks.pug);

module.exports = tasks;
