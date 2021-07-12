let Vue;
class Store {
  constructor(options){
    // 多个数据进行双向绑定，所以new Vue()对象
    this.vm=new Vue({
      data:{
        $$state:options.state
      }
    })
    this._mutations=options.mutations
    this._actions=options.actions
    this.commit=this.commit.bind(this)
    this.dispatch=this.dispatch.bind(this)
    this.getters={}
    options.getters&&this.handleGetters(options.getters)
  }
  // 不允许他人私自修改状态
  get state(){
    return this.vm.$data.$$state
  }
  set state(v){
    console.error('不允许修改');
  }
  handleGetters(getters){
    Object.keys(getters).map(item=>{
      Object.defineProperty(this.getters,item,{
        get:()=>{
         return getters[item](this.state)
        }
      })
    })
  }
  commit(type,data){
    this._mutations[type]?this._mutations[type](this.state,data):console.error('没有这个方法')
  }
  dispatch(type,data){
    this._actions[type]?this._actions[type](this,data):console.error('没有这个方法')
  }
}
const install=(_Vue)=>{
  Vue=_Vue;
  Vue.mixin({
    beforeCreate () {
      if(this.$options.store){
        Vue.prototype.$store=this.$options.store
      }
    }
  })
}
export default {Store,install}