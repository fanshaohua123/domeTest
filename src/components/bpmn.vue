<template>
  <a-spin :spinning="loading" class="content">
    <a ref="saveDiagram" href="javascript:" title="保存为bpmn">保存为bpmn</a>
    <a ref="saveSvg" href="javascript:" title="保存为svg">保存为svg</a>
    <button @click="create">创建一个BPMN element</button>
    <button @click="getxml">获取xml</button>
    <div class="containers">
      <div class="canvas" ref="canvas"></div>
      <!-- <div id="js-properties-panel" class="panel"></div> -->
      <model ref="model" @ok="ok"></model>
    </div>
  </a-spin>
</template>
<script>
  // 引入相关的依赖
  import BpmnModeler from 'bpmn-js/lib/Modeler'
  // 引入右侧相关配置
  import propertiesPanelModule from 'bpmn-js-properties-panel'
  import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
  import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
  // 这里是直接引用了xml字符串
  import { xmlStr } from './mock/xmlStr' 
  import CustomModeler from './customBpmn';
  import model from './model.vue';
  export default {
    name: '',
    components: {
      model
    },
    // 生命周期 - 创建完成（可以访问当前this实例）不能在这里初始化是因为此时ref还获取不到
    created() { },
    // 生命周期 - 载入后, Vue 实例挂载到实际的 DOM 操作完成，一般在该过程进行 Ajax 交互
    mounted() {
      this.init()
    },
    data() {
      return {
        // bpmn建模器
        bpmnModeler: null,
        // container: null,
        // canvas: null,
        xmlStr:'',
        loading:false,
        select:''
      }
    },
    methods: {
      ok(form){
        var moddle = this.bpmnModeler.get('modeling');
        moddle.updateProperties(this.getShape(form.id), {
          ...form
        })
      },
      getxml(){
        console.log(this.xmlStr);
      },
      async create(){
        var moddle = this.bpmnModeler.get('modeling');
        // console.log(moddle.fromXML(this.xmlStr));
        // const {rootElement: definitions} = await moddle.fromXML(this.xmlStr);
        // const bpmnProcess = moddle.create('bpmn:Task', { id: 'MyProcess_1' });
        // definitions.get('rootElements')[0].flowElements.push(bpmnProcess);
        // const {xml: xmlStrUpdated} = await moddle.toXML(definitions);
        // this.transformCanvas(xmlStrUpdated)
        moddle.updateProperties(this.select.element, {
          name: '我是修改后的Task名称',
          isInterrupting: false,
          customText: '我是自定义的text属性'
        })
      },
      async init() {
        // 获取到属性ref为“canvas”的dom节点
        const canvas = this.$refs.canvas
        // 建模
        this.bpmnModeler = new CustomModeler({
          container: canvas,
          // //添加右侧控制板
          // propertiesPanel: {
          //   parent: '#js-properties-panel'
          // },
          // additionalModules:[
          //   {
          //     labelEditingProvider:["value",'']
          //   }
          // ],
          additionalModules: [
            // CustomModeler
            // // 右侧工具栏属性
            // propertiesProviderModule,
            // // 右侧工具栏
            // propertiesPanelModule
          ],
          // // 右侧拓展模块
          // moddleExtensions: {
          //   camunda: camundaModdleDescriptor
          // }
        })
        // new CustomModeler({
        //   container: canvas,
        //   additionalModules:[
        //     {
        //       labelEditingProvider:["value",'']
        //     }
        //   ],
        // })
        this.loading = true
        this.xmlUrl = await this.getXmlUrl()
        this.loading = false
        this.$nextTick(() => { // 等待 DOM 更新之后再对工作流进行初始化
          this.createNewDiagram()
        })
      },
      getXmlUrl () { 
        // 该方法模拟请求后台获取bpmn文件地址
        return new Promise(resolve => {
            setTimeout(() => {
                const url = 'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmnMock.bpmn' // 模拟网络请求的一个地址
                resolve(url)
            }, 1000)
        })
      },
      async createNewDiagram() {
        let res = await this.axios({
            method: 'get',
            timeout: 120000,
            url: this.xmlUrl,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        this.transformCanvas(res['data'])
      },
      // 将字符串转换成图显示出来
      transformCanvas(xmlStr){
        this.bpmnModeler.importXML(xmlStr, (err) => {
          if (err) {
            this.$message.error(err)
          } else {
            this.xmlStr=xmlStr
            // 这里是成功之后的回调, 可以在这里做一系列事情
            this.success()
          }
          // 让图能自适应屏幕
          var canvas = this.bpmnModeler.get('canvas')
          canvas.zoom('fit-viewport')
        })
      },
      success() {
        this.$message.success('创建成功')
        this.addBpmnListener()
        this.addModelerListener()
        this.addEventBusListener()
      },

      addBpmnListener () {
        const that = this
      // 获取a标签dom节点
        const downloadLink = this.$refs.saveDiagram
        const downloadSvgLink = this.$refs.saveSvg
        // 给图绑定事件，当图有发生改变就会触发这个事件
        this.bpmnModeler.on('commandStack.changed', function (a,b,c){
          console.log(a,b,c);
          return
          that.saveDiagram(function(err, xml) {
              that.setEncoded(downloadLink, 'diagram.bpmn', err ? null : xml)
          })
          that.saveSVG(function(err, svg) {
              that.setEncoded(downloadSvgLink, 'diagram.svg', err ? null : svg)
          })
        })
      },
       // 下载为SVG格式,done是个函数，调用的时候传入的
      saveSVG(done) {
          // 把传入的done再传给bpmn原型的saveSVG函数调用
          this.bpmnModeler.saveSVG(done)
      },
      // 下载为bpmn格式,done是个函数，调用的时候传入的
      saveDiagram(done) {
        // 把传入的done再传给bpmn原型的saveXML函数调用
        let that=this
        this.bpmnModeler.saveXML({ format: true }, function(err, xml) {
          that.xmlStr=xml
          console.log(xml);
          done(err, xml)
        })
      },
       // 当图发生改变的时候会调用这个函数，这个data就是图的xml
      setEncoded(link, name, data) {
          // 把字符串转换为URI，下载要用到的
          const encodedData = encodeURIComponent(data)
          // 下载图的具体操作,改变a的属性，className令a标签可点击，href令能下载，download是下载的文件的名字
          let xmlFile = new File([data], 'test.bpmn')
          if (data) {
            link.className = 'active'
            link.href = 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData
            link.download = name
          }
      },
      // 监听事件
      addModelerListener() {
        const bpmnjs = this.bpmnModeler
        const that = this
        // 这里我是用了一个forEach给modeler上添加要绑定的事件
        const events = ['shape.added', 'shape.move.end', 'shape.removed', 'connect.end', 			'connect.move']
        events.forEach(function(event) {
          that.bpmnModeler.on(event, e => {
            // console.log(event, e)
            var elementRegistry = bpmnjs.get('elementRegistry')
            var shape = e.element ? elementRegistry.get(e.element.id) : e.shape
            // console.log(shape)
            if (event === 'shape.added') {
              console.log('新增了shape')
            } else if (event === 'shape.move.end') {
              console.log('移动了shape')
            } else if (event === 'shape.removed') {
              console.log('删除了shape')
            }
          })
        })
      },
      addEventBusListener () {
        return
        let that = this
        const eventBus = this.bpmnModeler.get('eventBus') // 需要使用eventBus
        const eventTypes = ['element.click', 'element.changed'] // 需要监听的事件集合
        eventTypes.forEach(function(eventType) {
          eventBus.on(eventType, function(e) {
            if (!e || e.element.type == 'bpmn:Process') return 
            //获取指定id元素的信息
            if (eventType === 'element.changed') {
              that.elementChanged(eventType, e)
            } else if (eventType === 'element.click') {
              console.log(e);
              that.select=e
              that.$refs.model.showDrawer(e)
            }
            })
        })
      },
      elementChanged(eventType, e) {
        var shape = this.getShape(e.element.id)
        if (!shape) {
          // 若是shape为null则表示删除, 无论是shape还是connect删除都调用此处
          console.log('无效的shape')
          // 由于上面已经用 shape.removed 检测了shape的删除, 因此这里只判断是否是线
          if (this.isSequenceFlow(e.element.type)) {
            console.log('删除了线')
          }
        }
        if (shape) {
          if (this.isSequenceFlow(shape.type)) {
            console.log('改变了线')
          }
        }
      },
      getShape(id) {
        var elementRegistry = this.bpmnModeler.get('elementRegistry')
        return elementRegistry.get(id)
      },
      isInvalid (param) { // 判断是否是无效的值
        return param === null || param === undefined || param === ''
      },
      isSequenceFlow (type) { // 判断是否是线
        return type === 'bpmn:SequenceFlow'
      }
    }
  }
</script>
<style scoped>
.content {
  position: relative;
  width: 100%;
	height: 100%;
}
 .content>>> .ant-spin-container{
  width: 100%;
	height: 100%;
}
.containers{
	background-color: #ffffff;
	width: 100%;
	height: 100%;
}
.canvas{
	width: 100%;
	height: 100%;
}
.panel{
	position: absolute;
	right: 0;
	top: 0;
  bottom: 50px;
	width: 300px;
  overflow: auto;
}
</style>
