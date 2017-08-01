<template>
    <div>
        <el-button type="primary" @click="addMaterial">添加食材</el-button>
        <el-input v-model="filter" placeholder="筛选" style="width:200px"></el-input>
        <el-button @click="filter=''" v-if="filter.length>0">重置</el-button>
        <el-table
            :data="tableData"
            style="width: 100%">

            <el-table-column
                label="食材"
                prop="name">
            </el-table-column>
            <el-table-column
                label="操作">
                <template scope="scope">
                    <el-button
                        size="small"
                        @click="editMaterial(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="delMaterial(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--食材对话框-->
        <el-dialog size="tiny" key="食材" title="食材表单" :visible.sync="dialog.show">
            <el-form :model="dialog.formData">
                <el-form-item label="食材名" :label-width="dialog.formLabelWidth">
                    <el-input v-model="dialog.formData.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog.show = false">取 消</el-button>
                <el-button type="primary" @click="savaMaterial">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data(){
          return {
              filter:'',
              dialog:{
                  show:false,
                  formData:{
                      name:undefined,

                  },
                  formLabelWidth:'60px',
                  currentName:undefined
              }
          }
        },
        computed:{
            tableData(){
                if(this.filter.length>0){
                    return this.$store.state.Index.ingredients['食材'].filter(item=>{
                        return item.name.indexOf(this.filter)>-1;
                    });
                }else{
                    return this.$store.state.Index.ingredients['食材'];
                }
            },
            today(){
                return this.$store.state.Index.today;
            },

            ingredients(){
                return this.$store.state.Index.ingredients;
            },
        },
        methods:{
            addMaterial(){
                this.dialog.formData.name=undefined;
                this.dialog.show = true;
                this.dialog.currentName = undefined;
            },
            editMaterial(index,row){
                this.dialog.formData.name=row.name;
                this.dialog.show = true;
                this.dialog.currentName = row.name;
            },
            delMaterial(index,row){
                this.$confirm('此操作将永久删除食材, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.ingredients["食材"].splice(index,1);
                    this.$store.dispatch('saveIngredients');
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            savaMaterial(){
                let Material;
                if(this.dialog.currentName){
                    //编辑
                    Material = this.ingredients["食材"].find(item=>{
                        return item.name===this.dialog.currentName;
                    });
                    this.ingredients["菜谱"].forEach(item=>{
                        item.materials.forEach(sitem=>{
                            if(sitem.name===this.dialog.currentName){
                                sitem.name = this.dialog.formData.name;
                            }
                        });
                    });
                }else{
                    //添加
                    let name = this.dialog.formData.name;
                    let has = this.ingredients["食材"].find(item=>{
                        return item.name===name;
                    });
                    if(has){
                        alert("该食材已存在");
                        return;
                    }
                    Material = {};
                    this.ingredients["食材"].push(Material);
                }
                Material.name = this.dialog.formData.name;

                this.$store.dispatch('saveIngredients');
                this.dialog.show = false;
                this.dialog.currentName = undefined;
            },
        }
    }
</script>
