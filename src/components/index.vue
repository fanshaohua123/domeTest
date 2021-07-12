<template>
  <a-layout id="components-layout-demo-responsive">
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="inline"
        :openKeys="openKeys"
        @openChange="openChange"
        @select="select"
        :selectedKeys="[$route.path]"
      >
        <template v-for="item in menu">
          <a-menu-item v-if="!item.children" :key="item.url">
            <a-icon type="user" />
            <span class="nav-text">{{ item.name }}</span>
          </a-menu-item>
          <a-sub-menu v-else :key="item.url">
            <span slot="title"
              ><a-icon type="appstore" /><span>{{ item.name }}</span></span
            >
            <a-menu-item v-for="item1 in item.children" :key="item1.url">
              {{ item1.name }}
            </a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <a-layout style="height: 100%">
          <a-layout-header :style="{ background: '#fff', padding: 0 }">
            <a-dropdown :trigger="['contextmenu']">
              <a-tabs
                @contextmenu.native="contextmenu"
                v-model="$store.state.activePage"
                type="editable-card"
                @tabClick="tabClick"
                @edit="editPage"
                hideAdd
              >
                <a-tab-pane
                  v-for="pane in $store.state.pageList"
                  :tab="pane.name"
                  :key="pane.fullPath"
                  :closable="true"
                >
                </a-tab-pane>
              </a-tabs>
              <a-menu slot="overlay">
                <a-menu-item key="1"> 新增 </a-menu-item>
                <a-menu-item key="2"> 编辑 </a-menu-item>
                <a-menu-item key="3"> 删除 </a-menu-item>
              </a-menu>
            </a-dropdown>
          </a-layout-header>
          <a-layout-content>
            <div
              :style="{ padding: '24px', background: '#fff', height: '100%' }"
            >
              <route-view />
            </div>
          </a-layout-content>
        </a-layout>
      </a-layout-content>
      <a-layout-footer style="textalign: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import routeView from "./routeView";
export default {
  components: {
    routeView,
  },
  data() {
    return {
      openKeys: [],
      menu: [
        {
          key: 1,
          url: "/home",
          name: "首页",
        },
        {
          key: 4,
          url: "/bpmn1",
          name: "bpmn1",
        },
        {
          key: 5,
          url: "/bpmn",
          name: "bpmn",
        },
        {
          key: 2,
          url: "/list",
          name: "列表",
          children: [
            {
              key: 2 - 1,
              url: "/list/list1",
              name: "列表1",
            },
            {
              key: 2 - 2,
              url: "/list/list2",
              name: "列表2",
            },
            {
              key: 2 - 3,
              url: "/list/list3",
              name: "列表3",
            },
          ],
        },
        {
          key: 3,
          url: "/age",
          name: "vuex原理",
        },
        {
          key: 6,
          url: "/router",
          name: "路由",
        },
      ],
    };
  },
  watch: {
    $route: {
      handler(route) {
        this.$store.commit("setActivePage", route.fullPath);
        this.$store.commit("add", route);
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true,
    },
  },
  methods: {
    contextmenu(e) {
      console.log(e.target);
    },
    xhmenu() {
      for (let i = 0; i < this.menu.length; i++) {
        if (this.menu[i].children && this.menu[i].children.length) {
          for (let y = 0; y < this.menu[i].children.length; y++) {
            if (this.menu[i].children[y].url === this.$route.path) {
              this.openKeys = [this.menu[i].url];
            }
          }
        }
      }
    },
    openChange(ev) {
      console.log(ev);
      this.openKeys = ev;
    },
    // tab点击跳转对应的页面
    changePage(key) {
      this.$store.commit("setActivePage", key);
      this.$router.push(key);
    },
    // 删除
    editPage(key, action) {
      if (action === "remove") {
        console.log(this.$store.commit("remove", key));
      }
    },
    tabClick(key) {
      this.$router.push(key);
    },
    select({ item, key, selectedKeys }) {
      console.log(item);
      console.log(key);
      console.log(selectedKeys);
      this.$router.push(key);
    },
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint() {
      // console.log(broken);
    },
  },
  mounted() {
    this.xhmenu();
  },
};
</script>

<style>
#components-layout-demo-responsive {
  height: 100vh;
}
#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.content {
  height: calc(100% - 56px);
}
</style>
