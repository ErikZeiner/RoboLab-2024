import {GoogleGenerativeAI} from "@google/generative-ai";
const wordWrap = (str, max, br = '\n') => str.replace(
  new RegExp(`(?![^\\n]{1,${max}}$)([^\\n]{1,${max}})\\s`, 'g'), `$1${br}`
);
    // Fetch your API_KEY
    const API_KEY = "AIzaSyB1eqX5raYM4CmkVP044nkU6Dp9KqDIALM";
    // Reminder: This should only be for local testing

    // Access your API key (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(API_KEY);

    // ...

    // The Gemini 1.5 models are versatile and work with most use cases
    const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

    async function sendRequest(prompt) {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    }

    document.getElementById('userQueryBtn').onclick = async () => {
        const prompt = document.getElementById('userQuery').value;
        document.getElementById('aiHelperWindow').innerHTML = await sendRequest(prompt);
    }