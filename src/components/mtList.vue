<template>
    <div id="mtList">
      <div class="h-bg my-bg">
        <h5 class="page-title">设置</h5>
      </div>
      <div class="padding-content bg-white">
        <q-input  :before="[{icon:'search'}]" v-model="mtKey" placeholder="搜索账号" clearable type="text"></q-input>
      </div>
      <div class="mt-body">
        <pull-to :top-load-method="refresh">
           <div class="mt-item bg-white" v-for="(item,index) in mtList" :key="index">
             <div class="mt-title-wrap ">
              <div class="row no-wrap mt-title ">
                <div class="col-4 mt-label list-style text-right">真实姓名：</div>
                <div class="col-4">{{item.member_id}}</div>
                <div class="col-2">主账户</div>
                <div class="col-2 text-right text-primary">正常</div>
              </div>
             </div>
             <div class="row no-wrap mt-filed ">
               <div class="col-2 mt-label">账户：</div>
               <div class="col-6">{{item.loginid}}</div>
               <div class="col-4 text-right">{{item.LEVERAGE}}倍杠杆</div>
             </div>
             <div class="row no-wrap  mt-filed">
               <div class="col-2 mt-label">组：</div>
               <div class="col-10">{{item.GROUP}}</div>

             </div>
             <div class="row no-wrap  mt-filed">
               <div class="col-2 mt-label">余额：</div>
               <div class="col-4">{{item.BALANCE|currencyFilter}}</div>
               <div class="col-2 mt-label">净值：</div>
               <div class="col-4">{{item.EQUITY|currencyFilter}}</div>
             </div>
             <div class="row no-wrap  mt-filed">
               <div class="col-2 mt-label">赠金：</div>
               <div class="col-4">{{item.CREDIT|currencyFilter}}</div>
               <div class="col-2 mt-label">比例：</div>
               <div class="col-4">0</div>
             </div>
             <div class="row no-wrap  mt-filed">
               <div class="col-4 mt-label">可用预付款：</div>
               <div class="col-8">{{item.MARGIN_FREE|currencyFilter}}</div>
             </div>
           </div>
        </pull-to>
      </div>
      <div class="row">
        <div class="col-6">
         <q-btn icon="add" big color="primary" class="full-width">账户申请</q-btn>
        </div>
        <div class="col-6">
          <q-btn big class="full-width" color="red-12">账户绑定</q-btn>
        </div>
      </div>
    </div>

</template>

<script>
  import {QBtn,Toast,QInput} from 'quasar'
  import { currencys } from '../js/filter'
  import PullTo from 'vue-pull-to'
    export default {
        name: "mt-list",
      data(){
          return{
            mtList:[],
            mtKey:''
          }
      },
      components:{
         PullTo,QBtn,QInput
      },
      filters: {
        currencyFilter: function(value) {
          return currencys(value);
        }
      },
      methods:{
          refresh:function (done) {
            this.$showloading();
            let self = this;
            setTimeout(() => {
              self.$http.post(self.$api.url.mtDetail, {}).then(response => {
                  if (response && response.data.code == 1) {
                    self.mtList=response.data.data;
                  } else {
                    Toast.create.negative({html: response.data.message})
                  }
                  self.$hideloading();
                }
              ).catch(err => {
                self.$hideloading();
                Toast.create.negative({
                  html: err.message
                });
              });
              if (done) {
                done()
              }
            }, 1000);
          }
      },
      created:function () {
        this.refresh();
      }
    }
</script>

<style scoped>
  #mtList{
    height: 100%;
    width: 100%;
    display:flex;
    flex-direction: column;
  }
  .mt-body{
    flex:1;
    overflow: hidden;
    box-sizing: border-box;
  }

  .mt-item:nth-child(even) .list-style {
    padding-left: 2rem;
    background: url("../statics/images/list-style-orange.png") no-repeat left center/1.4rem;
  }
  .mt-item:nth-child(odd) .list-style {
    padding-left: 2rem;
    background: url("../statics/images/list-style-green.png") no-repeat left center/1.4rem;
  }



  .mt-filed{
    padding: 0 1rem;
  }

  .mt-item{
    font-size: 1.4rem;
    line-height: 2.6rem;
    padding-bottom: .5rem;
    margin-top: 1rem;

  }
  .mt-title-wrap{
    padding: 0 1rem;
  }
  .mt-title{
    padding: .8rem 0;
    border-bottom: 1px solid rgb(227,227,227);

  }
  .mt-label{
    color:grey;
  }

  .mt-bottom-btn{

  }
</style>
