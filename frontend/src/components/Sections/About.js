import React from 'react';
import { AboutH1, AboutContainer, AboutContent, AboutBg, AboutP} from './AboutElement';

const About = () => {
  return (
    <AboutContainer id='about'>
        <AboutBg>
            <AboutContent>
      <AboutH1>About EJAR</AboutH1>
                <AboutP>Humanity has gone through a major traumatic experience.
                As people were getting locked down in their rooms like prisoners,
                many struggled with psychological issues caused by this newfound isolation. Even two years
                after the first confirmed case in America, humanity still struggles to
                deal with the psychological toll Covid-19 has caused. </AboutP>
                <AboutP>It hasn't been all doom and gloom. The stigma of mental health has changed.
                    People are more out in the open about their struggles and more likely to seek help.
                 EJar is the perfect tool to find all of the positives that happen throughout your day.
                 Feel like keeping track of interesting medieval curses? EJar has got you covered. Plan on recording
                    all the ways that your family annoys you? We've got a jar for that. Trying to focus on bettering
                    your psychological well being and mental health? EJar has got your back. </AboutP>
            </AboutContent>
        </AboutBg>
    </AboutContainer>
  )
}

export default About
