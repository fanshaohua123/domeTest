//--------------------------------------------------------------------------------------------------------------------------------------------------------
// 默认的基础上修改
export default class CustomPalette {
  constructor(bpmnFactory, create, elementFactory, palette, translate){
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;
    palette.registerProvider(this);
  }
  getPaletteEntries() {
    const {
        bpmnFactory,
        create,
        elementFactory,
        translate
    } = this;
    function createTask() {
      return function(event){
        const businessObject = bpmnFactory.create('bpmn:Task');
        const shape = elementFactory.createShape({
            type: 'bpmn:Task',
            businessObject
        });
        console.log(shape) // 只在拖动或者点击时触发
        create.start(event, shape);
      }
    }
    return{
      'aa':{
        group:'model',
        className:'icon-custom lindaidai-task',
        title:translate('啊哈哈哈哈哈'),
        action: {
          dragstart: createTask(), // 开始拖拽时调用的事件
          click: createTask() // 点击时调用的事件
        }
      }
    }
  }
}

// CustomPalette.$inject=['bpmnFactory', 'create', 'elementFactory', 'palette', 'translate']
//--------------------------------------------------------------------------------------------------------------------------------------------------------
// 完全自定义
// export default function PaletteProvider(palette, create, elementFactory, globalConnect) {
//   this.create = create
//   this.elementFactory = elementFactory
//   this.globalConnect = globalConnect

//   palette.registerProvider(this)
// }

// PaletteProvider.$inject = [
//   'palette',
//   'create',
//   'elementFactory',
//   'globalConnect'
// ]

// PaletteProvider.prototype.getPaletteEntries = function(element) { // 此方法和上面案例的一样
//   const {
//       create,
//       elementFactory
//   } = this;
//   function createTask() {
//       return function(event) {
//           const shape = elementFactory.createShape({
//               type: 'bpmn:Task'
//           });
//           console.log(shape) // 只在拖动或者点击时触发
//           create.start(event, shape);
//       }
//   }
//   return {
//       'aa': {
//           group: 'model',
//           className: 'icon-custom lindaidai-task',
//           title: '哈哈哈',
//           action: {
//               dragstart: createTask(),
//               click: createTask()
//           }
//       }
//   }
// }