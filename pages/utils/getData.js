import axios from 'axios';

export const getData = async () => {
  try {
    const res = await axios.get('../api/getData');
    return res;

  } catch (err) {
    console.error(err);
  }
}