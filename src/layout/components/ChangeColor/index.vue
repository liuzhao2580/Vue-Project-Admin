<template>
    <div class="change-color">
        <el-color-picker v-model="color" color-format='hex' @active-change='handleChange'></el-color-picker>
    </div>
</template>

<script>
export default {
    name: 'change-color',
    components: {},
    props: {},
    computed: {},
    data() {
        return {
            color: '#409EFF'
        }
    },
    created() {},
    mounted() {},
    methods: {
        handleChange(value) {
            const reg = /[0-9]\d+/g
            const getArr = value.match(reg)
            let hexStr = '#'+((getArr[0] << 16) | (getArr[1]  << 8) | getArr[2] ).toString(16);
            console.log(hexStr)
        }
    }
}
</script>

<style lang="scss" scoped>
.change-color {
    margin-right: 10px;
}
</style>