import inherits from 'inherits';
// 引入自带的PropertiesActivator,  因为我们要用到它来处理eventBus
import PropertiesActivator from 'bpmn-js-properties-panel/lib/PropertiesActivator';

export default function AuthorityPropertiesProvider(
    eventBus, bpmnFactory, canvas, // 这里是要用到什么就引入什么
    elementRegistry, translate
) {
    PropertiesActivator.call(this, eventBus);
    
    this.getTabs = function (element) {
        var generalTab = {};
        var authorityTab = {};
        return [
            generalTab,
            authorityTab
        ];
    }
}

inherits(AuthorityPropertiesProvider, PropertiesActivator);