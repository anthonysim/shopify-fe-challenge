// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {
  try {
    res.json({ prompt: 'prompts from mongo', response: 'responses from mongo' });

  } catch (err) {
    console.error(err);
  }
};