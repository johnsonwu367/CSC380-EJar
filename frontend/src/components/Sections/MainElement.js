import styled from "styled-components";
import coolPlane from "./yellowPlaneBg.png";
import brownWood from "./yellowPlaneBg2.png";

export const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    height: 100vh;
    position: relative;
    z-index: 1;
`
export const MainBg = styled.div`
    background-image: url(${coolPlane});
    @media screen and (max-width: 1200px){
        background-image: url(${brownWood});
    }
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

export const MainContent = styled.div`
    z-index: 3;
    margin-top: 80px;
    width: 100%;
    position: absolute;
    padding: 90px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const MainH1 = styled.h1`
    color: #fff;
    font-size: 48px;
    text-align: center;
    @media screen and (max-width: 768px) {
        font-size: 40px;
    }
    @media screen and (max-width: 480px){
        font-size: 42px;
    }
`

export const MainP = styled.p`
    margin-top: 24px;
    color: #fff;
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

export const MainBtnWrapper = styled.div`
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
`