import {Spinner} from 'react-bootstrap'
import {Fragment} from "react";
import ReactDOM from "react-dom";
import './ModalCart.css'

const Loading = () =>{
    const portalElement = document.getElementById("overlays");
 return(
    <Fragment>
    {ReactDOM.createPortal(<Spinner animation="border" variant="primary" className='modal_cart_modal' />, portalElement)}
    </Fragment>
)
}

export default Loading


