<template>
	<view class="resources">
		<view class="">
			<view class="myPage">
				<view class="myhear">
					<view>
						<text>{{title}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="resources-header" @click="help">
			<view class="header-right">
				<text>帮助</text>
			</view>
		</view>
		<!-- <view class="search" @click="sort">
			<view class="">
				<image src="../../../static/function/px.png" mode="" class="search-img"></image>
			</view>
		</view> -->
		<view class="OpenResources">
			<view class="OpenResourcesList" v-for="item in resourceList" :key="item.id">
				<!-- <view class="">
					<image :src="'http://14.116.217.62:8087/web/'+item.visitUrl" mode="" class="OpenResourcesList-img"></image>
				</view> -->
				<view class="" >
					<image @click="previewPictures(item.visitUrl)"   v-if="item.isimage == 'png' || item.isimage == 'bmp' || item.isimage == 'jpg' || item.isimage == 'jpeg '|| item.isimage == 'gif' "   :src="'http://14.116.217.62:8087/web/'+item.visitUrl" mode="" class="OpenResourcesList-img"></image>
				    <video  v-else-if="item.isimage == 'mp4' " :src="'http://14.116.217.62:8087/web/'+item.visitUrl" controls class="OpenResourcesList-mp4"></video>
				    <audio :name="item.resourceName"  v-else  :src="'http://14.116.217.62:8087/web/'+item.visitUrl"  controls></audio>
				</view>
				<view class="explain">
					<view class="">
						<view class="AttachmentName-title" >
							<text>附件名字：{{item.resourceName}}</text>
						</view>
						<view class="">
							<text>创建时间：{{item.createTime}}</text>
						</view>
						<view class="">
							<text style="padding-left:10rpx;">{{item.updateName}}</text>
						</view>
					</view>
					<view class="">
						<text style="color: #2979FF;" @click="download(item.resourceId)">下载</text>
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
				resourceList: [],
				title:""
			}
		},
		methods: {
			//预览图片
			previewPictures(val){
				
					
					uni.previewImage({
					         urls:['http://14.116.217.62:8087/web/'+ val],
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
			
			
			//下载
			download(val) {
				uni.downloadFile({//下载
							url:`http://14.116.217.62:8087/web/api/resource/download/${val}`, //图片下载地址
							success: res => {
								if (res.statusCode === 200) {
									uni.saveImageToPhotosAlbum({//保存图片到系统相册。
										filePath: res.tempFilePath,//图片文件路径
										success: function() {
											uni.showToast({
												title: '下载成功',
												icon: 'none',
											});
										},
										fail: function(e) {
											console.log(e);
											uni.showToast({
												title: '下载失败',
												icon: 'none',
											});
										}
									});
								}
							}
						});
				
				
				//  console.log(val)
				// const token = uni.getStorageSync("token")
				// uni.downloadFile({
				// 	url: `web/api/resource/download/${val}`, //下载地址接口返回
				// 	header:{
				// 		'token':token
				// 	},
				// 	success: (data) => {
				// 		console.log(data)
				// 		if (data.statusCode === 200) {
				// 			//文件保存到本地
				// 			uni.saveFile({
				// 				tempFilePath: data.tempFilePath, //临时路径
				// 				success: function(res) {
				// 					console.log(res)
				// 					uni.showToast({
				// 						icon: 'none',
				// 						mask: true,
				// 						title: '文件已保存：' + res.savedFilePath, //保存路径
				// 						duration: 3000,
				// 					});
				// 					setTimeout(() => {
				// 						//打开文档查看
				// 						uni.openDocument({
				// 							filePath: res.savedFilePath,
				// 							success: function(res) {
				// 								// console.log('打开文档成功');
				// 							}
				// 						});
				// 					}, 3000)
				// 				}
				// 			});
				// 		}
				// 	},
				// 	fail: (err) => {
				// 		console.log(err);
				// 		uni.showToast({
				// 			icon: 'none',
				// 			mask: true,
				// 			title: '失败请重新下载',
				// 		});
				// 	},
				// });
			},
			//帮助
			help(){
				uni.showModal({
					title: '提示',
					content: '图片下载后请到相册查找,非图片文件请到手机文件管理中查找',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//排序弹窗
			// sort() {
			// 	uni.showActionSheet({
			// 		itemList: ['按文件名', '按文件类型', '按上传日期'],
			// 		success: function(res) {
			// 			console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
			// 		},
			// 		fail: function(res) {
			// 			console.log(res.errMsg);
			// 		}
			// 	});
			// },
		},
		onLoad: function(val) {
			this.$http.get("/web/api/resource/list/" + val.id).then(res => {
				 console.log(res.data.data)
				this.resourceList =
					res.data.data.map(item => {
						item.createTime = formatDate(item.createTime)
						item.isimage = item.resourceName.slice(item.resourceName.lastIndexOf(".") + 1).toLowerCase();
						return item
					})

			})
			this.$http.get("/web/api/info/info").then( res => {
				console.log(res);
				this.title = res.data.data.name;
			});
		}
	}
</script>

<style scoped lang="scss">
	.explain{
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
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

	/**************************************************************/
	// .resources {
	// 	width: 100%;
	// 	display: flex;
	// 	flex-direction: column;
	// 	align-items: center;
	// }
	//公开资源
	.OpenResources {
		padding: 0 30rpx 0 30rpx;
		margin-top:5rpx;
		display: flex;
		flex-direction: column;
	}

	.OpenResourcesList {
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		
		 border-bottom: 1rpx solid #C8C9CC;
	}

	.OpenResourcesList-img {
		width:100rpx;
		height:100rpx;
		
	}
    .OpenResourcesList-mp4 {
    	width:500rpx;
    	height:200rpx;
    	
    }
	.resources-header {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		margin-top: 80rpx;
		padding: 0 30rpx 0 30rpx;
		background-color: #007AFF;
	}

	.header-right {
		padding: 10rpx 30rpx 10rpx 0;
		color: #FFFFFF;
	}

	/*******************************************************/
	.search {
		width: 100%;
		padding: 15rpx 40rpx 10rpx 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		border-bottom: 1px solid #C0C0C0;
	}

	.search-img {
		width: 50rpx;
		height: 50rpx;
	}
	.AttachmentName-title{
		width:350rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
