// 原有基础上修改
// ------------------------------------------------------------------------------------------------
import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer' // 引入默认的renderer
import {customElements, customConfig,hasLabelElements} from '../../utils/util';
import {
  append as svgAppend,
  create as svgCreate
} from 'tiny-svg'
const HIGH_PRIORITY = 1500 // 最高优先级
export default class CustomRenderer extends BaseRenderer { // 继承BaseRenderer
    constructor(eventBus, bpmnRenderer) {
        super(eventBus, HIGH_PRIORITY)
        this.bpmnRenderer = bpmnRenderer
    }

    canRender(element) {
        // ignore labels
        return !element.labelTarget
    }

    drawShape(parentNode, element,) { // 核心函数就是绘制shape
      const type=element.type
      if(customElements.includes(type)){
        const {url,attr}=customConfig[type]
        const customIcon = svgCreate('image', { // 在这里创建了一个image
          ...attr,
          href: url
        })
        element['width'] = attr.width // 这里我是取了巧, 直接修改了元素的宽高
        element['height'] = attr.height
        console.log(element);
        console.log(customIcon);
        svgAppend(parentNode, customIcon)
        // 判断是否有name属性来决定是否要渲染出label
        // 判断是否有name属性来决定是否要渲染出label
        if (!hasLabelElements.includes(type) && element.businessObject.name) {
            const text = svgCreate('text', {
                x: attr.x,
                y: attr.y + attr.height + 20, // y取的是父元素的y+height+20
                "font-size": "14",
                "fill": "#000"
            })
            text.innerHTML = element.businessObject.name
            svgAppend(parentNode, text)
            console.log(text)
        }
        // 注意一定要return出customIcon
        return customIcon
      }
      const shape = this.bpmnRenderer.drawShape(parentNode, element)
      return shape
    }

    getShapePath(shape) {
        return this.bpmnRenderer.getShapePath(shape)
    }
}

CustomRenderer.$inject = ['eventBus', 'bpmnRenderer']
// ------------------------------------------------------------------------------------------------
// 完全自定义render
// import inherits from 'inherits';

// import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer'

// import {
//     append as svgAppend,
//     create as svgCreate
// } from 'tiny-svg'

// import { customElements, customConfig } from '../../utils/util'

// export default function CustomRenderer(eventBus, styles){
//   BaseRenderer.call(this,eventBus,2000)
//   var computeStyle = styles.computeStyle
//   this.drawCustomElements=function(parentNode, element) { // 核心函数就是绘制shape
//     const type=element.type
//     if(customElements.includes(type)){
//       const {url,attr}=customConfig[type]
//       const customIcon = svgCreate('image', { // 在这里创建了一个image
//         ...attr,
//         href: url
//       })
//       element['width'] = attr.width // 这里我是取了巧, 直接修改了元素的宽高
//       element['height'] = attr.height
//       svgAppend(parentNode, customIcon)
//       // 注意一定要return出customIcon
//       console.log(customIcon);
//       return customIcon
//     }
//     const shape = this.drawCustomElements(parentNode, element)
//     return shape
//   }
// }
// inherits(CustomRenderer, BaseRenderer)

// CustomRenderer.$inject = ['eventBus', 'styles']

// CustomRenderer.prototype.canRender = function(element) {
//     // ignore labels
//     return !element.labelTarget;
// }

// CustomRenderer.prototype.drawShape = function(p, element) {
//   debugger
//     return this.drawCustomElements(p, element)
// }

// CustomRenderer.prototype.getShapePath = function(shape) {
//     console.log(shape)
// }
