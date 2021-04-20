function observe(obj) {
  if (typeof obj !== "object" || obj == null) {
    return;
  }
  new Observer(obj);
}
// 代理$data中的数据到 vue
function proxy(vm) {
  Object.keys(vm.$data).forEach((key) => {
    defineReactive(vm, key, vm.$data[key]);
  });
}
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      return val;
    },
    set(newValue) {
      if (val !== newValue) {
        val = newValue;
      }
    },
  });
}
class KVue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;
    observe(this.$data);
    proxy(this);
  }
}
class Observer {
  constructor(value) {
    this.value = value;
    this.walk(value);
  }
  walk(obj) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
  }
}
