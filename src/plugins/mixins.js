export default {

    install(Vue) {
        Vue.mixin({
            computed: {
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
                getLoginAccount(req) {
                    const account = this.deepCopy(this.$store.state.accounts.account);
                    return account;
                },
                getLoginUser(req) {
                    const user = this.deepCopy(this.$store.state.accounts.user);
                    if (req)
                        if (req === "fullname") {
                            return `${user.name.first} ${user.name.last}`;
                        } else if (req === "initial") {
                            return user.name.first[0].toUpperCase()
                        }
                    return user;
                },
                checkFavorites(parent_id) {
                    const index = this.getLoginAccount().favorites.findIndex(x => x.parent_id === parent_id);
                    return index > -1
                },
                getUsers(account_id, option) {
                    if (Array.isArray(account_id)) {
                        var users = this.deepCopy(this.$store.state.users.users).find(x => account_id.includes(x.account_id));
                        if (option === "fullname")
                            return users.map(x => x.name ? `${x.name.first} ${x.name.last}` : '');
                        else if (option === "initial")
                            return users.map(x => x.name ? x.name.first[0].toUpperCase() : '');
                        return users || [];
                    } else {
                        var user = this.deepCopy(this.$store.state.users.users).find(x => x.account_id === account_id);
                        if (option === "fullname")
                            return user && user.name ? `${user.name.first} ${user.name.last}` : 'User';
                        else if (option === "initial")
                            return user && user.name ? user.name.first[0].toUpperCase() : '?';
                        return user || {};
                    }
                },
                getConnectionById(id, option) {
                    const connections = this.$store.state.connections.connections;
                    if (connections && connections.length) {
                        const con = connections.find(v => v._id === id);
                        if (option === "initial")
                            return con && con.name ? con.name[0].toUpperCase() : '?';
                        return con || {};
                    } else return {};
                },
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
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit"
                    });
                    return dt;
                },
                textEllipse(text, show, limit) {
                    if (!show && text.length > (limit || 100)) return `${text.substring(0, (limit || 100))}...`
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
                },
                getBase64(img, callback) {
                    const reader = new FileReader();
                    reader.addEventListener("load", () => callback(reader.result));
                    reader.readAsDataURL(img);
                }
                // getPopupContainer(trigger) {
                //     return trigger.parentElement
                // }
            }
        });
    }

}