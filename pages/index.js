import { useState, useEffect } from 'react';
import Responses from './components/Responses';
import styles from '../styles/index.module.scss';

export default function Home() {
  const initialValues = {
    prompt: "",
    history: [],
    engine: 0,
  };

  const [state, setState] = useState(initialValues);

  const engineSelection = (e) => {
    const selection = document.querySelector('.selection');
    setState({ ...state, engine: selection.value });
    console.log(selection.value);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (state.engine === 0) {
      alert('Select from dropdown!');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/openAPI', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: state.prompt, engine: state.engine }),
      });
      const openAPIResponse = await response.json();

      const data = [{
        prompt: state.prompt,
        response: openAPIResponse.result,
      }];

      setState({ prompt: '', history: data.concat(state.history) });

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={styles.app}>

      {/* title */}
      <h1 className={styles.app__title}>OpenAI Frontend Challenge</h1>

      {/* api selector */}
      <h2>Please select an engine:</h2>
      <div >
        <select className="selection" onChange={engineSelection}>
          <option value="0">Select Engine:</option>

          <option value="text-curie-001">text-curie-001</option>
          <option value="text-babbage-001">text-babbage-001</option>
          <option value="text-ada-001	">text-ada-001</option>
        </select>
      </div >

      {/* prompt box */}
      <textarea
        value={state.prompt}
        onChange={handleInputChange}
        className={styles.app__prompt}
        name="prompt"
        label="Prompt"
        rows="8"
        cols="65"
        placeholder="Please enter a prompt...ex.'What is the capital of California?'">
      </textarea>
      <br />

      {/* submit button */}
      <button
        onClick={submitHandler}
        className={styles.app__btn}>Submit</button>

      <h2 className={styles.app__responseTitle}>Responses</h2>
      <br />
      {state.history.length > 0 && <Responses data={state.history} />}
    </div>
  );
}
