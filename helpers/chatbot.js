import OpenAI from "openai";
import {OPENAI_API_KEY} from "./environment-variables.js";

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

async function main() {
    const myAssistant = await openai.beta.assistants.create({
      instructions:
        "You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
      name: "Math Tutor",
      tools: [{ type: "code_interpreter" }],
      model: "gpt-3.5-turbo-1106",
    });
    console.log(myAssistant);
}

main();