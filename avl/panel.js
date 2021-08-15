function Panel(id) {

    function Point(x, y) {
        this.x = x;
        this.y = y;
        this.offset = function (ox, oy) {
            return new Point(x + ox, y + oy);
        }
        this.impact = function ({ x, y }, spacing) {
            var value = Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
            return value <= spacing
        }
    }
    this.r = 14;
    this.nodeList = new Array();
    this.clean = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.initPoint = new Point(this.canvas.width / 2, 35);
    this.draw = function (data, p) {
        var ctx, r, nodeList, newP, c;
        ctx = this.ctx;
        r = this.r;

        if (!ctx || !data) {
            return;
        }
        if (!p) {
            p = this.initPoint;
        }
        nodeList = this.nodeList;
        c = data;
        this.drawNode(c, p);
        if (c.left) {
            nodeList.push(p);
            newP = p.offset(-r, r);
            while (this.isImpact(newP, r * 2)) {
                newP = newP.offset(-r, r);
            }
            nodeList.push(newP);
            this.drawLine(nodeList.pop(), nodeList.pop());
            this.draw(c.left, newP);
        }

        if (c.right) {
            nodeList.push(p);
            newP = p.offset(r, r);
            while (this.isImpact(newP, r * 2)) {
                newP = newP.offset(r, r);
            }
            nodeList.push(newP);
            this.drawLine(nodeList.pop(), nodeList.pop());
            this.draw(c.right, newP);
        }
    }

    /**
     * 
     */
    this.drawNode = function (n, { x, y }) {
        var ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(x, y, this.r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.textBaseline = "middle";
        ctx.fillText(n.data, x - ctx.measureText(n.data).width / 2, y);
        ctx.stroke();
        ctx.closePath();
    }


    /**
     * 
     */
    this.drawLine = function (newNode, parentNode, isLeft) {
        var x, y, z, offsetX, offsetY, n1, n2;
        this.ctx.beginPath();
        x = newNode.x - parentNode.x;
        y = newNode.y - parentNode.y;
        z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        offsetX = this.r * x / z;
        offsetY = this.r * y / z;
        n1 = newNode.offset(-offsetX, -offsetY);
        n2 = parentNode.offset(offsetX, offsetY);
        this.ctx.moveTo(n1.x, n1.y);
        this.ctx.lineTo(n2.x, n2.y);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    /**
     * 碰撞检测
     */
    this.isImpact = function (point, spacing) {
        var flag = false;
        this.nodeList.forEach(element => {
            if (point.impact(element, spacing)) {
                flag = true;
                return false;
            }
        });
        return flag;
    }

}