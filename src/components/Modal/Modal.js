import "./Modal.scss";
import Close from "../../assets/close.png";

const Modal = ({ show, setShow, children }) => {
    if (show) {
        return (
            <div className="modal-container">
                <div className="modal-view">
                    <img
                        src={Close}
                        alt="Close"
                        onClick={() => {
                            setShow(!show);
                        }}
                    />
                    {children}
                </div>
            </div>
        )
    }
    return null
}

export default Modal;