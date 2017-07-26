var gulp = require('gulp'),
	less = require('gulp-less'); // 编译less文件
	uglify = require('gulp-uglify'); // 压缩js文件
	concat = require('gulp-concat'); // 合并文件
	minifycss = require('gulp-minify-css'); // 压缩css
	// concatcss = require('gulp-concat-css'); // 合并css
	del = require('del');

var configSrc = {
	js: './src/js/*.js',
	css: './src/css/*.css',
	less: './src/less/*.less'
}
var configDest = {
	js: './dist/js/',
	css: './dist/css/'
}
// 定义一个任务
gulp.task('less',function(){
	gulp.src(configSrc.less)
		.pipe(less())
		.pipe(gulp.dest(configDest.css))
});

// 压缩 css 文件
gulp.task('mincss',function(){
	gulp.src(configSrc.css)
		.pipe(minifycss())
		.pipe(gulp.dest(configDest.css))
		.pipe(concat('all.css'))
		.pipe(gulp.dest(configDest.css));
});

// 合并 css 文件 使用并没有效果 并且 concat 使用效果一样（并没有发现其他问题）
gulp.task('css',function(){
	gulp.src('./scr/css/*.css')
		.pipe(concat('all.css'))
		.pipe(gulp.dest('./dist/css'));
});

// 压缩 js 文件
gulp.task('ugjs',function(){
	gulp.src(configSrc.js)
		.pipe(uglify())
		.pipe(gulp.dest(configDest.js));
});

// 合并 js 文件
gulp.task('concat',function(){
	gulp.src(configSrc.js)
		.pipe(concat('all.js'))
		.pipe(gulp.dest(configDest.js))
});


// 删除文件
gulp.task('clean:css',function(cb){
	del([
		'dist/',
		// 不删除某个文件 
		// '!dist/css/a.json'
		'!dist/css/all.css'
	]);
});

// gulp.task('default',function(){
// 	// 运行默认任务
// 	gulp.run('less','mincss','ugjs','concat');
// });

// 简写形式
gulp.task('default',['less','mincss','ugjs','concat']);

gulp.task('watch',function() {
	// 监听文件变化
	gulp.watch(configSrc.js,function(){
		gulp.run('ugjs');
	});
	gulp.watch(configSrc.less,['less']);
	gulp.watch(configSrc.css,['mincss']);
});