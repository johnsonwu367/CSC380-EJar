import React from 'react';
import {AppFeatBg, AppFeatContainer, AppFeatContent, AppFeatH1, AppFeatP} from "./AppFeaturesElement";

const AppFeatures = () => {
  return (
      <AppFeatContainer id='app-features'>
          <AppFeatBg>
              <AppFeatContent>
                  <AppFeatH1>EJAR Features</AppFeatH1>
                  <AppFeatP> Create a new EJAR with customizable tags and add contributors at will </AppFeatP>
                  <AppFeatP> Keep users up to date with EJAR emails to remind users to add entries or
                      when the jar will open </AppFeatP>
                  <AppFeatP> Allows users to manage and update content of the jars to their own needs,
                  and don't worry, the owner of the EJAR will have all privileges required to keep the
                  EJAR environment exactly how they want it</AppFeatP>
                  <AppFeatP> Contributors will be able to Create, Update, and Delete their own content while
                      Owners will also be able to set an opening time and add/remove contributors </AppFeatP>
              </AppFeatContent>
          </AppFeatBg>
      </AppFeatContainer>
  )
}

export default AppFeatures
