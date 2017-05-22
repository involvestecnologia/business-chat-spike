const gulp = require('gulp');
const webserver = require('gulp-webserver');
const browserSync = require('browser-sync').create();
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const minifyCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const pug = require('gulp-pug');
const inject = require('gulp-inject');
const runSequence = require('run-sequence');
const del = require('del');

const paths = {
  sass: ['scss/**/*.scss'],
  pug: ['pug/**/*.pug'],
  js: [
    'www/js/**/*.js',
    '!www/js/app.js',
    '!www/js/routes.js',
  ],
  css: ['www/css/**/*.min.css'],
};

function injectResources(done) {
  gulp.src('www/index.html')
    .pipe(inject(gulp.src(paths.js, {read: false}), {relative: true}))
    .pipe(inject(gulp.src(paths.css, {read: false}), {relative: true}))
    .pipe(gulp.dest('www'))
    .on('end', done);
}

gulp.task('default', ['clean'], (done) => {
  runSequence('pug', 'sass', done);
});

gulp.task('clean', (done) => {
  del(['www/css', 'www/templates', 'www/index.html']).then(() => done());
});

gulp.task('sass', (done) => {
  gulp.src(paths.sass)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0,
    }))
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest('./www/css/'))
    .on('end', () => injectResources(done));
});

gulp.task('pug', (done) => {
  gulp.src(paths.pug)
    .pipe(pug({
      pretty: true,
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest('www'))
    .on('end', () => injectResources(done));
});

gulp.task('watch', ['default'], (done) => {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.pug, ['pug']);
  done();
});

gulp.task('serve', ['watch'], () => {
  gulp.src('./www')
    .pipe(webserver({
      host: '0.0.0.0',
      port: 8080,
      livereload: true,
    }));
});

gulp.task('browserSync', ['watch'], () => {
  browserSync.init({
    server: {
      baseDir: './www',
    }
  });

  gulp.watch([
    'www/**/*.html',
    'www/**/*.js',
    paths.css
  ]).on('change', browserSync.reload);
});
