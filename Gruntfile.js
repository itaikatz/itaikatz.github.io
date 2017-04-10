module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        less: { 
            options: {
                //paths: ["css/pages"]
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
                'aboutme.css' : 'aboutme.less',
                'menu.css' : 'menu.less',
                'assets/posts/steganography/steg.css' : 'assets/posts/steganography/steg.less'

            }
            }
        },

        jekyll: {                             // Task
            options: {                          // Universal options
                //bundleExec: true,
                //src : '<%= app %>'
                incremental: false
            },
            default: {   
            }
        }
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-jekyll');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['less', 'jekyll']);
    //grunt.registerTask('build', ['less']);

};
