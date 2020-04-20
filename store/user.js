// 存放仓库该分类（user）下的数据
// export const state ={}是固定写法
export const state = {
  userInfo: {}
}

// 同步修改state中的数据
// export const mutations ={}也是固定写法
export const mutations = {
  // 声明一个函数，函数名可以随便起
  // 该函数有两个函数，第一个参数是上面state,第二个参数是传入的参数
  setUserInfo(state, data) {
    // 随意的修改state的属性
    state.userInfo = data;
  }
}

// 重点：actions可以用来存放一些公共的方法，多个组件或者项目通用的方法
// 并且可以调用mutations来修改state
// export const actions={}也是固定写法
export const actions = {
  // 声明一个函数，函数名可以随便起
  // 该函数有两个函数，第一个参数是Store,第二个参数是传入的参数
  login(store,data) {
    // 打印出来的this里面包含了$axios这个属性
    console.log(this);
    console.log(store);
    // console.log(this.$store);  //undefined

    // 请求登录接口
    this.$axios({
      url: "/accounts/login",
      method: "POST",
      data
    }).then(res => {
      const {
        data
      } = res;
      // console.log(data);

      // 通过store.commit调用mutations的方法，调用才存储数据
			// 由于是在同一个模块下，可以省略user模块名
      store.commit("setUserInfo", data)
    })
  }
}
