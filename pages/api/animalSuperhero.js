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

  return `Suggest three names for an animal that is a superhero.
Prompt: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Prompt: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Prompt: ${Prompt}
Names:`;
}
