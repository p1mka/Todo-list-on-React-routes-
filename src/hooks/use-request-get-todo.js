import { useEffect } from "react";

export const useRequestGetTodo = (
  setIsLoading,
  setTodosList,
  setIsUpdate,
  isUpdate
) => {
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3005/todos")
      .then((loadedData) => loadedData.json())
      .then((loadedTodos) => {
        setTodosList(loadedTodos);
      })
      .finally(() => {
        setIsUpdate(true);
        setIsLoading(false);
      });
  }, [isUpdate]);
};
