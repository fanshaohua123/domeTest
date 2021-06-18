
module.exports = {
  devServer: {
    overlay: {
       warnings: false,
       errors: false
    },
    // lintOnSave: false
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
}
