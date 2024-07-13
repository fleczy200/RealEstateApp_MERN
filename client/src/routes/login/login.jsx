import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [error,setError] = useState("")
  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate()
  
  const {updateUser} = useContext(AuthContext)

  const handleSubmit = async (e)=>{
    setIsLoading(true)
    const formData = new FormData(e.target)
    e.preventDefault()
    
    const userName = formData.get("userName")
    const password = formData.get("password")
    try{
      const res = await apiRequest.post("auth/login",{userName,password})

      updateUser(res.data)

      navigate("/")
    }catch(err){
      setError(err.response.data.message)
    }finally{
      setIsLoading(false)
    }
    
  }
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="userName" type="text" placeholder="Username" required/>
          <input name="password" type="password" placeholder="Password" required/>
          <button disabled = {isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
