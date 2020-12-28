<template>
	<view >
		<view class="myPage">
			<view class="myhear">
				<view>
					<text>对分易教学平台</text>
				</view>
			</view>
		</view>	
		<view class="AttendanceRecords">
			<view class="AttendanceRecords-title">
				<text>武术</text>
			</view>
			<view class="">
				<view class="pull-left">
					<text>12班</text>
				</view>
			</view>
			<!-- **************** -->
			<view class="know">
				<view class="know-out">
					<text>出勤:0次</text>
				</view>
				<view class="know-Lack">
					<text>缺勤:0次</text>
				</view>
				<view class="know-late">
					<text>迟到:0次</text>
				</view>
				<view class="know-please">
					<text>请假:0次</text>
				</view>
			</view>
			<!-- ********************************* -->
			<view class="list-frequently" v-for="item in attendanceList" :key="item.id">
				<view class="list-row">
					<view class="time">
						<view class="">
							<text>2020-12-12 09:53</text>
						</view>
						<view class="week">
							<text>星期一</text>
						</view>
					</view>
					<view class="swarning">
						<text>缺勤</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
			attendanceList:[]	
			}
		},
		methods:{},
		onLoad:function(){
			this.$http.post("/web/api/attendance/list",{}).then( res => {
				console.log(res.data.data.attendanceList)
				this.attendanceList = res.data.data.attendanceList;
			})
		}
	}
</script>

<style>
.AttendanceRecords{
	display:flex;
	flex-direction: column;
}
.AttendanceRecords-title{
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #007AFF;
	color: #FFFFFF;
	padding-top: 20rpx;
	padding-bottom: 20rpx;
	margin-top: 80rpx;
}
.pull-left{
	padding-left: 30rpx;
	padding-top: 20rpx;
}
/********************************************************/
.know{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	padding-top: 20rpx;
}
.know-out{
	color: #4CD964;
}
.know-Lack{
	color: #DD524D;
}
.know-late{
	color: #F0AD4E;
}
.know-please{
	color: #007AFF;
}
.list-frequently{
	display: flex;
	margin-top: 20rpx;
	padding-top: 20rpx;
	padding-bottom: 20rpx;
	border:1rpx solid #999999;
	align-items: center;
	justify-content: flex-start;
}
.list-row{
	width: 100%;
	padding-left: 30rpx;
	padding-right: 30rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}
.time{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
}
.week{
	padding-left:10rpx;
}
.swarning{
	color: #DD524D;
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
			top:80rpx;
		}
</style>
