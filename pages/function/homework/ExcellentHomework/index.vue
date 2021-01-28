<template>
	<view class="">
		<view class="myPage">
			<view class="myhear">
				<view>
					<text>{{title}}</text>
				</view>
			</view>
		</view>
		<view class="homework">
			<!-- <view class="homework-tetle">
				<view class="">
					<text>dadsadaws</text>
				</view>
			</view>
			<view class="homework-clas">
				<view class="">
					<text>asdasda</text>
				</view>
			</view> -->
			<view class="homework-sub">
				<view class="JobList" v-for="item in jobList" :key="item.id">
					<text>姓名：{{item.userName}}</text>
					<text>作业名称：{{item.jobName}}</text>
					<text>题目名称：{{item.problem}}</text>
					<view class="JobList-explain">
						<text>提交日期：{{item.submitTime|dataTime}}</text>
						<!-- <text>111111111</text> -->
					</view>
					<view class="JobList-explain-right">
						<text class="comment">评语：{{item.comment}}</text>
						<view>
							<button type="primary" size="mini" @click="ExcellentDetails({jobId:item.jobId,userId:item.userId})">查看</button>
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
	} from "../../../../utils/tiem.js";
	export default {
		data() {
			return {
				jobList: [],
				jobId:"",
				title:""
			}
		},
		methods: {
			ExcellentDetails(val) {
				console.log(val)
				uni.navigateTo({
					url: `/pages/function/homework/ExcellentHomework/excellentList/index?jobId=${val.jobId}&userId=${val.userId}`
				})
			}
		},
		filters: {
			dataTime(val) {
				return formatDate(val)
			}
		},
		onLoad: function(val) {
			console.log(val)
			this.jobId = val.jobId;
			this.$http.get(`/web/api/job/excellentJob/${val.jobId}`).then(response => {
				console.log(response.data.data);
				this.jobList = response.data.data;
			})
			this.$http.get("/web/api/info/info").then( res => {
				console.log(res);
				this.title = res.data.data.name;
			});
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
		padding-top: 10rpx;
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

	.Tipsbss {
		padding: 10rpx 20rpx 10rpx 20rpx;
		border-radius: 50%;
		background-color: #19BE6B;
		position: absolute;
		top: -30rpx;
		right: -20rpx;
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
		margin-left: 10rpx;
		padding: 10rpx;
		background-color: #007AFF;
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
		top: 0rpx;
	}
</style>
