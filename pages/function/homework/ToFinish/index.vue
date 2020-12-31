<template>
	<view class="">
		<view class="myPage">
			<view class="myhear">
				<view>
					<text>深信院教学平台</text>
				</view>
			</view>
		</view>
		<view class="homework">
			<view class="homework-tetle">
				<view class="">
					<text>{{courseName}}</text>
				</view>
			</view>
		</view>
		<uni-card title="作业信息">
			<view class="">
				<text>作业名称：{{JobInformation.jobName}}</text>
			</view>
			<view class="">
				<text>作业内容：{{JobInformation.problem}}</text>
			</view>
			<view class="">
				<text>作业附件：</text>
			</view>
			<view class="enclosure">
				<text class="ClickDownload">下载</text>
				<image :src="'http://192.168.10.238:8087/web/file/'+JobInformation.saveUrl"  mode="" class="enclosureImg"></image>
				<text style="margin: 15rpx;" class="resourceName">{{JobInformation.resourceName}}</text>
			</view>
			<view class="">
				<text>满分值：100.00分</text>
			</view>
			<view class="">
				<text>评分方式：教师评分</text>
			</view>
			<view class="">
				<text>作业类型：个人作业</text>
			</view>
			<view class="">
				<text>附件格式：允许任意格式的附件</text>
			</view>
			<view class="">
				<text>截止时间：{{JobInformation.deadline|formDate}}</text>
			</view>
			<view class="">
				<text>逾期迟交：允许</text>
			</view>
			<view class="">
				<text>逾期修改：允许</text>
			</view>
		</uni-card>
		<uni-card title="学作业(长文本请从别的文件中复制过来)">
			<!-- <view class="">
				<text>首次提交时间：测试</text>
			</view> -->
		<!-- 	<view class="">
				<text>提交时间：{{JobInformation.submitTime|formDate}}</text>
			</view> -->
			<view class="" style="border-bottom: 1rpx solid #C8C9CC;">
				<!-- <uni-notice-bar :text="JobInformation.content"></uni-notice-bar> -->
				<textarea v-model="content"  auto-height  placeholder="请输入或粘贴作业文本最多8000字" maxlength="8000"/>
			</view>
			<view class="" style="margin-top:30rpx;">
				<button type="primary" size="mini" @click="UploadAttachment">上传附件</button>
			</view>
			<view v-for="(item,index) in imgArr" :key="index">
			    <image :src="item" @click="lookImg(index)"></image>
			</view>
			<view class="" style="margin-top:60rpx;">
				<button type="primary" @click="SubmitAssignments">保存并提交</button>
			</view>
		</uni-card>
	<!-- 	<uni-card title="作业评语">
			<view class="">
				<text>评分：{{JobInformation.score}}</text>
			</view>
			<view class="">
				<text>批阅时间：{{ JobInformation.checkTime|formDate}}</text>
			</view>
			<view class="">
				<text>评语：</text>
				<uni-notice-bar :text="JobInformation.comment"></uni-notice-bar>
			</view>
			<view class="">
				<text>附件：共0个</text>
			</view>
		</uni-card> -->
		<uni-card title="作业上交不成功?">
			<view class="">
				<text>1、点"上传附件"后,不要从"相册"或者"最近的文件"里选择文件,从"文件管理"里选择文件.</text>
			</view>
			<view class="">
				<text>2、如果上传不顺利,查看您的手机网络,在网络好的时候上交作业.</text>
			</view>
			<view class="">
				<text>3、拍作业照片时相机分辨率可以调低一点,降低照片文件大小.</text>
			</view>
			<view class="">
				<text>4、如果手机端交不了,还可以登录深圳职业信息技术网站www.dajdjai.com交作业。</text>
			</view>
		</uni-card>
	</view>
</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue'
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import {
		formatDate
	} from "../../../../utils/tiem.js";
	export default {
		components: {
			uniCard,
			uniNoticeBar,
		},
		data() {
			return {
				JobInformation: {},
				courseName:"",
				content:"",
				btn:0,
				jobId:"",
				imgArr: [],
				file:{}
			}
		},
		methods: {
			//上传附件
			UploadAttachment: function(){
				console.log(1111111111)	
				uni.chooseImage({
				    count: 1,
				    // sizeType压缩图片
				    sizeType: ['original', 'compressed'],
				    success: (res) => {
				        this.imgArr = res.tempFilePaths
						console.log(res)
						
						this.file = res.tempFiles[0]
				    }
				})		
				// uni.chooseFile({
				//   count:1, //默认100
				//   extension:['.zip','.doc'],
				//     success: function (res) {
				//         console.log(JSON.stringify(res.tempFilePaths));
				//     }
				// });
			},
			lookImg: function(val) {
			    const urls = this.imgArr
			    const current = val
			    uni.previewImage({
			        urls,
			        current
			    })
			},
			//提交作业
			SubmitAssignments(){
				const token = uni.getStorageSync("token")
				uni.uploadFile({
					url:"http://192.168.10.238:8087/web/api/job/upload",
					filePath:this.imgArr[0],
					name:"file",
					 // formData: {
					 //    courseId:           
					 // },
					header:{
						"token":token
					},
					success: (res) => {
						// uni.switchTab({
						// 	url:"/pages/my/my"
						// })
					},
					fail: (err) => {
						console.log(err);
					}
				})
				
				this.$http.post("/web/api/job/submitJob",{
					content:this.content,
					jobId:this.jobId,
				}).then( res => {
					console.log(res)
					if( res.data.code == 200){
						//uni.$emit("btn",{btn:this.btn});
						uni.navigateBack({
						    delta:1
						});
					}else{
						uni.showToast({
						    title: `${res.data.msg}`,
							icon:"none",
						    duration: 2000
						});
					}
				})
			}
		},
		//过滤器
		filters: {
			formDate(val) {
				return formatDate(val)
			}
		},
		onLoad: function(val) {
			this.jobId = val.jobId;
			this.courseName = val.courseName;
			this.$http.post("/web/api/job/jobDetails", {
				jobId: val.jobId
			}, {
				header: {
					"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
				},
			}).then(res => {
				console.log(res.data.data)
				this.JobInformation = res.data.data;
				

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
		top:0rpx;
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
		color: #FFFFFF;
		border-radius: 8rpx;
		margin: 15rpx;
	}
	.resourceName{
		width: 200px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>

