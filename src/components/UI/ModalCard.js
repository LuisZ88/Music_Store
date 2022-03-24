import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
const ModalCard = (props)=> {
    const [modalShow, setModalShow] = useState(true)
    const closeModal = () => {
        setModalShow(false);
      };
    return (
      <Modal
       show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered 
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Alerta
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {props.content}
          </Modal.Body>
          <Modal.Footer>
          <Button onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  export default ModalCard;
  
 
    
  
   
