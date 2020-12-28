<template>
	<view class="">
		<view class="content">
			<view class="text-area">
				<text class="title">{{title}}</text>
			</view>
			<view class="content-wrap">
				<view class="content-wrap-btns">
					<view class="content-wrap-btn bull-right">
						<navigator url="../components/JoinClass/index">
							<button type="primary" @click="addBJ">加入班级</button>
						</navigator>
					</view>
					<view class="content-wrap-btn bull-left">
						<navigator>
							<button type="primary" @click="TheArchive">课程列表</button>
						</navigator>
					</view>
				</view>
				<!-- ************************************************** -->
				<view class="content-wrap-nr" v-if="show">
					<view class="wrap-nr">
						<text>您还没有加入班级!</text>
					</view>
					<view class="wrap-nr">
						<text>
							请向老师或者已加入班级的同学索要班级二维码片，然后微信扫一扫进入班级。
						</text>
					</view>
					<view class="wrap-nr">
						<text>
							或者索要5位字母班级码。然后直接发送至对分易公众号。
						</text>
					</view>
				</view>
				<view class="Course-list" v-else v-for="(item,index) in list" :key="index">
					<view class="Course-list-title">
						<view class="year">
							<text>{{item.semester}}</text>
						</view>
					</view>
					<view class="Course" @click="CourseDetails(item.courseId)">
						<view class="questions">
							<text>{{item.courseName}}</text>
							<view class="questions-right">
								<text>></text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- ******************************************************* -->
		
		<!-- ******************************* -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '对分易教学平台',
				show:true,
				list:[
						
				],
			}
		},
		onLoad() {

		},
		methods: {
			//获取数据的方法
			// obtain(){
			// 	uni.$on('updata',function(data){ console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg); })

			// },
			addBJ() {
				uni.navigateTo({
					url: '../components/JoinClass/index'
				});
			},
			TheArchive(){
				uni.navigateTo({
					url: './TheArchive/index'
				});
			},
			//跳转到课程详情
			CourseDetails(val){
				 console.log(val)
				uni.navigateTo({
				    url: '/pages/function/index?id='+val
				});
				// uni.$emit("Detailss",val)
			}
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			this.$http.post("/web/api/course/list",{}).then( res => {
				console.log(res)
				this.list = res.data.data;
				if(this.list.length > 0){
					this.show = false
				}
			})
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.text-area {
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #EEFFBB;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.content-wrap {
		width: 85%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 60rpx;
		/* padding-left:30rpx; */
		/* border:1rpx solid #007AFF; */
	}

	.content-wrap-btns {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.content-wrap-btn {
		width: 300rpx;
		border-radius: 100rpx;

	}

	.bull-right {
		margin-right: 10rpx;
	}

	.bull-left {
		margin-left: 10rpx;
	}

	.content-wrap-nr {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.wrap-nr {
		margin: 50rpx 0 5rpx 0;
	}

	/**************************************************************/
	.Course-list {
		width:100%;
		display: flex;
		flex-direction: column;
		margin-top:30rpx
	}

	.Course-list-title {
        padding:0 30rpx 0 30rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}
	.year{
		background-color: #C0C0C0;
		padding: 5rpx;
	}
	.Course{
		padding: 0 30rpx 0 30rpx;
	}
	.questions{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background-color: #F0AD4E;
		padding: 10rpx 0 10rpx 0;
	}
	.questions-right{
		color: #FFFFFF;
	}
</style>
