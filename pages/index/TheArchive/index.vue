<template>
	<view class="">
		<view class="myPage">
			<view class="myhear">
				<view>
					<text>对分易教学平台</text>
				</view>
			</view>
		</view>
		<view class="archive">
			<!-- <view class="archive-list" v-for="item in list" :key="item.id" ref="aad">
				<view class="">
					<view class="">
						<text>{{item.semester}}</text>
					</view>
					<view class="font-mini">
						<text>{{item.courseName}}</text>
					</view>
				</view>
				<view class="">
					<switch checked @change="switch1Change" />
				</view>
			</view> -->
			<!-- 右侧显示角标、switch -->
			<uni-list>
			    <uni-list-item title="列表右侧显示 switch"  :show-switch="true"  @switchChange="switchChange" ></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
              list:[],
			  show:false,
			}
		},
		methods: {
			//课程开关
			switchChange: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.value)
				this.show = e.value;
				
			},
		},
		//显示的时候发请求
		onShow: function() {
			this.$http.post("/web/api/course/list",{}).then( res => {
				console.log(res)
				this.list = res.data.data;
			})
		},
	}
</script>

<style>
	.archive {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-top: 80rpx;
	}

	.archive-list {
		display: flex;
		flex-direction: row;
		align-items: center;
		border:1rpx solid #999999;
		justify-content: space-between;
		padding: 5rpx 30rpx 5rpx 30rpx;
	}
   .font-mini{
	   font-size: 10rpx;
	   padding-top: 5rpx;
	   padding-bottom: 5rpx;
   }
	/****************************************/
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
</style>
