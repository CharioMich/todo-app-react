import {useState} from "react";
import type {ToDoFormProps} from "../types/types.ts";


const TodoForm = ({ dispatch }: ToDoFormProps) => {

  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();

    if (text.trim() !== "") {
      dispatch({type: "ADD", payload: text});
      setText("");
    }
  }

  return (
    <>
      <form className="flex gap-4 mb-4 max-w-lg mx-auto" onSubmit={handleSubmit}>
        <input
          className="flex-1 border p-2 rounded"
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="New Task..."
        />
        <button

          type="submit"
          className="bg-gray-900 hover:bg-gray-700 hover:cursor-pointer text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>
    </>
  )
}

export default TodoForm;