var gulp = require('gulp'),
	less = require('gulp-less'); // 编译less文件
	uglify = require('gulp-uglify'); // 压缩js文件
	concat = require('gulp-concat'); // 合并文件
	minifycss = require('gulp-minify-css'); // 压缩css
	// concatcss = require('gulp-concat-css'); // 合并css
	del = require('del'), // 文件删除模块
	imagemin = require('gulp-imagemin'), // 图片压缩
	cache = require('gulp-cache'); // 图片缓存避免二次压缩
	htmlmin = require('gulp-htmlmin'), // 压缩 html
	autoprefixer = require('gulp-autoprefixer'), // 自动添加 cs3前缀
	rename = require('gulp-rename'); // 更改名字

var configSrc = {
	js: './src/js/*.js',
	css: './src/css/*.css',
	less: './src/less/*.less',
	img: './src/img/*.{png,jpg,gif}',
	html: './src/view/*.html'
}
var configDest = {
	js: './dist/js/',
	css: './dist/css/',
	img: './dist/img/',
	html: './dist/view/'
}
// 编译less文件并且添加前缀
gulp.task('less',function(){
	gulp.src(configSrc.less)
		.pipe(less())
		.pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
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

// 图片压缩
gulp.task('imagemin',function () {
	gulp.src(configSrc.img)
		.pipe(cache(imagemin({
			optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
		})))
		.pipe(gulp.dest(configDest.img));
});

gulp.task('htmlmin',function () {
	var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: false,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src(configSrc.html)
        .pipe(htmlmin(options))
        .pipe(gulp.dest(configDest.html));
})

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