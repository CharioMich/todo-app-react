import TodoForm from "./todoForm.tsx";
import {useReducer} from "react";
import TodoList from "./TodoList.tsx";
import type { toDoProps, Action } from "../types/types.ts";

const toDoReducer = (state: toDoProps[], action: Action): toDoProps[] => {
  switch (action.type) {

    case "ADD": {
      const newTodo: toDoProps = {
        id: Date.now(),
        text: action.payload
      }
      return [...state, newTodo];
    }
    case "DELETE":
      return state.filter(todo => todo.id !== action.payload)

    case "EDIT":
      return state.map(task =>
        task.id === action.payload.id  // vriskoume to object (task) pou theloume na kanoume edit mesw tou id
        ? {...task, text: action.payload.newText}  // kanoume destructure ta pedia tou object kai allazoume mono to text
        : task
      );

    default:
      return state;
  }
}

const Todo = () => {

  const [todos, dispatch] = useReducer(toDoReducer, [])

  return (
    <>
      <div className=" mx-auto p-6">
        <h1 className="text-center font-bold font-mono text-3xl mb-4">To-Do List</h1>
        <TodoForm dispatch={dispatch} />
        <TodoList todos={todos} dispatch={dispatch}/>
      </div>
    </>
  )
}

export default Todo;