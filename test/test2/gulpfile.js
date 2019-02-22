var gulp = require('gulp');
const htmlmin = require('gulp-htmlmin'); 
const cleanCSS = require('gulp-clean-css');
const connect = require('gulp-connect');



gulp.task('minicss', function() {
    gulp.src('app/css/**/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
    console.log('压缩css')
});

gulp.task('minihtml', function() {
    gulp.src('app/*.html')
    .pipe(htmlmin({ collapseWhitespace: true,minifyJS:true,minifyCSS:true  }))
    .pipe(gulp.dest('dist/')) 
    .pipe(connect.reload())
    console.log('压缩html');
});

gulp.task('watch', function() {
    gulp.watch('app/*.html',['minihtml'])
});

gulp.task('all', ['minihtml','minicss'],function(){
     console.log('任务执行完成'); 
});

gulp.task('connect', function() {
    connect.server({
        root:'dist',
        port:8080,
        livereload: true
    });
  })

gulp.task('default', ['connect','watch','all']);