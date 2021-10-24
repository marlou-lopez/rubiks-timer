// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GeistProvider, CssBaseline} from '@geist-ui/react'

// const __nativeSI__ = window.setInterval;
// window.setInterval = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
//   var oThis = this, aArgs = Array.prototype.slice.call(arguments, 2);
//   return __nativeSI__(vCallback instanceof Function ? function () {
//     vCallback.apply(oThis, aArgs);
//   } : vCallback, nDelay);
// };

ReactDOM.render(
  <React.StrictMode>
    <GeistProvider>
      <CssBaseline />
      <App />
    </GeistProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

