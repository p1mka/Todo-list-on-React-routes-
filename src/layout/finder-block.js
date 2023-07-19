import styles from "../styles/Finder-block.module.css";

export const FinderLayout = ({ finderValue, setFinderValue }) => (
  <div className={styles.finderBlock}>
    <input
      id="searchTodo"
      type="search"
      placeholder="🔍"
      value={finderValue}
      onChange={({ target }) => {
        setFinderValue(target.value);
      }}
    />
  </div>
);
