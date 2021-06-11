<template>
  <div>
    <Aaa style="width:120px" v-model="arrayValue" :options="dictOptions"></Aaa>
    <button @click="setDate">数据</button>
  </div>
</template>
<script>
import Aaa from './aaa';
export default {
  components:{
    Aaa
  },
  data() {
    return {
      arrayValue:'',
      dictOptions:[
      ],
      labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
      },
      wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
      },
      expand: false,
      form: this.$form.createForm(this, { name: 'advanced_search' }),
    };
  },
  computed: {
    count() {
      return this.expand ? 11 : 7;
    },
  },
  updated() {
    console.log('updated');
  },
  methods: {
    setDate(){
      this.dictOptions=[
        {value:'1',text:'a'},
        {value:'2',text:'b'},
        {value:'3',text:'c'},
        {value:'4',text:'d'},
      ]
    },
    data(a){
      if(a==1){
        this.dictOptions=[
          {value:1,text:'1222'}
        ]
      }else{
        setTimeout(()=>{
          this.dictOptions=[
            {value:1,text:'dafafaf'}
          ]
        },3000)
      }
    },
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        console.log('error', error);
        console.log('Received values of form: ', values);
      });
    },

    handleReset() {
      this.form.resetFields();
    },

    toggle() {
      this.expand = !this.expand;
    },
  },
};
</script>
<style>
.ant-advanced-search-form {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}

.ant-advanced-search-form .ant-form-item {
  display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}

#components-form-demo-advanced-search .ant-form {
  max-width: none;
}
#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
</style>