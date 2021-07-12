import Router from 'vue-router'
import vue from 'vue';
import vueRouter from '../components/vue-router'
vue.use(Router)
vue.use(vueRouter)
const routes=[
    {
        name:'index',
        path:'/',
        component:()=>import('../components/index'),
        children:[
            {
                name:'router',
                path:'router',
                component:()=>import('../components/router'),
                children:[
                    {
                        name:'home',
                        path:'/router/home',
                        component:()=>import('../components/age')
                    },
                    {
                        name:'list',
                        path:'/router/list',
                        component:()=>import('../components/List1'),
                        beforeEnter:(to, from, next) => {
                            console.log(to);                            
                            console.log(from);                            
                            setTimeout(()=>{
                                next()
                            },3000)                         
                        },
                        beforeLeave:(to, from, next) => {
                            console.log(to);                            
                            console.log(from);                            
                            setTimeout(()=>{
                                // next()
                            },3000)                         
                        },
                    },
                ]
            },
            {
                name:'home',
                path:'home',
                component:()=>import('../components/home')
            },
            {
                name:'bpmn1',
                path:'bpmn1',
                component:()=>import('../components/bpmn')
            },
            {
                name:'bpmn',
                path:'bpmn',
                component:()=>import('../components/BPMN/bpmn')
            },
            {
                name:'age',
                path:'age',
                component:()=>import('../components/age')
            },
            {
                name:'list',
                path:'list',
                component:()=>import('../components/List'),
                children:[
                    {
                        name:'list1',
                        path:'list1',
                        component:()=>import('../components/List1')
                    },
                    {
                        name:'list2',
                        path:'list2',
                        component:()=>import('../components/List2')
                    },
                    {
                        name:'list3',
                        path:'list3',
                        component:()=>import('../components/List3')
                    },
                ]
            },
        ]
    },
]
export default new Router({
  routes: routes,
  mode:'history'
})
export const router_custom=  new vueRouter({
  routes: routes,
})