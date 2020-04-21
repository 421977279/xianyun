<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <!-- 机票搜索的表单 -->
    <el-form class="search-form-content" ref="form" label-width="80px">
      <!-- 出发城市的输入框 -->
      <el-form-item label="出发城市">
        <!-- fetch-suggestions：获取搜索建议，
                它的功能就是根据输入的关键字，发起请求，
        把请求的结果显示到下拉列表中-->
        <!-- select：选中下拉列表某一项时触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          v-model="form.departCity"
        ></el-autocomplete>
      </el-form-item>

      <!-- 到达城市的输入框 -->
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
					v-model="form.destCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">

        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker type="date" placeholder="请选择日期" style="width: 100%;" @change="handleDate"></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      // 表单的数据
      form: {
				departCity: "", //出发城市的输入框的值
				departCode: "", //出发城市的代码
				destCity: "",   //到达城市的输入框的值
				destCode: "",   //到达城市的代码
				departDate: "",   //出发时间
      }
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {},

    // 监听出发城市输入框的变化，一旦输入框发生变化就触发该事件
    // value 是输入框选中的值，
    // cb是回调函数(必须调用)，接收要展示的列表，接收的参数有个固定的格式
    // 参数必须是一个数组，并且数组是由对象组成的，并且对象必须又value属性
    queryDepartSearch(value, cb) {
      // 如果value的值为空，就不需要请求
      if (!value) {
        return;
      }

      // 请求和value相关的城市
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;
				// console.log(data);
				
        // data的属性内没有value属性，需要转换下
        const newData = data.map( v => {
					v.value = v.name.replace("市","");
					return v;
        });

				//cb是要请求成功之后才调用，因为在这里才可以拿到数据
				cb(newData);
      });
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      // 如果value的值为空，就不需要请求
      if (!value) {
        return;
      }

      // 请求和value相关的城市
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;
				// console.log(data);
				
        // data的属性内没有value属性，需要转换下
        const newData = data.map( v => {
					v.value = v.name.replace("市","");
					return v;
        });

				//cb是要请求成功之后才调用，因为在这里才可以拿到数据
				cb(newData);
      });
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
			// console.log(item);
			// console.log(item.sort);
			this.form.departCode = item.sort;
		},

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
			this.form.destCode = item.sort;
		},

    // 确认选择日期时触发
    handleDate(value) {},

    // 触发和目标城市切换时触发
    handleReverse() {},

    // 提交表单是触发
    handleSubmit() {
			console.log(this.form);
		}
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>