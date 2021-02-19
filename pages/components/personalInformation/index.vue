<template>
	<view class="myPage">
		<view class="myhear">
			<view>
				<text>{{title}}</text>
			</view>
		</view>
		<!-- 1 -->
		<view class="portrait" @click="UploadAvatar">
			<view class="">
				<text>头像</text>
			</view>
			<view class="portrait-leftt">
				<view class="">
					<image class="userImge" :src="'http://14.116.217.62:8087/web/'+personal.avatar" mode=""></image>
				</view>
				<view class="">
					<text style="font-size: 25rpx;">></text>
				</view>
			</view>
		</view>
		<!-- 2 -->
		<view class="portraits" @click="uname">
			<view class="">
				<text>姓名</text>
			</view>
			<view class="portrait-leftt">
				<view class="user-m">
					<text>{{personal.userName}}</text>
				</view>
				<view class="">
					<text style="font-size: 25rpx;">></text>
				</view>
			</view>
		</view>
		<!-- 3 -->
		<view class="portraits" @click="texs">
			<view class="">
				<text>性别</text>
			</view>
			<view class="portrait-leftt">
				<view class="user-m">
					<text>{{personal.sex == 0 ? "男" : "女"}}</text>
				</view>
				<view class="">
					<text style="font-size: 25rpx;">></text>
				</view>
			</view>
		</view>
		<!-- 4 -->
		<!-- <view class="portraits">
			<view class="">
				<text>学号</text>
			</view>
			<view class="portrait-leftt">
				<view class="user-m">
					<text>34786</text>
				</view>
				<view class="">
					<text style="font-size: 25rpx;">></text>
				</view>
			</view>
		</view> -->
		<!-- 5 -->
		<view class="portraits" @click="phone">
			<view class="">
				<text>手机号</text>
			</view>
			<view class="portrait-leftt">
				<view class="user-m">
					<text>{{personal.phonenumber}}</text>
				</view>
				<view class="">
					<text style="font-size: 25rpx;">></text>
				</view>
			</view>
		</view>
		<!-- 6 -->
		<view class="portraits" @click="ModifyMailbox">
			<view class="">
				<text>邮箱</text>
			</view>
			<view class="portrait-leftt">
				<view class="user-m">
					<text>{{personal.email}}</text>
				</view>
				<view class="">
					<text style="font-size: 25rpx;">></text>
				</view>
			</view>
		</view>
		<!-- 7 -->
	<!-- 	<view class="portraits">
			<view class="">
				<text>学校</text>
			</view>
			<view class="portrait-leftt">
				<view class="user-m">
					<text>哈尔滨工程大学</text>
				</view>
				<view class="">
					<text style="font-size: 25rpx;">></text>
				</view>
			</view>
		</view> -->
		<!-- 8 -->
		<!-- <view class="portraits" @click="lass">
			<view class="">
				<text>专业班级</text>
			</view>
			<view class="portrait-leftt">
				<view class="user-m">
					<text>未填写</text>
				</view>
				<view class="">
					<text style="font-size: 25rpx;">></text>
				</view>
			</view>
		</view> -->
		<!-- 9 -->
		<!-- <view class="portraits">
			<view class="">
				<text>入学学年</text>
			</view>
			<view class="portrait-leftt">
				<view class="user-m">
					<text>2020</text>
				</view>
				<view class="">
					<text style="font-size: 25rpx;">></text>
				</view>
			</view>
		</view> -->
		<!-- 10 -->
		<!-- <view class="portraits" @click="brief">
			<view class="">
				<text>简介</text>
			</view>
			<view class="portrait-leftt">
				<view class="user-m">
					<text>未填写</text>
				</view>
				<view class="">
					<text style="font-size: 25rpx;">></text>
				</view>
			</view>
		</view> -->
		<!-- 11 -->
		 <view class="portraits" >
		 	<view class="">
		 		<text>登录名</text>
		 	</view>
		 	<view class="portrait-leftt">
		 		<view class="user-m">
		 			<text>{{personal.loginName}}</text>
		 		</view>
		 		<view class="">
		 			<text style="font-size: 25rpx;">></text>
		 		</view>
		 	</view>
		 </view>
		<!-- 12 -->
		<view class="portraits" @click="password">
			<view class="">
				<text>密码</text>
			</view>
			<view class="portrait-leftt">
				<view class="user-m">
					<text>点击修改</text>
				</view>
				<view class="">
					<text style="font-size: 25rpx;">></text>
				</view>
			</view>
		</view>
		<!-- 13 -->
	</view>
</template>

<script>
	export default {
		data(){
			return {
				personal:{},
				title:""
			}
		},
		methods:{
			UploadAvatar(){
				uni.navigateTo({
				    url: '../upload/index'
				});
			},
			uname(){
				uni.navigateTo({
				    url: '../name/index'
				});
			},
		    texs(){
				uni.navigateTo({
				    url: '../sex/index'
				});
			},
			phone(){
				uni.navigateTo({
				    url: '../phone/index'
				});
			},
			lass(){
				uni.navigateTo({
				    url: '../class/index'
				});
			},
			brief(){
				// this.doUpData();
				    // var _this = this;
				    // uni.request({
				    // url: `${this.$store.state.apiBaseUrl}/users/versions`,  //请求接口
				    // method: 'POST',
				    // success: result => {
				    //     if (result.data.code == 1) {
				    //         plus.runtime.getProperty(plus.runtime.appid, function(inf) {
				    //             if(inf.version != result.data.data.versions){
				    //                 uni.showModal({
				    //                     title: "发现新版本",
				    //                     content: "确认下载更新",
				    //                     success: (res) => {
				    //                         if (res.confirm == true) {//当用户确定更新，执行更新
				    //                             _this.doUpData();
				    //                         }
				    //                     }
				    //                 })
				    //             }
				    //         });
				    //     }
				    // },
				    // })
				// uni.navigateTo({
				    // url: '../brief/index'
					// uni.downloadFile({//下载
					// 			url:`http://14.116.217.62:8087/web/api/resource/download/202012313`, //图片下载地址
					// 			success: res => {
					// 				if (res.statusCode === 200) {
					// 					uni.saveImageToPhotosAlbum({//保存图片到系统相册。
					// 						filePath: res.tempFilePath,//图片文件路径
					// 						success: function() {
					// 							uni.showToast({
					// 								title: '下载成功',
					// 								icon: 'none',
					// 							});
					// 							  plus.runtime.openFile(res.tempFilePath);  
					// 						},
					// 						fail: function(e) {
					// 							console.log(e);
					// 							uni.showToast({
					// 								title: '下载失败',
					// 								icon: 'none',
					// 							});
					// 						}
					// 					});
					// 				}
					// 			}
					// 		});
				// });
			},
			
			// doUpData() {
			//     uni.showLoading({
			//         title: '更新中……'
			//     })
			//     uni.downloadFile({//执行下载
			//         url: `http://14.116.217.62:8087/web/api/resource/download/202012313`, //下载地址
			//         success: downloadResult => {//下载成功
			//             uni.hideLoading();
			//             if (downloadResult.statusCode == 200) {
			//                 uni.showModal({
			//                     title: '',
			//                     content: '更新成功，确定现在重启吗？',
			//                     confirmText: '重启',
			//                     confirmColor: '#EE8F57',
			//                     success: function(res) {
			//                         if (res.confirm == true) {
			//                             plus.runtime.install(//安装
			//                                 downloadResult.tempFilePath, {
			//                                     force: true
			//                                 },
			//                                 function(res) {
			//                                     utils.showToast('更新成功，重启中');
			//                                     plus.runtime.restart();
			//                                 }
			//                             );
			//                         }
			//                     }
			//                 });
			//             }
			//         }
			//     });
			// },
			
			
			// loginName(){
			// 	uni.navigateTo({
			// 	    url: '../LoginName/index'
			// 	});
			// },
			password(){
				uni.navigateTo({
				    url: '../password/index'
				});
			},
			//修改邮箱
			ModifyMailbox(){
				uni.navigateTo({
				    url: '/pages/components/personalInformation/email/index'
				});
			}
		},
		onLoad:function(){
			this.$http.get("/web/api/user/personage").then( res => {
				// console.log(res.data.data)
				this.personal = res.data.data;
			})
			this.$http.get("/web/api/info/info").then( res => {
				console.log(res);
				this.title = res.data.data.name;
			});
		},
		onShow:function(){
			this.$http.get("/web/api/user/personage").then( res => {
				// console.log(res.data.data)
				this.personal = res.data.data;
			})
		}
	}
</script>

<style>
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

	/* ************************************************************************ */

	/***头像*****/
	.portrait {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: #FFFFFF;
		padding-left: 30rpx;
		padding-right: 30rpx;
		margin-top: 82rpx;
	}

	.userImge {
		width: 100rpx;
		height: 100rpx;
		padding-right: 15rpx;
	}

	.portrait-leftt {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end
	}

	/***************************************************  */
	.portraits {
		height: 80rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: #FFFFFF;
		padding-left: 30rpx;
		padding-right: 30rpx;
		margin-top: 5rpx;
	}

	.user-m {
		padding-right: 15rpx;
	}
</style>
