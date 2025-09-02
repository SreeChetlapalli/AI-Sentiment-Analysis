"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const inference_1 = require("@huggingface/inference");
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const chalk_1 = __importDefault(require("chalk"));
const quickchart_js_1 = __importDefault(require("quickchart-js"));
dotenv.config();
const hf = new inference_1.InferenceClient(process.env.HUGGINGFACE_API_KEY);
console.log("Loaded key:", process.env.HUGGINGFACE_API_KEY?.slice(0, 10) + "...");
async function analyzeSentiment(text) {
    const result = await hf.textClassification({
        model: 'j-hartmann/emotion-english-distilroberta-base',
        inputs: text,
    });
    return result;
}
const emotionOrder = ['anger', 'disgust', 'fear', 'joy', 'neutral', 'sadness', 'surprise'];
async function main() {
    const prompt = (0, prompt_sync_1.default)();
    while (true) {
        const userText = prompt("Enter text to analyze (or 'exit' to quit): ");
        if (!userText || userText.toLowerCase() === 'exit') {
            break;
        }
        const sentences = userText.split(/[.?!]/);
        const sentimentData = [];
        for (const sentence of sentences) {
            if (sentence.trim().length > 0) {
                const cleanSentence = sentence.trim();
                console.log(`\nAnalyzing: "${cleanSentence}"`);
                try {
                    const result = await analyzeSentiment(cleanSentence);
                    const sortedResults = emotionOrder.map(emotionName => {
                        return result.find((x) => x.label === emotionName);
                    });
                    sortedResults.forEach((element) => {
                        if (element) {
                            sentimentData.push({ label: element.label, score: element.score });
                            const score = (element.score * 100).toFixed(2) + "%";
                            if (element.label === 'anger') {
                                console.log(` -> Label: ${chalk_1.default.red(element.label)}, Score: ${score}`);
                            }
                            else if (element.label === 'neutral') {
                                console.log(` -> Label: ${chalk_1.default.grey(element.label)}, Score: ${score}`);
                            }
                            else if (element.label === 'sadness') {
                                console.log(` -> Label: ${chalk_1.default.blue(element.label)}, Score: ${score}`);
                            }
                            else if (element.label === 'disgust') {
                                console.log(` -> Label: ${chalk_1.default.green(element.label)}, Score: ${score}`);
                            }
                            else if (element.label === 'joy') {
                                console.log(` -> Label: ${chalk_1.default.yellow(element.label)}, Score: ${score}`);
                            }
                            else if (element.label === 'fear') {
                                console.log(` -> Label: ${chalk_1.default.rgb(140, 0, 255)(element.label)}, Score: ${score}`);
                            }
                            else {
                                console.log(` -> Label: ${chalk_1.default.rgb(255, 111, 0)(element.label)}, Score: ${score}`);
                            }
                        }
                        else {
                            console.log(chalk_1.default.dim(" -> Skipped missing emotion from model output"));
                        }
                    });
                }
                catch (error) {
                    console.error(chalk_1.default.red("Error analyzing sentiment:"), error);
                }
            }
        }
        if (sentimentData.length > 0) {
            const chart = new quickchart_js_1.default();
            chart.setConfig({
                type: 'bar',
                data: {
                    labels: sentimentData.map(item => item.label),
                    datasets: [{
                            label: 'Sentiment Score',
                            data: sentimentData.map(item => item.score),
                            backgroundColor: sentimentData.map(item => {
                                switch (item.label) {
                                    case 'anger': return 'rgba(255, 0, 0, 0.6)';
                                    case 'neutral': return 'rgba(128, 128, 128, 0.6)';
                                    case 'sadness': return 'rgba(0, 0, 255, 0.6)';
                                    case 'disgust': return 'rgba(0, 128, 0, 0.6)';
                                    case 'fear': return 'rgba(128, 0, 128, 0.6)';
                                    case 'joy': return 'rgba(255, 242, 0, 1)';
                                    case 'surprise': return 'rgba(255, 183, 0, 1)';
                                    default: return 'rgba(200, 200, 200, 0.6)';
                                }
                            })
                        }]
                }
            });
            const chartUrl = await chart.getShortUrl();
            console.log(chalk_1.default.blue(`\nBar chart of sentiment scores: ${chartUrl}`));
        }
    }
}
main().then(() => {
    console.log("Goodbye!");
});
//# sourceMappingURL=sentiment.js.map