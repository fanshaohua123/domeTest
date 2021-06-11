import vue from 'vue';
import vuex from 'vuex';
import router from '../router';
import {last} from 'lodash';
vue.use(vuex)
export default new vuex.Store(
    {
        state: {
            // 当前点击的页面
            activePage:'',
            //点击过菜单的集合
            pageList:[],
            delTabs:[]
        },
        mutations: {
            setActivePage(state,data){
                state.activePage=data
            },
            add(state,data){
                const index = state.pageList.findIndex(item => item.fullPath === data.fullPath)//判断是否存在不存在就push进去
                if (index === -1) {
                    state.pageList.push(data)
                }
                let {matched}=data
                let name=last(matched).components.default.name
                const index_1=state.delTabs.findIndex(item=>item===name)
                if(index_1 !== -1) {
                    state.delTabs.splice(index_1,1)
                }
            },
            remove(state,data){
                if(state.pageList.length===1) return alert('已经是最后一条了')
                let index=state.pageList.findIndex(item=>item.fullPath===data)
                let {matched}=state.pageList[index]
                state.delTabs.push(last(matched).components.default.name)
                state.pageList.splice(index,1)
                if(!(state.activePage===data)) return
                const corIndex=index>=state.pageList.length?index-1:index
                router.push(state.pageList[corIndex].fullPath)
                state.activePage=state.pageList[corIndex].fullPath
                // .finally(()=>{
                //     this.dustbin.splice(0)
                // })
            }
        }
    }
)
