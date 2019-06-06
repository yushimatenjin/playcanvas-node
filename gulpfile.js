const gulp = require("gulp");
const typedoc = require("gulp-typedoc");

gulp.task("typedoc", () => {
  return gulp.src(["src/**/*.ts"]).pipe(
    typedoc({
      module: "commonjs",
      target: "es5",
      out: "docs/",
      name: "playcanvas-node"
    })
  );
});
gulp.task("default", gulp.parallel("typedoc"));
