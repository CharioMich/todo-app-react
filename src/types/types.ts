export type toDoProps = {
  id: number;
  text: string;
  completed: boolean;
}

export type Action =
  | {type: "ADD"; payload: string}
  | {type: "DELETE"; payload: number}
  | {type: "EDIT"; payload: { id: number, newText: string }}
  | {type: "COMPLETE", payload: number}
  | {type: "CLEAR ALL"};

export type ToDoFormProps = {
  dispatch: React.Dispatch<Action>
  inputRef: React.RefObject<HTMLInputElement | null>
}

export type todoListProps = {
  todos: toDoProps[];
  dispatch: React.Dispatch<Action>;
}