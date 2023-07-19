import { useNavigate } from "react-router-dom";

export const useRequestDeleteTodo = () => {
  const navigate = useNavigate();
  const requestDeleteTodo = (id, description, isUpdate, setIsUpdate) => {
    let answer = window.confirm(`Удалить задачу ${description}?`);
    if (answer) {
      fetch(`http://localhost:3005/todos/${id}`, {
        method: "DELETE",
      })
        .then(() => navigate("/"))
        .then(() => setIsUpdate(!isUpdate));
    } else {
      return null;
    }
  };
  return requestDeleteTodo;
};
