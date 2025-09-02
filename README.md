# Emotion Analysis CLI Tool 📊

This is a command-line tool built with TypeScript that uses the Hugging Face Inference API to analyze the emotional sentiment of user-provided text. It then generates a bar chart visualizing the emotional breakdown.

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:
* [Node.js](https://nodejs.org/) (which includes npm)

---

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <your-project-directory>
    ```

2.  **Install dependencies:**
    This project uses several npm packages which are listed in the `package.json` file. Install them by running:
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env` in the root of the project and add your Hugging Face API key:
    ```
    HUGGINGFACE_API_KEY="hf_YourApiKeyHere"
    ```

---

## Usage

1.  **Compile TypeScript:**
    ```bash
    npx tsc
    ```

2.  **Run the application:**
    ```bash
    node dist/index.js
    ```
    The program will then prompt you to enter text for analysis.

---

## Key Dependencies

This project relies on the following packages:

* `@huggingface/inference`: To connect to the Hugging Face API.
* `chalk`: For styling the console output with colors.
* `dotenv`: For managing environment variables (like your API key).
* `prompt-sync`: To receive user input in the command line.
* `quickchart-js`: To generate the chart images.