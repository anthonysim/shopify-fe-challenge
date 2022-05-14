import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {
  const completion = await openai.createCompletion("text-curie-001", {
    prompt: generatePrompt(req.body.prompt),
    temperature: 0.6,
  });

  const result = completion.data.choices[0].text;
  res.status(200).json({ result: result });
}

function generatePrompt(prompt) {
  const Prompt = prompt[0].toUpperCase() + prompt.slice(1).toLowerCase();

  return `Provide an answer to the question that was asked.
Prompt: How is the weather today?
Names: 75 degrees sunny with a light breeze
Prompt: What is the color of the sky?
Names: blue
Prompt: ${Prompt}
Names:`;
}
