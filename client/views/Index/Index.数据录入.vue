<template>
    <div>
        <div v-if="forShow">
            <div>
                <el-button type="primary" @click="print">打印食材</el-button>
                <el-tag style="margin-right:10px" v-for="item in todayMaterial" :key="item.name" v-if="+item.weight>0">
                    {{item.name + "：" + item.weight}}
                </el-tag>
            </div>

            <el-input v-model="filter" placeholder="筛选" style="width:200px"></el-input>
            <el-button @click="filter=''" v-if="filter.length>0">重置</el-button>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="菜名"
                    prop="name">
                </el-table-column>
                <el-table-column
                    label="份数">
                    <template scope="scope">
                        <el-input-number v-model="$store.state.Index.today.data[scope.row.name]"
                                         @change="handleChange"
                                         :min="0"
                                         v-if="$store.state.Index.today.data"
                        ></el-input-number>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!--打印专用-->
        <div v-else style="width:600px">>
            {{new window.Date().Format('yyyy-MM-dd hh:mm:ss')}}
            <el-table
                :data="todayMaterial"
                style="width:600px">
                <el-table-column label="食材" prop="name"></el-table-column>
                <el-table-column label="重量（克）" prop="weight"></el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script>
    export default {
        data(){
          return {
              filter:'',
              forShow:true
          }
        },
        computed: {
            tableData(){
                if(this.filter.length>0){
                    return this.$store.state.Index.ingredients['菜谱'].filter(item=>{
                       return item.name.indexOf(this.filter)>-1;
                    });
                }else{
                    return this.$store.state.Index.ingredients['菜谱'];
                }
            },
            todayMaterial(){
                let resultObj = {};
                let result = [];
                for (let key in this.$store.state.Index.today.data) {
                    let num = this.$store.state.Index.today.data[key];
                    this.$store.state.Index.ingredients["菜谱"].forEach(item => {
                        if (item.name === key) {
                            item.materials.forEach(sitem => {
                                if (resultObj[sitem.name] === undefined) {
                                    resultObj[sitem.name] = 0;
                                }
                                resultObj[sitem.name] += +sitem.weight * num;
                            });
                        }
                    });
                }
                for (let skey in resultObj) {
                    result.push({
                        name: skey,
                        weight: resultObj[skey]
                    });
                }
                return result;
            }
        },
        methods: {
            handleChange(){
                this.$nextTick(() => {
                    this.$store.dispatch('saveToday');
                });
            },

            //打印
            print(){
                this.forShow = false;
                document.querySelector('.el-tabs__header').style.display = 'none';
                this.$nextTick(()=>{
                    window.print();
                    document.querySelector('.el-tabs__header').style.display = 'block';
                    this.forShow = true;

                });
            }
        }
    }
</script>
