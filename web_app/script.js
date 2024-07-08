import {GoogleGenerativeAI} from "@google/generative-ai";

    // Fetch your API_KEY
    const API_KEY = "AIzaSyB1eqX5raYM4CmkVP044nkU6Dp9KqDIALM";

    // Access your API key (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(API_KEY);

    // The Gemini 1.5 models are versatile and work with most use cases
    const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

    async function sendRequest(prompt) {
        try {
            console.log("prompt" + prompt);
            const result = await model.generateContent(prompt);
            const response = await result.response;
            console.log("response" + response.text());
            const text = response.text();
            return text;
        }
        catch(e){
            document.getElementById('aiHelperWindow').value = "Sorry, I can't help you with that.";
        }
    }

        function testCode(text){
        console.log(text);
        var regex = /(move(Right|Left|Up|Down|)\(([0-9]{1,2})\)\n?)+/;
        return regex.test(text);

    }

    document.getElementById('userQueryBtn').onclick = async () => {
        document.getElementById('aiHelperWindow').value = "Hmm, let me think...";
        document.getElementById('aiHelperWindow').value = await sendRequest(document.getElementById('userQuery').value);
    }
    document.getElementById('runBtn').onclick = async () => {
        if (testCode(document.getElementById('userCode').value)){
            console.log("regex ok");
        } else {
            document.getElementById('aiHelperWindow').value = "Your code is not correct.";
            document.getElementById('aiHelperWindow').value = await sendRequest("help");
        }
    }





    window.addEventListener('load', function() {
        document.getElementById('aiHelperWindow').value = "Hi, name is ... and I am here to help you!";
})
