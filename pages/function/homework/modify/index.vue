<template>
	<view class="">
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
		</view>
		<uni-card title="作业信息">
			<view class="">
				<text>作业名称：{{JobInformation.jobName}}</text>
			</view>
			<view class="">
				<text>作业内容：{{JobInformation.problem}}</text>
			</view>
			<view class="">
				<text>老师作业附件：</text>
			</view>
			<view class="enclosure" v-for="item in resourceList" :key="item.id">
				<view class="">
					<image @click="previewPictures(item.visitUrl)" v-if="item.isimage == 'png' || item.isimage == 'bmp' || item.isimage == 'jpg' || item.isimage == 'jpeg '|| item.isimage == 'gif' || item.isimage == 'xlsx' || item.isimage == 'TXT' || item.isimage == 'DOC' || item.isimage == 'XLS' || item.isimage == 'PPT'  || item.isimage == 'DOCX'  || item.isimage == 'PPTX' "
					 :src="'http://14.116.217.62:8087/web/file/'+item.saveUrl" class="enclosureImg"></image>
					<video v-else-if="item.isimage == 'mp4' " :src="'http://14.116.217.62:8087/web/'+item.visitUrl" controls></video>
					<audio :name="item.resourceName" v-else :src="'http://14.116.217.62:8087/web/'+item.visitUrl" controls></audio>
				</view>
				<view class="explain">
					<text style="margin: 15rpx;" class="resourceName">{{item.resourceName}}</text>
					<text class="ClickDownload" @click="DownloadTeacher(item.resourceId)">下载</text>
				</view>
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
		<uni-card title="写作业(长文本请从别的文件中复制过来)">
			<!-- <view class="">
				<text>首次提交时间：测试</text>
			</view> -->
			<!-- 	<view class="">
				<text>提交时间：{{JobInformation.submitTime|formDate}}</text>
			</view> -->
			<view class="" style="border-bottom: 1rpx solid #C8C9CC;">
				<!-- <uni-notice-bar :text="JobInformation.content"></uni-notice-bar> -->
				<textarea v-model="content" auto-height placeholder="请输入或粘贴作业文本最多8000字" maxlength="8000" />
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
		<uni-card title="作业评语">
			<view class="">
				<text>退回于：{{JobInformation.outTime|formDate}}</text>
			</view>
			<view class="">
				<text>退回原因：{{ JobInformation.returnReason}}</text>
			</view>
			<!-- <view class="">
				<text>评语：</text>
				<uni-notice-bar :text="JobInformation.comment"></uni-notice-bar>
			</view> -->
		<!-- 	<view class="">
				<text>附件：共0个</text>
			</view> -->
		</uni-card>
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
				courseId:"",
				imgArr: [],
				file:{},
				resourceList:[],
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
			
			
			//下载老师的附件
			DownloadTeacher(val){
				console.log(val)
				uni.downloadFile({//下载
							url:`http://14.116.217.62:8087/web/api/resource/download/${val}`, //图片下载地址
							success: res => {
								if (res.statusCode === 200) {
									uni.saveImageToPhotosAlbum({//保存图片到系统相册。
										filePath: res.tempFilePath,//图片文件路径
										success: function() {
											uni.showToast({
												title: '图片保存成功',
												icon: 'none',
											});
										},
										fail: function(e) {
											console.log(e);
											uni.showToast({
												title: '图片保存失败',
												icon: 'none',
											});
										}
									});
								}
							}
						});
				
			},
			
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
				
				this.$http.post("/web/api/job/submitJob",{
					content:this.content,
					jobId:this.jobId,
				}).then( res => {
					// console.log(res)
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
				
				// console.log(this.imgArr);
				const token = uni.getStorageSync("token")
				if(this.imgArr.length>0){
					uni.uploadFile({
						url:"http://14.116.217.62:8087/web/api/job/upload",                                                  // 'http://localhost:8080/api/web/api/job/upload',       //http://11114.116.217.62:7/					filePath:this.imgArr[0],
						name:"file",
						filePath:this.imgArr[0],
						 formData: {
						    courseId:this.courseId,
							jobId:this.jobId,
							file:this.file,
						 },
						header:{
							"token":token
						},
						success: (res) => {
							console.log(res)
							// uni.switchTab({
							// 	url:"/pages/my/my"
							// })
						},
						fail: (err) => {
							console.log(err);
						}
					})
					
				}
				
				
			
				
			}
		},
		//过滤器
		filters: {
			formDate(val) {
				if(!val){
					return "";
				}
				return formatDate(val)
			}
		},
		onLoad: function(val) {
			// console.log(val);
			this.jobId = val.jobId;
			this.courseName = val.courseName;
		    // this.courseId = val.courseId;
			this.$http.post("/web/api/job/jobDetails", {
				jobId: val.jobId
			}, {
				header: {
					"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
				},
			}).then(res => {
				// console.log(res.data.data)
				this.JobInformation = res.data.data.pushJob;
				this.courseId = res.data.data.pushJob.courseId;
				this.content = res.data.data.pushJob.content;
				this.resourceList = res.data.data.resourceList.map( item => {
					item.isimage = item.resourceName.slice(item.resourceName.lastIndexOf(".") + 1).toLowerCase();
					return item;
				})

			})
			this.$http.get("/web/api/info/info").then( res => {
				console.log(res);
				this.title = res.data.data.name;
			});
		}
	}
</script>

<style>
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
		flex-direction: column;
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
