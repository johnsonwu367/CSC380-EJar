import React from 'react';
import { PopupDiv, PopupInnerDiv, CloseBtn } from "./PopupElements";

function Popup( props ) {
    return (props.trigger) ? (
        <PopupDiv>
            <PopupInnerDiv>
                <CloseBtn onClick={() => props.setTrigger(false)}>
                    close
                </CloseBtn>
                { props.children }
            </PopupInnerDiv>
        </PopupDiv>
    ) : "";
}

export default Popup;