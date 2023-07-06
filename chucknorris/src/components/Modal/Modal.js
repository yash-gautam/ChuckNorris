import React from "react";
import './Modal.css';

const Modal = (props) => {
    const { isModalVisible, closeModal, selectedCategoryIndex, jokes, refreshJoke } = props;
    const selectedJoke = jokes[selectedCategoryIndex];
    if(!isModalVisible || !selectedJoke) {
        return null;
    }

    return (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{selectedJoke.categories[0]}</h4>
            <button className="close-button" onClick={closeModal}>
              X
            </button>
          </div>
          <div className="boxed">
            <div className="modal-body">" {selectedJoke.value} "</div>
            <div className="modal-footer">
              <button className="button" onClick={refreshJoke(selectedCategoryIndex)}>
                Next joke
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Modal;