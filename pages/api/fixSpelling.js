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

  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(prompt) {
  const Prompt = prompt[0].toUpperCase() + prompt.slice(1).toLowerCase();

  return `Fix the spelling of the prompt.
Prompt: Tody I wnt to bed.
Names: Today I went to bed.
Prompt: Wheeer is the restauuurnt?
Names: Where is the restaurant?
Prompt: ${Prompt}
Names:`;
}
