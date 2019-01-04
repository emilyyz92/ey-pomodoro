import React from 'react';
import { Alert, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import Target from '../containers/Target';


const Task = ({task, isOpen, toggle, changeTarget, target}) => (
  <Modal isOpen={isOpen}>
    <ModalHeader>
      {task.name}
    </ModalHeader>
    <ModalBody>
      <Target taskID={task.id} target={task.target}
      changeTarget={changeTarget}/>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={toggle}>close</Button>
    </ModalFooter>
  </Modal>
)

export default Task;
