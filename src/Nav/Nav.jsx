import React, { useState } from 'react';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import UndoOutlined from '@ant-design/icons/UndoOutlined';

const Nav = ({reset}) => {
  
  const [infoIsOpen, setInfoIsOpen] = useState(false);

  const toggleInfoOpen = () => setInfoIsOpen(!infoIsOpen);

  return (
    <div id={'nav'}>
      
      <button onClick={toggleInfoOpen}>
        <InfoCircleOutlined/>
      </button>

      <p>BORDERLY</p>

      <button onClick={reset}>
        <UndoOutlined/>
      </button>

      <div id={'info-wrapper'} className={infoIsOpen ? 'open' : 'closed'}>
        <section>
          <p>
            BORDERLY is a simple tool that accepts one or more images and applys a 5% 
            border without the loss of image quality - unlike other methods that are
            part of a larger software platform (Adobe Lightroom) or severly reduce image
            quality (Snapseed).
          </p>
        </section>

        <section>
          <p>
            For Bug Reports, Feature Suggestions, or Questions &nbsp;
            <a href={'mailto:joeboylson@gmail.com'} target={'_blank'}>
              Contact the Developer
            </a>
          </p>
        </section>

        <section>
          <a href={'https://paypal.me/JoeBoylson?locale.x=en_US'} target={'_blank'}>
            Support the Developer
          </a>
        </section>

        <footer>&copy; Joseph Boylson | v2.0.0</footer>
      </div>


    </div>  
  );
};

export default Nav;