// CustomContextPadProvider.js
import {customElements, customConfig,hasLabelElements} from '../../utils/util';
export default function ContextPadProvider(contextPad, config, injector, translate, bpmnFactory, elementFactory, create, modeling, connect) {
  this.create = create
  this.elementFactory = elementFactory
  this.translate = translate
  this.bpmnFactory = bpmnFactory
  this.modeling = modeling
  this.connect = connect
  config = config || {}
  if (config.autoPlace !== false) {
      this.autoPlace = injector.get('autoPlace', false)
  }
  contextPad.registerProvider(this)
}

ContextPadProvider.$inject = [
  'contextPad',
  'config',
  'injector',
  'translate',
  'bpmnFactory',
  'elementFactory',
  'create',
  'modeling',
  'connect'
]

ContextPadProvider.prototype.getContextPadEntries = function(element) {
    const {
        autoPlace,
        create,
        elementFactory,
        translate,
        modeling
    } = this;
    function appendTask(event, element) {
        if (autoPlace) {
            const shape = elementFactory.createShape({ type: 'bpmn:Task' });
            const {attr}=customConfig[shape.type]
            shape['width'] = attr.width 
            shape['height'] = attr.height
            autoPlace.append(element, shape);
        } else {
            appendTaskStart(event, element);
        }
    }

    function appendTaskStart(event) {
        const shape = elementFactory.createShape({ type: 'bpmn:Task' });
        const {attr}=customConfig[shape.type]
        shape['width'] = attr.width 
        shape['height'] = attr.height
        create.start(event, shape, {
          source: element
        });
    }
    function removeElement(event){
      modeling.removeElements([element]) 
    }
    return {
        'append.lindaidai-task': {
            group: 'model',
            className: 'icon-custom lindaidai-task',
            title: translate('创建一个类型为lindaidai-task的任务节点'),
            action: {
                click: appendTask,
                dragstart: appendTaskStart
            }
        },
        'delete': {
          group: 'edit',
            className: 'icon-custom icon-custom-delete',
            title: translate('删除'),
            action: {
                click: removeElement
            }
        }
    };
}


