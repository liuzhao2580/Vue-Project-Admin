<template>
    <div class="account-box">
        <el-form label-position="left" label-width="80px" :model="form_account">
            <el-form-item label="名称">
                <el-input v-model="form_account.name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form_account.Email"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">更新数据</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'account',
    components: {},
    computed: {
        ...mapGetters({
            nickname: 'user/nickname'
        })
    },
    props: {},
    data() {
        return {
            form_account: {
                name: '',
                Email: 'liuzhao2580'
            }
        }
    },
    created() {
        this.init()
    },
    mounted() {},
    methods: {
        init() {
            this.form_account.name = this.nickname
        }
    },
    watch: {}
}
</script>

<style lang="scss" scoped></style>
