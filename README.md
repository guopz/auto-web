### Grunt
@(日常记录)[grunt]

> 构建工具
> http://www.gruntjs.net/

安装命令行
> npm install -g grunt-cli
 npm install -g grunt

生成 package.json
> npm init

起一个服务
>npm install express-generator -g

初始化
>express --git -f

安装 Grunt 和所需要的插件

就现在的这个示例项目而言，我打算让 Grunt 帮忙实现下面几个功能：检查每个 JS 文件语法、合并两个 JS 文件、将合并后的 JS 文件压缩、将 SCSS 文件编译、新建一个本地服务器监听文件变动自动刷新 HTML 文件。

差不多就是这些，根据这些任务需求，需要用到：
> 
合并文件：grunt-contrib-concat
语法检查：grunt-contrib-jshint
Scss 编译：grunt-contrib-sass
压缩文件：grunt-contrib-uglify
监听文件变动：grunt-contrib-watch
建立本地服务器：grunt-contrib-connect
css 压缩：grunt-contrib-mincss
删除文件：grunt-contrib-clean
图片压缩：grunt-contrib-imagemin

它们的命名和文档都很规范，因为这些是官方提供的比较常用的插件。这些插件同时都是 NPM 管理的包，比如 grunt-contrib-concat - npm 你也可以在这上面看到用法等。

下面我们就要在这个项目中安装这些插件，执行命令：

> npm install grunt --save-dev

grunt 常用参数说明
http://wiki.jikexueyuan.com/project/grunt/configuring_tasks.html


grunt-contrib-cssmin 配置方法
```
cssmin: {
    minify: { 
        expand: true, 
        cwd: srcName + '/', 
        src: ['*\*/\*.css', '!*.min.css'], 
        dest: buildPath + '/', 
        ext: '.css' 
    } 
}
```

###  gulp 使用

##### 基础教程
学习地址：
gulp api
http://www.ydcss.com/archives/424
gulp demo
https://segmentfault.com/a/1190000000372547
https://segmentfault.com/a/1190000002932998
http://longlog.me/2017/01/09/gulp-rename/

常用插件
http://www.cnblogs.com/Darren_code/p/gulp.html

和 grunt 类似 需要自己新建 gulpfile.js 文件

#####  常用记录
1. gulp只有五个方法： task，run，watch，src，和dest，在项目根目录新建一个js文件并命名为gulpfile.js
2. 通过 require 引入需要的组件
3. task 新建一个任务

##### 删除模块
gulp del  地址： http://www.gulpjs.com.cn/docs/recipes/delete-files-folder/
> npm install --save-dev gulp del

在使用文件 MD5 后缀时注意
> revCollector = require('gulp-rev-collector');

 这个参数 否则只有第一次生效
>revCollector({
	replaceReved:true
})

gulp-htmlmin 参数
```
var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin');
 
gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/html/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/html'));
});
```