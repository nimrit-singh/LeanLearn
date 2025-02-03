import React, { useEffect } from 'react';

import { analytics } from './components/auth/firebase';
import { logEvent } from 'firebase/analytics';
import AllRoutes from './routes/AllRoutes';





function App() {
  // useEffect(() => {
  //   // Log screen view event when the component mounts
  //   logEvent(analytics, 'screen_view', {
  //     screen_name: 'Home',
  //     screen_class: 'HomeScreen',
  //   });
  // }, []);

  return (
      <div className="min-h-screen">
        <main>
          <AllRoutes/>
         </main>
      </div>
  );
}

export default App;