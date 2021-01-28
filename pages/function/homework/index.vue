<template>
	<view>
		<view class="myPage">
			<view class="myhear">
				<view>
					<text>{{title}}</text>
				</view>
			</view>
		</view>
		<view class="homework">
			<view class="homework-tetle">
				<view class="">
					<text>{{courseName}}</text>
				</view>
			</view>
			<view class="homework-clas">
				<view class="">
					<text>{{gradeName}}</text>
				</view>
			</view>
			<view class="homework-sub">
				<view class="JobList" v-for="item in jobList" :key="item.id">
					<text>作业名称：{{item.jobName}}</text>
					<text>题目名称：{{item.problem}}</text>
					<view class="JobList-explain">
						<!-- <text class="Tips" style="font-size: 15rpx;">个人作业</text>
						<text class="Tipsa" style="font-size: 15rpx;">指定格式</text>
						<text class="Tipsb" style="font-size: 15rpx;">教师评分</text> -->
						<text v-if="item.statusub == 0 || item.statusub == 2 || item.statusub == 3" class="Tipsbs" style="font-size: 15rpx;" @click="ExcellentList(item.jobId)">优秀作业</text>
						<!-- <text  class="Tipsbss" @click="ExcellentList(item.jobId)">2</text> -->
					</view>
					<view class="JobList-explain">
						<text>创建日期：</text>
						<text>{{item.createTime}}</text>
					</view>
					<view class="JobList-explain">
						<text>截至日期：</text>
						<text>{{item.deadline}}</text>
					</view>
					<!-- <view class="JobList-explain">
						<text >已提交人数：</text>
						<text >1人</text>
					</view>
					<view class="JobList-explain">
						<text >首次提交：</text>
						<text >{{item.submitTime}}</text>
					</view>
					<view class="JobList-explain">
						<text >批改时间：</text>
						<text >{{item.checkTime}}</text>
					</view>
					<view class="JobList-explain">
						<text >得分：</text>
						<text >{{item.score}}</text>
					</view> -->
					<view class="JobList-explain-right">
						<text v-if="item.statusub == 3" class="comment">退回原因：{{item.returnReason}}</text>
						<text v-else class="comment"></text>
						<view>
							<button v-if="item.statusub == 1" type="primary" size="mini"  @click="ToFinish({jobId:item.jobId,courseName:item.courseName})">去完成</button>
							<button v-else-if="item.statusub == 0" type="primary" size="mini" plain="true" @click="see({jobId:item.jobId,courseName:item.courseName})">查看</button>
							<button v-else-if="item.statusub == 2" type="primary" size="mini" plain="true" @click="see({jobId:item.jobId,courseName:item.courseName})">查看</button>
							<button v-else type="warn" size="mini" @click="modify({jobId:item.jobId,courseName:item.courseName})">修改</button>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		formatDate
	} from "../../../utils/tiem.js";
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	export default {
		
		 components: {uniTag},  
		
		data() {
			return {
				gradeName: "",
				courseName: "",
				jobList: [],
				courseId:"",
				title:""  
			}
		},
		methods: {
			//优秀作业列表
			ExcellentList(val){
				// console.log(val)
				uni.navigateTo({
					url: `/pages/function/homework/ExcellentHomework/index?jobId=`+val
				});
			},
			//修改作业
			modify(val){
				uni.navigateTo({
					url: `/pages/function/homework/modify/index?jobId=${val.jobId}&courseName=${val.courseName}`
				});
			},
			see(val) {
				console.log(val)
				uni.navigateTo({
					url: `/pages/function/homework/OperationDetails/index?jobId=${val.jobId}&courseName=${val.courseName}`
				});
			},
			ToFinish(val) {
				//console.log(val)
				uni.navigateTo({
					url: `/pages/function/homework/ToFinish/index?jobId=${val.jobId}&courseName=${val.courseName}&courseId=${this.courseId}`
				});
			 },
			},
			onLoad: function(val) {
				this.courseId = val.id;
				this.$http.post("/web/api/job/list", {
					courseId: val.id
				}, {
					header: {
						"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
					}
				}).then(res => {
					// console.log(res.data.data)
					this.gradeName = res.data.data.grade.gradeName;
					this.courseName = res.data.data.course.courseName;
					this.jobList =
						res.data.data.jobList.map(item => {
							item.checkTime = formatDate(item.checkTime);
							item.deadline = formatDate(item.deadline);
							item.submitTime = formatDate(item.submitTime)
							return item
						})

				})
				this.$http.get("/web/api/info/info").then( res => {
					console.log(res);
					this.title = res.data.data.name;
				});
			},
			onShow:function(){
			  // uni.$once("btn", (val) => {
				 //  console.log(val,'================')
				 //  this.btn = val.btn;
			  // })
				this.$http.post("/web/api/job/list", {
					courseId: this.courseId
				}, {
					header: {
						"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
					}
				}).then(res => {
					// console.log(res.data.data)
					this.gradeName = res.data.data.grade.gradeName;
					this.courseName = res.data.data.course.courseName;
					this.jobList =
						res.data.data.jobList.map(item => {
							item.checkTime = formatDate(item.checkTime);
							item.deadline = formatDate(item.deadline);
							item.submitTime = formatDate(item.submitTime);
							item.createTime = formatDate(item.createTime);
							return item
						})
				
				})
			}
		}
</script>

<style scoped>
	.comment {
		width:300rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.homework {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.homework-tetle {
		width: 100%;
		padding-top: 100rpx;
		padding-bottom: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
		background-color: #007AFF;
	}

	.homework-clas {
		width: 100%;
		display: flex;
		padding: 30rpx 0 30rpx 30rpx;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		background-color: #DBF1E1;
	}

	.homework-sub {
		width: 100%;
		padding: 20rpx 30rpx 20rpx 30rpx;
		/* border: 1rpx solid #999999; */
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 100rpx;
		justify-content: flex-start;
	}

	.JobList {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		padding-top:10rpx;
		border-bottom: 1rpx solid #C8C9CC;
	}

	.JobList-explain {
		display: flex;
		margin: 10rpx 0 0 0;
		flex-direction: row;
		align-items: center;
		position: relative;
		justify-content: space-around;
	}
  .Tipsbss{
	  padding:10rpx 20rpx 10rpx 20rpx;
	  border-radius:50%;
	  background-color: #19BE6B;
	  position: absolute;
	  top:-30rpx;
	  right:-20rpx;
	  color: #FFFFFF;
  }
	.Tips {
		font-size: 8rpx;
		padding: 10rpx;
		background-color: #C0C4CC;
	}

	.Tipsa {
		font-size: 8rpx;
		margin-left: 10rpx;
		padding: 10rpx;
		background-color: #DD6161;
	}

	.Tipsb {
		font-size: 8rpx;
		margin-left: 10rpx;
		padding: 10rpx;
		background-color: #C0C4CC;
	}
    .Tipsbs {
    	font-size: 8rpx;
    	/* margin-left: 10rpx; */
    	padding: 10rpx;
    	background-color:#007AFF;
		color: #FFFFFF;
    }

	.JobList-explain-right {
		width: 100%;
		display: flex;
		margin: 10rpx 0 0 0;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	/***************************************************/
	.myPage {
		display: flex;
		flex-direction: column;
		background-color: #C8C7CC;
	}

	.myhear {
		width: 100%;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		z-index: 1;
		background-color: #EEFFBB;
		top:0rpx;
	}
</style>
