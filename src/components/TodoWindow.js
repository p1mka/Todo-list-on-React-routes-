import styles from "../styles/Todo-window.module.css";
import { useRequestDeleteTodo, useRequestEditTodoDescription } from "../hooks";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { ErrorPage } from "../components";

export const TodoWindow = ({ isUpdate, setIsUpdate, showTodoWindow }) => {
  const [todo, setTodo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTodoDescription, setNewTodoDescription] = useState(todo);

  const params = useParams();
  const navigate = useNavigate();
  const editButtonRef = useRef(null);
  const requestDeleteTodo = useRequestDeleteTodo();
  const requestEditTodoDescription = useRequestEditTodoDescription();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`http://localhost:3005/todos/${params.id}`);
      const json = await data.json();
      return json;
    };
    fetchData().then((json) => {
      setTodo(json);
    });
  }, [params.id]);

  if (!todo?.id) {
    return (
      <ErrorPage
        error={
          <div>
            Такой задачи не существует! Вы можете вернуться{" "}
            <button onClick={() => navigate(-1)}>назад</button>
          </div>
        }
      />
    );
  } else {
    return showTodoWindow ? (
      <div className={styles.container}>
        <div className={styles.todoWindowHeader}>
          <div className={styles.descriptionNavButtons}>
            <button onClick={() => navigate(-1)}>↩</button>
            <button
              onClick={() => {
                requestDeleteTodo(
                  params.id,
                  todo.description,
                  isUpdate,
                  setIsUpdate
                );
              }}
            >
              🗑
            </button>
            {isEditing ? (
              <button
                className={styles.editButton}
                onClick={() => {
                  editButtonRef.current.focus();
                  setIsEditing(false);
                  newTodoDescription
                    ? requestEditTodoDescription(params.id, newTodoDescription)
                    : requestEditTodoDescription(params.id, todo.description);
                  setIsUpdate(!isUpdate);
                }}
              >
                ✅
              </button>
            ) : (
              <button
                className={styles.editButton}
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                🖊
              </button>
            )}
          </div>
          <h3>Описание задачи</h3>
        </div>
        {isEditing ? (
          <input
            className={styles.todoWindowDescription}
            ref={editButtonRef}
            defaultValue={todo.description}
            onChange={({ target }) => setNewTodoDescription(target.value)}
          />
        ) : (
          <div
            className={styles.todoWindowDescription}
            onClick={() => setIsEditing(true)}
          >
            {todo.description
              ? todo.description
              : "Здесь должен быть текст задачи..."}
          </div>
        )}
      </div>
    ) : null;
  }
};
