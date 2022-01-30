import "./Modal.scss";

const Modal = ({ isShow, setFoo, children }) => {
    if (isShow) {
        return (
            <div className="modal-container">
                <div id="modal-view">
                    {children}
                    <button onClick={() => { setFoo(false); }} className="buttonclose" type="button">Close</button>
                </div>
            </div>
        )
    }
    return null
}

export default Modal;