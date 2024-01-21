import OpenAI from "openai";
import { OPENAI_API_KEY } from "./environment-variables.js";
import { setTimeout } from "timers/promises";
import readline from 'readline';
// Create an instance of the OpenAI class
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// Assistant CLass
export class Assistant {
  constructor(topic, data) {
    this.topic = topic;
    this.data = data;
  }
  async initialize() {
    //Create an assistant
    this.myAssistant = await openai.beta.assistants.create({
      instructions:
        "You are a personal " + this.topic +" tutor. When asked a question, answer it with your own data or use the following data, if present. " + this.data + "Answer in plain text without formatting.",
      name: this.topic + " Tutor",

      tools: [{ type: "code_interpreter" }],
      model: "gpt-3.5-turbo-1106",
    });
    // Create a thread
    this.thread = await openai.beta.threads.create();
  }
  async sendMessage(message) {
    // Create a message
    await openai.beta.threads.messages.create(
      this.thread.id,
      {
        role: "user",
        content: message
      }
    );
  }
  async getResponse() {
    // Run the assistant
    const run = await openai.beta.threads.runs.create(
      this.thread.id,
      {
        assistant_id: this.myAssistant.id
      }
    );
    // Get information about the run
    let retrievedRun = await openai.beta.threads.runs.retrieve(
      this.thread.id,
      run.id
    );
    // Wait for the assistant's response to be completeted
    while (retrievedRun.status != "completed") {
      await setTimeout(1000); // Wait for 1 second before checking the status again
      retrievedRun = await openai.beta.threads.runs.retrieve(this.thread.id, run.id);
    }
    // Get the list of messages
    const messages = await openai.beta.threads.messages.list(
      this.thread.id
    );
    return (messages.data[0].content[0].text.value); // Return the assistant's response
  }

  async sendMessageAndGetResponse(message) {
    await this.sendMessage(message);
    return await this.getResponse();
  }
}



// // Create a stream to read from the console ---
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
// // Gets user input from the console ---
// async function getUserInput() {
//   return new Promise((resolve) => {
//     rl.question('Please enter some input: ', (userInput) => {
//       resolve(userInput);
//     });
//   });
// }

// async function main() {
//   // Create an assistant
//   const myAssistant = await openai.beta.assistants.create({
//     instructions:
//       "You are a personal math tutor. When asked a question, write an answer the question.",
//     name: "Math Tutor",
//     tools: [{ type: "code_interpreter" }],
//     model: "gpt-3.5-turbo-1106",
//   });
//   // Create a thread
//   const thread = await openai.beta.threads.create();


//   // Get user input
//   let userInput = await getUserInput();

//   // Wait for the user to type "quit"
//   while (userInput != "quit") {
//     // Create a message
//     await openai.beta.threads.messages.create(
//       thread.id,
//       {
//         role: "user",
//         content: userInput
//       }
//     );
//     // Run the assistant
//     const run = await openai.beta.threads.runs.create(
//       thread.id,
//       {
//         assistant_id: myAssistant.id
//       }
//     );
//     // Get information about the run
//     let retrievedRun = await openai.beta.threads.runs.retrieve(
//       thread.id,
//       run.id
//     );
//     // Wait for the assistant's response
//     while (retrievedRun.status != "completed") {
//       await setTimeout(1000); // Wait for 1 second before checking the status again
//       retrievedRun = await openai.beta.threads.runs.retrieve(thread.id, run.id);
//     }
//     // Get the list of messages
//     const messages = await openai.beta.threads.messages.list(
//       thread.id
//     );
//     console.log((messages.data[0].content[0].text.value)); // Print the assistant's response

//     userInput = await getUserInput();
//   }
//   // Close the stream ---
//   rl.close();
// }

// main();



// Class test
// async function mainTest() {
//   const topic = "algorithms";
//   const data = ""
//   const assistant = new Assistant(topic, data);
//   await assistant.initialize();
//   await assistant.sendMessage("What is the complexity of binary search?");
//   console.log(await assistant.getResponse());
// }

// mainTest();