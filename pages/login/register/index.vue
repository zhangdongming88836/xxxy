<template>
	<view class="login">
		<image class="img" :src="'http://14.116.217.62:8087//web/'+this.logo" mode=""></image>
		<view class="loginBox">
			<u-form :model="form" ref="uForm">
				<u-form-item label="姓名" prop="name" label-width="150rpx">
					<u-input v-model="form.name" />
				</u-form-item>
				<u-form-item label="用户名" prop="accountNumber" label-width="150rpx">
					<u-input v-model="form.accountNumber" />
				</u-form-item>
				<u-form-item label="密码" prop="password" label-width="150rpx">
					<u-input v-model="form.password" />
				</u-form-item>
				<u-form-item label="再次密码" prop="passwords" label-width="150rpx">
					<u-input v-model="form.passwords" />
				</u-form-item>
				<u-form-item label="手机号" prop="phone" label-width="150rpx">
					<u-input v-model="form.phone" />
				</u-form-item>
				<u-form-item label="邮箱" prop="email" label-width="150rpx">
					<u-input v-model="form.email" />
				</u-form-item>
				<u-form-item label="性别" prop="sex" label-width="150rpx">
					<u-input v-model="form.sex" type="select" @click="show = true" />
					<u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
				</u-form-item>
			</u-form>

			<view class="btns">
				<button class="btnt" @click="register" type="default">
					注册
				</button>
			</view>
			<!-- <text class="txt">注册和重置密码请联系老师</text> -->
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					accountNumber: '',
					password: "",
					phone: "",
					email: "",
					sex: "",
					value: "",
					roleId: 3,
				},
				logo:"",
				show: false,
				border: true,
				actionSheetList: [{
						text: '男',
						value: "0"
					},
					{
						text: '女',
						value: "1"
					},
				],
				rules: {
					name: [{
							required: true,
							message: '请输入姓名',
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change', 'blur'],
						},
						// 正则中文
						{
							required: true,
							pattern: /^[a-z\u4e00-\u9fa5]+$/gi,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);

							},
							message: '只能包含中文或字母',
							trigger: ['change', 'blur'],
						},
					],
					accountNumber: [{
							required: true,
							message: '请输入账号名',
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
					],
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
					phone: [{
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
					],
					email: [{
							required: true,
							message: '请输入邮箱',
							trigger: ['change', 'blur'],
						},
						// 正则判断为字母或数字
						{
							required: true,
							pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: '邮箱格式错误',
							trigger: ['change', 'blur'],
						},
					],
				}
			};
		},
		methods: {
			// 点击性别回调
			actionSheetCallback(index) {
				this.form.sex = this.actionSheetList[index].text;
				this.form.value = this.actionSheetList[index].value;
			},
			register() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						// console.log('验证通过');
						this.$http.post("/web/api/register", {
							userName: this.form.name,
							loginName: this.form.accountNumber,
							password: this.form.password,
							phonenumber: this.form.phone,
							email: this.form.email,
							sex: this.form.value,
							roleId: this.form.roleId,
						}).then(response => {
							console.log(response);
							if (response.data.code == 200) {
								uni.navigateTo({
									url: "/pages/login/index"
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
			}
		},
		onLoad:function(){
			this.$http.get("/web/api/info/info").then( res => {
				console.log(res);
				this.logo = res.data.data.logo;
			})
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}

 

	}
</script>

<style lang="scss">
	.login {

		width: 100%;
		.img {
			width: 100%;
			height: 500rpx;
		}

		.loginBox {
			height: 400rpx;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			.username {
				width: 75%;
				display: flex;
				align-items: center;

				.use-t {
					color: #999;
					width: 90rpx;
				}

				.use-i {
					border: 1px solid #ccc;
					height: 60rpx;
					margin-left: 16rpx;
					flex: 1;
				}
			}

			.password {
				display: flex;
				align-items: center;
				width: 75%;

				.pas-t {
					width: 90rpx;
					text-align: right;
					color: #999;
				}

				.pas-i {
					border: 1px solid #ccc;
					height: 60rpx;
					margin-left: 16rpx;
					flex: 1;
				}
			}

			.code {
				display: flex;
				align-items: center;
				width: 75%;

				.code-t {
					width: 90rpx;
					text-align: right;
					color: #999;
				}

				.code-i {
					border: 1px solid #ccc;
					height: 60rpx;
					margin-left: 16rpx;
					flex: 1;
				}

				.c-img {
					flex: 1;
					width: 60rpx;
					height: 60rpx;
					background: #18B566;
				}
			}

			.btn {
				width: 75%;
				font-weight: 600;
				background-color: #99ff99;
				color: #666666;
			}

			.btnt {
				width: 75%;
				font-weight: 600;
				background-color: #bbffee;
				color: #666666;
			}

			.txt {
				font-size: 12rpx;
			}
		}

		.btns {
			width: 100%;
			margin-bottom: 600rpx;
		}
	}
</style>
