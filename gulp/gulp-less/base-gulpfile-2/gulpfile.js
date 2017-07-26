// var gulp = require('gulp'),
// 	concat = require('gulp-concat'), // 合并文件
// 	minifycss = require('gulp-minify-css'), // 压缩css
// 	rev = require('gulp-rev'), // 对文件路径添加 md5后缀
// 	revCollector = require('gulp-rev-collector'); // 路径替换

// 	gulp.task('concat', function () {
// 		return gulp.src(['./src/css/1.css','./src/css/2.css'])
// 			.pipe(concat('wap.min.css'))
// 			.pipe(minifycss())
// 			.pipe(rev())
// 			.pipe(gulp.dest('./dist2/css'))
// 			.pipe(rev.manifest())
//             .pipe(gulp.dest('./rev'));
// 	});

// 	gulp.task('rev',['concat'], function() {
// 		gulp.src(['./rev/*.json','./src/view/index.html'])
// 			.pipe(revCollector({
// 				replaceReved:true
// 			}))
// 			.pipe(gulp.dest('./src/view/'));
// 	});

// 	gulp.task('default',['rev']);

//引入gulp和gulp插件
var gulp = require('gulp'),
    runSequence = require('run-sequence'), // 同步执行模块
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector');

//定义css、js源文件路径
var cssSrc = 'src/css/*.css',
    jsSrc = 'src/js/*.js';


//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function(){
    return gulp.src(cssSrc)
        .pipe(rev())
        .pipe(gulp.dest('dist2/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});


//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function(){
    return gulp.src(jsSrc)
        .pipe(rev())
        .pipe(gulp.dest('dist2/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/'));
});


//Html替换css、js文件版本
gulp.task('revHtml', function () {
    return gulp.src(['rev/**/*.json', 'src/view/*.html'])
        .pipe(revCollector({
        	replaceReved:true
        }))
        .pipe(gulp.dest('src/view'));
});


//开发构建
gulp.task('dev', function (done) {
    // condition = false;
    runSequence(
        ['revCss'],
        ['revJs'],
        ['revHtml'],
        done);
});


gulp.task('default', ['dev'],function () {
	gulp.watch(cssSrc,['revCss','revHtml']);
});

