import styles from "../styles/Todos-list.module.css";
import { useRequestEditTodoDescription } from "../hooks";
import { Link, Outlet } from "react-router-dom";
import { byField } from "../components/features/byField";

export const TodosList = ({
  sortIsEnabled,
  filteredItems,
  isUpdate,
  setIsUpdate,
  setShowTodoWindow,
}) => {
  const requestEditTodoDescription = useRequestEditTodoDescription();

  const sortedTodos = sortIsEnabled
    ? filteredItems.sort(byField("description"))
    : filteredItems;

  return (
    <div className={styles.container}>
      <div className={styles.todoContainer}>
        {sortedTodos.map(({ id, description, isNowCreate }) => (
          <div className={styles.todoCard} key={id}>
            {isNowCreate ? (
              <div>
                <input
                  className={styles.addInput}
                  type="text"
                  defaultValue={description}
                  placeholder="Описание задачи"
                  onBlur={({ target }) => {
                    requestEditTodoDescription(id, target.value);
                    setIsUpdate(!isUpdate);
                  }}
                />
                <button type="submit">✅</button>
              </div>
            ) : (
              <label key={id}>
                <Link
                  to={`/task/${id}`}
                  onClick={() => setShowTodoWindow(true)}
                >
                  {!description ? "Пустая задача" : description}
                </Link>
              </label>
            )}
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
};
