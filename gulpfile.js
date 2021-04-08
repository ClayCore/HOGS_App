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

const server = () => (
	tsServer.src()
	.pipe(plumber())
	.pipe(tsServer())
	// .pipe(uglify())
	.pipe(gulp.dest('server/build'))
	.pipe(livereload())
);

const scripts = () => (
	tsClient.src()
	.pipe(plumber())
	.pipe(tsClient())
	// .pipe(uglify())
	.pipe(gulp.dest('client/build'))
	.pipe(livereload())
);

const styles = () => (
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

const pages = () => (
	// Exclude files starting with an underscore.
	gulp.src('client/src/**/!(_)*.pug')
	.pipe(plumber())
	.pipe(pug())
	.pipe(gulp.dest('client/build'))
	.pipe(livereload())
);

const template = () => (
	gulp.src('client/template/**/!(_)*.pug')
	.pipe(plumber())
	.pipe(livereload())
);

const watch = () => {
	livereload.listen();
	gulp.watch('client/src/**/*.(scss|sass)', styles);
	gulp.watch('client/src/**/*.ts', scripts);
	gulp.watch('client/src/**/*.pug', pages);
	gulp.watch('client/template/**/*.pug', template);
};

const build = gulp.parallel(scripts, styles, pages);

module.exports = {
	server: server,
	scripts: scripts,
	styles: styles,
	pages: pages,
	template: template,
	build: build,
	watch: watch,
};
