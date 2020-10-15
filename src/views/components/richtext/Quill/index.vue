<template>
    <div id="quill-editor">Quill</div>
</template>

<script>
import Quill from 'quill'
export default {
    components: {},
    data() {
        return{}
    },
    created() {},
    mounted() {
        this.init()
    },
    computed: {},
    methods: {
        // 初始化
        init() {
            new Quill('#quill-editor', {
                theme:'snow'
            })
        }
    },
    watch: {}
}
</script>

<style lang="scss" scoped>

</style>