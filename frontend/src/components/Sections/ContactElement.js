import styled from "styled-components";
import brownWood from "./emptyJarBg.png";

export const ContactContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    height: 800px;
    position: relative;
    z-index: 1;
`
export const ContactBg = styled.div`
    background-image: url(${brownWood});
    background-size: cover;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`

export const ContactContent = styled.div`
    z-index: 3;
    width: 100%;
    position: absolute;
    padding: 100px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ContactH1 = styled.h1`
    color: white;
    font-size: 48px;
    text-align: center;
    @media screen and (max-width: 768px) {
        font-size: 40px;
    }
    @media screen and (max-width: 480px){
        font-size: 42px;
    }
`

export const ContactP = styled.p`
    margin-top: 24px;
    color: white;
    font-size: 24px;
    text-align: center;
    max-width: 600px;
    @media screen and (max-width: 768px) {
        font-size: 24px;
    }
    @media screen and (max-width: 480px){
        font-size: 18px;
    }
`