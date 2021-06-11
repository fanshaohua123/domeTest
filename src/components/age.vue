<template>
  <div>
    age
    <a-input v-model="value"></a-input>
  </div>
</template>
<script>
const treeData = [
  {
    id: "1",
    isLeaf: false,
    title: "财务部",
    slots: { icon: 'meh' },
    children:[
      {
        id: "1-1",
        isLeaf: false,
        title: "财务部1",
        slots: { icon: 'meh' },
        slotScope:{title:'title'}
      },
      {
        id: "1-2",
        isLeaf: true,
        title: "财务部2",
        slots: { icon: 'meh' },
      },
    ]
  }
];

export default {
  name:'age',
  data() {
    return {
      value:'',
      treeData,
    };
  },
  methods: {
    onSelect(selectedKeys, info) {
      console.log('selected', selectedKeys, info);
    },
    onCheck(checkedKeys, info) {
      console.log('onCheck', checkedKeys, info);
    },
  },
};
</script>