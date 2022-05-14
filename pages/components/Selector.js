import styles from "../../styles/selector.module.scss";

function Selector() {
  return (
    <div className="selector">
      <select>
        <option value="0">Select API:</option>
        <option value="1">Animal Super Heroes</option>
        <option value="2">Fix Spelling</option>
        <option value="3">Answer Your Question</option>
      </select>
    </div >
  );
}

export default Selector;
