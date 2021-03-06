module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        less: { 
            options: {
                paths: ['css/', 'assets/posts/'],
                cleancss: true // minify CSS?
            },
            
            default: {                 
            files: {
                
                // //'css/lacuna.css': 'css/lacuna.less',
                // //'corporate/css/charcoal_foundation.css': 'corporate/css/charcoal_foundation.less',
                // //'corporate/css/home.css': 'corporate/css/home.less',
                // //'corporate/lacuna_index.css': 'corporate/lacuna_index.less',

                //'css/charcoal.css': 'css/charcoal.less',
                //'index2.css' : 'index2.less',
                
                'css/charcoal2.css' : 'css/charcoal2.less',
                'css/aboutme.css' : 'css/aboutme.less',
                'css/menu.css' : 'css/menu.less',
                'css/index.css' : 'css/index.less',
                'assets/posts/steganography/steg.css' : 'assets/posts/steganography/steg.less',
                'assets/posts/nobel/nobel.css' : 'assets/posts/nobel/nobel.less',
                'assets/posts/names/names.css' : 'assets/posts/names/names.less'

            }
            }
        },

        jekyll: {                             // Task
            options: {                          // Universal options
                //bundleExec: true,
                //src : '<%= app %>'
                incremental: true
            },
            default: {   
            }
        }, 
        atomizer: {
            files:
                {
                    src: ['index.html'],   // ['test/fixtures/*.html'],
                    dest: 'css/atomic.css'
                }
        }
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-atomizer');
    grunt.loadNpmTasks('grunt-jekyll');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['less', 'atomizer', 'jekyll']);
    //grunt.registerTask('build', ['less']);

};
