import './App.css'
import Navbar from './components/Navbar/Navbar'
import Auth from './routes/Auth'
import Routeres from './routes/Routeres'

function App() {
  const token = localStorage.getItem("token")
  if (token) {
    return (
      <div className="flex relative">
        <Navbar />
        <Routeres />
      </div>
    )
  }
  else{
    return (
      <div className="w-full bg-[#FCFAFA] min-h-screen">
        <Auth />
      </div>
    )
  }
}

export default App
