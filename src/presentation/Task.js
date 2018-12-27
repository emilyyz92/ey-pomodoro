import React from 'react';
import { Alert, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import Timer from '../containers/Timer';
import Target from '../containers/Target';


const Task = ({task, isOpen, toggle, completed, changeTarget, target}) => (
  <Modal isOpen={isOpen}>
    <ModalHeader>
      {task.name}
      {completed ? <Alert color="success">Task Complete!</Alert> : null}
    </ModalHeader>
    <ModalBody>
      <Target taskID={task.id} target={task.target}
      changeTarget={changeTarget}/>
      <Timer taskID={task.id}
        sessionLength={task.sessionLength}
        task={task}
        target={target}
      />
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={toggle}>close</Button>
    </ModalFooter>
  </Modal>
)

export default Task;
