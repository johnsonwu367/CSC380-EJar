import React from 'react';
import {ContactBg, ContactContainer, ContactContent, ContactH1, ContactP} from "./ContactElement";

const Contact = () => {
  return (
      <ContactContainer>
          <ContactBg>
              <ContactContent>
                  <ContactH1>About Us</ContactH1>
                  <ContactP> Johnson lives in a society </ContactP>
                  <ContactP> Kevin lives in a society </ContactP>
                  <ContactP> Mason lives in a society </ContactP>
              </ContactContent>
          </ContactBg>
      </ContactContainer>
  )
}

export default Contact
