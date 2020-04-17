<template>
  <div class="container">
    <!-- 幻灯片 -->
    <el-carousel height="700px" style="min-width:1200px">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div
          :style="`
          background:url(${$axios.defaults.baseURL + item.url}) center top no-repeat;
          height:700px
        `"
        ></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      banners:[]   //首页轮播图
    }
  },
  mounted() {
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      // 解构data
      const {data} = res.data;
      // console.log(data);  轮播图数组数据
      // 将结果赋值给数据中
      this.banners=data;
    });
  }
};
</script>

<style scoped lang="less">
</style>