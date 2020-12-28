<template>
    <view class="uplod-img">
		<view v-for="(item,index) in imgArr" :key="index">
		    <image :src="item" @click="lookImg(index)"></image>
		</view>
		<view class="btn">
        <button type="primary" @click="getImg">选择图片</button>
	   </view>
		<view class="btn">
			<button type="primary" @click="EditAvatar">保存</button>
		</view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                imgArr: [],
				file:{}
				
            };
        },
        methods: {
            getImg: function() {
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
            },
            lookImg: function(val) {
                const urls = this.imgArr
                const current = val
                uni.previewImage({
                    urls,
                    current
                })
            },
			EditAvatar(){
				// let token;
				// uni.getStorage({
				// 	key: 'token',
				// 	success: function(res) {
				// 		 console.log(res.data);
				// 		token = res.data	
				// 	}
				// });
				const token = uni.getStorageSync("token")
				uni.uploadFile({
					url:"/api/web/api/user/photo",
					filePath:this.imgArr[0],
					name:"file",
					header:{
						"token":token
					},
					success: (res) => {
						// uni.switchTab({
						// 	url:"/pages/my/my"
						// })
						uni.navigateBack({
						    delta: 1
						});
					},
					fail: (err) => {
						console.log(err);
					}
				})
			}
        },
		// onLoad:function(){
		// 	this.$http.get("/web/api/user/personage").then( res => {
		// 		 console.log(res.data.data)
		// 		this.imgArr.push(res.data.data.avatar)
		// 	})
		// }
    }
</script>
<style>
	.uplod-img{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding:30rpx ;	
		}
		.btn{
			width: 100%;
			margin-top:30rpx;
		}
</style>
