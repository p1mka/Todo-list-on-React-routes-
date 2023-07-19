export const useRequestAddTodo = () => {
  const createTodo = () => {
    requestAddTodo();
  };
  const requestAddTodo = () => {
    fetch("http://localhost:3005/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        id: "",
        description: "",
        isNowCreate: true,
      }),
    });
  };

  return createTodo;
};
