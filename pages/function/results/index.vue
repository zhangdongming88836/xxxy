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
			<!-- 	<view class="" style="background-color: #007AFF; color: #FFFFFF; padding: 10rpx;">
					<text>{{gradeName}}</text>
				</view> -->
			</view>
		</view>
		<view class="Examination-results" v-for="iteum in  HomeworkResults" :key="iteum.id">
			<view class="">
				<text>学号：</text>
				<text>{{iteum.resultLogin}}</text>
			</view>
			<view class="">
				<text>姓名：</text>
				<text>{{iteum.resultName}}</text>
			</view>
			<view class="">
				<text>分数：</text>
				<text>{{iteum.moveTotal}}</text>
			</view>
		</view>
  <!--      <view class="">
        	<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#007AFF"></uni-segmented-control>
        	<view class="">
        		<view v-if="current === 0">
        			<view class="" v-for="item in ExaminationResults" :key="item.id">
        				<view class="Examination-results">
        					<view class="">
        						<text>正确：</text>
								<text>{{item.correctNum}}</text>
        					</view>
        					<view class="">
        						<text>错误：</text>
								<text>{{item.errorNum}}</text>
        					</view>
							<view class="">
								<text>正确率：</text>
								<text>{{item.accuracy}}</text>
							</view>
							<view class="">
								<text>提交时间：</text>
								<text>{{item.subTime}}</text>
							</view>
        				</view>
        			</view>
        		</view>
        		<view v-if="current === 1">
        			<view class="Examination-results" v-for="iteum in  HomeworkResults" :key="iteum.id">
        				<view class="">
        					<text>作业名称：</text>
							<text>{{iteum.jobName}}</text>
        				</view>
        				<view class="">
        					<text>得分：</text>
							<text>{{iteum.score}}</text>
        				</view>
        				<view class="">
        					<text>批改时间：</text>
							<text>{{iteum.checkTime}}</text>
        				</view>
        			</view>
        		</view>
        	</view>
        </view> -->
	</view>
</template>

<script>
	import uniSegmentedControl from "components/uni-segmented-control/uni-segmented-control.vue"
	import {
		formatDate
	} from "../../../utils/tiem.js";
	export default {
		data() {
			return {
				items: ['练习成绩', '作业成绩'],
				current: 0,
				gradeName:"",
				courseName:'',
				//练习成绩
				ExaminationResults:[],
				//作业成绩
				HomeworkResults:[],
				title:""
			}
		},
		methods: {
			//限项卡F
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			}
		},
		onLoad: function(val) {
			console.log(val)
			this.courseName = val.courseName;
		   let value = uni.getStorageSync("loginName"); 
			console.log(value);
			this.$http.get(`/web/api/result/totalScore/${value}`).then(res => {
				 console.log(res.data.data)
				 this.HomeworkResults = res.data.data
				 // this.gradeName = res.data.data.grade.gradeName;
				 // this.ExaminationResults = 
				 //    res.data.data.recordList.map(item => {
				 
				 // 	item.subTime = item.subTime == null ? "" : formatDate(item.subTime)
				 // 	return item
				 // })
				 // this.HomeworkResults = 
				 // res.data.data.pushJobList.map(item => {
				 
				 // 	item.checkTime = item.checkTime == null ? "" : formatDate(item.checkTime)
				 // 	return item
				 // })
			})
			this.$http.get("/web/api/info/info").then( res => {
				console.log(res);
				this.title = res.data.data.name;
			});
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
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		margin-top: 80rpx;
		align-items: center;
		justify-content: center;
		display: flex;
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
	}

	.homework-sub {
		width: 100%;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		padding-left: 60rpx;
		padding-right: 60rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
	}
   .Examination-results{
	   width:100%;
	   display:flex;
	   flex-direction:column;
	   align-items:flex-start;
	   justify-content: space-between;
	   padding:20rpx 30rpx 20rpx 30rpx;
	    border-bottom:1rpx solid #C8C9CC; 
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
