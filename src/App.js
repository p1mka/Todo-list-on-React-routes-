import styles from "./styles/App.module.css";
import { TodosList, TodoWindow, NavBar, ErrorPage } from "./components";
import { useState } from "react";
import { useRequestGetTodo } from "./hooks";
import { Route, Routes, Navigate } from "react-router-dom";

const App = () => {
  const [todosList, setTodosList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [finderValue, setFinderValue] = useState("");
  const [showTodoWindow, setShowTodoWindow] = useState(false);
  const [sortIsEnabled, setSortIsEnabled] = useState(false);

  useRequestGetTodo(setIsLoading, setTodosList, setIsUpdate, isUpdate);
  const finder = (finderValue) => {
    return todosList.filter((value) =>
      value.description.toLowerCase().includes(finderValue.toLowerCase())
    );
  };
  const filteredItems = finderValue ? finder(finderValue) : todosList;

  return isLoading ? (
    <div className={styles.loader}></div>
  ) : (
    <div className={styles.container}>
      <div className={styles.navBar}>
        <NavBar
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          todosList={todosList}
          finderValue={finderValue}
          setFinderValue={setFinderValue}
          filteredItems={filteredItems}
          sortIsEnabled={sortIsEnabled}
          setSortIsEnabled={setSortIsEnabled}
        />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <TodosList
              todosList={todosList}
              filteredItems={filteredItems}
              isUpdate={isUpdate}
              setIsUpdate={setIsUpdate}
              setShowTodoWindow={setShowTodoWindow}
              sortIsEnabled={sortIsEnabled}
            />
          }
        >
          <Route
            path="/task/:id"
            element={
              <TodoWindow
                isUpdate={isUpdate}
                setIsUpdate={setIsUpdate}
                showTodoWindow={showTodoWindow}
                setShowTodoWindow={setShowTodoWindow}
              />
            }
          />
        </Route>
        <Route path="/404" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
};

export default App;
