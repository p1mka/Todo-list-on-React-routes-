import styles from "../styles/NavBar.module.css";
import { FinderLayout } from "../layout";
import { useRequestAddTodo } from "../hooks";

export const NavBar = ({
  isUpdate,
  setIsUpdate,
  finderValue,
  setFinderValue,
  filteredItems,
  sortIsEnabled,
  setSortIsEnabled,
}) => {
  const createTodo = useRequestAddTodo();
  const onCreateTodo = () => {
    createTodo();
    setIsUpdate(!isUpdate);
  };

  return (
    <div>
      <div className={styles.navBar}>
        <h3>TODO List</h3>
        <button onClick={onCreateTodo}>Создать новую задачу</button>
        <button
          className={styles.sortButton}
          onClick={() => {
            setSortIsEnabled(!sortIsEnabled);
            setIsUpdate(!isUpdate);
          }}
        >
          {!sortIsEnabled
            ? `Сортировать по алфавиту`
            : `Сортировать по порядку`}
        </button>

        <FinderLayout
          finderValue={finderValue}
          setFinderValue={setFinderValue}
        />
      </div>
    </div>
  );
};
