<template>
	<view class="">
		<view class="myhear">
			<view>
				<text>{{title}}</text>
			</view>
		</view>
		<view class="sex">
			<radio-group @change="radioChange" class="labels">
				<view class="labels-n">
						<view class="">
							<text>男</text>
						</view>
						<view class="">
							<radio value="0" />
						</view>
				</view>
				<view class="labels-n">
						<view class="">
							<text>女</text>
						</view>
						<view class="">
							<radio value="1" />
						</view>
				</view>
			</radio-group>
			<view class="pull-bottom">
				<view class="">
					<button type="primary" @click="Changesex">保存</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sex:"",
				title:""
			}
		},
		methods: {
			radioChange: function(evt) {
				console.log(evt.detail.value)	
				this.sex = evt.detail.value;
			},
			Changesex(){
				this.$http.post("/web/api/user/updatePerson",{
					sex:this.sex
				}).then( response => {
					 console.log(response);
					if(response.data.code == 200){
						uni.navigateBack({
						    delta: 1
						});
					}else{
						uni.showToast({
						    title: `${response.data.msg}`,
							icon:"none",
						    duration: 2000
						});
					}
				})
			},
		},
		onLoad:function(){
			this.$http.get("/web/api/info/info").then( res => {
				console.log(res);
				this.title = res.data.data.name;
			});
		}
		// onLoad:function(){
		// 	this.$http.get("/web/api/user/personage").then( res => {
		// 		 console.log(res.data.data)
		// 		this.username = res.data.data.userName;
		// 	})
		// }
	}
</script>

<style>
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
	.labels{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx;
	}
	.labels-n{
		width: 100%;
		height: 80rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-bottom:1rpx solid #999999;
	}
	.sex{
		margin-top:82rpx;
	}
	.pull-bottom {
		width:100%;
		position:fixed;
		bottom:0rpx;
	}
</style>
