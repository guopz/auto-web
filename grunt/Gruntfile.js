module.exports = function(grunt) {

  grunt.initConfig({
    // css 压缩
    cssmin: {
      minify: {
        expand: true,
        cwd: 'src/css/', // 匹配除当前路径外的所有文件
        src: '*.css', // 匹配当前文件
        dest: 'dist/css/', // 输出文件目录
        ext: '.css' // 输出文件后缀
      }
    },
    // 图片压缩
    imagemin: {
      dynamic: {
        files: [{
            expand: true,
            cwd: 'src/img/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'dist/img/'
        }]
      }
    } 

  });
  // 加载模块
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  // 注册模块
  grunt.registerTask('build-css',["cssmin"])
  grunt.registerTask('build-img',["imagemin"]);
};