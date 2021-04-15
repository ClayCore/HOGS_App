const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const sass = require('gulp-dart-sass');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');
const livereload = require('gulp-livereload');

const tsClient = ts.createProject('src/tsconfig.json');

const scripts = () => (
	tsClient.src()
	.pipe(plumber())
	.pipe(tsClient())
	// .pipe(uglify())
	.pipe(gulp.dest('build'))
	.pipe(livereload())
);

const styles = () => (
	// Exclude files starting with an underscore.
	gulp.src([
		'src/**/!(_)*.scss',
		'src/**/!(_)*.sass',
	])
	.pipe(plumber())
	.pipe(sass({ includePaths: ['src'] }))
	.pipe(autoprefixer({ cascade: false }))
	.pipe(sass({ outputStyle: 'compressed' }))
	.pipe(gulp.dest('build'))
	.pipe(livereload())
);

const pages = () => (
	// Exclude files starting with an underscore.
	gulp.src('src/**/!(_)*.pug')
	.pipe(plumber())
	.pipe(pug())
	.pipe(gulp.dest('build'))
	.pipe(livereload())
);

const template = () => (
	gulp.src('template/**/!(_)*.pug')
	.pipe(plumber())
	.pipe(livereload())
);

const watch = () => {
	livereload.listen();
	gulp.watch('src/**/*.(scss|sass)', styles);
	gulp.watch('src/**/*.ts', scripts);
	gulp.watch('src/**/*.pug', pages);
	gulp.watch('template/**/*.pug', template);
};

const build = gulp.parallel(scripts, styles, pages);

module.exports = {
	scripts: scripts,
	styles: styles,
	pages: pages,
	template: template,
	build: build,
	watch: watch,
};
