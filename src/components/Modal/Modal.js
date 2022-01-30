import "./Modal.scss";

const Modal = ({ show, setShow, children }) => {
    if (show) {
        return (
            <div className="modal-container">
                <div id="modal-view">
                    {children}
                    <button onClick={() => { setShow(false); }} className="buttonclose" type="button">Close</button>
                </div>
            </div>
        )
    }
    return null
}

export default Modal;