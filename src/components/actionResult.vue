<template>
	<div id="actionResult" class="bg-white">
	   <div v-if='ActionResult&&ActionResult.types=="success"' class="result text-positive">
	   	  <img src="../statics/images/success.png" />
	   	  <h4>操作成功！</h4>
	   	  <h5 v-html="ActionResult.message"></h5>
       <template v-if="ActionResult.buttons">
         <q-btn v-for="(item,index) in ActionResult.buttons" class="actionBtn my-button" @click="item.handle()" :key="index">{{item.label}}</q-btn>
       </template>
        <q-btn v-else class="actionBtn my-button" @click="$router.back()">完成</q-btn>
	   </div>
	   <div v-if='ActionResult&&ActionResult.types=="fail"' class="result text-negative">
	   	 <img src="../statics/images/fail.png" />
	   	 <h4>操作失败！</h4>
	   	  <h5 v-html="ActionResult.message"></h5>
       <template v-if="ActionResult.buttons">
         <q-btn v-for="(item,index) in ActionResult.buttons" class="actionBtn my-button" @click="item.handle()" :key="index">{{item.label}}</q-btn>
       </template>
       <q-btn v-else class="actionBtn my-button" @click="$router.back()">返回</q-btn>
	   </div>

	</div>
</template>

<script>
	import { QIcon,QBtn} from 'quasar'
	import PullTo from 'vue-pull-to'
	export default {
		data() {
			return {
				ActionResult:{}
			}
		},
		components:{
			QIcon,QBtn
		},
    mounted:function () {
      this.ActionResult=this.$route.params.ActionResult
    }

  ,
  watch:{
    '$route':function (from,to) {
      if(to.name=='actionResult'){
        this.ActionResult=to.params.ActionResult;
      }else {
        this.ActionResult=from.params.ActionResult;
      }
    }
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
    margin-top: 3rem;
    width: 30%;
  }
</style>
