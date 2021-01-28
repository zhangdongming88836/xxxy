<template>
	<view>
		<view class="myPage">
			<view class="myhear">
				<view>
					<text>{{title}}</text>
				</view>
			</view>
		</view>
		<view class="ScanCode" >
			<view class="">
				<button type="primary" size="mini" @click="ScanCode">执勤扫码</button>
			</view>
		</view>
		<view class="AttendanceRecords">
		<view class="list-frequently" v-for="item in attendanceList" :key="item.id">
			<view class="list-clomn">
				<view class="">
					<text>名字:{{item.userName}}</text>
				</view>
				<view class="list-row">
					<view class="time">
						<view class="">
							<text>执勤:{{item.punchTime|timedata}}</text>
						</view>
						<view class="week">
							<text>{{item.punchTime|timeDay}}</text>
						</view>
					</view>
					<view class="swarning">
						<text></text>
					</view>
				</view>
				<view class="list-row">
					<view class="time">
						<view class="">
							<text>退勤:{{item.outTime|timedata}}</text>
						</view>
						<view class="week">
							<text>{{item.outTime|timeDay}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		</view>
	</view>
</template>

<script>
	import {
		formatDate,
	} from "../../../utils/tiem.js"
	export default {
		data() {
			return {
				attendanceList:[],
				Details:"",
				title:""
			}
		},
		methods: {
			ScanCode(){
				uni.scanCode({
				    onlyFromCamera: true,
				    success: (res) => {
						console.log(res);
				        // console.log('条码类型：' + res.scanType);
				        // console.log('条码内容：' + res.result.length);
						if(res.result.length>0){
							uni.navigateTo({
								url:"/pages/function/beOnDuty/ResultsPage/index?result="+res.result
							})
						}
				    }
				});
			},
		},
		filters:{
			timedata(val) {
				if(!val){
					return "";
				}
				return formatDate(val)
			},
			timeDay(val) {
				if(!val){
					return "";
				}
				let data = new Date(val)
				let day = data.getDay()
			
			
				let tiem = ['天', '一', '二', '三', '四', '五', '六', ]
				return '星期'+ tiem[day]
				// return day
			}
		},
		onLoad: function(val) {
			console.log(val)
			this.Details = val.Details;
			this.$http.get(`/web/api/duty/selectSDuty/${val.Details}`).then( res => {
				console.log(res)
				this.attendanceList = res.data.data;
			})
			this.$http.get("/web/api/info/info").then( res => {
				console.log(res);
				this.title = res.data.data.name;
			});
		},
		onShow:function(){
			this.$http.get(`/web/api/duty/selectSDuty/${this.Details}`).then( res => {
				console.log(res)
				this.attendanceList = res.data.data;
			})
		}
		}
</script>

<style>
	.ScanCode{
		width: 100%;
		margin-top: 105rpx;
		padding: 0 30rpx 0 30rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
	}
	.AttendanceRecords {
		display: flex;
		flex-direction: column;
	}
	.list-clomn{
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 0 30rpx 0 30rpx;
	}
	.list-frequently {
		display: flex;
		margin-top: 20rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		border: 1rpx solid #999999;
		align-items: center;
		justify-content: flex-start;
	}
	
	.list-row {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	
	.time {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}
	
	.week {
		padding-left: 10rpx;
	}
	
	.swarning {
		color: #DD524D;
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

