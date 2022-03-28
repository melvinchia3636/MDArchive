import '../styles/globals.scss';
import '../styles/content.scss';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    var _wr = function(type) {
      var orig = history[type];
      return function() {
        var rv = orig.apply(this, arguments);
        var e = new Event(type);
        e.arguments = arguments;
        window.dispatchEvent(e);
        return rv;
      };
    };
    window.history.pushState = _wr('pushState'), window.history.replaceState = _wr('replaceState');
  }, []);
  
  return <Component {...pageProps} />
}

export default MyApp
