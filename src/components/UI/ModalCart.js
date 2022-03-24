import './ModalCart.css'
import {Fragment} from "react";
import ReactDOM from "react-dom";
const Backdrop = (props) => {
  return <div className="modal_cart_backdrop" />;
};

const ModalOverlay = (props) => {
  return (
    <div className="modal_cart_modal">
      <div className="">{props.children}</div>
    </div>
  );
};
const portalElement = document.getElementById("overlays");
const ModalCart = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};
export default ModalCart;
