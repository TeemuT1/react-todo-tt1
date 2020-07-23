import {Table, Checkbox, Button } from 'semantic-ui-react';
import React from 'react';


//can also restructure props immediately
//const TodoItem = ({todo, handleDelete, handleToggle}) => {
export const TodoItem = props => {
    const { todo, handleDelete, handleToggle } = props
    return (
    <Table.Row  
        positive={todo.completed}>
        <Table.Cell>
            <Checkbox 
                checked={todo.completed}
                onChange = {handleToggle}
            />
        </Table.Cell>
        <Table.Cell>
            {todo.title}
            <Button
                color="red"
                icon="trash"
                floated="right"
                compact
                size="small"
                onClick={ handleDelete }
 
            />
        </Table.Cell>
    </Table.Row>
    )
}