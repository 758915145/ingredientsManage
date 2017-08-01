<template>
    <div>
        <el-button type="primary" @click="addCookBook">添加菜谱</el-button>
        <el-input v-model="filter" placeholder="筛选" style="width:200px"></el-input>
        <el-button @click="filter=''" v-if="filter.length>0">重置</el-button>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item :label="item.name" :key="item.name" v-for="item in props.row.materials">
                            <span>{{ item.weight }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                label="菜名"
                prop="name">
            </el-table-column>
            <el-table-column
                label="操作">
                <template scope="scope">
                    <el-button
                        size="small"
                        @click="editCookBook(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="delCookBook(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--菜谱对话框-->
        <el-dialog key="菜谱" title="菜谱表单" :visible.sync="dialog.show" v-if="dialog.show" size="supertiny">
            <el-form :model="dialog.formData" style="width:550px">
                <el-form-item label="菜谱名" :label-width="dialog.formLabelWidth">
                    <el-input v-model="dialog.formData.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="食材" :label-width="dialog.formLabelWidth">
                    <el-transfer
                        v-model="dialog.formData.materialKeys"
                        filterable
                        :right-default-checked="dialog.formData.materialKeys"
                        :render-content="renderFunc"
                        :titles="['所有食材', '菜谱所需食材']"
                        :button-texts="['移除', '选取']"
                        @change="handleChange"
                        :data="transferData">
                    </el-transfer>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog.show = false">取 消</el-button>
                <el-button type="primary" @click="savaCookBook">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data(){
            let vm = this;
            return {
                filter:'',
                dialog: {
                    show: false,
                    formData: {
                        name: undefined,
                        materials: [],
                        materialKeys:[]
                    },
                    formTransfer: {},
                    formLabelWidth: "60px",
                    tagInputVisible: false,
                    tagInputValue: undefined,
                    currentName: undefined
                },
                renderFunc(h, option) {
//                    return <span>{ option.key } - { option.label }</span>;
                    return h('span', null, [
                        option.key,
                        h('el-input', {
                            class: 'custom-input', props: {
                                value: option.weight,
                            },
                            on: {
                                change(val){
                                    let that = vm.dialog.formData.materials.find(item=>{
                                        return item.name===option.key
                                    });
                                    if(that){
                                        that.weight = +val;
                                    }
                                    option.weight = +val;
                                }
                            }
                        }),
//                        h('span',{class:'custom-span'},option.key+'：'+option.weight + ' '),
                        '克'
                    ]);
                }
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
            today(){
                return this.$store.state.Index.today;
            },

            ingredients(){
                return this.$store.state.Index.ingredients;
            },
            transferData(){
                let result = [];
                this.ingredients['食材'].forEach(item => {
                    result.push({
                        key: item.name,
                        label: item.name,
                        weight: undefined
                    });
                });
                return result;
            }
        },
        watch:{

        },
        methods: {
            handleChange(value, direction, movedKeys) {
                if(direction==='right'){//添加
                    movedKeys.forEach(item=>{
                        this.dialog.formData.materials.push({
                           name:item,
                            weight:this.transferData.find(sitem=>{
                                return sitem.key === item;
                            }).weight
                        });
                    });
                }else{//移除
                    movedKeys.forEach(item=>{
                        this.dialog.formData.materials.forEach((sitem,index)=>{
                           if(sitem.name===item){
                               this.dialog.formData.materials.splice(index, 1);
                           }
                        });
                    });
                }
            },
            addCookBook(){
                this.transferData.forEach(item=>{
                   item.weight = undefined;
                });
                this.dialog.formData.name = undefined;
                this.dialog.formData.materialKeys = [];
                this.dialog.formData.materials = [];
                this.dialog.show = true;
                this.dialog.currentName = undefined;
            },
            editCookBook(index, row){
                let editData = _.cloneDeep(row);
                this.dialog.formData.name = editData.name;

                this.dialog.formData.materials = [];
                this.dialog.formData.materialKeys = [];
                editData.materials.forEach(item=>{
                    this.dialog.formData.materialKeys.push(item.name);
                    this.dialog.formData.materials.push(item)
                });

                this.transferData.forEach(item=>{
                    item.weight = undefined
                });

                this.transferData.forEach(item=>{
                    this.dialog.formData.materials.forEach(sitem=>{
                        if(sitem.name===item.key){
                            item.weight = sitem.weight;
                        }
                    });
                });
                this.dialog.show = true;
                this.dialog.currentName = editData.name;
            },
            delCookBook(index, row){
                this.$confirm('此操作将永久删除菜谱, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.ingredients["菜谱"].splice(index, 1);
                    this.$store.dispatch('saveIngredients');
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            showTagInput() {
                this.dialog.tagInputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleCloseTag(index){
                this.dialog.formData.materials.splice(index, 1);
            },
            handleInputConfirm() {
                let inputValue = this.dialog.tagInputValue;
                if (inputValue) {
                    let value = inputValue.replace(/\s/g, '');
                    let name = value.split("：")[0] || value.split(":")[0];
                    let weight = value.split("：")[1] || value.split(":")[1];
                    let has = this.ingredients["食材"].find(item => {
                        return item.name === name;
                    });
                    let noRepeat = this.dialog.formData.materials.find(item => {
                        return item.name === name;
                    });
                    if (has) {
                        if (noRepeat) {
                            alert("该食材已存在");
                            return;
                        }
                        this.dialog.formData.materials.push({
                            name: name,
                            weight: weight
                        });
                    } else {
                        alert("尚未发现该食材，请在食材管理中添加");
                        return;
                    }
                } else {
                    alert("请输入内容");
                    return;
                }
                this.dialog.tagInputVisible = false;
                this.dialog.tagInputValue = undefined;
            },

            savaCookBook(){
                let cookbook;
                if (this.dialog.currentName) {//编辑

                    //获取到当前菜谱
                    cookbook = this.ingredients["菜谱"].find(item => {
                        return item.name === this.dialog.currentName;
                    });

                    //获取今天录入这道菜的数量
                    let num = this.today.data[this.dialog.currentName];

                    //从今日数据中删除这道菜
                    delete this.today.data[this.dialog.currentName];

                    //在今日数据中重新添加这道菜
                    this.today.data[this.dialog.formData.name] = num;

                    //保存今日数据
                    this.$store.dispatch('saveToday');

                } else {//添加

                    //在今日数据中添加这道菜
                    let name = this.dialog.formData.name;
                    let has = this.ingredients["菜谱"].find(item => {
                        return item.name === name;
                    });
                    if (has) {
                        alert("该菜谱已存在");
                        return;
                    }
                    cookbook = {};
                    this.ingredients["菜谱"].push(cookbook);
                    this.today.data[this.dialog.formData.name] = 0;
                    this.$store.dispatch('saveToday');
                }

                cookbook.name = this.dialog.formData.name;
                cookbook.materials = [];
                this.dialog.formData.materials.forEach(item => {
                    cookbook.materials.push(_.cloneDeep(item));
                });
                this.$store.dispatch('saveIngredients');
                this.dialog.show = false;
                this.dialog.currentName = undefined;
            },

        }
    }
</script>
<style>
    .el-transfer-panel:nth-child(1) .custom-span {
        /*display:none;*/
    }

    .el-transfer-panel:nth-child(3) .custom-input {
        /*display:none;*/
    }

    .custom-input {
        width: 50px;
        margin-left: 10px;
        margin-right: 3px;
    }

    .custom-input input {
        width: 50px;
        height: 20px;
    }
</style>
