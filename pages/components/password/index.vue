<template>
	<view class="">
		<view class="myhear">
			<view>
				<text>{{title}}</text>
			</view>
		</view>
		<view class="join">
			<!-- <input  v-model="Nepad" class="uni-input" maxlength="15" placeholder="新密码限6-15位" />
			<input  v-model="Neqad" class="uni-input" maxlength="15" placeholder="再次输入新密码限6-15位" /> -->
			<u-form :model="form" ref="uForm">
				<u-form-item label="密码" prop="password" label-width="150rpx">
					<u-input v-model="form.password" />
				</u-form-item>
				<u-form-item label="再次密码" prop="passwords" label-width="150rpx">
					<u-input v-model="form.passwords" />
				</u-form-item>
			</u-form>
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
				title:"",
				form: {
					password: "",
					passwords: ""
				},
				rules: {
					password: [{
							required: true,
							message: '请输入密码',
							trigger: ['change', 'blur'],
						},
						// 正则判断为字母或数字
						{
							required: true,
							pattern: /^[0-9a-zA-Z]*$/g,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: '只能包含字母或数字',
							trigger: ['change', 'blur'],
						},
						{
							required: true,
							min: 6,
							max: 12,
							message: '长度在6-12个字符之间',
							trigger: ['change', 'blur'],
						},
					],
					passwords: [{
							required: true,
							message: '再次密码不能为空',
							trigger: ['change', 'blur'],
						},
						{
							required: true,
							validator: (rule, value, callback) => {
								return value == this.form.password
							},
							message: '两次密码输入不一致',
							trigger: ['change', 'blur'],
						},

					],
				}
			}
		},
		methods: {
			EditPassword() {

				this.$refs.uForm.validate(valid => {
					if (valid) {
						// console.log('验证通过');
						this.$http.post("/web/api/user/updatePerson", {
							password: md5.hex_md5(this.form.password)
						}).then(response => {
							// console.log(response);
							if (response.data.code == 200) {
								this.form.password = "";
								this.form.passwords = "";
								uni.navigateBack({
									delta: 1
								});
							} else {
								uni.showToast({
									title: `${response.data.msg}`,
									icon: "none",
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
		onLoad:function(){
		this.$http.get("/web/api/info/info").then( res => {
			console.log(res);
			this.title = res.data.data.name;
		});	
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
	}
</script>

<style>
	.join {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		margin-top: 100rpx;
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
		width: 100%;
		position: fixed;
		bottom: 0rpx;
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
