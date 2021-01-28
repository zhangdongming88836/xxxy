<template>
	<view class="myPage">
		<view class="myhear">
			<view>
				<text>{{title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				title:""
			}
		},
		onLoad:function(){
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
		top:0rpx;
	}
	/************************************************/
</style>
