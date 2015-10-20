var gulp = require("gulp");

    // GENERAL
var buffer = require("vinyl-buffer"),
    gulpif = require("gulp-if"),
    gulpsync = require('gulp-sync')(gulp),
    assign = require('lodash.assign')
    rename = require("gulp-rename"),
    source = require("vinyl-source-stream"),
    gutil = require("gulp-util"),

    //SASS
    autoprefixer = require("autoprefixer"),
    flatten = require("gulp-flatten")
    minifycss = require("gulp-minify-css"),
    postcss = require("gulp-postcss"),
    sass = require("gulp-sass"),

    //BROWSERIFY
    browserify = require("browserify"),
    reactify = require("reactify"),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require("gulp-uglify"),
    watchify = require("watchify"),

    // Running
    nodemon = require("gulp-nodemon"),
    mocha = require("gulp-mocha");




PATHS = {
  "INDEX_SRC": "client/index.html",
  "INDEX_DST": "dist",

  "IMAGE_SRC": "client/images/*",
  "IMAGE_DST": "dist/images",

  "SASS_FLATTEN_SRC": "client/jsx/**/*.scss",
  "SASS_FLATTEN_DST": "client/scss/.components",

  "SASS_COMPILE_SRC": "client/scss/style.scss",
  "SASS_COMPILE_DST": "dist",

  "BROWSERIFY_SRC": "client/js/script.js", //Entry Point
  "BROWSERIFY_FILE": "script.js",
  "BROWSERIFY_DST": "dist",

  "WATCH_HTML": "client/index.html",
  "WATCH_SASS": ["client/jsx/**/*.scss", "client/sass/**/*.scss", "client/scss/**/*.scss"],
  "WATCH_JSX": "client/jsx/**/*.jsx",

  "TEST": "test.js"
}

// Copy Files for Dist
gulp.task("copy", function() {
  gulp.src(PATHS.INDEX_SRC)
    .pipe(gulp.dest(PATHS.INDEX_DST));
  gulp.src(PATHS.IMAGE_SRC)
    .pipe(gulp.dest(PATHS.IMAGE_DST));
});

gulp.task("sass:components", function() {
  // Flatten components
  gulp.src(PATHS.SASS_FLATTEN_SRC)
    .pipe(flatten())
    .pipe(gulp.dest(PATHS.SASS_FLATTEN_DST));
});

// Compile SASS
gulp.task("sass:compile", function() {
  var processors = [
   autoprefixer({
     browsers: ["last 2 versions"]
   })
  ];

  gulp.src(PATHS.SASS_COMPILE_SRC)
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss(processors))
    .pipe(minifycss())
    .pipe(gulp.dest(PATHS.SASS_COMPILE_DST));
});


/**
FASTER BROWSERIFY
**/
// set up the browserify instance
var b = watchify(browserify(
  assign({}, watchify.args, {
     // add custom browserify options here
      entries: PATHS.BROWSERIFY_SRC,
      debug: true,
      // defining transforms here will avoid crashing your stream
      transform: [reactify]
  })
));

// Compile jsx into Javascript.
var bundle = function() {
  return b.bundle()
  // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(PATHS.BROWSERIFY_FILE))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify().on("error", gutil.log))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(PATHS.BROWSERIFY_DST));
};

b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

gulp.task("browserify", bundle);

// Run Server
gulp.task("nodemon", function() {
  nodemon({
    script: "server/app.js",
    ext: "js html",
    ignore: ["node_modules/"],
    env: {
      "NODE_ENV": "development"
    }
  })
});

// Watch
gulp.task("watch", function() {
  gulp.watch(PATHS.WATCH_HTML, ["copy"]);
  gulp.watch(PATHS.WATCH_SASS, gulpsync.sync(["sass:components", "sass:compile"]));
  // Browserify is already watchified
});

// Tests
gulp.task("test", function() {
  gulp.src(PATHS.TEST)
    .pipe(mocha({
        "reporter": "nyan"
      })).once("error", function () {
        process.exit(1);
      })
      .once("end", function () {
        process.exit();
      });;
})

gulp.task("build", gulpsync.async(["copy", ["sass:components", "sass:compile"], "browserify"]));
gulp.task("pre-commit", ["test", "build"]);
gulp.task("default", gulpsync.sync(["build", ["nodemon", "watch"]]));
