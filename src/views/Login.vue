<template>
  <div>
    <cube-form
      :model="model"
      :schema="schema"
      @validate="onValidater"
      @submit="onSubmitLogin">
    </cube-form>
  </div>
</template>

<script>
export default {
 data() {
  return {
    model: {
      username: "",
      password: ""
    },
    schema: {      // 表单结构定义
      fields: [        // 字段数组
        {
          type: "input",
          modelKey: "username",   // 要与model中的名称一致
          label: "用户名",
          props: {
            placeholder: "请输入用户名"
          },
          rules: {            // 校验规则
            required: true
          },
          trigger: "blur"
        },
        {
          type: "input",
          modelKey: "password",
          label: "密码",
          props: {
            type: "password",
            placeholder: "请输入密码",
            eye: {   // 该输入框是否是明文显示
              open: true
            }
          },
          rules: {
            required: true
          },
          trigger: "blur"
        },
        {
          type: "submit",
          label: "登录"
        }
      ]
    }
  }
 },
 methods: {
  onValidater(ret) {   
    // 校验，自定义逻辑（如上面未通过，则不会跑到这里来）
  },
  onSubmitLogin (e) {
    e.preventDefault();   // 阻止表单默认行为
    
    // 登录请求
    this.$store.dispatch('login', this.model)
      .then(code => {
        if(code) {
          // 登录成功
          const path = this.$route.query.redirect || '/';
          this.$router.push(path);
        }
      }).catch( error => {
        // 错误信息接收或登录失败
        // const toast = this.$createToast({
        //   time: 2000,
        //   txt: error.message || error.response.data.message || '登录失败',
        //   type: 'error'
        // });
        // toast.show();
      })
  },
 }
}
</script>

<style>

</style>