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

    <!-- 搜索框 -->
    <div class="banner-content">
      <div class="search-bar">
        <!-- tab栏 -->
        <el-row 
        type="flex" 
        class="search-tab">
        <!-- :class 动态的class,值等于一个对象，属性active就是类名，如果值是true就会加上该class,否则不加 -->
          <span v-for="(item,index) in options" 
          :key="index"
          @click="handleTab(index)"
          :class="{active : current === index}">
            <i>{{item.label}}</i>
          </span>
        </el-row>

        <!-- 输入框 -->
        <el-row type="flex" align="middle" class="search-input">
          <input :placeholder="options[current].value"/>
          <i class="el-icon-search"></i>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banners: [], //首页轮播图
      // 定义搜索tab栏的数据，以对象形式展现
      options:[
        {label:"攻略",value:"搜索城市"},
        {label:"酒店",value:"请输入城市搜索酒店"},
        {label:"机票",value:"请输入触发地"},
      ],
      // 当前高亮的tab栏按钮的索引
      current:0
    };
  },
  mounted() {
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      // 解构data
      const { data } = res.data;
      // console.log(data);  轮播图数组数据
      // 将结果赋值给数据中
      this.banners = data;
    });
  },
  methods: {
    handleTab(index){
      this.current = index;
    }
  }
};
</script>

<style scoped lang="less">
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }

  .banner-content {
    z-index: 9;
    width: 1000px;
    position: absolute;
    left: 50%;
    top: 45%;
    margin-left: -500px;
    border-top: 1px transparent solid;

    .search-bar {
      width: 552px;
      margin: 0 auto;
    }

    .search-tab {
      .active {
        i {
          color: #333;
        }
        &::after {
          background: #eee;
        }
      }

      span {
        width: 82px;
        height: 36px;
        display: block;
        position: relative;
        margin-right: 8px;
        cursor: pointer;

        i {
          position: absolute;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 30px;
          text-align: center;
          color: #fff;
        }

        &:after {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          content: "";
          width: 100%;
          height: 100%;
          border: 1px rgba(255, 255, 255, 0.2) solid;
          border-bottom: none;
          transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
          transform-origin: bottom left;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 1px 2px 0 0;
          box-sizing: border-box;
        }
      }
    }

    .search-input {
      width: 550px;
      height: 46px;
      background: #fff;
      border-radius: 0 4px 4px 4px;
      border: 1px rgba(255, 255, 255, 0.2) solid;
      border-top: none;
      box-sizing: unset;

      input {
        flex: 1;
        height: 20px;
        padding: 13px 15px;
        outline: none;
        border: 0;
        font-size: 16px;
      }

      .el-icon-search {
        cursor: pointer;
        font-size: 22px;
        padding: 0 10px;
        font-weight: bold;
      }
    }
  }
}
</style>