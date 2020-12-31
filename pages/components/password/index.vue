<template>
	<view class="">
		<view class="myhear">
			<view>
				<text>深信院教学平台</text>
			</view>
		</view>
		<view class="join">
			<input  v-model="Nepad" class="uni-input" maxlength="15" placeholder="新密码限6-15位" />
			<input  v-model="Neqad" class="uni-input" maxlength="15" placeholder="再次输入新密码限6-15位" />
		</view>
		<view class="pull-bottom">
			<view class="">
				<button type="primary" @click="EditPassword">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
import md5 from "../../../utils/md5.js";	
	export default {
		data() {
			return {
			Nepad:"",
			Neqad:""
			}
		},
		methods: {
			EditPassword(){
				var password = "";
				if(this.Nepad == this.Neqad){
					this.$http.post("/web/api/user/updatePerson",{
						password:md5.hex_md5(this.Nepad)
					}).then( response => {
						// console.log(response);
						if(response.data.code == 200){
							this.Nepad = "";
							this.Neqad = "";
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
				}else{
					uni.showToast({
					    title: "二次密码输入不一致",
						icon:"none",
					    duration: 2000
					});
				}
			},
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
