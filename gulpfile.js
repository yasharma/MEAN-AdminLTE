'use strict';

const gulp      = require('gulp'),
    jshint      = require('gulp-jshint'),
    stylish     = require('jshint-stylish'),
    nodemon     = require('gulp-nodemon'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    cleancss    = require('gulp-clean-css'),
    pump        = require('pump'),
    notify      = require('gulp-notify'),
    livereload  = require('gulp-livereload'),
    fs          = require('fs');

/*
 * This package is used for restart node server every our server file changes
 * source: https://www.npmjs.com/package/nodemon
 */

gulp.task('nodemon', () => {
    livereload.listen();
    nodemon({
            tasks: ['jshint'],
            script: 'app.js',
            ext: 'js html',
            ignore: ['node_modules/', 'public/bower_components/', 'public/js/', 'test/', 'coverage/', 'public/images/','public/css/fonts/','*.html'],
        })
        .on('restart', () => {
            gulp.src('app.js')
            .pipe(livereload())
            .pipe(notify('Task completed'));
        });
});

/*
 * JSHint to lint all the js files
 */

gulp.task('jshint',['app:uglify','admin.app:uglify'],  () => {
    return gulp.src([
            './config/**/*.js',
            './config/*.js',
            './controllers/**/*.js',
            './models/*.js',
            './public/User/app.js',
            './public/User/factories/*.js',
            './public/User/config/*.js',
            './public/User/home/*.js',
            './public/Admin/admin.app.js',
            './public/Admin/config/*.js',
            './public/Admin/auth/*.js',
            './public/Admin/dashboard/*.js',
            './public/Admin/profile/*.js',
            './public/Admin/factories/*.js',
            './public/Admin/directives/*.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

/*
minify external Js files for  front-end
*/
gulp.task('site:uglify', (cb) => {
    pump([
        gulp.src([
            './public/bower_components/jquery/dist/jquery.min.js',
            './public/bower_components/angular/angular.min.js',
            './public/bower_components/angular-animate/angular-animate.js',
            './public/bower_components/angular-aria/angular-aria.js',
            './public/bower_components/angular-messages/angular-messages.js',
            './public/bower_components/angular-material/angular-material.min.js',
            './public/bower_components/angular-route/angular-route.min.js',
            './public/bower_components/angular-loading-bar/build/loading-bar.min.js',
            './public/bower_components/angular-sanitize/angular-sanitize.min.js',
            './public/bower_components/angular-local-storage/dist/angular-local-storage.js',
            './public/bower_components/bootstrap/dist/js/bootstrap.min.js'
        ]),
        concat('site.min.js'),
        uglify(),
        gulp.dest('./public/js')
    ],cb);

});

/*
minify external Js files for  admin-end
*/
gulp.task('admin-site:uglify', (cb) => {
    pump([
        gulp.src([
            './public/bower_components/jquery/dist/jquery.min.js',
            './public/bower_components/angular/angular.min.js',
            './public/bower_components/angular-animate/angular-animate.js',
            './public/bower_components/angular-aria/angular-aria.js',
            './public/bower_components/angular-messages/angular-messages.js',
            './public/bower_components/angular-material/angular-material.min.js',
            './public/bower_components/angular-route/angular-route.min.js',
            './public/bower_components/angular-loading-bar/build/loading-bar.min.js',
            './public/bower_components/angular-sanitize/angular-sanitize.min.js',
            './public/bower_components/angular-local-storage/dist/angular-local-storage.js',
            './public/bower_components/bootstrap/dist/js/bootstrap.min.js',
            './public/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            './public/bower_components/AdminLTE/dist/js/app.min.js'
        ]),
        concat('admin-site.min.js'),
        uglify(),
        gulp.dest('./public/js')
    ],cb);

});

/*
* This task is will minify all the angular modules files
* @ front-end
*/
gulp.task('app:uglify', (cb) => {
    pump([
        gulp.src([
            './public/User/app.js',
            './public/User/config/*.js',
            './public/User/factories/*.js',
            './public/User/home/*.js',
            './public/User/contact/*.js'
        ]),
        concat('app.min.js'),
        uglify(),
        gulp.dest('./public/js')
    ],cb);
});

/*
* This task is will minify all the angular modules files
* @ front-end
*/
gulp.task('admin.app:uglify', (cb) => {
    pump([
        gulp.src([
            './public/Admin/admin.app.js',
            './public/Admin/config/*.js',
            './public/Admin/factories/*.js',
            './public/Admin/directives/*.js',
            './public/Admin/auth/*.js',
            './public/Admin/dashboard/*.js',
            './public/Admin/profile/*.js'
        ]),
        concat('admin.app.min.js'),
        uglify(),
        gulp.dest('./public/js')
    ],cb);
});

/*
* This task will minify all the css files
* @ front-end
*/
gulp.task('app:cssmin', () => {
    gulp.src([
        './public/bower_components/angular-material/angular-material.min.css',
        './public/bower_components/angular-loading-bar/build/loading-bar.min.css',
        './public/bower_components/bootstrap/dist/css/bootstrap.min.css',
    ])
    .pipe(concat('site.min.css'))
    .pipe(cleancss({compatibility: 'ie8', processImport: false}))
    .pipe(gulp.dest('./public/css/'));
});

/*
* This task will minify all the css files
* @ front-end
*/
gulp.task('admin-site:cssmin', () => {
    gulp.src([
        './public/bower_components/angular-material/angular-material.min.css',
        './public/bower_components/angular-loading-bar/build/loading-bar.min.css',
        './public/bower_components/AdminLTE/bootstrap/css/bootstrap.min.css',
        './public/bower_components/font-awesome/css/font-awesome.min.css',
        './public/bower_components/Ionicons/css/ionicons.min.css',
        './public/bower_components/AdminLTE/dist/css/AdminLTE.min.css',
        './public/bower_components/AdminLTE/dist/css/skins/skin-purple.min.css',
    ])
    .pipe(concat('admin-site.min.css'))
    .pipe(cleancss({compatibility: 'ie8', processImport: false}))
    .pipe(gulp.dest('./public/css/'));
});

/*
* To check whether .env file exists or not
* if not exists, create the file and write the env variable
*/
gulp.task('check:env', () => {
    fs.stat(`${__dirname}/.env`, (err, success) => {
        if(err){
            try{
                let path = `${__dirname}/.env`;
                if(fs.openSync(path,'w')){
                    fs.writeFileSync(path,'NODE_ENV=development');
                }
            } catch(e){
                console.error(`System is unable to create ".env" file, please create ".env" file in root directory and specify the "NODE_ENV" to either one of these (development, production) eg. NODE_ENV=development`);
            }
        }
    });
});

gulp.task('default', [
    'check:env',
    'jshint',
    'nodemon',
    'site:uglify',
    'admin-site:uglify',
    'app:uglify',
    'admin.app:uglify',
    'app:cssmin',
    'admin-site:cssmin'
], function() {
    console.log("gulp all tasks finished");
});
