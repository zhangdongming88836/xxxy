<template>
	<view class="">
		<view class="myhear">
			<view>
				<text>{{title}}</text>
			</view>
		</view>
		<view class="join">
			<!-- <input v-model="phonenumber"  class="uni-input" maxlength="11" placeholder="11位手机号" /> -->
			<u-form :model="form" ref="uForm">
				<u-form-item prop="phonenumber"  class="uni-input">
					<u-input v-model="form.phonenumber" focus />
				</u-form-item>
			</u-form>
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
				title:"",
				form:{
					phonenumber:""
				},
				rules: {
					phonenumber: [{
							required: true,
							message: '请输入手机号',
							trigger: ['change', 'blur'],
						},
						// 正则判断手机号
						{
							required: true,
							pattern: /^((\+?86)|(\(\+86\)))?(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: '手机格式错误',
							trigger: ['change', 'blur'],
						},
						{
							required: true,
							min: 11,
							max: 11,
							message: '长度是11个字符',
							trigger: ['change', 'blur'],
						},
						]
					}
				
			}
		},
		methods: {
			Editph(){
				this.$refs.uForm.validate(valid => {
					if (valid) {
						// console.log('验证通过');
					this.$http.post("/web/api/user/updatePerson",{
						phonenumber:this.form.phonenumber
					}).then( response => {
						// console.log(response);
						if(response.data.code == 200){
							this.form.username = ""
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
								
							
						
					} else {
						console.log('验证失败');
					}
				});
				
			},
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad:function(){
			this.$http.get("/web/api/user/personage").then( res => {
				 console.log(res.data.data)
				this.form.phonenumber = res.data.data.phonenumber;
			})
			this.$http.get("/web/api/info/info").then( res => {
				console.log(res);
				this.title = res.data.data.name;
			});
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
		width: 100%;
		padding:20rpx;
		/* border: 1rpx solid #8F8F94; */
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
