import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import TodoApp from './components/TodoApp';


/*
<div class="app">
  <div class="todo-container">
    <input id="new-todo" />
    <label for="new-todo">New Todo</label>
    <div class="todo-item-row">Learn React</div>
    <div class="todo-item-row">Learn Redux</div>
    <div class="todo-item-row">Learn React Native</div>
  </div>
</div>
*/ 

const renderTodos = (todos) => {
    return todos.map((todo, i) => (
    <div className = "todo-item-row" key="{i}">{todo}</div>
)) }


/*  inline styling
const TodoItem = props => (
    <div className = "todo-item-row">
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>{props.children}</div>
    </div>
)
*/
/* .todo-item-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
{shouldRender 
            ? 'Render!'
            : 'Dont render!'}
            {shouldRender && 'We render'}
see also how to do styled-components
*/


class App extends React.Component {
    render() {
        return (
            <div className = "app">
                <TodoApp />
            </div>
        )
    }
}

export default App