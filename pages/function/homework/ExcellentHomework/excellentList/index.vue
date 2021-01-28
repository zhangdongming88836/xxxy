<template>
	<view class="">
		<view class="myPage">
			<view class="myhear">
				<view>
					<text>{{title}}</text>
				</view>
			</view>
		</view>
		<!-- <view class="homework">
			<view class="homework-tetle">
				<view class="">
					<text>{{courseName}}</text>
				</view>
			</view>
		</view> -->
		<uni-card title="作业信息">
			<view class="">
				<text>作业名称：{{pushJobList[0].jobName}}</text>
			</view>
			<view class="">
				<text>题目名称：{{pushJobList[0].problem}}</text>
			</view>
			<!-- 	<view class="">
				<text>学生作业附件：</text>
			</view> -->
			<!-- <view class="enclosure" > -->
			<!-- <text class="ClickDownload" @click="DownloadTeacher(JobInformation.jobId)" >下载</text> -->
			<!-- <image src="" mode="" class="enclosureImg"></image>
				<text style="margin: 15rpx;" class="resourceName"></text> -->
			<!-- 	</view> -->
			<!-- <view class="">
				<text>满分值：100.00分</text>
			</view>
			<view class="">
				<text>评分方式：教师评分</text>
			</view>
			<view class="">
				<text>作业类型：个人作业</text>
			</view> -->
			<!-- <view class="">
				<text>附件格式：</text>
			</view> -->
			<!-- <view class="">
				<text>截止时间：</text>
			</view> -->
			<!-- <view class="">
				<text>逾期迟交：允许</text>
			</view>
			<view class="">
				<text>逾期修改：允许</text>
			</view> -->
		</uni-card>
		<uni-card>
			<!-- <view class="">
				<text>首次提交时间：测试</text>
			</view> -->
			<!-- <view class="">
				<text>提交时间：</text>
			</view> -->
			<view class="">
				<text>学生作业附件：</text>
			</view>
			<view class="enclosure" v-for="item in resourceList" :key="item.id">
				<!-- <text class="ClickDownload" @click="DownloadTeacher(JobInformation.jobId)" >下载</text> -->
				<image @click="previewPictures(item.visitUrl)" v-if="item.isimage == 'png' || item.isimage == 'bmp' || item.isimage == 'jpg' || item.isimage == 'jpeg '|| item.isimage == 'gif' "
				 :src="'http://14.116.217.62:8087/web/'+item.visitUrl" mode="" class="enclosureImg"></image>
				<video v-else-if="item.isimage == 'mp4' " :src="'http://14.116.217.62:8087/web/'+item.visitUrl" controls></video>
				<audio v-else  :src="'http://14.116.217.62:8087/web/'+item.visitUrl" :name="item.resourceName"  controls></audio>
				<text style="margin: 15rpx;" class="resourceName">{{item.resourceName}}</text>
			</view>
			<view class="">
				<label>作业内容：</label>
				<uni-notice-bar :text="pushJobList[0].content"></uni-notice-bar>
			</view>
		</uni-card>
		<uni-card title="作业评语">
			<view class="">
				<text>评分：{{pushJobList[0].score}}</text>
			</view>
			<view class="">
				<text>批阅时间：{{pushJobList[0].checkTime| formDate}}</text>
			</view>
			<view class="">
				<text>评语：</text>
				<uni-notice-bar :text="pushJobList[0].comment"></uni-notice-bar>
			</view>
			<!-- <view class="">
				<text>附件：共0个</text>
			</view> -->
		</uni-card>
	</view>
</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue'
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import {
		formatDate
	} from "../../../../../utils/tiem.js";
	export default {
		components: {
			uniCard,
			uniNoticeBar
		},
		data() {
			return {
				pushJobList: [],
				resourceList: [],
				resourceName: "",
				title:""
			}
		},
		methods: {
			//图片预览
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
			//下载老师的附件
			// DownloadTeacher(val){
			// 	console.log(val)
			// 	uni.downloadFile({//下载
			// 				url:`http://14.116.217.62:8087/web/api/job/download/${val}`, //图片下载地址
			// 				success: res => {
			// 					if (res.statusCode === 200) {
			// 						uni.saveImageToPhotosAlbum({//保存图片到系统相册。
			// 							filePath: res.tempFilePath,//图片文件路径
			// 							success: function() {
			// 								uni.showToast({
			// 									title: '下载成功',
			// 									icon: 'none',
			// 								});
			// 							},
			// 							fail: function(e) {
			// 								console.log(e);
			// 								uni.showToast({
			// 									title: '下载失败',
			// 									icon: 'none',
			// 								});
			// 							}
			// 						});
			// 					}
			// 				}
			// 			});

			// }
		},
		filters: {
			formDate(val) {
				if (!val) {
					return "";
				}
				return formatDate(val)
			}
		},
		onLoad: function(val) {
			console.log(val)
			this.$http.get(`/web/api/job/exJobDetails/${val.jobId}/${val.userId}`).then(response => {
				console.log(response.data.data.resourceList);
				this.pushJobList = response.data.data.pushJobList;
				this.resourceList = response.data.data.resourceList;
				this.resourceList = response.data.data.resourceList.map(item => {
					console.log(item);
					item.isimage = item.resourceName.slice(item.resourceName.lastIndexOf(".") + 1).toLowerCase();
					return item
				})
         

				// console.log(str);
				// this.resourceName = str
				console.log(this.resourceList);
			})
			this.$http.get("/web/api/info/info").then( res => {
				console.log(res);
				this.title = res.data.data.name;
			});
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

	/********************************************************/
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

	.enclosure {
		display: flex;
		flex-direction: row;
		align-items: center;
		border-bottom: 1rpx solid #C8C9CC;
	}

	.enclosureImg {
		width: 50rpx;
		height: 50rpx;
		margin: 15rpx;
	}

	.ClickDownload {
		padding: 5rpx;
		background-color: #007AFF;
		border-radius: 8rpx;
		margin: 15rpx;
	}

	.resourceName {
		width: 200px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
