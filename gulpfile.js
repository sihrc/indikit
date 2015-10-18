var gulp = require("gulp");

    // GENERAL
var buffer = require("vinyl-buffer"),
    gulpif = require("gulp-if"),
    gulpsync = require('gulp-sync')(gulp),
    rename = require("gulp-rename"),
    source = require("vinyl-source-stream"),
    util = require("gulp-util"),

    //SASS
    autoprefixer = require("autoprefixer"),
    flatten = require("gulp-flatten")
    minifycss = require("gulp-minify-css"),
    postcss = require("gulp-postcss"),
    sass = require("gulp-sass"),

    //BROWSERIFY
    browserify = require("browserify"),
    reactify = require("reactify"),
    uglify = require("gulp-uglify")

    // Running
    nodemon = require("gulp-nodemon");
    mocha = require("gulp-mocha");




PATHS = {
  "INDEX_SRC": gulp.src("client/index.html"),
  "INDEX_DST": gulp.dest("dist"),

  "IMAGE_SRC": gulp.src("client/images/*"),
  "IMAGE_DST": gulp.dest("dist/images"),

  "SASS_FLATTEN_SRC": gulp.src("client/jsx/**/*.scss", { base: "src" }),
  "SASS_FLATTEN_DST": gulp.dest("client/scss/.components"),

  "SASS_COMPILE_SRC": gulp.src("client/scss/style.scss"),
  "SASS_COMPILE_DST": gulp.dest("dist"),

  "BROWSERIFY_SRC": "client/js/script.js", //Entry Point
  "BROWSERIFY_FILE": "script.js",
  "BROWSERIFY_DST": gulp.dest("dist"),

  "WATCH_HTML": "client/index.html",
  "WATCH_SASS": ["client/jsx/**/*.scss", "client/sass/**/*.scss"],
  "WATCH_JSX": "client/jsx/**/*.jsx",

  "TEST": gulp.src("test.js", {read: false})
}

// Copy Files for Dist
gulp.task("copy", function() {
  PATHS.INDEX_SRC
    .pipe(PATHS.INDEX_DST);
  PATHS.IMAGE_SRC
    .pipe(PATHS.IMAGE_DST);
});

gulp.task("sass:components", function() {
  // Flatten components
  PATHS.SASS_FLATTEN_SRC
    .pipe(flatten())
    .pipe(PATHS.SASS_FLATTEN_DST);
});

// Compile SASS
gulp.task("sass:compile", function() {
  var processors = [
   autoprefixer({
     browsers: ["last 2 versions"]
   })
  ];

  PATHS.SASS_COMPILE_SRC
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss(processors))
    .pipe(minifycss())
    .pipe(PATHS.SASS_COMPILE_DST);
});

// Compile jsx into Javascript.
gulp.task("browserify", function() {
  var b = browserify();
  b.transform(reactify); // Use the reactify transform.
  b.add(PATHS.BROWSERIFY_SRC);
  return b.bundle()
    .pipe(source(PATHS.BROWSERIFY_FILE))
    .pipe(buffer())
    .pipe(uglify().on("error", util.log))
    .pipe(PATHS.BROWSERIFY_DST);
});

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
  gulp.watch(PATHS.SASS, ["sass"]);
  gulp.watch(PATHS.JSX, ["browserify"]);
});

// Tests
gulp.task("test", function() {
  PATHS.TEST
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
gulp.task("default", gulpsync.sync(["build", "watch", "nodemon"]));
