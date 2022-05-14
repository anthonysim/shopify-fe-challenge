import styles from "../../styles/responses.module.scss";

function Responses({ data }) {

  return (
    <div className={styles.response}>
      {data?.map((res, i) => {
        return <div key={i} className={styles.response__data}>
          <p>
            <strong>Prompt: </strong>
            {res.prompt}
          </p>
          <p>
            <strong>Response: </strong>
            {res.response}
          </p>
        </div>
      })}
    </div>
  );
}

export default Responses;
