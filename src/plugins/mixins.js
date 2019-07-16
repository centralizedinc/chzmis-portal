export default {

    install(Vue) {
        Vue.mixin({
            methods: {
                deepCopy(obj) {
                    return JSON.parse(JSON.stringify(obj));
                }
            }
        });
    }

}