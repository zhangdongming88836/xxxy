<template>
	<view class="">
		<view class="myPage">
			<view class="myhear">
				<view>
					<text>深信院教学平台</text>
				</view>
			</view>
		</view>
		<view class="QRcode">
			<view class="font-color">
				<text>武术</text>
				<text>(程连杰)</text>
			</view>
			<view class="" @longtap="longtap">
				<image src="../../../../static/function/rwm.png" mode=""></image>
			</view>
			<view class="font-color">
				<text>12班</text>
				<text>(AOUSJ)</text>
			</view>
			<view class="font-color">
				<text>长按可以保存到手机</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			//长按出发
			longtap() {
				uni.showActionSheet({
					itemList: ['保存到手机'],
					success: function(res) {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						if(res.tapIndex == 0){
							uni.chooseImage({
							    count: 1,
							    sourceType: ['camera'],
							    success: function (res) {
							        uni.saveImageToPhotosAlbum({
							            filePath: res.tempFilePaths[0],
							            success: function () {
							                console.log('save success');
							            }
							        });
							    }
							});
						}
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
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

	/********************************************/
	.QRcode {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-top: 10rpx;
		align-items: center;
		justify-content: center;
	}
	.font-color{
		color: #DD524D;
	}
</style>
