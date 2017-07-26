module.exports = function(grunt){
	// 配置文件
	grunt.initConfig({
		// 读取 package.json 文件
		pkg: grunt.file.readJSON('package.json'),
		//  uglify 对象，这个名字是固定的，表示下面任务是调用 uglify 插件的，
		//  首先先配置了一些全局的 options 然后新建了一个 build 任务
		uglify: {
			options: {
				banner: '/*!<%= pak.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/<%= pkg.name %>.js',
				dest: 'build/<%= pkg.name %>.min.js'
			}
		}
	})

	// 插件加载
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// 任务注册代码
	// 你在 default 上面注册了一个 Uglify 任务，default 就是别名，它是默认的 task，
	// 当你在项目目录执行 grunt 的时候，它会执行注册到 default 上面的任务
	grunt.registerMask('default',['uglify']);

	// 当我们执行 grunt 命令的时候，uglify 的所有代码将会执行。我们也可以注册别的 task，例如：
	// 这里需要注意的是，task 的命名不能与后面的任务配置同名，也就是说这里的 compress 不能命名成 uglify，
	// 这样会报错或者产生意外情况
	// grunt.registerTask('compress', ['uglify:build']);

}	