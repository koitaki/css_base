var gulp = require('gulp'),
    plug = require('gulp-load-plugins')()
browserSync = require('browser-sync').create();

// compile sass to css
gulp.task('css', function () {
    return gulp.src(['./src/sass/style.scss'])
        .pipe(plug.sass().on('error', plug.sass.logError))
        .pipe(plug.sourcemaps.init())
        // .pipe(plug.cssmin())
        .pipe(plug.autoprefixer())
        .pipe(plug.sourcemaps.write())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

// our javascript task
gulp.task('js', function () {
    return gulp.src([
        './node_modules/jquery/dist/jquery.min.js',
        './src/js/magic.js',
        './src/js/admin.js'])
        .pipe(plug.babel({
            presets: ['es2015']
        }))
        //        .pipe(plug.concat('all.js'))
        //        .pipe(plug.uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
});

// watch for filechanges and run tasks
gulp.task('watch', function () {
    gulp.watch(['./src/sass/*.scss'], ['css']);
    gulp.watch(['./src/js/*.js'], ['js']);
});

// serve app using browsersync
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default', ['css', 'watch', 'js', 'serve']);
