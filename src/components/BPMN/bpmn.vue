<template>
  <a-spin :spinning="loading" class="content">
    <div class="topButton">
      <a-upload
        :fileList="[]"
        name="file"
        :multiple="false"
        :before-upload="beforeUpload"
      >
        <a-button>导入BPMN</a-button>
      </a-upload>
      <a-button @click="clearBPMN">清空</a-button>
      <a-button @click="saveBPMN">保存为BPMN文件</a-button>
      <a-button @click="saveSVG">保存为SVG文件</a-button>
      <a-button @click="saveXML">查看xml</a-button>
    </div>
    <div class="containers">
      <div class="canvas" ref="canvas"></div>
    </div>
    <user-task-model ref="UserTask" @ok="ok"></user-task-model>
    <sequence-flow-model ref="SequenceFlow" @ok="ok"></sequence-flow-model>
  </a-spin>
</template>
<script>
  // 引入相关的依赖
  import BpmnModeler from 'bpmn-js/lib/Modeler'
  import UserTaskModel from './model/UserTask.vue';
  import SequenceFlowModel from './model/SequenceFlow.vue';
  import customTranslate from './customTranslate/customTranslate';
  export default {
    name: 'bpmn',
    components: {
      UserTaskModel,
      SequenceFlowModel
    },
    created() { },
    mounted() {
      this.init()
    },
    data() {
      return {
        // bpmn建模器
        bpmnModeler: null,
        xmlStr:'',
        loading:false,
      }
    },
    methods: {
      mounted(){
        this.init()
      },
      init(xmlStr) {
        // 获取到属性ref为“canvas”的dom节点
        const canvas = this.$refs.canvas
        // 建模
        this.bpmnModeler = new BpmnModeler({
          container: canvas,
          additionalModules:[
            // 汉化
            {translate: [ 'value', customTranslate ]}
          ],

        })
        if(xmlStr){
          this.importXML(xmlStr)
        }else{
          this.bpmnModeler.createDiagram()
          this.success()
        }
      },
      async importXML(xmlStr){
        this.bpmnModeler.importXML(xmlStr, (err) => {
          if (err) {
            this.$message.error(err)
          } else {
            // 这里是成功之后的回调, 可以在这里做一系列事情
            // 绑定节点事件
            this.success()
          }
        })
      },
      success(){
        this.addEventBusListener()
      },
      addEventBusListener(){
        let that = this
        const eventBus = this.bpmnModeler.get('eventBus') // 需要使用eventBus
        const eventTypes = ['element.click'] // 需要监听的事件集合
        eventTypes.forEach(function(eventType) {
          eventBus.on(eventType, (e)=>{
            if (!e || e.element.type == 'bpmn:Process') return // 这里我的根元素是bpmn:Process
            console.log(e);
            that.openModel(e)
          })
        })
      },
      openModel(e){
        if(e.element.type==='bpmn:UserTask'){
          this.$refs.UserTask.edit(e.element)
        }else if(e.element.type==='bpmn:SequenceFlow'){
          this.$refs.SequenceFlow.edit(e.element)
        }
      },
      ok(ev){
        var moddle = this.bpmnModeler.get('modeling');
        // 修改更新节点属性
        moddle.updateProperties(this.getShape(ev.id), {
          ...ev
        })
      },
      // 获取指定ID的节点对象
      getShape(id) {
        var elementRegistry = this.bpmnModeler.get('elementRegistry')
        return elementRegistry.get(id)
      },
      // 保存当前的xml
      saveXML(){
        const that=this;
        this.bpmnModeler.saveXML({ format: true }, function(err, xml) {
          console.log(xml);
          that.$confirm({
            title: 'Do you Want to delete these items?',
            content: () => <div>{xml}</div>,
            onOk() {
            },
            onCancel() {
            },
            class: 'test',
          });
        })
      },
      //下载BPMN
      async saveBPMN() {
        try {
          const result = await this.bpmnModeler.saveXML({ format: true });
          const { xml } = result;

          var xmlBlob = new Blob([xml], {
            type: "application/bpmn20-xml;charset=UTF-8,"
          });

          var downloadLink = document.createElement("a");
          downloadLink.download = "ops-coffee-bpmn.bpmn";
          downloadLink.innerHTML = "Get BPMN SVG";
          downloadLink.href = window.URL.createObjectURL(xmlBlob);
          downloadLink.onclick = function(event) {
            document.body.removeChild(event.target);
          };
          downloadLink.style.visibility = "hidden";
          document.body.appendChild(downloadLink);
          downloadLink.click();
        } catch (err) {
          console.log(err);
        }
      },
      //下载SVG
      async saveSVG() {
        try {
          const result = await this.bpmnModeler.saveSVG();
          const { svg } = result;

          var svgBlob = new Blob([svg], {
            type: "image/svg+xml"
          });

          var downloadLink = document.createElement("a");
          downloadLink.download = "ops-coffee-bpmn.svg";
          downloadLink.innerHTML = "Get BPMN SVG";
          downloadLink.href = window.URL.createObjectURL(svgBlob);
          downloadLink.onclick = function(event) {
            document.body.removeChild(event.target);
          };
          downloadLink.style.visibility = "hidden";
          document.body.appendChild(downloadLink);
          downloadLink.click();
        } catch (err) {
          console.log(err);
        }
      },
      // 文件上传
      beforeUpload(e){
        console.log(e);
        const that=this;
        const reader = new FileReader();
        reader.readAsText(e);
        reader.onload = function(e) {
          var xmlStr=e.currentTarget.result
          that.importXML(xmlStr);
        };
        return false
      },
      clearBPMN(){
        // this.bpmnModeler.clear()
        this.bpmnModeler.createDiagram()
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
	height: calc(100% - 32px);
  border: 1px solid #000;
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
.topButton{
  display: flex;
  position: relative;
  top: -24px;
}
.topButton button{
  margin-right: 10px;
}
</style>
