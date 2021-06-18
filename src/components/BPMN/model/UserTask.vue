<template>
  <div>
    <a-drawer
      :mask="false"
      width='500'
      title="用户节点"
      placement="right"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <a-form-model layout="horizontal" :model="form" v-bind="formItemLayout">
        <a-form-model-item label="节点id">
          <a-input v-model="form.id" disabled />
        </a-form-model-item>
        <a-form-model-item label="名称">
          <a-input v-model="form.name" placeholder="节点名称" />
        </a-form-model-item>
        <a-form-model-item label="处理人">
          <a-select v-model="form.userName" style="width: 100%" >
              <a-select-option value="jack">
                Jack
              </a-select-option>
              <a-select-option value="lucy">
                Lucy
              </a-select-option>
              <a-select-option value="disabled" disabled>
                Disabled
              </a-select-option>
              <a-select-option value="Yiminghe">
                yiminghe
              </a-select-option>
            </a-select>
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
    edit(e) {
      this.form={...this.form,...e.businessObject,...e.businessObject.$attrs}
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    onOk(){
      this.$emit('ok',this.form)
      this.onClose()
    }
  },
};
</script>
