<template>
	<view>
		<view class="myPage">
			<view class="myhear">
				<view>
					<text>深信院教学平台</text>
				</view>
			</view>
		</view>
		<view class="AttendanceRecords">
			<view class="AttendanceRecords-title">
				<text>{{course.courseName}}</text>
			</view>
			<view class="">
				<view class="pull-left">
					<text>{{grade.gradeName}}</text>
				</view>
			</view>
			<!-- **************** -->
			<view class="know">
				<view class="know-out">
					<text>出勤:{{signNum.sign0}}次</text>
				</view>
				<view class="know-Lack">
					<text>缺勤:{{signNum.sign1}}次</text>
				</view>
				<view class="know-late">
					<text>迟到:{{signNum.sign2}}次</text>
				</view>
				<view class="know-please">
					<text>请假:{{signNum.sign3}}次</text>
				</view>
			</view>
			<!-- ********************************* -->
			<view class="list-frequently" v-for="item in attendanceList" :key="item.id">
				<view class="list-row">
					<view class="time">
						<view class="">
							<text>{{item.signTime|timedata}}</text>
						</view>
						<view class="week">
							<text>星期{{item.signTime|timeDay}}</text>
						</view>
					</view>
					<view class="swarning">
						<text>{{item.sign|state}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		formatDate,
	} from "../../../../utils/tiem.js"
	export default {
		data() {
			return {
				attendanceList: [],
				course: {},
				grade: {},
				signNum: {},
			}
		},
		methods: {},
		filters: {
			state(val) {
				if (val == 0) {
					return "出勤"
				}
				if (val == 1) {
					return "缺勤"
				}
				if (val == 2) {
					return "迟到"
				}
				if (val == 3) {
					return "请假"
				}
			},
			timedata(val) {
				return formatDate(val)
			},
			timeDay(val) {
				let data = new Date(val)
				let day = data.getDay()


				let tiem = ['天', '一', '二', '三', '四', '五', '六', ]
				return tiem[day]
				// return day
			}
		},
		onLoad: function(val) {
			this.$http.post("/web/api/attendance/list", {
				courseId: val.courseId
			}).then(res => {
				console.log(res.data.data.attendanceList)
				console.log(res.data.data)
				this.signNum = res.data.data.signNum;
				this.grade = res.data.data.grade;
				this.course = res.data.data.course;
				this.attendanceList = res.data.data.attendanceList;
			})
		}
	}
</script>

<style>
	.AttendanceRecords {
		display: flex;
		flex-direction: column;
	}

	.AttendanceRecords-title {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #007AFF;
		color: #FFFFFF;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		margin-top: 80rpx;
	}

	.pull-left {
		padding-left: 30rpx;
		padding-top: 20rpx;
	}

	/********************************************************/
	.know {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		padding-top: 20rpx;
	}

	.know-out {
		color: #4CD964;
	}

	.know-Lack {
		color: #DD524D;
	}

	.know-late {
		color: #F0AD4E;
	}

	.know-please {
		color: #007AFF;
	}

	.list-frequently {
		display: flex;
		margin-top: 20rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		border: 1rpx solid #999999;
		align-items: center;
		justify-content: flex-start;
	}

	.list-row {
		width: 100%;
		padding-left: 30rpx;
		padding-right: 30rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.time {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}

	.week {
		padding-left: 10rpx;
	}

	.swarning {
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
		top:0rpx;
	}
</style>
