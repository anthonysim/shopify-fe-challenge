import { useState, useEffect } from 'react';
import Responses from './components/Responses';
import styles from '../styles/index.module.scss';
import { getData } from './utils/getData';

export default function Home() {
  const initialValues = {
    prompt: "",
    history: [],
    apiSelected: 0,
  };

  const [state, setState] = useState(initialValues);

  // useEffect(() => {
  //   getData().then(res => res.data)
  //     .then(data => {
  //       setState({ ...state, history: [data] })
  //     })
  //     .catch(err => console.error(err));
  //   // eslint-disable-next-line
  // }, []);

  const apiSelection = (e) => {
    const selection = document.querySelector('.selection');
    setState({ ...state, apiSelected: selection.value });
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

    if (state.apiSelected === 0) {
      alert('Select from dropdown!');
      return;
    }

    try {
      const response = await fetch(`/api/${state.apiSelected}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: state.prompt }),
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
      <h1 className={styles.app__title}>Shopify OpenAI Frontend Challenge</h1>

      {/* api selector */}
      <h2>Please make a selection below:</h2>
      <div >
        <select className="selection" onChange={apiSelection}>
          <option value="0">Select API:</option>
          <option value="animalSuperhero">Animal Super Heroes</option>
          <option value="fixSpelling">Fix Spelling</option>
          <option value="answerQuestion">Answer Your Question</option>
        </select>
      </div >

      {/* prompt box */}
      <textarea
        value={state.prompt}
        onChange={handleInputChange}
        className={styles.app__prompt}
        name="prompt"
        label="Prompt"
        rows="10"
        cols="70"
        placeholder="Please enter a prompt...">
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
