import styled from 'styled-components';

export const JarsContainer = styled.div`
  position: absolute;
  /* display: flex; */
  /* flex-flow: column; */
  /* align-items: center; */
  /* border: 3px solid #73AD21; */
  height: calc(100% - 180px);
  overflow: auto;
`;

export const JarItems = styled.div`
    display: flex;
    /* flex-direction: column; */
    /* justify-content: center; */
    /* align-items: flex-start; */
    /* height: 100%; */
    /* max-height: 100%; */
    padding: 0 2rem;
    /* width: 650 px; */
    text-transform: uppercase;
    /* line-height: 1; */
    /* font-weight: bold; */
    /* border: 3px solid #73AD21; */
    /* overflow: auto; */
`;

// @media screen and (max-width: 650px) {
//     width: 100%;
// }

export const JarHeading = styled.h1`
    font-size: clamp(2rem, 2.5vw, 3rem);
    text-align: center;
    margin-bottom: 5rem;
`;

export const JarsH3 = styled.h3`
    font-size: clamp(1rem, 2.5vw, 3rem);
    margin-bottom: 1rem;
    box-shadow: 3px 5px #949392;
    letter-spacing: 2.5px;
    margin-bottom: 24px;
`;

export const JarsP = styled.p`
    font-size: clamp(2rem, 2.5vw, 3rem);
    margin-bottom: 1rem;
    color: #252e48;
    font-size: 18px;
    line-height: 24px;
`;

export const JarCard = styled.div`
  /* position: relative; */
  /* border: 3px solid #73AD21;  */
  margin: 0 2rem;
  /* line-height: 1; */
  width: 300px;
  display: flex;
  justify-content: center;
  /* flex-direction: column; */
  /* float: right; */
  // grid-template-columns: (repeat(auto-fill, minmax(150px, 1fr));
`;

export const JarImg = styled.img`
  height: 200px;
  min-width: 150px;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  left: 0;
`;

export const JarInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
`;

export const JarName = styled.h2`
  font-weight: 400;
  font-size: 1.5rem;
`;

export const JarLi = styled.li`
  display: inline-block;
  /* align-self: flex-end; */
  /* position: relative; */
  /* background: gray; */
  /* border: 3px solid #73AD21;  */
  /* background-color: gray;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  float: left;
  flex: 1;
  width: 200px; */
  /* height: 1000px; */
  /* border: 3px solid #73AD21;  */
`;

export const JarTags = styled.p`
  margin-bottom: 1rem;
  bottom: 0;
  left: 0;
  padding: 1rem 2rem;
  font-size: 1rem;
  background: black;
  color: white;
  position: absolute;
`;

export const JarUl = styled.ul`
  /* border: 3px solid #73AD21; */
  margin-bottom: 25px;
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
  width: 100%;
  /* align-items: flex-end;
  align-content: flex-start; */
  /* height: 100%; */
  /* float: right; */
  // width: 30em;
  /* list-style-type: none; */
`;

export const JarBr = styled.br`
  clear: left;
`;

export const JarBtn = styled.button`
    padding: 8px 20px;
    border-radius: 2px;
    outline: none;
    border: none;
    cursor: pointer;
    background-color: black;
    color: white;
`;



