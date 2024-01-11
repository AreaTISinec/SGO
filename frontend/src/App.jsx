
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "./containers/Home/Home"
import Login from "./containers/Login/Login"
import Signup from "./containers/Signup/Signup"
import Layout from "./hocs/Layout"
import { Provider } from 'react-redux'
import UploadFile from './containers/UploadFile/UploadFile'
import NotFound from './components/NotFound'

import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route  path="/" element={<Home/>} />
            <Route  path="/login" element={<Login/>} />
            <Route  path="/signup" element={<Signup/>} />
            <Route  path="/docs/upload/" element={<UploadFile/>} />
            <Route element={NotFound} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  )
}

export default App

