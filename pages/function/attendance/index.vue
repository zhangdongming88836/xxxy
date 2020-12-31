<template>
	<view>
		<view class="myPage">
			<view class="myhear">
				<view>
					<text>深信院教学平台</text>
				</view>
			</view>
		</view>
		<view class="attendance">
			<view class="attendance-prompt">
				<view class="">
					<text>请输入数字，手动完成签到</text>
				</view>
				<view class="attendance-prompt-font">
					<text class="">(数字由教师获取并告知)</text>
				</view>
			</view>
			<!-- ***************************** -->
			<view class="attendance-prompt-from">
				<view class="">
					<input v-model="code" class="SignInToEnter" type="text" value="" />
				</view>
				<view class="">
					<button type="warn" class="SignInToEnter-btn" @click="SignIn">签到</button>
				</view>
			</view>
			<!-- ******************************************** -->
			<view class="attendance-observe">
				<view class="">
					<button type="primary" @click="AttendanceRecords(courseId)">查看我的考勤记录</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code: "",
				courseId: '',
			}
		},
		methods: {
			//签到
			SignIn() {
				/**************************************/
				if (this.code == "") {
					//提示签到的弹窗框
					uni.showModal({
						title: '提示',
						content: '请输入签到码',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				} else {
					var date = new Date();

					// var year = date.getFullYear(); //年 ,从 Date 对象以四位数字返回年份
					// var month = date.getMonth() + 1; //月 ,从 Date 对象返回月份 (0 ~ 11) ,date.getMonth()比实际月份少 1 个月
					// var day = date.getDate(); //日 ,从 Date 对象返回一个月中的某一天 (1 ~ 31)

					// var hours = date.getHours(); //小时 ,返回 Date 对象的小时 (0 ~ 23)
					// var minutes = date.getMinutes(); //分钟 ,返回 Date 对象的分钟 (0 ~ 59)
					// var seconds = date.getSeconds(); //秒 ,返回 Date 对象的秒数 (0 ~ 59)   

					// //获取当前系统时间  
					// var currentDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
					// console.log(currentDate)
					this.$http.post("/web/api/attendance/sign", {
						code: this.code,
                        signTime:date
					}).then(res => {
						console.log(res)
						if (res.data.code == 200) {
							uni.showToast({
								title: `${res.data.msg}`,
								duration: 2000
							});
							this.code = "";
						}else{
							uni.showToast({
								title: `${res.data.msg}`,
								icon:"none",
								duration: 2000
							});
						}
					})
				}
				/**********************************************/
			},
			//考勤详情
			AttendanceRecords(val) {
				uni.navigateTo({
					url: "./AttendanceRecords/index?courseId=" + val
				});
			},
		},
		onLoad: function(val) {
			this.courseId = val.courseId;
		}
	}
</script>

<style>
	.attendance {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 90rpx;
	}

	.attendance-prompt {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 20rpx;
	}

	.attendance-prompt-font {
		font-size: 15rpx;
		padding: 10rpx;
	}

	.attendance-prompt-from {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		padding-top: 20rpx;
	}

	.SignInToEnter {
		border: 1rpx solid #999999;
		border-radius: 15rpx;
		padding-left: 10rpx;
		display: inline-block;
		width: 300rpx;
		height: 80rpx;
	}

	.SignInToEnter-btn {
		width: 200rpx;
		padding: 3rpx;
	}

	/*****************************************************************/
	.attendance-observe {
		width: 100%;
		margin-top: 30rpx;
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
