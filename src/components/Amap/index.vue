<template>
	<div class="AmapCom-box">
		<div id="container-AMap"></div>
		<el-card class="AMap-toolBar" v-show="positionStatus">
			<p class="status">{{positionInfo.status}}</p>
			<el-divider></el-divider>
			<p class="position">定位坐标: {{positionInfo.position}}</p>
			<p class="formattedAddress">定位地址: {{positionInfo.formattedAddress}}</p>
			<p class="adcode-p">当前邮编: {{positionInfo.adcode}}</p>
			<p class="location_type">定位类别: {{positionInfo.location_type}}</p>
		</el-card>
        <div class="position-btn" @click="AutoPosition">
            <i class="el-icon-place"></i>
        </div>
        <div class="search-box">
            <el-input v-model="search_input" placeholder="请输入内容" clearable id="input"></el-input>
        </div>
	</div>
</template>
<script>
/*eslint-disable */
import AMap from "AMap";
import AMapUI from "AMapUI";
export default {
	name: "AmapCom",
	components: {},
	props: {},
	data() {
		return {
			mapOBJ: null,
            /** toolBar */
            positionStatus: false,
            positionInfo: "",
            search_input: ""
			/** toolBar */
		};
	},
    created() {},
    beforeMount() {
        AMap.event.addListener(AMap, "click", this.handleClick)
    },
	mounted() {
		this.init();
	},
	methods: {
        // 点击 拖动地图事件
        handleClick() {
            console.log(2222)
        },
		// 初始化地图的生成
		init() {
			this.mapOBJ = new AMap.Map("container-AMap", {
				resizeEnable: true, //是否监控地图容器尺寸变化
				zoom: 13 //初始化地图层级
			});
			// 地图加载完成的回调
			this.mapOBJ.on("complete", () => {
				this.$message({
					message: "地图加载完成！",
					type: "success"
				});
			});
			this.ControlBar();
            // this.AutoPosition();
            this.PlaceSearch();
		},
		// 导入地图控件
		ControlBar() {
			this.mapOBJ.plugin(["AMap.ControlBar"], () => {
				const controlBar = new AMap.ControlBar(Options);
				this.mapOBJ.addControl(controlBar);
			});
		},
		// 自动定位
		AutoPosition() {
			this.mapOBJ.plugin("AMap.Geolocation", () => {
				const geolocation = new AMap.Geolocation({
					enableHighAccuracy: true, // 是否使用高精度定位
					timeout: 10000, // 设置定位超时时间，默认：无穷大
                    showButton: false, // 是否显示定位按钮默认值：true
					// 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
					zoomToAccuracy: true,
					// 定位按钮的排放位置, RB表示右下
					buttonPosition: "RB"
				});
				this.mapOBJ.addControl(geolocation);
				geolocation.getCurrentPosition();
				// 定位成功的回调函数
				AMap.event.addListener(geolocation, "complete", data => {
					// data是具体的定位信息
					console.log(data, "data");
					if (data.info == "SUCCESS") {
						const {
							formattedAddress,
							location_type,
							position,
							addressComponent
						} = { ...data };
						let positionInfo = {
							status: "定位成功",
							position: position.P,
							adcode: addressComponent.adcode,
							formattedAddress,
							location_type
						};
                        this.positionInfo = positionInfo;
                        this.positionStatus = true
					}
				});
				// 定位失败的回调函数
				AMap.event.addListener(geolocation, "error", data => {
					// 定位出错
					console.log(data, "data");
				});
			});
		},
		// 搜索
		PlaceSearch() {
			this.mapOBJ.plugin(
				["AMap.Autocomplete", "AMap.PlaceSearch"],
				() => {
					var autoOptions = {
						// 城市，默认全国
						// 使用联想输入的input的id
						input: "input"
					};
					var autocomplete = new AMap.Autocomplete(autoOptions);
					var placeSearch = new AMap.PlaceSearch({
						map: this.mapOBJ
					});
					AMap.event.addListener(autocomplete, "select", (e) => {
						//TODO 针对选中的poi实现自己的功能
                        placeSearch.search(e.poi.name);
                        this.positionStatus = false
					});
				}
			);
		}
	},
	watch: {}
};
</script>

<style lang="scss" scoped>
.AmapCom-box {
	height: 100%;
	position: relative;
	#container-AMap {
		height: 100%;
	}
	.AMap-toolBar {
		position: absolute;
		right: 0;
		top: 0;
		opacity: 0.8;
		.el-divider {
			margin: 10px 0;
		}
		.status {
			font-size: 18px;
		}
		p {
			margin: 2px 0;
			font-size: 14px;
		}
	}
    .position-btn {
        position: absolute;
        padding: 10px;
        right: 5px;
        bottom: 5px;
        cursor: pointer;
        background-color: #fff;
        opacity: 0.7;
        i {
            font-size: 18px;
        }
    }
    .search-box {
        position: absolute;
        left: 5px;
        top: 5px;
    }
}
</style>
