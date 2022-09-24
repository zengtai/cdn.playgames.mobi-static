// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//     cssnano: { preset: "advanced" },
//   },
// };

module.exports = {
  plugins: [
    require("tailwindcss"),
    // require('postcss-nested'),
    require("autoprefixer"),
    require("cssnano")({
      preset: "advanced",
    }),
  ],
};
