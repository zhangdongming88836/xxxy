<template>
	<view>
		<view class="myPage">
			<view class="myhear">
				<view>
					<text>对分易教学平台</text>
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
					<text>{{item.jobName}}</text>
					<view class="JobList-explain">
						<text class="Tips">个人作业</text>
						<text class="Tipsa">指定格式</text>
						<text class="Tipsb">教师评分</text>
					</view>
					<view class="JobList-explain">
						<text >截至日期：</text>
						<text >{{item.deadline}}</text>
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
						<text >评语：----></text>
						<view >
							<button type="primary" size="mini" @click="see({jobId:item.jobId,courseName:item.courseName})">查看</button>
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
	export default {
		data() {
			return {
				gradeName: "",
				courseName: "",
				jobList:[],
			}
		},
		methods: {
         see(val){
			 uni.navigateTo({
			     url: `/pages/function/homework/OperationDetails/index?jobId=${val.jobId}&courseName=${val.courseName}`
			 });
		 },
		},
		onLoad: function(val) {
			this.$http.post("/web/api/job/list", {
				courseId: val.id
			}, {
				header: {
					"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
				}
			}).then(res => {
				console.log(res.data.data)
				this.gradeName = res.data.data.grade.gradeName;
				this.courseName = res.data.data.course.courseName;
				this.jobList = 
				res.data.data.jobList.map( item => {
					item.checkTime = formatDate(item.checkTime);
					item.deadline = formatDate(item.deadline);
					item.submitTime = formatDate(item.submitTime)
					return item
				})
				
			})
		}
	}
</script>

<style>
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
		border: 1rpx solid #999999;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
	}

	.JobList {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
	}

	.JobList-explain {
		display: flex;
		margin: 10rpx 0 0 0;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
	}

	.Tips {
		font-size: 8rpx;
		padding: 10rpx;
		background-color: #C0C4CC;
	}

	.Tipsa{
		font-size: 8rpx;
		margin-left:10rpx;
		padding: 10rpx;
		background-color:#DD6161;
	}
  .Tipsb{
	font-size: 8rpx;
	margin-left:10rpx;
  	padding: 10rpx;
  	background-color: #C0C4CC;
  }
  .JobList-explain-right{
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
		top: 80rpx;
	}
</style>
