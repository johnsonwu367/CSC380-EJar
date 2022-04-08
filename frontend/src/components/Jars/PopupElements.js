import styled from "styled-components";

export const PopupDiv = styled.div`
  position: center;
  width: 100%
  height: 100vh;
  background-color: (0, 0, 0, .2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PopupInnerDiv = styled.div`
  position: relative;
  padding: 32px;
  width: 100%;
  max-width: 640px;
  background-color: black;
  color: white;
`;
export const CloseBtn = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 8px 20px;
  border-radius: 2px;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: white;
  color: black;
`;
