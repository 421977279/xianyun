// 存放仓库该分类（user）下的数据
// export const state ={}是固定写法
export const state ={
    userInfo:{}
}

// 修改state中的数据
// export const mutations ={}也是固定写法
export const mutations ={
    // 声明一个函数，函数名可以随便起
    // 该函数有两个函数，第一个参数是上面state,第二个参数是传入的参数
    setUserInfo(state,data){
        // 随意的修改state的属性
        state.userInfo = data;
    }
}