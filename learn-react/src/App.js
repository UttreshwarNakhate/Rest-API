import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Products from './pages/Products'
import Navigation from './components/Navigation'
import Cart from './pages/Cart'

const App = () => {
    return (
        <>
            <Router>
                <Navigation />
                <Routes>
                    <Route path='/' Component={Home} exact></Route>
                    <Route path='/about' Component={About}></Route>
                    <Route path='/products' Component={Products}></Route>
                    <Route path='/cart' Component={Cart}></Route>
                </Routes>
            </Router>
        </>
    )
}

export default App