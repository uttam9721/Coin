
import React from 'react'
import Navbar from './components/Navbar/Navbar';
import {Routes ,Route} from 'react-router-dom'
import Home from './pages/Home/Home';
import Coin from './pages/Coin/Coin';
import Footer from './components/Footer/Footer';
import Register from './pages/Register/Register';

const App = () => {
  return (
    <div className='app'>

      <Navbar />
      <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/coin/:id' element={<Coin/>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
