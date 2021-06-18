const customElements = ['bpmn:Task'] // 自定义元素的类型
const customConfig = { // 自定义元素的配置(后面会用到)
    'bpmn:Task': {
        'url': 'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/rules.png',
        'attr': { width: 48, height: 48 }
    }
}
const hasLabelElements = ['bpmn:StartEvent', 'bpmn:EndEvent']
export { customElements, customConfig ,hasLabelElements}
