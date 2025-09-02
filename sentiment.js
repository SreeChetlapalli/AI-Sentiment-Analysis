"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const inference_1 = require("@huggingface/inference");
const hf = new inference_1.HuggingFaceInference({
    accessToken: process.env.HUGGINGFACE_API_KEY,
});
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