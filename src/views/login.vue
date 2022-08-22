<!-- 登录页面  -->
<template>
  <div class="login-box">
    <div>
      <van-nav-bar title="登录" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="box">
      <div class="enter-box">
        <div class="phone-icon">
          <svg
            t="1652364468149"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="13135"
            width="20"
            height="20"
          >
            <path
              d="M797.328 80v864h-564V80h564m0-80h-564a80 80 0 0 0-80 80v864a80 80 0 0 0 80 80h564a80 80 0 0 0 80-80V80a80 80 0 0 0-80-80z"
              p-id="13136"
              fill="#b8b8b8"
            ></path>
            <path
              d="M182.336 708h666v80H182.336zM568 906h-105.328a40 40 0 1 1 0-80H568a40 40 0 1 1 0 80z"
              p-id="13137"
              fill="#b8b8b8"
            ></path>
          </svg>
        </div>
        <div class="phone-input">
          <input
            class="input"
            type="text"
            id="plateInput"
            focus="true"
            placeholder="手机号"
            v-model="phoneValue"
          />
        </div>
      </div>
      <div class="enter-box">
        <div class="phone-icon">
          <svg
            t="1652364695137"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="14111"
            width="20"
            height="20"
          >
            <path
              d="M297.4 250.2c22.6 0 41 18.3 41 41V462c0 22.6-18.3 41-41 41-22.6 0-41-18.3-41-41V291.2c0-22.6 18.4-41 41-41zM701.5 246.2c22.6 0 41 18.3 41 41v169.1c0 22.6-18.3 41-41 41-22.6 0-41-18.3-41-41V287.2c0-22.6 18.4-41 41-41z"
              fill="#b8b8b8"
              p-id="14112"
            ></path>
            <path
              d="M499.4 126.2c89 0 161.1 72.1 161.1 161.1h81.9c0-134.2-108.8-243-243-243s-243 108.8-243 243h81.9c0-89 72.2-161.1 161.1-161.1zM865.4 938V482.1c-3.4-33.4-31-59.7-64.9-61H200.6c-37.5 0-68 30.4-68.1 67.9v444.3c4 30.2 27.8 54.2 57.9 58.5h621.5c27-5.4 48.3-26.8 53.5-53.8z"
              fill="#b8b8b8"
              p-id="14113"
            ></path>
          </svg>
        </div>
        <div class="phone-input">
          <input
            class="input"
            type="password"
            placeholder="密码"
            v-model="passwordValue"
          />
        </div>
      </div>
      <div class="login-btn" :class="{ active: isHas }" @click="onLogin">
        登录
      </div>
      <div class="forget-in-register">
        <div class="forget">忘记密码</div>
        <div class="register" @click="goRegister">手机号注册</div>
      </div>
      <div class="agreement-box">
        <div>
          <van-checkbox
            v-model="checked"
            checked-color="#b3b3b3"
            icon-size="14px"
            >您已同意“服务条款”、“隐私政策”和“小说阅读器儿童个人信息保护规则及监护人须知”</van-checkbox
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      phoneValue: "",
      passwordValue: "",
      checked: false,
    };
  },
  //监听属性 类似于data概念
  computed: {
    isHas() {
      if (this.phoneValue === "" || this.passwordValue === "") {
        return true;
      } else {
        return false;
      }
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    goRegister() {
      this.$router.push({ name: "register" });
    },
    onLogin() {
      if (this.isHas) {
        return;
      } else {
        if (this.phoneValue.length < 11 || this.phoneValue.length > 11) {
          this.$toast("手机号格式错误!");
          this.passwordValue = "";
          return;
        }
        let userData = JSON.parse(localStorage.getItem("user-info"));
        if(!userData){
          this.$toast("手机号不存在,请先注册!");
          return;
        }
        // console.log(userData);
        userData.forEach((v) => {
          if (v.phone !== this.phoneValue) {
            this.$toast("手机号不存在,请先注册!");
            return;
          }
          if(v.phone === this.phoneValue && v.password===this.passwordValue){
            if (this.checked) {
              this.$toast("登录成功!");
              localStorage.setItem("appkey", this.phoneValue);
              setTimeout(() => {
                this.$router.go(-1);
              }, 500);
            } else {
              this.$toast("请勾选下方协议");
              return;
            }
          }else{
            this.$toast("账号或者密码错误,请重新输入!");
            this.passwordValue = "";
            return;
          }
        });
        // for (let i = 0; i < userData.length; i++) {
        //   if (userData[i].password !== this.passwordValue) {
        //     this.$toast("密码错误,请重新输入!");
        //     this.passwordValue = "";
        //     return;
        //   } else {
        //     if (this.checked) {
        //       this.$toast("登录成功!");
        //       localStorage.setItem("appkey", this.phoneValue);
        //       setTimeout(() => {
        //         this.$router.go(-1);
        //       }, 500);
        //     } else {
        //       this.$toast("请勾选下方协议");
        //       return;
        //     }
        //   }
        // }
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    document.getElementById("plateInput").focus();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.login-box {
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
  .box {
    margin-top: 100px;
    padding: 0 30px;
    .enter-box {
      display: flex;
      align-items: center;
      width: 100%;
      height: 50px;
      border-radius: 50px;
      background-color: #fff;
      border: 1px solid #cbcbcb;
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
      .phone-input {
        height: 100%;
        flex: 1;
        input::-webkit-input-placeholder {
          color: #b5b5b5;
          font-size: 14px;
        }
        .input {
          height: 100%;
          font-size: 14px;
        }
      }
      .phone-icon {
        margin: 0 10px;
      }
    }
    .login-btn {
      width: 100%;
      height: 50px;
      border-radius: 50px;
      background-color: #e44e2d;
      color: #fff;
      text-align: center;
      line-height: 50px;
      font-size: 14px;
      margin-bottom: 20px;
      &.active {
        opacity: 0.6;
      }
    }
    .forget-in-register {
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      .forget {
        color: #888;
      }
      .register {
        color: #bf6c64;
      }
    }
    .agreement-box {
      margin-top: 250px;
      text-align: center;
    }
  }
}
input {
  background: none;
  outline: none;
  border: none;
}
/deep/.van-nav-bar .van-icon {
  color: #666;
  font-size: 18px;
}
/deep/.van-nav-bar__title {
  font-size: 18px;
}
</style>
