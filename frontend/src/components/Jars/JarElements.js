import styled from 'styled-components';
import {Link} from "react-router-dom";

export const LinkJars = styled( Link )`
  display: flex;
  flex-flow: column;
  width: 100%;
  box-shadow: 0 6px 20px rgba(56, 125, 255, 0.17);
  -webkit-filter: drop-shadow(0 6px 20px rgba(56, 125, 255, 0.017));
  filter: drop-shadow(0 6px 20px rgba(56, 125, 255, 0.017));
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  @media only screen and (max-width: 1024px) {
    margin-bottom: 2rem;
}
`;

export const FigureJarWrap = styled.figure`
  position: relative;
  width: 75%;
  height: 75%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 25px;
  bottom: 0;
  left: 0;
`;

export const ImgJar = styled.img`
  bottom: 0;
  left: 0;
  // width: 60%;
  // max-width: 100%;
  // height: 60%;
  // max-height: 100%;
  // object-fit: cover;
  // transition: all 0.2s linear;
  // display: flex;
  // align-items: center;
  // justify-content: center;
   position: relative;
   width: 150px;
   height: 200px;
   float: left;
   margin-right: 10px;
  
&:hover {
  cursor: pointer;
}
`;

export const DivJarsInfo = styled.div`
  // padding: 10px 5px 10px;
  // border: 3px solid #000;
  overflow: hidden;
  width 60px;
  text-align: center;
  width: 200px;
  height: 50px;
  overflow-x: auto;
  overflow-y: hidden;
`;

export const JarsH5 = styled.h5`
  color: #252e48;
  position: relative;
  font-size: 20px;
  line-height: 25px;
`;

export const JarLi = styled.li`
  display: flex;
  flex: 1;
  // margin: 0 1rem;
  // border-radius: 10px;
`;

export const JarTag = styled.p`
  bottom: 0;
  left: 0;
  padding: 1rem 1rem;
  font-size: 1rem;
  background: black;
  color: white;
  position: absolute;
`;

