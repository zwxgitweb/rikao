var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css'),
    htmlmin = require('gulp-htmlmin');

// 压缩HTML
gulp.task('htmlmin', function () {
    gulp.src('./*.html')
    .pipe(htmlmin({
        removeComments: true,
        removeScriptTypeAttributes: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true
    }))
    .pipe(gulp.dest('./dist'));
})
// 压缩js
gulp.task('uglify', function () {
    gulp.src('app/content/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
})
// 压缩css
gulp.task('minify', function () {
    gulp.src('app/content/css/*.css')
    .pipe(minify())
    .pipe(gulp.dest('./dist'));
})
// 启动webserver服务
gulp.task('webserver', function () {
    gulp.src('.')
    .pipe(webserver({
        port: 8080,
        host: 'localhost',
        middleware: function (req, res, next) {
            var url = require('url').parse(req.url);
            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*'
            })
            if (url.pathname === '/getdata') {
                res.end(require('fs').readFileSync('app/data/data.json'));
            }
        }
    }))
})
gulp.task('default', ['webserver', 'htmlmin', 'uglify', 'minify']);