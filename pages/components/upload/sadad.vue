<template>
	<view class="editInfo">
		<uni-nav-bar title="修改头像" fixed leftText="关闭" @clickLeft="close"></uni-nav-bar>
		<view class="title">
			上传头像
		</view>
		<view class="updata">
			<image class="photo" :src="imgUrl" mode=""></image>
			<button class="chooseImg" @click="chooseImg">选择照片</button>
		</view>
		<view class="foot">
			<button class="submit" @click="submit">保存</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl:"",
				tempFiles:""
			}
		},
		methods: {
			close(){
				uni.switchTab({
					url:"/pages/my/my"
				})
			},
			chooseImg(){
				uni.chooseImage({
					count:1,
					success:(res)=>{
						this.imgUrl = res.tempFilePaths[0]
						this.tempFiles = res.tempFiles[0].path
					}
				})
			},
			submit(){
				console.log("submit",this.tempFiles);
				const token = uni.getStorageSync("token")
				uni.uploadFile({
					url:"http://192.168.10.238:8087/web/api/user/photo",
					filePath:this.imgUrl,
					name:"file",
					header:{
						"token":token
					},
					success: (res) => {
						uni.switchTab({
							url:"/pages/my/my"
						})
					},
					fail: (err) => {
						console.log(err);
					}
				})
			}
		},
		onLoad(option) {
			console.log(option);
			if (option.id == "null"){
				this.imgUrl = "/static/touxiang.svg"
			}else{
				this.imgUrl = 'http://192.168.10.238:8087/web/file/'+option.id
			}
		}
	}
</script>

<style lang="scss" scoped>
.editInfo{
	
	.title{
		width: 100%;
			line-height: 90rpx;
			font-size: 14px;
			padding-left: 30rpx;
	}
	.info{
		.input{
			background-color: #ffffff;
			height: 90rpx;
			border-top: 1px solid #d4d4d4;
			border-bottom: 1px solid #d4d4d4;
		}
	}
	.updata{
		text-align: center;
		.photo{
			height: 400rpx;
			width: 400rpx;
		}
		.chooseImg{
			margin-top: 20rpx;
			width: 80%;
			background-color: #abccf7;
		}
	}
	.foot{
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		background-color: #e9e9e9;
		width: 100%;
		padding: 20rpx;
		.submit{
			background-color: #0088ff;
			color: #FFF;
		}
	}
	
}
</style>
