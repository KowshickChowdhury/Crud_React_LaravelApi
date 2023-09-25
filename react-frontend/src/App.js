import React from 'react';
import MyRoutes from './router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {
  return (
    <div>

      <Navbar />
      
      <MyRoutes />

      <Footer footertext="© 2023 Copyright: KowshickChowdhury" />

    </div>
  );
}

export default App;
