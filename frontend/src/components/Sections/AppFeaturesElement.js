import styled from "styled-components";
import orangePlane from "./orangePlaneBg.png";
import brownWood from "./brownWood.jpg";

export const AppFeatContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    height: 100vh;
    position: relative;
    z-index: 1;
`
export const AppFeatBg = styled.div`
    background-image: url(${orangePlane});
    @media screen and (max-width: 1000px){
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

export const AppFeatContent = styled.div`
    z-index: 3;
    width: 100%;
    position: absolute;
    padding: 100px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const AppFeatH1 = styled.h1`
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

export const AppFeatP = styled.p`
    margin-top: 24px;
    color: white;
    font-size: 22px;
    text-align: center;
    max-width: 600px;
    @media screen and (max-width: 768px) {
        font-size: 22px;
    }
    @media screen and (max-width: 480px){
        font-size: 18px;
    }
`