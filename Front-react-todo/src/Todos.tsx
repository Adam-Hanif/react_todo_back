import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import React, { FC, ReactElement, useEffect, useState } from "react";
import { fetchTodos, addTodo } from "./features/todosSlice";
import Todo from "./Todo";
import { AppDispatch, RootState } from "./app/store";


export const Todos = () => {
  const todos = useSelector((state: RootState) => state.todoReducer.todos);
  const loading = useSelector((state: RootState) => state.todoReducer.loading);
  const loadOpen = useSelector(
    (state: RootState) => state.todoReducer.loadOpen
  );
  const error = useSelector((state: RootState) => state.todoReducer.error);
  const [text, setText] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  //-----------------------------------------------------
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);


  const handeleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handeleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text === "") {
      alert("введите задачу");
    }
    dispatch(addTodo({ text: text, favorite: false }));
    setText("");
  };

  //-----------------------------------------------------

  if (error) {
    return <div>Error</div>;
  }

  if (loadOpen) {
    return (
      <div className="block_gif">
        <img
          className="gif"
          src="http://i.stack.imgur.com/SBv4T.gif"
          alt="this slowpoke moves"
          width="250"
        />
        <p className="text_gif">Loading...</p>
      </div>
    )
  }

  return (
    <div className="todo_list">
      <ul className="ul_todo">
        <h1 className="h1_todo">
          To <span>Do</span> List
        </h1>

        <form className="form" onSubmit={handeleSubmit}>
          <input
            className="input_todo"
            type="text"
            placeholder="введите задачу"
            value={text}
            onChange={handeleChange}
          />
          {loading ? (
            <button
              className={text ? "btn_todo" : "btn_todo_disabled"}
              disabled={!text}
            >
              Add ToDo
            </button>
          ) : (
            <button disabled={!text} className="btn_todo">
              Add ToDo
            </button>
          )}
        </form>
        {todos.map((todo, i) => {
          return (
            <Todo
              key={i}
              text={todo.text}
              favorite={todo.favorite}
              id={todo._id}
              todoLoading={todo.loading}
            />
          );
        })}
      </ul>
    </div>
  );
};


