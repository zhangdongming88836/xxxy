<template>
	<view class="">
		<view class="myPage">
			<view class="myhear">
				<view>
					<text>{{title}}</text>
				</view>
			</view>
		</view>
		<view class="TestPapercontent">
			<view class="TestPaperTtle">
				<view class="">
					<text>{{courseName}}</text>
					<text style="padding-left: 10rpx;">练习卷</text>
					<!-- <text style="padding-left: 10rpx;">4156546464564564</text> -->
				</view>
				<!-- <view class="">
					<text>(满分10分)</text>
				</view> -->
				<view class="" v-if="appear">
					<text>准去率：{{accuracy}}</text>
				</view>
			</view>
			<view style="width: 100%;" class="" v-for="(item,index) in list " :key="index">
				<view class="Statistics">
					<!-- 	<view class="">
					<text>一、</text>
					<text>(共1题，共1分)</text>
				</view> -->
					<view class="" style="margin-top:18rpx;">
						<text>第{{index+1}}/{{list.length}}题</text>
						<text class="QuestionType" style="color: #FFFFFF;">{{item.type|xtype}}</text>
					</view>
				</view>
				<view class="OriginalTitle">
					<view class="">
						<text>{{item.title}}</text>
						<!-- <text>(本题1分)</text> -->
					</view>
					<view class="" v-if="item.type == 0">
						<radio-group  @change="radioChange($event,item)" class="radioxs">
							<label v-if="items.label" class="radio" style="padding: 5rpx 0 5rpx 0;" v-for="items in item.arr" :key="items.id">
								<radio :disabled="state"   :value="items.value" />{{items.value+'、'+items.label}}</label>
						</radio-group>
						<view class="" v-if="open">
						<view class="">
							<text>选择答案：{{item.subAnswer||"无"}}</text>
							<text style="padding-left:20rpx;">正确答案：{{item.correctAnswer}}</text>
						</view>
						<view class="">
							<text class="analysis">题目解析：qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq{{item.analysis}}</text>
						</view>
						</view>
					</view>
					<view class="" v-else>
						<checkbox-group  @change="checkboxChange($event,item)">
							<label class="uni-list-cell uni-list-cell-pd" v-for="items in item.arr" :key="item.id">
								<view>
									<checkbox :disabled="state"  v-if="items.label" :value="items.value">{{items.value+'、'+items.label}}</checkbox>
								</view>
							</label>
						</checkbox-group>
						<view class="" v-if="open">
						<view class="">
							<text>选择答案：{{item.subAnswer||"无"}}</text>
							<text style="padding-left:20rpx;">正确答案：{{item.correctAnswer}}</text>
						</view>
						<view class="">
							<text class="analysis">题目解析：{{item.analysis}}</text>
						</view>
						</view>
					</view>
				</view>
			</view>
			<view class="TestPaperbtn" v-if="this.list.length != 0 ">
				<view class=""  v-if="Yess">
					<button type="primary" size="mini" @click="deliver">完成并提交</button>
				</view>
			</view>
			<view class="" v-else style="margin-top:300rpx;">
				<text style="font-size: 30rpx;">老师还没有发布练习哦！！！！</text>
			</view>
		</view>
		<!--   <view class="practice">
	   	 <view class="practice-left">
	   	 	<text>在线练习</text>
	   	 </view>
		 <view class="practice-right">
		 	<text class="practice-right-color">全部</text>
			<text>(0)</text>
		 </view>
	   </view> -->
		<!-- 	   <view class="PracticeList">
	   	 <view class="TheForm" v-for="item in ExercisePaper" :key="item.id">
	   	 	<view class="examination">
	   	 		<view class="">
	   	 			<text>{{courseName}}</text>
					<text style="padding-left: 10rpx;">练习卷</text>
					<text style="padding-left: 10rpx;">201228145616</text>
	   	 		</view>
				<view class="">
					<button type="primary" size="mini" @click="testPaper">做题</button>
				</view>
	   	 	</view>
			<view class="">
				<text>时间</text>
				<text>发布</text>
				<text style="padding-left: 10rpx;">(成链接)</text>
			</view>
			<view class="">
				<text>时间</text>
				<text>开考</text>
				<text style="padding-left: 10rpx;">(不限时)</text>
			</view>
			<view class="">
				<text>shiajn</text>
				<text>截至</text>
			</view>
	   	 </view>
	   </view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//答案
				ExercisePaper: [],
				courseName: "",
				list: [


				],
				state:false,
				appear:false,
				Yess:true,
				open:false,
				recordId: "",
				//准确率
				accuracy:"",
				//返回的答案
				resultsList:[],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				value: 'orange',
				title:"",
			}
		},
		methods: {
			//做题
			// 	testPaper(){
			// 		uni.navigateTo({
			// 		    url: '/pages/function/practice/testPaper/index'
			// 		});
			// 	}
			//交付作业
			deliver() {
				let subResult = this.list.map(item => {
					if (Array.isArray(item.subResult)) {
						return item.subResult.join('')
					}
					return item.subResult
				})
				this.$http.post("/web//api/topic/afterSub", {
					recordId: this.recordId,
					subResult: subResult
				}, {
					header: {
						"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
					}
				}).then(res => {
					console.log(res)
					if(res.data.code == 200 ){
						uni.pageScrollTo({
							scrollTop: 0,
							duration: 300
							})
                        this.state = true;
						this.appear = true;
						this.Yess = false;
						this.open = true;
						this.accuracy = res.data.data.accuracy;
						this.list = this.list.map( (item,index) =>{
							 var obj = {...res.data.data.resultsList[index]};
							 Object.assign(item,obj)
							 return item
						})
					}else{
						uni.showToast({
						    title: `${res.data.msg}`,
							icon:"none",
						    duration: 2000
						});
					}
					
				})
			},
			//单选
			radioChange(val, item) {
				console.log(val)
				console.log(item)
				item.subResult = val.detail.value;
			},
			//多选
			checkboxChange(val, item) {
				item.subResult = val.detail.value;
           
			}

		},
		filters: {
			xtype(val) {
				if (val == 0) {
					return "单选"
				};
				if (val == 1) {
					return "多选"
				};
				if (val == 2) {
					return "判断"
				}
			}
		},
		onLoad: function(val) {
			this.courseName = val.courseName;
			this.$http.post("/web/api/topic/topicList", {
				courseId: val.courseId
			}).then(res => {
				console.log(res)
				// let arr = [];

				res.data.data.topicArrayList.map(item => {
					var arrs = Object.keys(item);
					let arr = []
					arrs.forEach(items => {
						if (items.indexOf('select') != -1) {
							arr.push({
								label: item[items],
								value: items.replace(/select/,'')
							})
						}
					})
					item.type == 0 ? item.subResult = '' : item.subResult = []
					item.arr = arr
					return item
				})
				this.list = res.data.data.topicArrayList;
				this.recordId = res.data.data.recordId;
			})
			this.$http.get("/web/api/info/info").then( res => {
				console.log(res);
				this.title = res.data.data.name;
			});
		}
	}
</script>

<style>
	.radioxs {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
	}

	.OriginalTitle {
		width: 100%;
		padding: 10rpx 30rpx 10rpx 30rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		background-color: #DBF1E1;
	}

	.QuestionType {
		padding: 5rpx 15rpx 5rpx 15rpx;
		background-color: #2B85E4;
		margin-left: 15rpx;
		border-radius: 10rpx;
	}

	.Statistics {
		padding: 10rpx 30rpx 10rpx 30rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		border-bottom: 1rpx solid #C8C9CC;
	}

	.TestPaperbtn {
		width: 100%;
		padding: 10rpx 30rpx 10rpx 30rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 100rpx;
		justify-content: flex-end;
	}

	.TestPaperTtle {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10rpx 0 10rpx 0;
		background-color: #2B85E4;
		color: #FFFFFF;
	}

	.TestPapercontent {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		margin-top: 80rpx;
	}

	/************************************************************/
	.practice {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		color: #FFFFFF;
		border: 1rpx solid #C0C0C0;
		padding: 20rpx 0 20rpx 0;
		background-color: #007AFF;
	}

	.practice-left {
		padding-left: 30rpx;
	}

	.practice-right {
		padding-right: 30rpx;
	}

	.practice-right-color {
		color: #007AFF;
	}

	.PracticeList {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		border: 1rpx solid #999999;
	}

	.TheForm {
		width: 100%;
		padding: 10rpx 30rpx 10rpx 30rpx;

	}

	.examination {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
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
		top: 0rpx;
	}
	.analysis{
		width:300rpx;
		word-break : break-all ;   /* IE 允许词内换行 */
		word-wrap : break-word ;   /* IE 内容将在边界内换行 */  
		overflow : auto ;
	}
</style>
