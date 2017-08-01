<template>
    <div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="数据录入" name="数据录入">
                <Entry v-if="activeName==='数据录入'"></Entry>
            </el-tab-pane>
            <el-tab-pane label="菜谱管理" name="菜谱管理">
                <cookbook></cookbook>
            </el-tab-pane>
            <el-tab-pane label="食材管理" name="食材管理">
                <material></material>
            </el-tab-pane>
            <el-tab-pane label="历史数据" name="历史数据">
                <history></history>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    export default {
        name:'index',
        components:{
            Entry:require('./Index.数据录入.vue'),
            history:require('./Index.历史数据.vue'),
            material:require('./Index.食材管理.vue'),
            cookbook:require('./Index.菜谱管理.vue')
        },
        data(){
            return {
                activeName: "数据录入",
            }
        },
    }
</script>
<style>
    /*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
    ::-webkit-scrollbar{
        width:5px;
    }
    /*定义滑块，内阴影及圆角*/
    ::-webkit-scrollbar-thumb{
        border-radius:2px;
        background-color:rgba(44,122,181,.3);
    }
</style>
