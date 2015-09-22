var path = require("path");

var gulp = require("gulp");
var sass = require("gulp-sass");

// Copy over index.html
gulp.task("copy", function () {
  gulp.src(path.join(__dirname, "client", "index.html"))
    .pipe(gulp.dest("public"));
})

// Compile SCSS
gulp.task("scss", function () {
  var processors = [
    require("autoprefixer")({
      browsers: ["last 2 versions"]
    })
  ];

  gulp.src(path.join(__dirname, "client", "jsx", "**", "*.scss"), {
      base: "client"
    }).pipe(require('gulp-flatten')())
    .pipe(gulp.dest(path.join(__dirname, "client", "scss", "_components")));

  gulp.src(path.join(__dirname, "client", "scss", "style.scss"))
    .pipe(sass().on("error", sass.logError))
    .pipe(require("gulp-postcss")(processors))
    .pipe(require("gulp-minify-css")())
    .pipe(require('gulp-rename')({
      suffix: ".min"
    }))
    .pipe(gulp.dest(path.join(__dirname, "public")));
})

// Compile jsx into Javascript.
gulp.task("browserify", function () {
  var b = require("browserify")();
  b.transform(require("reactify")); // Use the reactify transform.
  b.add(path.join(__dirname, "client", "js", "script.js"));
  return b.bundle()
    .pipe(require("vinyl-source-stream")("script.js"))
    .pipe(require("vinyl-buffer")())
    .pipe(require("gulp-uglify")().on("error", require('gulp-util').log))
    .pipe(gulp.dest(path.join(__dirname, "public")));
});

// Run Server
gulp.task("nodemon", function () {
  require("gulp-nodemon")({
    script: "app.js",
    ext: "js html",
    ignore: ["node_modules/"]
  })
});

// Watch
gulp.task("watch", function () {
  gulp.watch(path.join(__dirname, "client", "index.html"), ["copy"]);
  gulp.watch(path.join(__dirname, "client", "jsx", "**", "*.scss"), ["scss"]);
  gulp.watch([path.join(__dirname, "client", "scss", "**", "*.scss"), path.join(__dirname, "!client", "scss", "_components", "**")], ["scss"]);
  gulp.watch(path.join(__dirname, "client", "**", "*"), ["browserify"]);
});

gulp.task("build", ["copy", "scss", "browserify"]);
gulp.task("dev", ["nodemon", "watch"]);
gulp.task("prod", ["build", "dev"]);

gulp.task("default", ["dev"]);
