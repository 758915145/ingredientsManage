const {remote} = require('electron');
let configDir = remote.app.getPath('userData');
export default {
    name: "Index",
    state: {
        today: {
            time: '',
            data: {}
        },
        ingredients: {
            "菜谱": [],
            "食材": []
        },
        history: {},
    },
    mutations: {
        /**
         * 重置today
         * @param state
         */
        resetToday(state){
            state.today.time = '';
            state.today.data = {};
        }
    },
    actions: {
        /**
         * 获取本地数据
         * @param context 上下文环境
         * @returns {Promise.<void>}
         */
        async getData(context){
            let state = context.state;
            _.assign(state.ingredients, await window.UTILS.readData('/static/data/Ingredients.json'));//读取菜谱、食材
            state.today = await window.UTILS.readData('/static/data/today.json');//读取今日数据
            //如果是昨天的数据，或者没有今日数据，那么保存新的今日数据
            let now = new Date().Format('yyyy-MM-dd');
            if (!state.today.time || state.today.time < now) {

                //保存历史数据
                if (state.today.time < now) {
                    state.history[state.today.time] = state.today.data;
                    context.dispatch('saveHistory');
                }
                let keys = {};
                context.commit('resetToday');
                state.ingredients["菜谱"].forEach(item => {
                    keys[item.name] = 0;
                });
                state.today.time = now;
                state.today.data = keys;
                context.dispatch('saveToday');
            }

            state.history = await window.UTILS.readData('/static/data/history.json');//读取历史数据
        },

        /**
         * 保存今日数据
         * @param state
         */
        async saveToday({state}){
            window.UTILS.saveJSON(state.today).to("/static/data/today.json");
        },

        /**
         * 保存菜谱、食材
         * @param state
         */
        async saveIngredients({state}){
            window.UTILS.saveJSON(state.ingredients).to("/static/data/Ingredients.json")
                .then(() => {
                    $vue.$message.success("操作成功");
                });
        },

        /**
         * 保存历史数据
         * @param state
         */
        async saveHistory({state}){
            window.UTILS.saveJSON(state.history).to("/static/data/history.json")
                .then(() => {
                    $vue.$message.success("操作成功");
                });
        },
    }
}
