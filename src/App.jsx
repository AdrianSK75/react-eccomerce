import { Input, Button, Container } from '@chakra-ui/react'

import './App.css'
import { useState, useEffect } from 'react';

const todoItems = [
  {id: 1, todo: 'Alune'},
  {id: 2, todo: 'Prajituri'},
  {id: 3, todo: 'Coarda'},
]

function App() {
  const [todos, setTodos] = useState(todoItems);
  const [todo, setTodo] = useState("");
  const [selectedTodo, setSelectedTodo] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedTodo === null) {
      setTodos((prevTodos) => [...prevTodos, { id: prevTodos.length + 1, todo }])
    } else {
      setTodos(
        todos.map(todoItem => {
          if (todoItem.id === selectedTodo.id) {
            return {
              ...todoItem,
              todo
            }
          } else {
            return todoItem
          }
        })
      )
    }
    setSelectedTodo(null)
    setTodo('');
  }

  const handleDelete = (todoId) => {
    setTodos(
      todos.filter(todo => todo.id !== todoId)
    )
  }

  useEffect(() => console.log(selectedTodo));

  // const value

  return (
    <div>
      <form
        className='container'
        onSubmit={handleSubmit}>
        <Input
          className='todo-input'
          variant='flushed'
          type='text'
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <Button
          colorScheme='teal'
          size='md'
          type='submit'
        >
          {selectedTodo === null ? 'New' : 'Edit'}
        </Button>
      </form>
      <ul className='todo-list'>
        {todos.map((todoItem) => (
          <li key={todoItem.id}>
            {todoItem.todo}
            <Button onClick={() => {
              setSelectedTodo(todoItem)
              setTodo(todoItem.todo)
              }}> Edit </Button>
            <Button onClick={() => handleDelete(todoItem.id)}> Delete </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
