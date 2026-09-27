import React from 'react';
import LiveTranslate from './06_LiveTranslate';

export default function TranslateResult(props) {
  return (
    <LiveTranslate 
      {...props}
      forceShowResult={true}
      defaultInput="पेड़ों को बढ़ने के लिए पानी और सूरज की रोशनी की आवश्यकता होती है।"
    />
  );
}
