<template>
    <pre style="font-size:12px;">
        {{historyString}}
    </pre>
</template>
<script>
    import echarts from 'echarts';
    export default {
        data(){
          return {
              Xaxis:[],
              Yaxis:[],
          }
        },
        computed:{
            historyString(){
                return JSON.stringify(this.$store.state.Index.history);
            },
            history(){
                return this.$store.state.Index.history;
            },
        },
        created(){
            let timeArray = [];
            let startTime;
            let endTime = new Date(new Date().Format('yyyy-MM-dd')).getTime();
            for(let key in this.history){
                timeArray.push(key);
                let data = this.history[key];
                for(let skey in data){

                }
            }
            timeArray.sort();
            startTime = timeArray[0];
        },
    }
</script>
