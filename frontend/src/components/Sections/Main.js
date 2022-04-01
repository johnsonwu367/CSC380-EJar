import React from 'react'
import { MainContainer, MainBg, MainContent, MainH1, MainP, MainBtnWrapper  } from './MainElement'
import GoogleLoginBtn from '../GoogleLoginBtn'

const Main = () => {
  return (
    <div>
      <MainContainer>
          <MainBg>
              <MainContent>
                <MainH1>EJAR</MainH1>
                <MainP>Capturing every single one of your moments</MainP>
                <MainBtnWrapper>
                    <GoogleLoginBtn/>
                </MainBtnWrapper>
              </MainContent>
          </MainBg>
      </MainContainer>
    </div>
  )
}

export default Main
