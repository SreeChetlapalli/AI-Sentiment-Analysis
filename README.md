# AI Sentiment Analysis Tool

This is a command-line tool built with TypeScript that uses the Hugging Face Inference API to analyze the emotional sentiment of user-provided text. It then generates a bar chart visualizing the emotional breakdown.

## What it does

This tool takes any text you give it and breaks down the emotional content across seven categories: anger, disgust, fear, joy, neutral, sadness, and surprise. It uses a pre-trained AI model from Hugging Face to analyze the sentiment and generates a nice bar chart showing the results.

Before you begin, ensure you have the following installed on your system:
* [Node.js](https://nodejs.org/) (which includes npm)

## Getting started

### What you'll need

- Node.js installed on your computer
- A free Hugging Face account and API key

### Setup

1. **Get the code:**
   ```bash
   git clone <your-repository-url>
   cd ai-sentiment-analysis
   ```

2. **Install the required packages:**
   ```bash
   npm install
   ```

3. **Get your Hugging Face API key:**
   - Go to [huggingface.co](https://huggingface.co) and create a free account
   - Go to your profile settings and create a new API token
   - Create a `.env` file in the project folder and add:
     ```
     HUGGINGFACE_API_KEY=your_actual_api_key_here
     ```

### Running the tool

1. **Compile the TypeScript code:**
   ```bash
   npx tsc
   ```

2. **Start the analysis:**
   ```bash
   node dist/index.js
   ```

3. **Type some text when prompted!** The tool will analyze each sentence and show you the emotional breakdown with colored output. It'll also generate a chart URL you can open in your browser.

Type `exit` when you're done.

## How it works

The tool uses the `j-hartmann/emotion-english-distilroberta-base` model from Hugging Face, which is specifically trained to detect emotions in English text. It processes your input sentence by sentence and gives each one a confidence score for different emotions.

The results are displayed with color-coded output in your terminal, and you get a shareable chart showing the emotional breakdown visually.

## Built with

- **TypeScript** - For type safety and better development experience
- **Hugging Face Inference API** - For the AI emotion analysis
- **Chalk** - For pretty colored terminal output
- **QuickChart** - For generating the visualization charts
- **Express** - For potential web interface (server.ts)

## Example output

When you run the tool and enter text like "I'm so excited about this new project!", you'll see something like:

```
Analyzing: "I'm so excited about this new project!"
 -> Label: joy, Score: 85.23%
 -> Label: surprise, Score: 12.45%
 -> Label: neutral, Score: 2.32%
```

