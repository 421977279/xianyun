<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="flightsData" @getData="getData"/>

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班列表 -->
        <div>
          <FlightsItem v-for="(item,index) in dataList"
					:key="index"
					:data="item"/>
        </div>

				<!-- size-change:切换单页条数 改变时会触发  -->
				<!-- current-change:切换页面 改变时会触发  -->
				<!-- current-page: 当前的页数 -->
				<!-- page-sizes: 当前的条数 -->
				<!-- total:总条数 -->
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="pageIndex"
					:page-sizes="[5, 10, 15, 20]"
					:page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total">
				</el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
// 航班列表头部组件
import FlightsListHead from "@/components/air/flightsListHead.vue";
// 机票航班列表
import FlightsItem from "@/components/air/flightsItem.vue";
// 条件过滤组件
import FlightsFilters from "@/components/air/flightsFilters.vue";

export default {
  data() {
    return {
			// 总数据,里面包含了info,flights,total,options属性
			flightsData:{
				// 声明info
				info:{},
				// 声明options
				options:{},
				// 声明flights是空数组
				flights:[],
			},
			// 这个属性专门用来存放切割出来的数组
			// dataList:[],
			// 当前的页数
			pageIndex:1,
			// 当前显示的条数
			pageSize:5,
			// 总页数
			total:0
		};
  },
  components: {
    FlightsListHead,
		FlightsItem,
		FlightsFilters
  },
  mounted() {
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
			// 总的数据,里面包含了info,flights,total,options属性
			this.flightsData=res.data;
			console.log(res.data);
			// 将后台返回的总页数结果赋值给data命名的total中
			this.total = this.flightsData.total
    })
	},
	computed: {
		// 计算属性会监听函数内部所有实例(this)属性的变化
		// 页面渲染的机票列表
		dataList(){
			const arr = this.flightsData.flights.slice(
				(this.pageIndex - 1) * this.pageSize,
				this.pageIndex * this.pageSize
			  )
			return arr;    
		}
	},
	methods: {
		// 这个事件是传递给过滤的子组件用于获取过滤后的数组
		getData(arr){
			this.flightsData.flights = arr;
		},
		// 切换单页条数时触发的事件
		handleSizeChange(val){
				// console.log(`每页 ${val} 条`);
				// 点击切换单页条数时，将val值赋值给data中的pageSize,即当前单页条数
				this.pageSize = val;
				// 一般条数发生了变化都会回到第一页
				// 因此需要重新赋值pageIndex成为1
				this.pageIndex = 1;
		},
		// 切换页数时触发的事件
		handleCurrentChange(val){
			// console.log(`当前页: ${val}`);
			// 点击分页按钮时,将val赋值给data中的pageIndex,即当前页数
			this.pageIndex = val;
		}
	}
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>