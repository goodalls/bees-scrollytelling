import React from 'react';
import './Help.css';
import flower1 from '../../assets/hypericum.svg';
import flower2 from '../../assets/iris.svg';
import flower3 from '../../assets/knapweed.svg';
import flower4 from '../../assets/mimosa.svg';
import flower5 from '../../assets/pansy.svg';
import flower6 from '../../assets/poppy.svg';
import flower7 from '../../assets/carnation.svg';

const Help = () => {
  return (
    <div className="Help">
      <h1>Ways you can help</h1>
      <h2>Buy organic and local</h2>
      <h2>Grow pollinator gardens</h2>
      <p>Be sure to ask if the plants you buy were grown with neonicitinoides</p>
      <div className='flowers'>
        <img className='flowers' src={flower1} />
        <img className='flowers' src={flower2} />
        <img className='flowers' src={flower3} />
        <img className='flowers' src={flower4} />
        <img className='flowers' src={flower5} />
        <img className='flowers' src={flower6} />
        <img className='flowers' src={flower7} />
      </div>
      <h2>Make bee homes</h2>
      <div className="bee-images bee-home">
      </div>
      <h2>Support bee friendly organizations and legislation</h2>
    </div>
  );
};

export default Help;