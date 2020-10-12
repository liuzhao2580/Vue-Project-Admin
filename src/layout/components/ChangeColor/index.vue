<template>
    <div>
        <el-select
            v-model="value"
            :style="{ backgroundColor: value }"
            placeholder="请选择"
            class="change-color"
            @change="selectChange"
        >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :style="{ backgroundColor: item.value }"
            >
            </el-option>
        </el-select>
        <p class="test-text">测试</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: '#409EFF',
            options: [
                {
                    value: '#409EFF',
                    label: ''
                },
                {
                    value: '#14F7D1',
                    label: ''
                },
                {
                    value: '#E4F714',
                    label: ''
                },
                {
                    value: '#FFC0CD',
                    label: ''
                }
            ]
        }
    },
    methods: {
        selectChange(value) {
            const bodyDom = document.querySelector('#app')
            bodyDom.setAttribute('data-theme', '')
            bodyDom.setAttribute('data-theme', `${value}`)
        }
    }
}
</script>

<style lang="scss" scoped>
.change-color {
    width: 120px;
    border-radius: 50%;
}
</style>
