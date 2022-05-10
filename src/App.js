import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import PostScreen from './screens/PostScreen';
import PostEditScreen from './screens/PostEditScreen';
import PostCreateScreen from './screens/PostCreateScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' exact element={<HomeScreen />}></Route>
            <Route
              path='/page/:pageNumber'
              exact
              element={<HomeScreen />}
            ></Route>
            <Route
              path='/search/:keyword/page/:pageNumber'
              exact
              element={<HomeScreen />}
            ></Route>
            <Route
              path='/search/:keyword'
              exact
              element={<HomeScreen />}
            ></Route>
            <Route path='/create' element={<PostCreateScreen />}></Route>
            <Route path='/posts/:id' element={<PostScreen />}></Route>
            <Route path='/post/:id/edit' element={<PostEditScreen />}></Route>
            <Route path='/about' exact element={<AboutScreen />}></Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
