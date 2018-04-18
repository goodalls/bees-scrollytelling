import React from 'react';
import registerServiceWorker from './registerServiceWorker';
import { ParallaxProvider } from 'react-scroll-parallax';
import App from './components/App/App';
import ReactDOM from 'react-dom';
import './index.css';

ReactDOM.render(
  <ParallaxProvider>
    <App />
  </ParallaxProvider>,
  document.getElementById('root')
);
registerServiceWorker();
