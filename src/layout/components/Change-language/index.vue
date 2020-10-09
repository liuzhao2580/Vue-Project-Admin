<template>
    <div>
        <el-switch
            v-model="switchValue"
            active-color="#409EFF"
            inactive-color="#ff4949"
            active-text="中文"
            inactive-text="英文"
            @change='switchChange'
        >
        </el-switch>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            switchValue: true
        }
    },
    created() {},
    mounted() {},
    computed: {},
    methods: {
        switchChange(value) {
            if(value) this.$i18n.locale = 'zh'
            else this.$i18n.locale = 'en'
        }
    },
    watch: {}
}
</script>

<style lang="scss" scoped></style>
