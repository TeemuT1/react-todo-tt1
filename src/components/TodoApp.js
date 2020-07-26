import {Table, Checkbox, Button } from 'semantic-ui-react';
import React from 'react';
import {TodoItem} from './TodoItem';
import Counter from './Counter';

//would be good practice to componentize footer, header, input

const headers = {
    'Content-Type': 'application/json',    
}

class TodoApp extends React.Component {
    state = {
        todos: [],
        newTodo: '',
    }

    constructor(props){
        super(props)
        this.handleInputChange = this.handleInputChange.bind(this,)
    }

    //lifcycle method, called on mount
componentDidMount() {
    this.fetchTodos()
}

fetchTodos = () => {
    fetch('http://localhost:9002/todos')
    .then(data => data.json())
    .then(todos => this.setState({ todos }))
    .catch(err => console.error({err}))
}
 
handleToggleAll = allToggled => {
    const {todos} = this.state
    Promise.all(todos.map(todo => fetch(`http://localhost:9002/todos/${todo.id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({completed: !allToggled})
        }),
    ),
    ).then(this.fetchTodos)
    .catch(err => console.error({err}))
}

handleTodoClick(todo, index) {
    const {id, completed} = todo
    fetch(`http://localhost:9002/todos/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({completed: !completed})
    }).then(this.fetchTodos)
   
}

//iF do this dont need to bind this in Constructor, but it creates one for each todoapp
//handleInputChange = event => {
handleInputChange(event){
    const value = event.target.value
    this.setState({newTodo: value}) 
}

handleNewTodoKeyDown = event => {
    if (this.state.todos.length >= 11){
        //no more than 10 todos in the list
        return
    }

    if(event.keyCode !== 13){
        //13 is return key
        return
    }
    event.preventDefault()

    const {newTodo, todos} = this.state
    const value = newTodo.trim()
    if(value){
        fetch('http://localhost:9002/todos', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                title: value,
                completed: false,
            }),
        })
        .then(this.fetchTodos)
        .then(() => this.setState({newTodo: ''}))
    }
}

handleDelete = id => {
    fetch(`http://localhost:9002/todos/${id}`,{
        method: 'DELETE',
        headers,        
    }).then(this.fetchTodos)
   
}

handleClearCompleted = () => {
    const { todos } = this.state
    const completedTodos = todos.filter(todo => todo.completed)
    Promise.all(completedTodos.map(todo =>
        fetch(`http://localhost:9002/todos/${todo.id}`,{
        method: 'DELETE',
        headers,        
    }),
    )).then(this.fetchTodos)
  
}

//function App() {
//    const shouldRender = true
render() {
    const {todos, newTodo} = this.state
    const allToggled = todos.every(todo => todo.completed)
    return (
        <div className = "todo-container">
            <Counter />
            <input 
                id="new-todo" 
                className="new-todo" 
                placeholder="What needs to be done?"
                autoFocus
                value={this.state.newTodo}
                onChange = {this.handleInputChange}
                onKeyDown = {this.handleNewTodoKeyDown}
            />
            <label
                htmlFor="new-todo"
                style={{ display: 'none' }}
            >
                New Todo
            </label>
            {todos.length === 0 ? 
            (
            <Table>
                <Table.Header> 
                    <Table.Row>
                        <Table.HeaderCell>
                            Nothing to do.
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
            </Table>
            ) : (
            <Table>
                <Table.Header> 
                <Table.Row>
                <Table.HeaderCell>
                    <Checkbox checked = {allToggled} onChange = {() => this.handleToggleAll(allToggled)} />
                </Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.todos.map((todo, i) => (
                        <TodoItem 
                            key={i} 
                            todo = {todo} 
                            handleToggle={() => 
                                this.handleTodoClick(todo, i)
                            }
                            handleDelete={() => 
                                this.handleDelete(todo.id)
                            } 
                        />            
                    )) }  
                </Table.Body>
                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell colSpan="2">
                            <Button size ="small" onClick={this.handleClearCompleted}>
                                Clear completed
                            </Button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>) }  
        </div> 
    
    )


   /* return React.createElement(
        'div', {
            className: 'app',
        },
        React.createElement(
            'div', {
                className: 'todo-container',
            },
            todos.map((todo, index) =>
                React.createElement(
                    'div', {
                        className: 'todo-item-row',
                        key: index,
                    },
                    todo,
                )
            ),

        ),
    ) */
}
}
export default TodoApp;