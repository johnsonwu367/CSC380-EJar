import React from 'react';
import {ContactBg, ContactContainer, ContactContainer2, ContactContent, ContactH1, ContactP, ContactImg} from "./ContactElement";
import github from "./github.png";

const Contact = () => {
  return (
      <ContactContainer id='contact'>
          <ContactBg>
              <ContactContent>
                  <ContactH1>About Us</ContactH1>
                  <ContactContainer2> <ContactP> Johnson Liu: jwu7@oswego.edu    </ContactP><a href='https://github.com/johnsonwu367' target="_blank" rel="noreferrer noopener"><ContactImg src={github} alt="github.png"/></a></ContactContainer2>
                  <ContactContainer2> <ContactP> Kuncheng Feng: kfeng2@oswego.edu    </ContactP><a href='https://github.com/KunchengFeng2' target="_blank" rel="noreferrer noopener"><ContactImg src={github} alt="github.png"/></a></ContactContainer2>
                  <ContactContainer2> <ContactP> Mason Minnicks: mminnick@oswego.edu    </ContactP><a href='https://github.com/mminnicks' target="_blank" rel="noreferrer noopener"><ContactImg src={github} alt="github.png"/></a></ContactContainer2>
              </ContactContent> 
          </ContactBg>
      </ContactContainer>
  )
}

export default Contact
