
/*
 * 树
 */
function Tree() {
    this.root = undefined;

    /*
     * 树节点
     * @param {*} data 
     */
    function Node(data) {
        var t = this;
        this.parent = undefined;
        this.left = undefined;
        this.right = undefined;
        this.data = data;
        this.greatThan = (data) => this.data > data;
        this.insert = function (data) {
            if (this.greatThan(data)) {
                if (!this.left) {
                    this.left = new Node(data);
                    this.left.parent = this;
                    return this.left;
                }
                return this.left.insert(data);
            } else {
                if (!this.right) {
                    this.right = new Node(data);
                    this.right.parent = this;
                    return this.right;
                }
                return this.right.insert(data);
            }
        }

        this.balanceFactory = function () {
            return (this.left ? this.left.getHeight() : 0) - (this.right ? this.right.getHeight() : 0);
        };

        this.getHeight = function () {
            return Math.max(this.left ? this.left.getHeight() : 0, this.right ? this.right.getHeight() : 0) + 1
        };
    }

    /*
     * 添加节点
     */
    this.append = function (data) {
        var n;
        if (!this.root) {
            this.root = new Node(data);
            n = this.root;
        } else {
            n = this.root.insert(data);
        }
        this.rebalance(n);
    }

    /**
     * 重新平衡
     */
    this.rebalance = function (n) {
        while (n) {
            var bf = n.balanceFactory();
            if (Math.abs(bf) > 1) {
                if (bf > 0) {
                    if (n.left.balanceFactory() < 0) {
                        this.rolateLeft(n.left, n.left.right);
                    }
                    this.rolateRight(n, n.left);
                } else {
                    if (n.right.balanceFactory() > 0) {
                        this.rolateRight(n.right, n.right.left);
                    }
                    this.rolateLeft(n, n.right);
                }
            }
            n = n.parent;
        }
    }
    /*
     * 右旋
     */
    this.rolateRight = function (h, l) {
        hp = h.parent;
        if (!hp) {
            this.root = l;
            l.parent = undefined;
        } else if (hp.greatThan(h.data)) {
            hp.left = l;
        } else {
            hp.right = l;
        }
        l.parent = hp;

        h.left = l.right;
        if (l.right) {
            l.right.parnet = h;
        }
        l.right = h;
        h.parent = l;
    }

    /*
     * 左旋
     */
    this.rolateLeft = function (h, l) {
        hp = h.parent;
        if (!hp) {
            this.root = l;
        } else if (hp.greatThan(h.data)) {
            hp.left = l;
        } else {
            hp.right = l;
        }
        l.parent = hp;

        h.right = l.left;
        if (l.left) {
            l.left.parnet = h;
        }
        l.left = h;
        h.parent = l;
    }



    /*
     * 打印调试信息
     */
    this.toString = function () {
        console.log(this.root);
    }

}
var tree, panel;

function init() {
    tree = new Tree();
    panel = new Panel("panle");
}


function insert(e) {
    var data = document.getElementById("data").value;
    if (!data || data > 9999) {
        alert("null");
        return;
    }
    tree.append(data);
    panel.clean();
    panel.draw(tree.root);
}


function clean(e) {
    tree = new Tree("panle");
    alert("clean up.");
}

