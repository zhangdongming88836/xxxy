<template>
	<view class="">
		<view class="myhear">
			<view>
				<text>深信院教学平台</text>
			</view>
		</view>
		<view class="join">
			<input v-model="phonenumber"  class="uni-input" maxlength="11" placeholder="11位手机号" />
		</view>
		<view class="pull-bottom">
			<view class="">
				<button type="primary" @click="Editph">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phonenumber:""
			}
		},
		methods: {
			Editph(){
				this.$http.post("/web/api/user/updatePerson",{
					phonenumber:this.phonenumber
				}).then( response => {
					// console.log(response);
					if(response.data.code == 200){
						this.username = ""
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
			this.$http.get("/web/api/user/personage").then( res => {
				 console.log(res.data.data)
				this.phonenumber = res.data.data.phonenumber;
			})
		}
	}
</script>

<style>
	.join {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		margin-top:100rpx;
		padding-top: 30rpx;
	}

	.bull-left {
		margin-left: 30rpx;
		margin-bottom: 15rpx;
		color: #8F8F94;
	}

	.uni-input {
		height: 90rpx;
		padding-left: 30rpx;
		border: 1rpx solid #8F8F94;
	}

	.join-rg {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}

	.bull-right {
		padding-right: 30rpx;
		margin-top: 10rpx;
	}

	.pull-bottom {
		width:100%;
		position:fixed;
		bottom:0rpx;
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
</style>
