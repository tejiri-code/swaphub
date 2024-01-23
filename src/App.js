// In App.js
import {Routes, Route} from 'react-router-dom';
import UserRegistration from './Components/Registration/userRegistration';
import UserProfile from './Components/Registration/UserProfile';

function App()  {
  return (
    <Routes>
        // <Route path="/" element={<UserRegistration/>} />
        <Route path="/profile" element={<UserProfile/>} />
    </Routes>
  );
};

export default App;
