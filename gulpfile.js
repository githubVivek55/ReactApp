"use strict";

var gulp= require('gulp');
var connect=require('gulp-connect');// runs local dev server
var open=require('gulp-open');//open app in browser
var browserify=require('browserify');//Bundle JS
var reactify=require('reactify');//Transform JSX to JS
var source=require('vinyl-source-stream'); //Use conventional text stream with gulp
var concat=require('gulp-concat');
var lint=require('gulp-eslint');//lint JS files including JSX

var config={
    port:9005,
    devBaseUrl:'http://localhost',
    paths:{
        html: './src/*.html',
        js:'.src/**/*.js',
        dist: './dist',
        mainjs:'./src/main.js',
        img:'./src/images/*.png',
        css:[
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
            'node_modules/toastr/toastr.css'
        ]
    }
}

//start a local development server
gulp.task('connect',function(){
    connect.server({
        root:['dist'],
        port:config.port,
        base:config.devBaseUrl,
        livereload:true
    })
});

gulp.task('open',['connect'],function(){
    gulp.src('dist/index.html').pipe(open({uri:config.devBaseUrl + ':' + config.port + '/'}));
});

//task to load all html files in src folder to dist folder 
gulp.task('html',function(){
    gulp.src(config.paths.html)//search src folder for html files
        .pipe(gulp.dest(config.paths.dist))//put them in dist folder
        .pipe(connect.reload());// restart the server
});

gulp.task('watch',function(){
    gulp.watch(config.paths.html,['html']);
    gulp.watch(config.paths.js,['js','lint']);
});

//browserify task to compile and bundle javascipt
gulp.task('js',function(){
    browserify(config.paths.mainjs)
    .transform(reactify) //compile JSX code to JS
    .bundle()//bundle the js
    .on('error',console.error.bind(console))//log on error
    .pipe(source('bundle.js')) //o/p of bundle process file
    .pipe(gulp.dest(config.paths.dist + '/scripts')) //destination folder for store o/p
    .pipe(connect.reload());
});

//define css task to bundle all css file
gulp.task('css',function(){
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

//es lint task
gulp.task('lint',function(){
    return gulp.src(config.paths.js)
                .pipe(lint({config:'eslint.config.json'}))
                .pipe(lint.format());
});

//image copying task
gulp.task('image',function(){
    gulp.src(config.paths.img)
        .pipe(gulp.dest(config.paths.dist +'/images'))
        .pipe(connect.reload());
});

//define build task
gulp.task('default',['html','js','css','lint','image','open','watch']);
