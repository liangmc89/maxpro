<template>
	<div id="actionResult">
	   <div v-if='ActionResult.type=="success"' class="result text-positive">
	   	  <img src="../statics/images/success.png" />
	   	  <h4>操作成功！</h4>
	   	  <h5 v-html="ActionResult.message"></h5>
        <q-btn class="actionBtn my-button" @click="$router.back()">完成</q-btn>
	   </div>
	   <div v-if='ActionResult.type=="fail"' class="result text-negative">
	   	 <img src="../statics/images/fail.png" />
	   	 <h4>操作失败！</h4>
	   	  <h5 v-html="ActionResult.message"></h5>
       <q-btn class="actionBtn my-button" @click="$router.back()">返回</q-btn>
	   </div>

	</div>
</template>

<script>
	import { QIcon,QBtn} from 'quasar'
	import PullTo from 'vue-pull-to'
	export default {
		data() {
			return {
				ActionResult:this.$route.params.actionResult
			}
		},
		components:{
			QIcon,QBtn
		}

	}
</script>

<style>
	#actionResult{
		position: relative;
		width: 100%;
		height: 100%;
	}
 .result{
 	text-align: center;
 	position: absolute;
 	margin: auto;
 	left: 0;
 	top: 0;
 	bottom: 0;
 	right: 0;
 	width: 100%;
 	height: 50%;
 }
  .actionBtn{
    margin-top: 5rem;
    width: 40%;
  }
</style>
