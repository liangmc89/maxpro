<template>
   <div class="settings" >
     <div class="h-bg my-bg">
       <h5 class="page-title">设置</h5>
     </div>
     <div class="settings-body">
        <pull-to>
          <q-list no-border  inset-separator highlight>
          <q-item v-ripple class="settings-item" @click="personinfo">
            <q-item-side icon="people" color="orange-5">
            </q-item-side>
            <q-item-main>
              <q-item-tile label>个人资料</q-item-tile>
            </q-item-main>
            <q-item-side right icon="keyboard arrow right"/>
          </q-item>
          <q-item v-ripple class="settings-item" to="/maxpro/member/bankList" exact>
            <q-item-side icon="credit card" color="teal-5">
            </q-item-side>
            <q-item-main>
              <q-item-tile label>修改登录密码</q-item-tile>
            </q-item-main>
            <q-item-side right icon="keyboard arrow right"/>
          </q-item>
          <q-item v-ripple class="settings-item" to="/maxpro/member/promoCode">
            <q-item-side icon="layers" color="primary"/>
            <q-item-main>
              <q-item-tile label>修改MT密码</q-item-tile>
            </q-item-main>
            <q-item-side right icon="keyboard arrow right"/>
          </q-item>
            <q-item v-ripple class="settings-item" to="/maxpro/member/promoCode">
              <q-item-side icon="layers" color="primary"/>
              <q-item-main>
                <q-item-tile label>关于</q-item-tile>
              </q-item-main>
              <q-item-side right icon="keyboard arrow right"/>
            </q-item>
            </q-list  >
        </pull-to>
       <q-modal ref="maximizedModal" maximized >
         <div class="settings" style="background: rgb(247, 247, 250)">
           <div class="h-bg my-bg">
             <h5 class="page-title">设置</h5>
           </div>
            <div class="settings-body">
              <pull-to>
                <div class="row no-wrap user-avatar padding-content">
                  <div class="col-6 relative-position text-left"><span class="avatar-title">头像</span></div>
                  <div class="col-6 text-right" ><img src="../statics/images/account_icon.png" class="avatar-img"/></div>
                </div>
                <div class="user-field">
                   <q-list no-border >
                     <q-item  class="settings-item" >
                       <q-item-side >
                         姓名
                       </q-item-side>
                       <q-item-main>
                         <q-field>
                           <q-input value="小逗" type="text" align="right" ></q-input>
                         </q-field>
                       </q-item-main>
                     </q-item>
                     <q-item  class="settings-item" >
                       <q-item-side >
                         邮箱
                       </q-item-side>
                       <q-item-main>
                         <q-field>
                           <q-input value="25645583256@qq.com" type="text" align="right" ></q-input>
                         </q-field>
                       </q-item-main>
                     </q-item>
                     <q-item  class="settings-item" >
                       <q-item-side >
                         手机号
                       </q-item-side>
                       <q-item-main>
                         <q-field  error-label="">
                           <q-input value="18565547858" type="number" align="right" ></q-input>
                         </q-field>
                       </q-item-main>
                     </q-item>
                     <q-item  class="settings-item" >
                       <q-item-side >
                         证件号码
                       </q-item-side>
                       <q-item-main>
                         <q-field>
                           <q-input value="56454648852445" type="text" align="right" ></q-input>
                         </q-field>
                       </q-item-main>
                     </q-item>
                     <q-item  class="settings-item" >
                       <q-item-side >
                         性别
                       </q-item-side>
                       <q-item-main>
                         <div class="text-right">
                         <q-radio v-model="option" val="opt1" label="男" />
                         <q-radio v-model="option" val="opt2" label="女" /></div>
                       </q-item-main>
                     </q-item>
                     <q-collapsible  label="<span>省市</span><span style='float:right'>上海</span>">
                         <v-distpicker wrapper="province-wrapper"  address-container="province" type="mobile" ></v-distpicker>
                     </q-collapsible>
                     <q-collapsible  label="<span>国籍</span><span style='float:right'>中国</span>">
                       <div>
                         中国
                       </div>
                     </q-collapsible>
                   </q-list>
                </div>
                <q-btn class="my-button full-width" big @click="$refs.maximizedModal.close()">保存</q-btn>
              </pull-to>
            </div>
         </div>
       </q-modal>
     </div>
   </div>
</template>
<script>
  import PullTo from 'vue-pull-to'
  import VDistpicker from 'v-distpicker'

  import {QIcon,Ripple, QList,QModal,QBtn,QField,QInput,QRadio,QCollapsible,
    QListHeader,
    QItem,
    QItemSeparator,
    QItemSide,
    QItemMain,
    QItemTile} from 'quasar'
  export default {
    data(){
      return{
        option:''
      }
    },
    directives:{Ripple},
    components:{
      PullTo,QIcon,Ripple, QList,QField,QInput,QRadio,QCollapsible,
      QListHeader,
      QItem,
      QItemSeparator,
      QItemSide,
      QItemMain,
      QItemTile,QModal,QBtn,VDistpicker
    },
    methods:{
      personinfo:function () {
        this.$refs.maximizedModal.open()
      }

    }
  }
</script>
<style>
  .settings{
    height: 100%;
    width:100%;
    display: flex;
    flex-direction: column;
  }
  .settings-body{
    flex: 1;
    box-sizing: border-box;
    overflow: hidden;
  }
  .user-avatar{
    margin-bottom: .5rem;
    background: white;
  }
  .avatar-img{
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
  }
  .avatar-title{
    position: absolute;
    left:0;
    top:0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 40%;
    margin: auto;

  }
  .settings-item{
    background: white;
  }
  .province{
    height: 15rem;
    overflow: scroll;

  }
  .province-wrapper{
    height: 22rem;
  }

</style>
