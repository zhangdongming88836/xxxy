<template>
	<view class="">
		<view class="myPage">
			<view class="myhear">
				<view>
					<text>对分易教学平台</text>
				</view>
			</view>
		</view>	
	   <view class="practice">
	   	 <view class="practice-left">
	   	 	<text>在线练习</text>
	   	 </view>
		 <view class="practice-right">
		 	<text class="practice-right-color">全部</text>
			<text>(0)</text>
		 </view>
	   </view>
	   <view class="PracticeList">
	   	 <view class="TheForm">
	   	 	<text>你的老师还没发布在线练习</text>
	   	 </view>
	   </view>
	</view>
</template>

<script>
</script>

<style>
	.practice{
		width:100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border:1rpx solid #C0C0C0;
		padding: 20rpx 0 20rpx 0;
	}
	.practice-left{
		padding-left:30rpx;
	}
	.practice-right{
		padding-right: 30rpx;
	}
	.practice-right-color{
		color: #007AFF;
	}
	.PracticeList{
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: flex-start;
		border:1rpx solid #999999;
	}
	.TheForm{
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		padding-left: 30rpx;
		
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
			top:0rpx;
		}
</style>
