"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const inference_1 = require("@huggingface/inference"); // ✅ this works if esModuleInterop is true
const hf = new inference_1.InferenceClient(process.env.HUGGINGFACE_API_KEY);
dotenv_1.default.config();
console.log("Loaded key:", process.env.HUGGINGFACE_API_KEY?.slice(0, 10) + "...");
async function analyzeSentiment(text) {
    const result = await hf.textClassification({
        model: 'distilbert-base-uncased-finetuned-sst-2-english',
        inputs: text,
    });
    result.forEach(element => {
        console.log(`The label is "${element.label}" and the score is "${element.score}"`);
    });
}
async function main() {
    await analyzeSentiment("I am so excited to be learning TypeScript! This is a fantastic experience.");
}
main();
//# sourceMappingURL=sentiment.js.map