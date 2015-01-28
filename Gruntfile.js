module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        less: { 
            options: {
                //paths: ["css/pages"]
                cleancss: false // minify CSS?
            },
            
            default: {                 
            files: {
                'css/charcoal.css': 'css/charcoal.less'
            }
            }
        },

        jekyll: {                             // Task
            options: {                          // Universal options
                //bundleExec: true,
                //src : '<%= app %>'
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