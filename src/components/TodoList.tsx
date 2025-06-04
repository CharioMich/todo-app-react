import { Trash2, Edit, Save, X, Square, CheckSquare } from "lucide-react";
import type { todoListProps, toDoProps } from "../types/types.ts";
import {useState} from "react";

const TodoList = ({todos, dispatch}: todoListProps) => {

  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const handleDelete = (id: number) => {
    dispatch({type: "DELETE", payload: id});
  }

  const handleEdit = (id: number, text: string) => {
    setEditId(id);
    setEditText(text);
  }

  const handleCancel = () => {
    setEditId(null);
    setEditText("");
  }

  const handleSave = (id: number) => {
    dispatch({type: "EDIT", payload: { id: id, newText: editText } });
    setEditId(null);
    setEditText("");
  }

  const handleCheck = (id: number) => {
    dispatch({type: "COMPLETE", payload: id})
  }

  return (
    <>
      <ul className="space-y-2">
        {todos.map((task: toDoProps) => (
          <li key={task.id} className={`flex items-center w-[80%] m-auto justify-between bg-gray-100 p-4 my-2 rounded 
                                            ${task.completed ? "opacity-60 line-through" : ""}`}>

            { editId === task.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  className="border rounded p-1 flex-1 mx-2"
                  onChange={(e) => setEditText(e.target.value)}
                />

                <div className="flex flex-row space-x-2">
                  <button
                    className="text-gray-900 hover:text-gray-600 hover:cursor-pointer flex items-center justify-center gap-1"
                    onClick={() => handleSave(task.id)}
                  >
                    <Save size={18} />
                  </button>
                  <button
                    className="text-gray-700 hover:text-gray-500 hover:cursor-pointer flex items-center justify-center gap-1"
                    onClick={() => handleCancel()}
                  >
                    <X size={18} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1 flex-1">
                  <button
                    className="text-green-500"
                    onClick={() => handleCheck(task.id)}
                  >
                    { task.completed ? <CheckSquare size={18} /> : <Square size={18} /> }
                  </button>

                  <span>{task.text}</span>
                </div>
                <div className="flex flex-row space-x-2">
                  <button
                    disabled={task.completed}
                    className="text-gray-900 hover:text-gray-600 hover:cursor-pointer flex items-center justify-center gap-1"
                    onClick={() => handleEdit(task.id, task.text)}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    className="text-red-700 hover:text-red-500 hover:cursor-pointer flex items-center justify-center gap-1"
                    onClick={() => handleDelete(task.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </>
            )}


          </li>
          )
        )}
      </ul>
    </>
  )
}

export default TodoList;