let Vue;
class vueRouter {
  constructor({routes}){
    this.$routes=routes
    this.$routesJSON=this.routesMap(routes)
    this.init()
  }
  init(){
    Vue.util.defineReactive(this,'current',this.getHas())
    window.addEventListener('hashchange',()=>{
      this.current=this.getHas()
    },false)
  }
  getHas(){
    return window.location.hash.slice(1)||'/'
  }
  // 将路由扁平化方便对比获取component
  routesMap(routes){
    let json={};
    routes.forEach(item => {
      json[item.path]=item;
      if(item.children){
        json={...json,...this.routesMap(item.children)}
      }
    });
    return json
  }
}
// vue.use()默认调用对象中的install
vueRouter.install=(_vue)=>{
  Vue=_vue;
  Vue.mixin({
    beforeCreate () {
      if(this.$options.vueRouter){
        Vue.prototype.$vueRouter=this.$options.vueRouter
      }
    }
  })
  Vue.component(
    'routerLinkCustom',
    {
      props: {
        to:{
          type:String,
          required:true
        }
      },
      render(h){
        return h('a',{
          attrs:{
            href:`#${this.to}`
          }
        },this.$slots.default)
      }
    }
  )
  Vue.component(
    'routerViewCustom',
    {
      render(h){
        return h(this.$vueRouter.$routesJSON[this.$vueRouter.current].component)
      }
    }
  )
}
export default vueRouter