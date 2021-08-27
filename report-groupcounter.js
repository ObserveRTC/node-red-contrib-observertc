class ReportGroupCounter {
    constructor({windowTimeoutInMs}) {
        this._sum = 0;
        this._hits = new Map();
        this._updated = [];
        this._windowTimeoutInMs = windowTimeoutInMs || 6000;
    }

    process(message) {
        const item = message.payload;
        const now = Date.now();
        this._updated.push({
            item,
            timestamp: now,
        });
        const hits = this._hits.get(item) || 0;
        this._hits.set(item, hits + 1);
    }

    getResult() {
        const now = Date.now();
        const isEmpty = () => this._updated.length < 1;
        while(isEmpty() === false) {
            const { item, timestamp } = this._updated[0];
            const elapsedInMs = now - timestamp;
            if (elapsedInMs < this._windowTimeoutInMs) {
                break;
            }
            this._updated.shift();
            const hits = this._hits.get(item);
            if (!Number.isInteger(hits)) {
                console.warn(item, "saved with not integer");
                continue;
            }
            if (hits <= 1) {
                this._hits.delete(item);
            } else {
                this._hits.set(item, hits - 1);
            }
        }
        const result = [];
        for (const [key, value] of this._hits) {
            result.push({key, value});
        }
        return result;
    }
}

module.exports = function(RED) {
    function ReportGroupCounterBuilder(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        const counter = new ReportGroupCounter({
            windowTimeoutInMs: config.windowTimeout,
        });
        const timer = setInterval(() => {
            const result = counter.getResult();
            if (result) {
                node.send({
                    payload: result,
                });
            }
            console.log(result);
        }, config.emitTimeout || 1000);
        // const flowContext = node.context().flow;
        node.on('input', (msg) => {
            counter.process(msg);
        });
        node.on("close", function(done) {
            if (timer) {
                clearInterval(timer);
            }
        });
    }
    RED.nodes.registerType("report-groupcounter", ReportGroupCounterBuilder);
}