<template>
	<view class="">
		<view class="myPage">
			<view class="myhear">
				<view>
					<text>{{title}}</text>
				</view>
			</view>
		</view>
		<view class="cls-list">
			<view>
				<text class="cls-title">{{courseName}}</text>
			</view>
			<view class="cls-introduce">
				<view class="">
					<text class="cls-number">{{grade.gradeName}}</text>
				</view>
				<view class="">
					<text class="cls-title">共{{grade.num}}人</text>
				</view>
				<view class="">
					<text class="cls-number">班级码</text>
				</view>
				<view class="">
					<text class="cls-title">{{grade.code}}</text>
				</view>
				<!-- <view class="">
					<image src="../../../static/MyPage/gy.png" mode="" class="ClasCode"></image>
				</view> -->
			</view>
		</view>
		<!--  **********************************************************-->
		<view class="cls-operation">
			<!-- <view class="cls-operation-btn" @click="ClassQRCode">
				<button type="primary" size="mini">班级二维码</button>
			</view> -->
			<view class="" @click="signOut">
				<button type="primary" size="mini">我要退班</button>
			</view>
			<view class="">
				<button type="primary" size="mini" @click="ChangingClasses">我要换班</button>
			</view>
		</view>
		<!-- -************************************************************** -->
		<view class="introduce" v-if="list.length>0" >
			<view class="introduce-content" v-for="item in list" :key="item.id">
				<view class="" @click="previewPictures(item.avatar)">
					<image :src="'http://14.116.217.62:8087/web/'+item.avatar"  mode="" class="introduce-img"></image>
				</view>
				<view class="introduce-left" >
					<view class="introduce-content-tit">
						<view class="" >
							<image :src=" item.sex == 0 ? '/static/function/ClassList/male.png' : '/static/function/ClassList/female.png'" mode="" class="introduce-icon"></image>
						</view>
						<view class="introduce-uname">
							<text>{{item.userName}}</text>
						</view>
					</view>
					<view class="">
						<text>电话:{{item.phonenumber}}</text>
					</view>
				</view>
			</view>
		</view>
	<!-- 	<view>
			<u-popup v-model="show">
				<view class="AllClasses">该课程下所有的班级</view>
				<view class="SelectionList">
					<view class="" @click="selectClass">
						<text>英语一班</text>
					</view>
				</view>
			</u-popup>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
              show:false,
			  //学生列表
			  list:[],
			  //班级
			  grade:{},
			  //课程名字
			  courseName:"",
			  title:""
			}
		},
		onLoad() {

		},
		methods: {
		    
			//预览图片
			previewPictures(val){
				console.log(val)
				   uni.previewImage({
				            urls:['http://14.116.217.62:8087/web/'+ val ],
				            longPressActions: {
				                success: function(data) {
				                    console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				                },
				                fail: function(err) {
				                    console.log(err.errMsg);
				                }
				            }
				        });
			},
		
			ClassQRCode() {
				uni.navigateTo({
					url: "./QRCode/index"
				})
			},
			//退出班级
			signOut() {
				uni.showModal({
					title: '我要退班',
					content: '退班后将无法查看原班级的作、考勤、成绩册等信息，并返回到首页。是否退出该班？',
					success:(res) => {
						if (res.confirm) {
							console.log("确定")
							this.$http.post("/web/api/user/off",{}).then( res => {
								// console.log(res.data.code)
								if(res.data.code == 200){
									uni.showToast({
									    title: res.data.msg,
										icon:"none",
									    duration: 2000
									});
									uni.reLaunch({
									    url: '/pages/index/index'
									});
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//换班级
			ChangingClasses(){
				// this.show = true;
				uni.showToast({
				    title: "请联系您的班主任",
					icon:"none",
				    duration: 2000
				});
			},
			//选择班级
			// selectClass(){
			// 	this.show = false;
			// 	uni.showModal({
			// 		title: '确认换位英语一班吗?',
			// 		content: '换班后,将无法查看之前班级的作业、考勤、成绩册等信息。',
			// 		success: function(res) {
			// 			if (res.confirm) {
			// 				console.log('用户点击确定');
			// 			} else if (res.cancel) {
			// 				this.show = true;
			// 				console.log('用户点击取消');
			// 			}
			// 		}
			// 	});
			// }
		},
		onLoad: function(val) {
			console.log('App onLoad')
			this.courseName = val.courseName;
			this.$http.get("/web/api/info/info").then( res => {
				console.log(res);
				this.title = res.data.data.name;
			});
		},
		onShow: function() {
			 console.log('App Show')
			 uni.$on("ClassList",(val) => {
				 console.log(val)
			 })
			 this.$http.post("/web/api/user/list",{}).then( res => {
				 console.log(res.data.data)
				 this.list = res.data.data.userList;
				 this.grade = res.data.data.grade;
			 })
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	.cls-list {
		width: 100%;
		background-color: #007AFF;
		margin-top: 80rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.cls-title {
		color: #FFFFFF;
		padding: 10rpx;
	}

	.cls-number {
		color: #F0AD4E;
		padding: 10rpx;
	}

	.ClasCode {
		width: 30rpx;
		height: 30rpx;
	}

	.cls-introduce {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
	}

	/*********************************************************************************/
	.cls-operation {
		width: 100%;
		padding-top: 10rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		background-color: #C8C7CC;
	}

	.cls-operation-btn {
		padding: 10rpx;
	}

	/****************************************************************/
	.introduce {
		padding-left: 30rpx;
		padding-top: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		
	}

	.introduce-content {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		margin-top: 10rpx;
		border-bottom: 1rpx solid #C0C0C0;
	}

	.introduce-img {
		width: 100rpx;
		height: 100rpx;
	}

	.introduce-icon {
		width: 50rpx;
		height: 50rpx;
	}

	.introduce-left {
		display: flex;
		padding-left: 20rpx;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
	}

	.introduce-content-tit {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.introduce-uname {
		padding-bottom: 12rpx;
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
	/*************************所有班级************************************/
	.AllClasses{
		padding:30rpx 80rpx 30rpx 80rpx;
	}
	.SelectionList{
		padding:20rpx 0 20rpx 0 ;
		display: flex;
		flex-direction: column;
		align-items:center;
		justify-content:flex-start;
		border-top:1px solid #8F8F94;
		border-bottom:1px solid #8F8F94;
	}
</style>
