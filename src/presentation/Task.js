import React from 'react';
import { Alert, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import Timer from '../containers/Timer';
import Target from '../containers/Target';


const Task = ({task, isOpen, toggle, completed}) => (
  <Modal isOpen={isOpen} >
    <ModalHeader>{task.name}</ModalHeader>
    <ModalBody>
      {completed ? <Alert color="success">Task Complete!</Alert> : null}
      <Target taskID={task.id} target={task.target}/>
      <Timer taskID={task.id}
      sessionLength={task.sessionLength}
      taskComplete={task.complete}
      />
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={toggle}>close</Button>
    </ModalFooter>
  </Modal>
)

export default Task;
