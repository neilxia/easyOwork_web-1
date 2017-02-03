module.exports = function (grunt) {
   
     require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
   
     grunt.initConfig({
   
       //清除目录
       clean: {
         all: ['dist/**']
      },
  
      copy: {
        html: {
        	files: [
        	  {expand: true, cwd: '.', src: ['ind.html','modules/**/*.html'], dest: 'dist'}
        	]
        },
        js: {
        	files: [
        	  {expand: true, cwd: '.', src: ['js/*.js','modules/**/*.js'], dest: 'dist'}
        	]
        },
        css: {
        	files: [
        	  {expand: true, cwd: '.', src: ['css/*.css'], dest: 'dist'}
        	]
        },
        fonts: {
	        files: [
	          {expand: true, cwd: '.', src: ['fonts/**/*.*'], dest: 'dist'}
	        ]
        },
        plugins: {
	        files: [
	          {expand: true, cwd: '.', src: ['plugins/**/*.*'], dest: 'dist'}
	        ]
        },
        market: {
	        files: [
	          {expand: true, cwd: '.', src: ['index.html','market/**/*.*'], dest: 'dist'}
	        ]
        }
      },
      useminPrepare : {
          build : {
              files : [{
                      src : 'dist/ind.html'
                  }
              ]
          },
          market : {
              files : [
                  {
                      src : 'dist/index.html'
                  }
              ]
          }
      },
      // 文件合并
      concat: {
        options: {
          separator: ';',
          stripBanners: true
        },
        js:{
            src: [
              "js/*.js","moduless/**/*.js"
            ],
            dest: "dist/js/all-in-one.js"
        },
        css:{
          src: [
            "css/*.css"
          ],
          dest: "dist/css/all-in-one.css"
        }
      },
  
      //压缩JS
      uglify: {
        prod: {  
          files: [{
              expand: true,
              cwd: 'dist',
              src: ['js/*.js','!js/route.js','!js/interceptors.js'],
              dest: 'dist'
          },
          {
              expand: true,
              cwd: 'dist',
              src: ['modules/**/*.js','!modules/login/ctrl/loginCtrl.js'],
              dest: 'dist'
          }]
        }
      },
  
      //压缩CSS
      cssmin: {
        prod: {
          options: {
            report: 'gzip'
          },
          files: [
            {
              expand: true,
              cwd: 'dist',
              src: ['css/*.css'],
              dest: 'dist'
            }
          ]
        }
      },
  
      //压缩图片
      imagemin: {
        prod: {
          options: {
            optimizationLevel: 7,
            pngquant: true
         },
         files: [
           {expand: true, cwd: 'images', src: ['*.{png,jpg,jpeg,gif,webp,svg}'], dest: 'dist/images'}
         ]
       }
     },
 
     // 处理html中css、js 引入合并问题
     usemin: {
       html: ['dist/ind.html','dist/index.html']
     },
 
     //压缩HTML
     htmlmin: {
       options: {
         removeComments: true,
         removeCommentsFromCDATA: true,
         collapseWhitespace: true,
         collapseBooleanAttributes: true,
         removeAttributeQuotes: true,
         removeRedundantAttributes: true,
         useShortDoctype: true,
         removeEmptyAttributes: true,
         removeOptionalTags: true
       },
       html: {
         files: [
           {expand: true, cwd: 'dist/html', src: ['*.html'], dest: 'dist/html'}
         ]
       }
     },
     //重命名
     filerev : {
         build : {
             files : [{
                     src : ['dist/css/*.css','dist/js/*.js','dist/modules/**/*.js']
                 }
             ]
         },
         market : {
             files : [{
                     src : ['dist/market/css/*.css','dist/market/js/*.js']
                 }
             ]
         }
     },
 
   });
 
 
   grunt.registerTask('prod', [
     'clean',                 //清除文件
     'copy',                 //复制文件
     //'concat',               //合并文件
     'useminPrepare',
     'imagemin',             //图片压缩
     'cssmin',               //CSS压缩
     //'uglify',             //JS压缩
     'filerev',				//Hash文件名
     'usemin'               //修改引用
     //'htmlmin'               //HTML压缩
   ]);
 
   grunt.registerTask('publish', ['clean', 'prod']);
 };