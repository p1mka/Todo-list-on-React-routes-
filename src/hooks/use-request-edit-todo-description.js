export const useRequestEditTodoDescription = () => {
  const requestEditTodoDescription = (id, description) => {
    fetch(`http://localhost:3005/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        description: description,
        isNowCreate: false,
      }),
    });
  };
  return requestEditTodoDescription;
};
