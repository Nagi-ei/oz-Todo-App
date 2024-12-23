import { useState } from 'react';
import './App.css';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: '123', isDone: false },
    { id: 1, content: '코딩 공부하기', isDone: false },
    { id: 2, content: '잠 자기', isDone: false },
  ]);

  return (
    <>
      <h1>Todo</h1>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState('');
  const handleAdd = () => {
    const newTodo = {
      id: Number(new Date()),
      content: inputValue,
      isDone: false,
    };
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
    setInputValue('');
  };

  return (
    <div className='input-container'>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAdd}>추가하기</button>
    </div>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      setTodoList((prev) =>
        prev.map((el) =>
          el.id === todo.id ? { ...el, content: inputValue } : el
        )
      );
      setIsEditing(false);
    }
  };
  const handleComplete = () => {
    setTodoList((prev) =>
      prev.map((el) => (el.id === todo.id ? { ...el, done: !el.done } : el))
    );
  };

  return (
    <li className={`todo ${todo.done ? 'done' : ''}`}>
      <span className={isEditing ? 'hidden' : ''}>{todo.content}</span>
      <input
        className={`editing-input value-${todo.id} ${
          isEditing ? '' : 'hidden'
        }`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleEdit}>{isEditing ? '완료' : '수정'}</button>
      <button
        onClick={() => {
          setTodoList((prev) => prev.filter((el) => el.id !== todo.id));
        }}
      >
        삭제
      </button>
      <label>
        <input type='checkbox' onChange={handleComplete} /> 완료
      </label>
    </li>
  );
}

export default App;
