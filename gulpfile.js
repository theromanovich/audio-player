const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const minify = require("gulp-minify");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

gulp.task("server", function () {
  browserSync({
    server: {
      baseDir: "dist",
    },
  });

  gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task("styles", function () {
  return gulp
    .src("src/sass/**/*.+(scss|sass)")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("src/css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("watch", function () {
  gulp.watch(
    ["src/js/**/*.ts", "src/*.html", "src/sass/**/*.+(scss|sass|css)"],
    gulp.parallel("typescript", "html", "styles")
  );
  gulp.watch("dist/js/script.js").on("change", browserSync.reload);
});

gulp.task("html", function () {
  return gulp
    .src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/"));
});

// gulp.task("scripts", function () {
//   return gulp.src("src/js/*.js").pipe(minify()).pipe(gulp.dest("dist/js"));
// });

gulp.task("images", function () {
  return gulp.src("src/img/*").pipe(gulp.dest("dist/img"));
});

gulp.task("music", function () {
  return gulp.src("src/music/*").pipe(gulp.dest("dist/music"));
});

gulp.task("typescript", function () {
  return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist/js"));
});

gulp.task("default", gulp.series("typescript", "watch"));

gulp.task(
  "default",
  gulp.parallel(
    "watch",
    "server",
    "html",
    "styles",
    // "scripts",
    "images",
    "music",
    "typescript"
  )
);
