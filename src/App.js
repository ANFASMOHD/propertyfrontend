
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Admin from './pages/Admin';
import Registration from './pages/Registration';

function App() {
  return (
    <div>
     
     
      <Registration/>
     <Routes>
   
      <Route path='/admin' element={<Admin/>}/>

     </Routes>
    
    </div>
  );
}

export default App;
