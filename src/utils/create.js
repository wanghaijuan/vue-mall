import Vue from 'vue'

export default function(Component, props) {
  // 创建vue实例
  const instance = new Vue({
    render: h => {
      console.log(h(Component, {props}));
      return h(Component, {props})
    }
  }).$mount();

  // 生成的dom追击到body
  document.body.appendChild(instance.$el);

  // 添加一个销毁方法
  const com = instance.$children[0];
  com.remove = function () {
    document.body.removeChild(instance.$el)
    instance.$destroy();
  }

  return com;

}