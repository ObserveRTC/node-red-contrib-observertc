const { decode } = require("base64-arraybuffer");

class ReportDemuxer {
    constructor() {
    
    }

    process(message) {
        const report = message.payload;
        if (!report) {
            return null;
        }
        const type = report.type;
        if (!type) {
            return null;
        }
        const payload = report.payload;
        if (!payload) {
            return null;
        }
        let demuxedReport;
        try {
            const buffer = decode(payload);
            const decodedString = String.fromCharCode.apply(null, new Uint8Array(buffer));
            demuxedReport = {
                payload: JSON.parse(decodedString),
            };
        } catch (err) {
            console.warn(err);
            return null;
        }
        if (!demuxedReport) {
            return null;
        }
        const output = [
            null, // OBSERVER_EVENT
            null, // CALL_EVENT
            null, // CALL_META_DATA
            null, // CLIENT_EXTENSION_DATA
            null, // PEER_CONNECTION_TRANSPORT
            null, // PEER_CONNECTION_DATA_CHANNEL
            null, // INBOUND_AUDIO_TRACK
            null, // INBOUND_VIDEO_TRACK
            null, // OUTBOUND_AUDIO_TRACK
            null, // OUTBOUND_VIDEO_TRACK
            null, // SFU_EVENT
            null, // SFU_META_DATA
            null, // SFU_TRANSPORT
            null, // SFU_RTP_SOURCE_STREAM
            null, // SFU_RTP_SINK_STREAM
            null, // SFU_SCTP_STREAM
            null, // default
        ];
        switch (type) {
            case "OBSERVER_EVENT":
                output[0] = demuxedReport;
                break;
            case "CALL_EVENT":
                output[1] = demuxedReport;
                break;
            case "CALL_META_DATA":
                output[2] = demuxedReport;
                break;
            case "CLIENT_EXTENSION_DATA":
                output[3] = demuxedReport;
                break;
            case "PEER_CONNECTION_TRANSPORT":
                output[4] = demuxedReport;
                break;
            case "PEER_CONNECTION_DATA_CHANNEL":
                output[5] = demuxedReport;
                break;
            case "INBOUND_AUDIO_TRACK":
                output[6] = demuxedReport;
                break;
            case "INBOUND_VIDEO_TRACK":
                output[7] = demuxedReport;
                break;
            case "OUTBOUND_AUDIO_TRACK":
                output[8] = demuxedReport;
                break;    
            case "OUTBOUND_VIDEO_TRACK":
                output[9] = demuxedReport;
                break;
            case "SFU_EVENT":
                output[10] = demuxedReport;
                break;
            case "SFU_META_DATA":
                output[11] = demuxedReport;
                break;
            case "SFU_TRANSPORT":
                output[12] = demuxedReport;
                break;
            case "SFU_RTP_SOURCE_STREAM":
                output[13] = demuxedReport;
                break;
            case "SFU_RTP_SINK_STREAM":
                output[14] = demuxedReport;
                break;
            case "SFU_SCTP_STREAM":
                output[15] = demuxedReport;
                break;
            default:
                output[16] = demuxedReport;
                break;
        }
        return output;
    }
}

const makeTransformer = reportSource => {
    if (reportSource === "kafka") {
        return msg => {
            const payload = msg.payload ? msg.payload.value : null;
            return {
                payload: payload ? JSON.parse(payload) : null,
            };
        }
    }
    console.warn("Unknown report source", reportSource);
    return msg => msg;
}

module.exports = function(RED) {
    function ReportDemuxerBuilder(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        const demuxer = new ReportDemuxer();
        const transform = makeTransformer(config.reportSource || "kafka");
        // const flowContext = node.context().flow;
        node.on('input', (msg) => {
            const message = transform(msg);
            const result = demuxer.process(message);
            if (result) {
                node.send(result);
            }
        });
        
    }
    RED.nodes.registerType("report-demuxer", ReportDemuxerBuilder);
}