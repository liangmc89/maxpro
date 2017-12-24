<template>
   <div id="promo">
     <div class="h-bg my-bg">
       <h5 class="page-title">推广码</h5>
     </div>
     <div id="promo-body">
       <pull-to :top-load-method="refresh">
          <div class="promo-item bg-white" v-for="(item,index) in code" :key="index" >
             <div class="promo-title">推广</div>
            <div class="promo-field">
            <q-field >
              <q-input :value="item.link"  type="textarea" readonly stack-label="URL"/>
            </q-field>
            <q-btn flat color="primary" icon="content copy" v-clipboard:copy="item.link"
                   v-clipboard:success="onCopy(item)"
                   v-clipboard:error="onError">
               点击复制链接
              <q-tooltip v-model="item.show">
                复制成功！
              </q-tooltip>
            </q-btn>
            <q-field >
              <q-input :value="invent_code" clearable type="text" readonly stack-label="推广码"/>
            </q-field>
            <div class="qcode">
                <div class="qcode-wrapper">
                   <img :src="baseURI+item.avatar.substr(1)" class="qcode-img"/>
                </div>
            </div>
            </div>
          </div>
       </pull-to>
     </div>
   </div>
</template>

<script>
  import Vue from 'vue'
  import VueClipboard from 'vue-clipboard2'

  Vue.use(VueClipboard)
  import PullTo from 'vue-pull-to'
  import {Toast,QField,QInput,QBtn,Ripple,QTooltip} from 'quasar'
    export default {
        name: "promo-code",
      data(){
          return{
            invent_code:'',
            code:[],
            baseURI:'',
            showing:false

          }
        },
      directives:{
          Ripple

      },
      components:{
          PullTo,Toast,QField,QInput,QBtn,VueClipboard,QTooltip
      },
      methods:{

        onCopy: (item,e)=> {
          setTimeout(()=>{
            item.show=false;
          },3000)
          //alert('You just copied: ' + e.text)
        },
        onError: function (e) {

        },
          refresh: function(done) {
            this.$showloading();
            let self=this;
              setTimeout(()=>{
                self.$http.post(self.$api.url.promoCode).then(response=>{
                   if(response&&response.data.code==1){
                     self.$hideloading();
                     response.data.data.code.forEach((item)=>{
                       item.show=false;
                     });
                     self.code=response.data.data.code;
                     self.invent_code=response.data.data.invent_code;
                   }else{
                     self.$hideloading();
                     Toast.create.negative({
                       html:response.data.message
                     })
                   }
                }).catch(err=>{
                  self.$hideloading();
                  Toast.create.negative({
                    html:err.message
                  });
                });
                if(done){
                  done();
                }

              },1000);
          }
      },
      created:function () {
          this.baseURI=this.$api.url.baseURI;
       this.refresh();
      }
    }
</script>

<style >
   #promo{
     height: 100%;
     width: 100%;
     display: flex;
     flex-direction: column;
   }
  #promo-body{
    flex: 1;
    box-sizing: border-box;
    overflow: hidden;
  }
   .promo-item{
     margin-bottom: 1rem;
     padding: 1rem 2rem;
     position: relative;
   }
  .promo-field{
    padding-left: 1rem;
  }
  .promo-title{
    padding-left: 1rem;
    border-left:.3rem solid #f4873c;
  }
   .qcode{

     width: 100%;
     padding: 2rem;

   }
  .qcode-wrapper{
    margin: auto;
    width: 15rem;
    height: 15rem;
  }
  .qcode-img{
    width: 100%;
    height: 100%;
  }

</style>
