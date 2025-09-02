import * as dotenv from "dotenv";
import { InferenceClient } from "@huggingface/inference";
import promptSync from 'prompt-sync';
import chalk from 'chalk';
import QuickChart from 'quickchart-js';

dotenv.config();
const hf = new InferenceClient(process.env.HUGGINGFACE_API_KEY);

console.log("Loaded key:", process.env.HUGGINGFACE_API_KEY?.slice(0, 10) + "...");

interface SentimentResult {
    label: string;
    score: number;
}

async function analyzeSentiment(text: string): Promise<any> {
    const result = await hf.textClassification({
        model: 'j-hartmann/emotion-english-distilroberta-base',
        inputs: text,
    });
    return result;
}
const emotionOrder = ['anger', 'disgust', 'fear', 'joy', 'neutral', 'sadness', 'surprise'];
async function main() {
    const prompt = promptSync();

    while (true) {
        const userText = prompt("Enter text to analyze (or 'exit' to quit): ");

        if (!userText || userText.toLowerCase() === 'exit') {
            break;
        }

        const sentences = userText.split(/[.?!]/);

        const sentimentData: SentimentResult[] = [];

        for (const sentence of sentences) {
            if (sentence.trim().length > 0) {
                const cleanSentence = sentence.trim();
                console.log(`\nAnalyzing: "${cleanSentence}"`);

                try {
                    const result = await analyzeSentiment(cleanSentence);
                    const sortedResults = emotionOrder.map(emotionName => {
                        return result.find((x: SentimentResult) => x.label === emotionName);
                    });
                    sortedResults.forEach((element: SentimentResult | undefined) => {
                        if (element) {
                            sentimentData.push({ label: element.label, score: element.score });

                            const score = (element.score * 100).toFixed(2) + "%";
                            if (element.label === 'anger') {
                                console.log(` -> Label: ${chalk.red(element.label)}, Score: ${score}`);
                            } else if (element.label === 'neutral') {
                                console.log(` -> Label: ${chalk.grey(element.label)}, Score: ${score}`);
                            } else if (element.label === 'sadness') {
                                console.log(` -> Label: ${chalk.blue(element.label)}, Score: ${score}`);
                            } else if (element.label === 'disgust') {
                                console.log(` -> Label: ${chalk.green(element.label)}, Score: ${score}`);
                            } else if (element.label === 'joy') {
                                console.log(` -> Label: ${chalk.yellow(element.label)}, Score: ${score}`);
                            } else if (element.label === 'fear') {
                                console.log(` -> Label: ${chalk.rgb(140, 0, 255,)(element.label)}, Score: ${score}`);
                            } else {
                                console.log(` -> Label: ${chalk.rgb(255, 111, 0,)(element.label)}, Score: ${score}`);
                            }
                        } else {
                            console.log(chalk.dim(" -> Skipped missing emotion from model output"));
                        }
                    });


                } catch (error) {
                    console.error(chalk.red("Error analyzing sentiment:"), error);
                }
            }
        }

        if (sentimentData.length > 0) {
            const chart = new QuickChart();
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
            console.log(chalk.blue(`\nBar chart of sentiment scores: ${chartUrl}`));
        }
    }
}

main().then(() => {
    console.log("Goodbye!");
});