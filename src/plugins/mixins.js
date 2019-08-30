export default {

    install(Vue) {
        Vue.mixin({
            computed: {
                account_id() {
                    return this.$store.state.accounts.account.account_id
                },
                main_layout_head_style() {
                    var main_head_style = {
                        'padding-left': '10px', 'font-weight': 'bold', 'text-align': 'left',
                        background: '#3c3c3c', 'font-size': '18px', color: 'white'
                    }
                    return { ...this.layout_head_style, ...main_head_style }
                    // return this.layout_head_style
                },
                layout_head_style() {
                    return {
                        'min-height': '0px',
                        border: 'none',
                        padding: '0px'
                    }
                }
            },
            methods: {
                deepCopy(obj) {
                    return JSON.parse(JSON.stringify(obj));
                },
                parseWithComma(x, isCurrency) {
                    if (!x || isNaN(x)) return isCurrency ? "₱ 0.00" : "0";
                    return isCurrency ? "₱ " + parseFloat(x).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : parseInt(x).toString().replace(/\d(?=(\d{3}))/g, '$&,');
                },
                formatDate: (date, type) => {
                    if (!date) {
                        return "";
                    }
                    var dt = new Date(date).toLocaleString("en-US", type ? type : {
                        hour12: true,
                        year: "numeric",
                        month: "long",
                        day: "2-digit"
                    });
                    return dt;
                },
                textEllipse(text) {
                    if (text.length > 100) return text.substring(0, 100) + '...'
                    else return text
                },
                getAuthorName(account_id) {
                    const author = this.$store.state.users.users.find(x => x.account_id === account_id);
                    return author && author.name ? author.name : {};
                },
                getAuthorEmail(account_id) {
                    const author = this.$store.state.users.users.find(x => x.account_id === account_id);
                    return author ? author.email : '';
                },
                getAuthorAvatar(account_id) {
                    const author = this.$store.state.users.users.find(x => x.account_id === account_id)
                    return author ? author.avatar : '';
                }
                // getPopupContainer(trigger) {
                //     return trigger.parentElement
                // }
            }
        });
    }

}