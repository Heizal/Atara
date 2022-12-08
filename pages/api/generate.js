// this is where we'll write our backend code to call our API

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Add our base prompt here - this makes the AI more accurate in what to output to the user
const basePromptPrefix = 
`
Answer my climate related question in Paul Graham style. Please make sure the answer is not too scientific, well researched and is applicable to my question.
`
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 500,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  // // build prompt two
  // const secondPrompt =
  // `
  // Get the answer of my climate related question and provide further resources to further explore my area of questioning.

  // Question: ${req.body.userInput}

  // Answer: ${basePromptOutput.text}

  // Further reading:
  // `
  // // I call the OpenAI API a second time with Prompt #2
  // const secondPromptCompletion = await openai.createCompletion({
  //   model: 'text-davinci-003',
  //   prompt: `${secondPrompt}`,
  //   // I set a higher temperature for this one. Up to you!
  //   temperature: 0.85,
	// 	// I also increase max_tokens.
  //   max_tokens: 1250,
  // });

  // // Get the output
  // const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;