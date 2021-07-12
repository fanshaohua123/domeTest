<template>
  <div>
    <router-link to="/router/home">首页</router-link>
    <router-link to="/router/list">其他</router-link>
    <a-button @click="()=>{$vueRouter.current='/router/list'}">其他</a-button>
    <router-link-custom to="/router/home">首页</router-link-custom>
    <router-link-custom to="/router/list">其他</router-link-custom>
    <router-view-custom />
    <router-view />
  </div>
</template>