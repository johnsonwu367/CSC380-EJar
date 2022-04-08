import styled from 'styled-components';

// function assignRows(grid) {
//     let row = 0;
//     let odd = true;
//     console.dir(grid.children);
//     [...grid.children].forEach(function (el) {
//         el.classList.remove(...el.classList.values());
//         if(
//             el.previousElementSibling ||
//             el.offsetLeft <el.previousElementSibling.offsetLeft
//         ) {
//             row++;
//             odd = odd;
//         }
//         el.classList.add(`row${row}`, `${odd ? 'odd' : 'even'}` )
//     });
// }

// const ro = new ResizeObserver(grids => {
//     grids.forEach(entry => assignRows(entry.target));
// });
//
// const grid = document.querySelector('JarCard')

export const JarsContainer = styled.div`
  background: "grey",
  height: "800px",
  width: "100%"
  display: flex;
  flex-flow: column;
  align-items: center;
  max-width: 1120px;
  width: 90%;
  margin: 0 auto;
// height: calc(100vh -80px);
// max-height: 100%;
// width: 100vw;
// padding: 0rem calc((100vw - 1300px ) /2 );
`;

export const JarItems = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
    max-height: 100%
    padding: 0 2rem;
    width: 650 px;
    text-transform: uppercase;
    line-height: 1;
    font-weight: bold;
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
  margin: 0 2rem;
  line-height: 2;
  width: 300px;
  // display: grid;
  // grid-template-columns: (repeat(auto-fill, minmax(150px, 1fr));
`;

export const JarImg = styled.img`
  height: 200px;
  min-width: 150px;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
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
  float: left;
  // width: 10em;
  
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
  margin-bottom: 24px;
  flex-wrap: wrap;
  // float: left;
  // width: 30em;
  list-style-type: none;
  @media only screen and (min-width: 1024px) {
    display: flex;
}
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



