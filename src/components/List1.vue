<template>
<div>
  <a-form-model :model="$data"  ref="ruleForm">
    <a-table
        :scroll="{ x: 2000 }"
        ref="table"
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="domains"
        :pagination="false"
      >
        <span slot="deliveryOrder" slot-scope="text, record,index">
          <!-- :rules="{ required: true, message: 'wqe', trigger: 'blur' }" -->
          <a-form-model-item   :prop="'domains.' + index + '.value'" :rules="{ required: true, message: 'wqe', trigger: 'blur' }">
            <a-input placeholder="请输入本次配送" v-model="record.value" />
          </a-form-model-item>
        </span>
      </a-table>
  </a-form-model>
  <a-button @click="handleSubmit">保存</a-button>
</div>
</template>

<script>
export default {
  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      },
      columns:[
         {
            title: '交货订单',
            dataIndex: 'deliveryOrder',
            key: 'deliveryOrder',
            scopedSlots: { customRender: 'deliveryOrder' },
        },
      ],
      domains: [
        {
          value: '',
        },
        {
          value: 'wewqe',
        },
        {
          value: '',
        },
        {
          value: '',
        },
        {
          value: '',
        },
      ],
    };
  },
  methods: {
    handleSubmit(){
      this.$refs.ruleForm.validate(async valid => {
        debugger
        if (valid) {
          //  const params = [...this.dataSource]
          //   const res = await Request.replyPurchaseOrderDetailData(params)
          //   if (res.success) {
          //     console.log(res)
          //     this.close()
          //   } else {
          //     this.$message.warning(res.message)
          //   }
        } else {
          this.$message.warning('请填写完整信息!')
          return false;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          alert('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      let index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now(),
      });
    },
  },
};
</script>
<style>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
