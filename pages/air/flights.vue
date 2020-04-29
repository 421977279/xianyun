<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班列表 -->
        <div>
          <FlightsItem v-for="(item,index) in flightsData.flights"
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

export default {
  data() {
    return {
			// 总数据,里面包含了info,flights,total,options属性
			flightsData:{},
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
    FlightsItem
  },
  mounted() {
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
			// 总的数据,里面包含了info,flights,total,options属性
			this.flightsData=res.data;
			console.log(res.data);
    })
	},
	methods: {
		// 切换单页条数时触发的事件
		handleSizeChange(){

		},
		// 切换页数时触发的事件
		handleCurrentChange(){

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