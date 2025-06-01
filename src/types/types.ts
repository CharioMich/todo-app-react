export type toDoProps = {
  id: number;
  text: string;
}

export type Action =
  | {type: "ADD"; payload: string}
  | {type: "DELETE"; payload: number}
  | {type: "EDIT"; payload: { id: number, newText: string }};

export type ToDoFormProps = {
  dispatch: React.Dispatch<Action>
}

export type todoListProps = {
  todos: toDoProps[];
  dispatch: React.Dispatch<Action>
}