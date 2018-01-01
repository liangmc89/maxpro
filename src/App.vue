<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <keep-alive>
    <router-view />
    </keep-alive>
  </div>
</template>

<script>
/*
 * Root component
 */


export default {
 created:function () {

 }
}
</script>

<style>
	#q-app{
		height: 100%;
    background: rgb(247,247,247);


	}
</style>
