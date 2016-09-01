module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-jscs");
    grunt.loadNpmTasks("grunt-mocha-test");
    grunt.loadNpmTasks("grunt-mocha-istanbul");
    grunt.loadNpmTasks("grunt-express-server");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-tslint");

    var files = ["Gruntfile.js", "server.js", "server/**/*.js", "test/**/*.js", "public/**/*.js"];
    var artifactsLocation = "build_artifacts";

    grunt.initConfig({
        jshint: {
            all: ["Gruntfile.js", "server.js", "server/**/*.js", "test/**/*.js"],
            options: {
                jshintrc: true
            }
        },
        jscs: {
            all: ["Gruntfile.js", "server.js", "server/**/*.js", "test/**/*.js"],
        },
        mochaTest: {
            test: {
                src: ["test/**/*.js"]
            }
        },
        tslint: {
            options: {
                // can be a configuration object or a filepath to tslint.json
                configuration: "tslint.json",
                // If set to true, tslint errors will be reported, but not fail the task
                // If set to false, tslint errors will be reported, and the task will fail
                force: false
            },
            files: {
                src: [
                    "public/**/*.ts"
                ]
            }
        },
        "mocha_istanbul": {
            test: {
                src: ["test/**/*.js"]
            },
            options: {
                coverageFolder: artifactsLocation,
                reportFormats: ["none"],
                print: "none"
            }
        },
        "istanbul_report": {
            test: {

            },
            options: {
                coverageFolder: artifactsLocation
            }
        },
        "istanbul_check_coverage": {
            test: {

            },
            options: {
                coverageFolder: artifactsLocation,
                check: true
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            express: {
                files:  ["**/*.ts", "**/*.html", "**/*.css"],
                tasks:  ["tslint", "express:dev"],
                options: {
                    spawn: false
                }
            }
        },
        express: {
            options: {
                port: 8080
            },
            dev: {
                options: {
                    script: "server.js"
                }
            }
        }
    });

    grunt.registerMultiTask("istanbul_report", "Solo task for generating a report over multiple files.", function () {
        var done = this.async();
        var cmd = process.execPath;
        var istanbulPath = require.resolve("istanbul/lib/cli");
        var options = this.options({
            coverageFolder: "coverage"
        });
        grunt.util.spawn({
            cmd: cmd,
            args: [istanbulPath, "report", "--dir=" + options.coverageFolder]
        }, function(err) {
            if (err) {
                return done(err);
            }
            done();
        });
    });

    grunt.registerTask("check", ["jshint", "jscs", "tslint"]);
    grunt.registerTask("test", ["check", "mochaTest", "mocha_istanbul", "istanbul_report",
        "istanbul_check_coverage"]);
    grunt.registerTask("serve", ["express:dev", "watch"]);
    grunt.registerTask("default", "test", "serve");
};
