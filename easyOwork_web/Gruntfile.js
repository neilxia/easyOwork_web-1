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
        },
        wechat: {
	        files: [
	          {expand: true, cwd: '.', src: ['wechat_index.html','wechat/**/*.*'], dest: 'dist'}
	        ]
        }
      },
      useminPrepare : {
          prod : {
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
          },
          wechat : {
              files : [
                  {
                      src : 'dist/wechat_index.html'
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
        prod_route:{
            src: [
              "js/route.js"
            ],
            dest: "dist/js/route.js"
        },
        prod_main:{
            src: [
              "js/app.js","js/config.js","js/servicesRest.js","js/services.js","js/filers.js","js/controllers.js","js/interceptors.js","js/inspinia.js","js/directives.js"
            ],
            dest: "dist/js/main.js"
        },
        prod_ctr:{
            src: [
              "modules/**/*.js"
            ],
            dest: "dist/js/ctr.js"
        },
        market_route:{
            src: [
              "market/js/route.js"
            ],
            dest: "dist/market/js/route.js"
        },
        market_main:{
            src: [
              "market/js/main.js","market/js/app.js","market/config.js","market/directives.js","market/service.js"
            ],
            dest: "dist/market/js/main.js"
        },
        market_ctr:{
            src: [
              "market/js/*.js","!market/js/route.js","!market/js/main.js","!market/js/app.js","!market/config.js","!market/directives.js","!market/service.js"
            ],
            dest: "dist/market/js/ctr.js"
        },
        wechat_route:{
            src: [
              "wechat/js/route.js"
            ],
            dest: "dist/wechat/js/route.js"
        },
        wechat_main:{
            src: [
              "wechat/js/app.js","wechat/js/config.js","wechat/js/directives.js","wechat/js/service.js","wechat/js/interceptors.js","wechat/js/filters.js","wechat/js/servicesRest.js"
            ],
            dest: "dist/wechat/js/main.js"
        },
        wechat_ctr:{
            src: [
              "wechat/js/*.js","!wechat/js/route.js","!wechat/js/app.js","!wechat/js/config.js","!wechat/js/directives.js","!wechat/js/service.js","!wechat/js/interceptors.js","!wechat/js/filters.js","!wechat/js/servicesRest.js"
            ],
            dest: "dist/wechat/js/ctr.js"
        },
        prod_css:{
          src: [
            "css/main.css","css/my.css","css/login.css","css/common.css","css/cjbase.pc.css","css/animate.css",
          ],
          dest: "dist/css/all-in-one.css"
        },
        market_css:{
            src: [
              "market/css/core.css",
            ],
            dest: "dist/market/css/all-in-one.css"
         },
         wechat_css:{
             src: [
               "wechat/css/core.css",
             ],
             dest: "dist/wechat/css/all-in-one.css"
           }
      },
  
      //压缩JS
      uglify: {
    	generated: { 
    	  options: {
	          mangle: false //不混淆变量名
	      },
          files: [{
              expand: true,
              cwd: 'dist',
              src: ['js/ctr.js','js/route.js','js/main.js','market/js/ctr.js','market/js/route.js','market/js/main.js','wechat/js/ctr.js','wechat/js/route.js','wechat/js/main.js'],
              dest: 'dist',
              ext: '.min.js'
          }]
        }
      },
  
      //压缩CSS
      cssmin: {
    	generated: {
          options: {
            report: 'gzip'
          },
          files: [
            {
              expand: true,
              cwd: 'dist',
              src: ['css/all-in-one.css','market/css/all-in-one.css','wechat/css/all-in-one.css'],
              dest: 'dist',
              ext: '.min.css'
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
         },
         market: {
             options: {
               optimizationLevel: 7,
               pngquant: true
            },
            files: [
              {expand: true, cwd: 'market/images', src: ['*.{png,jpg,jpeg,gif,webp,svg}'], dest: 'dist/market/images'}
            ]
          },
          wechat: {
              options: {
                optimizationLevel: 7,
                pngquant: true
             },
             files: [
               {expand: true, cwd: 'wechat/images', src: ['*.{png,jpg,jpeg,gif,webp,svg}'], dest: 'dist/wechat/images'}
             ]
           }
       },
 
     // 处理html中css、js 引入合并问题
     usemin: {
       html: ['dist/ind.html','dist/index.html','dist/wechat_index.html']
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
                     src : ['dist/css/all-in-one.min.css','dist/js/main.min.js','dist/js/route.min.js','dist/js/ctr.min.js']
                 }
             ]
         },
         market : {
             files : [{
                     src : ['dist/market/css/all-in-one.min.css','dist/market/js/main.min.js','dist/market/js/route.min.js','dist/market/js/ctr.min.js']
                 }
             ]
         },
         wechat : {
             files : [{
                     src : ['dist/wechat/css/all-in-one.min.css','dist/wechat/js/main.min.js','dist/wechat/js/route.min.js','dist/wechat/js/ctr.min.js']
                 }
             ]
         }
     },
 
   });
 
 
   grunt.registerTask('prod', [
     'clean',                 //清除文件
     'copy',                 //复制文件
     'concat',               //合并文件
     'imagemin',             //图片压缩
     'cssmin:generated',               //CSS压缩
     'uglify:generated',             //JS压缩
     'useminPrepare',
     'filerev',				//Hash文件名
     'usemin'               //修改引用
     //'htmlmin'               //HTML压缩
   ]);
 
   grunt.registerTask('publish', ['clean', 'prod']);
 };