<template>
  <div>
    <a-button type="primary" @click="showDrawer">
      节点设置
    </a-button>
    <a-drawer
      :mask="false"
      width='500'
      title="Basic Drawer"
      placement="right"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <a-form-model :layout="form.layout" :model="form" v-bind="formItemLayout">
        <a-form-model-item label="节点id">
          <a-input v-model="form.id" placeholder="input placeholder" />
        </a-form-model-item>
        <a-form-model-item label="名称">
          <a-input v-model="form.name" placeholder="input placeholder" />
        </a-form-model-item>
      </a-form-model>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="onClose">
          取消
        </a-button>
        <a-button type="primary" @click="onOk">
          确定
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      form: {
        layout: 'horizontal',
        userid:'123'
      },
      formItemLayout:{
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      }
    };
  },
  methods: {
    afterVisibleChange(val) {
      console.log('visible', val);
    },
    showDrawer(e) {
      this.form= {
        layout: 'horizontal',
        userid:'123'
      },
      this.form={...this.form,...e.element.businessObject}
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    onOk(){
      debugger
      this.$emit('ok',this.form)
    }
  },
};
</script>
