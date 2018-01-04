<template>
    <div class="content-wrapper">
      <div class="content-title">
        <q-toolbar class="text-center" style="background: transparent;height: 4.8rem">
          <q-btn flat icon="keyboard_arrow_left" @click="$router.push({name:'member'})" >
          </q-btn>
          <q-toolbar-title>
            银行卡
          </q-toolbar-title>
          <div style="width: 4rem"></div>
        </q-toolbar>
      </div>
      <div class="content-flex">
        <div id="bank">
          <div class="bank-body">
            <pull-to :bottom-load-method="refresh" :top-load-method="loadmore" class="bg-white ">
              <div class="padding-content" style="padding-bottom: 8rem">
                <div v-ripple class="bank-item shadow-5" v-for="(item,index) in bankList" style='background-image: url("../../statics/images/bank.png")'>
                  <div class="row no-wrap">
                    <div class="col-6 accountName">{{item.accountName}}</div>
                    <div class="col-6 addtime">{{item.addtime|dateFormat}}</div>
                  </div>
                  <div class="row no-wrap bankname">
                    {{item.bankName}}
                  </div>
                  <div class="row no-wrap bankbranch">
                    {{item.bankBranch}}
                  </div>
                  <div class="row no-wrap ">
                    <div class="col-12 accountNum">{{item.accountNum}}</div>
                  </div>

                </div>
              </div>
            </pull-to>
            <q-btn round  color="white" @click="$router.push('/maxpro/member/addBankCard')"  class="fixed" style="right: 1.5rem; bottom: 8rem">
              <q-icon name="add" color="primary" size="3rem" />
            </q-btn>
          </div>
        </div>
      </div>

    </div>



</template>

<script>
  import PullTo from 'vue-pull-to'

  import {Toast,Ripple,date,QBtn,QIcon,QToolbar,QToolbarTitle} from 'quasar'
    export default {
        name: "bank-list",
        data(){
          return{
            bankList:[]
          }
        },
      directives:{
          Ripple
      },
      components:{
        PullTo,QBtn,QIcon,QToolbar,QToolbarTitle
      },
      filters: {
        dateFormat: function(data_str) {
          if(data_str!=''&&data_str!=undefined){
            return date.formatDate(new Date(parseInt(data_str) * 1000), 'YYYY/MM/DD')
          }

        }
      },
      watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': function (from,to) {

           if(from.name=='bankList'){
            this.refresh();
           }
        }
      },
      methods:{
         refresh:function (done) {
            let self=this;
            setTimeout(()=>{
              self.$showloading();
              self.$http.post(self.$api.url.myAllCard,{}).then(response=>{
                self.$hideloading();
                  if(response&&response.data.code==1){
                      self.bankList=response.data.data;
                  }else{
                    Toast.create.negative({
                      html:response.data.message
                    })
                  }
              }).catch(err=>{
                self.$hideloading();
                  Toast.create.negative({
                     html:err.message
                  })
              })

              if(done){
                done();
              }

            },1000)
         },
        loadmore:function (done) {
          if(done){
            done();
          }
        }
      },
      created:function () {
        this.refresh();
      }

    }
</script>

<style>
  #bank{
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
  .bank-body{
    flex: 1;
    box-sizing: border-box;
    overflow: hidden;
  }
  .bank-item{
    padding: 1.2rem 1rem 1.2rem 8rem;
    border-radius: .2rem;
    background-repeat: no-repeat;
    background-size: cover;
    color: white;
    margin-bottom: 1.2rem;
    position: relative;
    min-height: 10rem;
  }
  .accountName{
    font-size:2.0rem
  }
  .bankname,.bankbranch{
    font-size: 1.6rem;
  }
  .accountNum{
    font-size: 1.8rem;
    text-align: right;
    font-family: Arial;
  }

  .addtime{
    text-align: right;
  }


</style>
