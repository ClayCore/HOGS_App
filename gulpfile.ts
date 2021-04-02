import * as gulp from 'gulp';

import autoprefixer from 'gulp-autoprefixer';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
const sass = require('gulp-sass');
import ts from 'gulp-typescript';
import uglify from 'gulp-uglify';

const destDir = 'build/';
const tsProject = ts.createProject('./tsconfig.json');

sass.compiler = require('sass');

function styles() {
	return gulp
		.src(['./src/**/*.scss', './src/**/*.sass', '!./src/**/_*.scss'])
		.pipe(plumber())
		.pipe(sass({includePaths: './src'}))
		.pipe(
			autoprefixer({
				cascade: false,
			})
		)
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(gulp.dest(destDir));
}

function scripts() {
	return gulp.src('./src/**/*.js').pipe(plumber()).pipe(uglify()).pipe(gulp.dest(destDir));
}

function typescript() {
	return tsProject.src().pipe(plumber()).pipe(tsProject()).pipe(uglify()).pipe(gulp.dest(destDir));
}

function pages() {
	return (
		// Exclude files starting with an underscore.
		gulp
			.src(['./src/**/*.pug', '!./src/**/_*.pug'])
			.pipe(plumber())
			.pipe(
				pug({
					pretty: true,
				})
			)
			.pipe(gulp.dest(destDir))
	);
}

function watch() {
	gulp.watch('./src/**/*.scss', styles);
	gulp.watch('./src/**/*.js', scripts);
	gulp.watch('./src/**/*.ts', typescript);
	gulp.watch('./src/**/*.pug', pages);
}

export const build = gulp.series(gulp.parallel(styles, scripts, typescript, pages));

export default watch;
