import { useState } from "react";
import { Modal } from "react-bootstrap";

const ModalComponent = ({setModalShow,modalShow,handler}:any) => {
  // const [modalShow, setModalShow] = useState(false);
  const handleModalClose = () => setModalShow(false);
  return (
    <div>
      <Modal
        show={modalShow}
        onHide={handleModalClose}
        centered
        className="resumeModal"
      >
        <div className="resume-modal-body">
          <Modal.Header closeButton>
            <div className="d-flex align-items-center">
              <h4>Are you sure you want to delete</h4>
            </div>
          </Modal.Header>
          <Modal.Body style={{ minHeight: "90px" }}>
            <div className="d-flex align-items-center justify-content-around">
              <button onClick={handler} style={{ minWidth: "200px" }} className="btn btn-linen">
                <span>Yes </span>
              </button>
              <button onClick={handleModalClose}  style={{ minWidth: "200px" }} className="btn btn-linen">
                <span>NO </span>
              </button>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
};

export default ModalComponent;
