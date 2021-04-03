const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const sass = require('gulp-dart-sass');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');
const livereload = require('gulp-livereload');

const destDir = 'build/';
const tsProject = ts.createProject('./tsconfig.json');

const styles = () => (
	gulp.src([
		'./src/**/*.scss',
		'./src/**/*.sass',
		// Exclude files starting with an underscore.
		'!./src/**/_*.scss'
	])
	.pipe(plumber())
	.pipe(sass({ includePaths: ['./src'] }))
	.pipe(autoprefixer({ cascade: false }))
	.pipe(sass({ outputStyle: 'compressed' }))
	.pipe(gulp.dest(destDir))
	.pipe(livereload())
);

const scripts = () => (
	tsProject.src()
	.pipe(plumber())
	.pipe(tsProject())
	.pipe(uglify())
	.pipe(gulp.dest(destDir))
	.pipe(livereload())
);

const pages = () => (
	gulp.src([
		'./src/**/*.pug',
		// Exclude files starting with an underscore.
		'!./src/**/_*.pug'
	])
	.pipe(plumber())
	.pipe(pug())
	.pipe(gulp.dest(destDir))
	.pipe(livereload())
);

const watch = () => {
	livereload.listen();
	gulp.watch('./src/**/*.scss', styles);
	gulp.watch('./src/**/*.ts', scripts);
	gulp.watch('./src/**/*.pug', pages);
};

const build = gulp.parallel(styles, scripts, pages);

module.exports = {
	build: build,
	watch: watch,
	styles: styles,
	scripts: scripts,
	pages: pages,
}
