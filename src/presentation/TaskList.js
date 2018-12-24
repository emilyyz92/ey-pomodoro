import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const TaskList = ({tasks, showTask}) => (
  <>
    <h4>Your tasks</h4>
    <ListGroup>
      {tasks.map(task => {
        return (
          <ListGroupItem tag="a" href="#" action
          onClick={showTask}
          id={task.id} >
            {task.name}
          </ListGroupItem>
        )
      })}
    </ListGroup>
  </>
)

export default TaskList;
