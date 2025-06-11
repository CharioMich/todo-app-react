import TodoForm from "./todoForm.tsx";
import {useEffect, useReducer, useRef} from "react";
import TodoList from "./TodoList.tsx";
import type { toDoProps, Action } from "../types/types.ts";

const getInitialTodos = () => {
  const stored = localStorage.getItem("todos");
  return stored ? JSON.parse(stored) : [];    // an yparxei, to kanoume apo string se object gia na to xrhsimopoihsoume ston kwdika
}

const toDoReducer = (state: toDoProps[], action: Action): toDoProps[] => {
  switch (action.type) {

    case "ADD": {
      const newTodo: toDoProps = {
        id: Date.now(),
        text: action.payload,
        completed: false
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
    case "COMPLETE":
      return state.map(task =>
        task.id === action.payload
          ? {...task, completed: !task.completed}
          : task
      );
    case "CLEAR ALL":
      return [];


    default:
      return state;
  }
}

const Todo = () => {

  const inputRef = useRef<HTMLInputElement>(null);

  const [todos, dispatch] = useReducer(toDoReducer, [], getInitialTodos);
  const totalTasks: number = todos.length;
  const completedTasks: number = todos.filter(task => task.completed).length;
  const activeTasks: number = totalTasks - completedTasks;

  const handleClearAll = () => {
    inputRef.current?.focus();  // Input gets focus after pressing Clear All button

    dispatch({type: "CLEAR ALL"});
  }

  useEffect(() => { // trexei kathe fora pou exoume allagh sto todos ( [todos] )
    localStorage.setItem("todos", JSON.stringify(todos));  // vazoume sto localstorage to todos. (dexetai string)
  }, [todos]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [])

  return (
    <>
      <div className="mx-auto p-6">
        <h1 className="text-center font-bold font-mono text-3xl mb-4">To-Do List</h1>
        <TodoForm dispatch={dispatch} inputRef={inputRef} />
        <TodoList todos={todos} dispatch={dispatch} />
        { todos.length > 0 && ( // cool way to show button (or more elements) instead of hidden={todos.length === 0}
          <>
            <hr className="w-[80%] mt-5 m-auto" />
            <div className="flex flex-col items-center mt-2 pt-2">
              <span>Total: {totalTasks}</span>
              <span>Active: {activeTasks}</span>
              <span>Completed: {completedTasks}</span>
            </div>
            <div className="text-center mt-4">
              <button
                className="p-3 text-white rounded bg-red-400 hover:bg-red-600"
                onClick={handleClearAll}
                // hidden={todos.length === 0}
              >Clear all</button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Todo;