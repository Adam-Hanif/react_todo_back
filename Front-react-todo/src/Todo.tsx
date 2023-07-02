import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { deleteTodo, favoriteTodo } from "./features/todosSlice";
import { AppDispatch, RootState } from "./app/store";

const Todo = ({ id, text, favorite, todoLoading }) => {
  const loading = useSelector((state: RootState) => state.todoReducer.loading);

  const dispatch = useDispatch() as AppDispatch;
  const handleSetCompleted = () => {

    dispatch(favoriteTodo({ id, favorite }));
  };
  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id) as any);
  };
  return (
    <>
      {
        todoLoading && <h1
          style={{
            textAlign: "center",
            color: "white",
            fontSize: "18px",
          }}
        >
          Loading...
        </h1>
      }

      <div className="todo">
        <input
          className="todo_checkbox"
          type="checkbox"
          checked={favorite}
          onChange={handleSetCompleted}
        ></input>

        <li>
          <div className={favorite ? "text_todo_favorite" : "text_todo"}>
            <p>{text}</p>
          </div>
        </li>
        <button className="delete_todo" onClick={() => handleDeleteTodo(id)}>
          ✘
        </button>
      </div>
    </>
  );
};
export default Todo;
