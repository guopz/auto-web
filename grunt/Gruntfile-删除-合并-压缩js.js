module.exports = function(grunt) {

  var sassStyle = 'expanded';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // 压缩文件
    uglify: {
  		options: {
  			// 注释 eg：/*!grunt1 2017-07-07 */
  			banner: '/*!<%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
  		},
  		build: {
  			src: './build/concat/global.js',
  			dest: 'build/uglify/<%= pkg.name %>.min.js'
  		}
  	},
	  // 合并文件
    concat: {
      options: {
      	//文件内容的分隔符
        separator: ';',
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                            '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        // 合并文件
        // src: ['./src/plugin.js', './src/plugin2.js'],
        // 可以这样写
        src: ['./src/*.js'],
        dest: './build/concat/global.js',
      }, 
    },
    // 删除文件
    clean: {
    	// 删除所有文件包括文件夹
    	build: ['./build/*']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('uglifyjs',['uglify']);
  grunt.registerTask('concatjs',['concat']);
  grunt.registerTask('cleanjs',['clean']);
  grunt.registerTask('default');

};