<template>
	<div id="app">
	  <PriceComponent />
	</div>
  </template>

  <script lang="ts">
  import { defineComponent } from 'vue';
  import PriceComponent from './components/PriceComponent.vue';

  export default defineComponent({
	name: 'App',
	components: {
	  PriceComponent
	}
  });
  </script>

  <style>
  #app {
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
  }
  </style>
