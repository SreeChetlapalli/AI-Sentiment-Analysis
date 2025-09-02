"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var inference_1 = require("@huggingface/inference");
var prompt_sync_1 = require("prompt-sync");
var chalk_1 = require("chalk");
var quickchart_js_1 = require("quickchart-js");
dotenv.config();
var hf = new inference_1.InferenceClient(process.env.HUGGINGFACE_API_KEY);
console.log("Loaded key:", ((_a = process.env.HUGGINGFACE_API_KEY) === null || _a === void 0 ? void 0 : _a.slice(0, 10)) + "...");
function analyzeSentiment(text) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hf.textClassification({
                        model: 'distilbert-base-uncased-finetuned-sst-2-english',
                        inputs: text,
                    })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var prompt, _loop_1, state_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    prompt = (0, prompt_sync_1.default)();
                    _loop_1 = function () {
                        var userText, sentences, sentimentData, _i, sentences_1, sentence, cleanSentence, result, error_1, chart, chartUrl;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    userText = prompt("Enter text to analyze (or 'exit' to quit): ");
                                    if (!userText || userText.toLowerCase() === 'exit') {
                                        return [2 /*return*/, "break"];
                                    }
                                    sentences = userText.split(/[.?!]/);
                                    sentimentData = [];
                                    _i = 0, sentences_1 = sentences;
                                    _b.label = 1;
                                case 1:
                                    if (!(_i < sentences_1.length)) return [3 /*break*/, 6];
                                    sentence = sentences_1[_i];
                                    if (!(sentence.trim().length > 0)) return [3 /*break*/, 5];
                                    cleanSentence = sentence.trim();
                                    console.log("\nAnalyzing: \"".concat(cleanSentence, "\""));
                                    _b.label = 2;
                                case 2:
                                    _b.trys.push([2, 4, , 5]);
                                    return [4 /*yield*/, analyzeSentiment(cleanSentence)];
                                case 3:
                                    result = _b.sent();
                                    result.forEach(function (element) {
                                        sentimentData.push({ label: element.label, score: element.score });
                                        var score = (element.score * 100).toFixed(2) + "%";
                                        if (element.label === 'POSITIVE') {
                                            console.log(" -> Label: ".concat(chalk_1.default.green(element.label), ", Score: ").concat(score));
                                        }
                                        else {
                                            console.log(" -> Label: ".concat(chalk_1.default.red(element.label), ", Score: ").concat(score));
                                        }
                                    });
                                    return [3 /*break*/, 5];
                                case 4:
                                    error_1 = _b.sent();
                                    console.error(chalk_1.default.red("Error analyzing sentiment:"), error_1);
                                    return [3 /*break*/, 5];
                                case 5:
                                    _i++;
                                    return [3 /*break*/, 1];
                                case 6:
                                    if (!(sentimentData.length > 0)) return [3 /*break*/, 8];
                                    chart = new quickchart_js_1.default();
                                    chart.setConfig({
                                        type: 'bar',
                                        data: {
                                            labels: sentimentData.map(function (item) { return item.label; }),
                                            datasets: [{
                                                    label: 'Sentiment Score',
                                                    data: sentimentData.map(function (item) { return item.score; }),
                                                    backgroundColor: sentimentData.map(function (item) { return item.label === 'POSITIVE' ? 'green' : 'red'; })
                                                }]
                                        }
                                    });
                                    return [4 /*yield*/, chart.getShortUrl()];
                                case 7:
                                    chartUrl = _b.sent();
                                    console.log(chalk_1.default.blue("\nBar chart of sentiment scores: ".concat(chartUrl)));
                                    _b.label = 8;
                                case 8: return [2 /*return*/];
                            }
                        });
                    };
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 3];
                    return [5 /*yield**/, _loop_1()];
                case 2:
                    state_1 = _a.sent();
                    if (state_1 === "break")
                        return [3 /*break*/, 3];
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    });
}
main().then(function () {
    console.log("Goodbye!");
});
