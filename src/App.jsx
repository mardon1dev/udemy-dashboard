import './App.css'
import Navbar from './components/Navbar/Navbar'
import Auth from './routes/Auth'
import Routeres from './routes/Routeres'
import authService from './services/AuthService'

function App() {
  // Service Layer Pattern - Use AuthService for authentication check
  const isAuthenticated = authService.isAuthenticated();
  
  if (isAuthenticated) {
    return (
      <div className="flex relative h-full w-full overflow-hidden bg-[#FCFAFA]">
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
