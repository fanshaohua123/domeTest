// devServer: {
//   overlay: {
//      warnings: false,
//      errors: false
//   },
//   lintOnSave: false
// }
module.exports = {
  devServer: {
      disableHostCheck: true,

  },
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  lintOnSave: false,
}
