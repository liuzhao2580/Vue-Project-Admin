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
export default {
    name: 'AmapCom',
    components: {},
    props: {},
    data() {
        return {
            // 地图载体
            mapOBJ: null,
            /** toolBar */
            positionStatus: false,
            positionInfo: '',
            search_input: ''
            /** toolBar */
        }
    },
    created() {},
    mounted() {
        this.init()
    },
    methods: {
        // 初始化地图的生成
        init() {
            this.mapOBJ = new AMap.Map('container-AMap', {
                resizeEnable: true, //是否监控地图容器尺寸变化
                zoom: 13 //初始化地图层级
            })
            // 地图加载完成的回调
            this.mapOBJ.on('complete', () => {
                this.$message({
                    message: '地图加载完成！',
                    type: 'success'
                })
                this.exportMapEvent()
            })
            this.exportMapPlugin()
        },
        // 导入地图插件
        exportMapPlugin() {
            this.ControlBar()
            this.AutoPosition()
            this.PlaceSearch()
        },
        // 导入地图控件
        ControlBar() {
            this.mapOBJ.plugin(['AMap.ControlBar'], () => {
                const controlBar = new AMap.ControlBar(Options)
                this.mapOBJ.addControl(controlBar)
            })
        },
        // 自动定位
        AutoPosition() {
            this.mapOBJ.plugin('AMap.Geolocation', () => {
                const geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true, // 是否使用高精度定位
                    timeout: 10000, // 设置定位超时时间，默认：无穷大
                    showButton: false, // 是否显示定位按钮默认值：true
                    // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    zoomToAccuracy: true,
                    // 定位按钮的排放位置, RB表示右下
                    buttonPosition: 'RB'
                })
                this.mapOBJ.addControl(geolocation)
                geolocation.getCurrentPosition()
                // 定位成功的回调函数
                AMap.event.addListener(geolocation, 'complete', data => {
                    // data是具体的定位信息
                    console.log(data, 'data')
                    if (data.info == 'SUCCESS') {
                        const { formattedAddress, location_type, position, addressComponent } = { ...data }
                        let positionInfo = {
                            status: '定位成功',
                            position: position.P,
                            adcode: addressComponent.adcode,
                            formattedAddress,
                            location_type
                        }
                        this.positionInfo = positionInfo
                        this.positionStatus = true
                    }
                })
                // 定位失败的回调函数
                AMap.event.addListener(geolocation, 'error', data => {
                    // 定位出错
                    console.log(data, 'data')
                })
            })
        },
        // 搜索
        PlaceSearch() {
            this.mapOBJ.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], () => {
                var autoOptions = {
                    // 城市，默认全国
                    // 使用联想输入的input的id
                    input: 'input'
                }
                var autocomplete = new AMap.Autocomplete(autoOptions)
                var placeSearch = new AMap.PlaceSearch({
                    map: this.mapOBJ
                })
                AMap.event.addListener(autocomplete, 'select', e => {
                    //TODO 针对选中的poi实现自己的功能
                    placeSearch.search(e.poi.name)
                    this.positionStatus = false
                })
            })
        },
        // 导入地图事件
        exportMapEvent() {
            // 注册鼠标点击热点时触发
            this.mapOBJ.on('hotspotclick', this.handleHotClick)
            this.rightEvent()
		},
		// 点击地图热点事件
        handleHotClick(e) {
			const {id} = e
			const placeSearch = new AMap.PlaceSearch()  //构造地点查询类
			placeSearch.getDetails(id, (status, result) => {
				if (status === 'complete' && result.info === 'OK') {
					const poiInfo = result.poiList.pois[0]
					let content = [
						"<div class='hot-menu'>", 
							`<span class='iconfont icon-tishi'></span><span class='text lineEllipsisOne'>${poiInfo.address}</span>`,
							`<span class='iconfont icon-luxian'></span>`,
						'</div>', 
					]
					let contextMenu = new AMap.ContextMenu({
						isCustom: true,
						content: content.join('')
					})
					contextMenu.open(this.mapOBJ, poiInfo.location)
				}
        	})
        },
        // 鼠标右键事件
        rightEvent() {
            this.mapOBJ.on('rightclick', e => {
                let content = [
					"<div class='context-menu'>", 
						"<p class='li-item'><span class='iconfont icon-qidian'></span>设为起点</p>", 
						"<p class='li-item'><span class='iconfont icon-zhongdian'></span>设为终点</p>", 
					'</div>', 
				]
                let contextMenu = new AMap.ContextMenu({
                    isCustom: true,
                    content: content.join('')
				})
                contextMenu.open(this.mapOBJ, e.lnglat)
            })
        }
    },
    watch: {},
    beforeDestroy() {
        this.mapOBJ.destroy()
    }
}
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
<style>
.context-menu {
	display: flex;
	flex-direction: column;
	background-color: #fff;
	width: 100px;
	text-align: center;
	border-radius: 5px;
	box-shadow: 0 1px 10px rgba(150, 150, 150, 0.5);
}
.context-menu .li-item {
	padding: 10px 0;
	cursor: pointer;
	font-size: 14px;
	color: #999;
}
.li-item .icon-qidian {
	color: #409EFF;
}
.li-item .icon-zhongdian {
	color: #ea391e;
}
.hot-menu {
	display: flex;
	align-items: center;
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 0 1px 10px rgba(150, 150, 150, 0.5);
	padding: 10px;
	font-size: 14px;
}
.hot-menu .text {
	display: inline-block;
	min-width: 100px;
}
.iconfont {
	padding: 5px;
	margin-right: 10px;
	cursor: pointer;
	vertical-align: middle;
}
</style>
