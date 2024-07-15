import { useContext, useEffect, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

function ProfileUpdatePage() {
  const {updateUser,currentUser} = useContext(AuthContext)
  const [error,setError] = useState("")
  const [isLoading,setIsLoading] = useState(false)
  const [avatar,setAvatar]= useState([])
  const navigate = useNavigate()

  const handleSubmit = async(e) =>{
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.target)
    const {userName,password,email} = Object.fromEntries(formData)
    console.log(userName)
    try{
        console.log(currentUser.id)
        const res =  await apiRequest.put(`/users/${currentUser.id}`,{
          userName,
          password,
          email,
          avatar:avatar[0]
        })
        updateUser(res.data)
        navigate("/profile")
    }catch(err){
      setError(err.response.data.message)
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="userName">Username</label>
            <input
              id="userName"
              name="userName"
              type="text"
              defaultValue={currentUser.userName}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue = {currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
            {error && <span style={{color:'red'}}>{error}</span>}
          </div>
          <button disabled={isLoading}>Update</button>
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] || currentUser.avatar || "/favicon.png"} alt="Image" className="avatar" />
        <UploadWidget uwConfig={{
          cloudName:"dvkjitnpa",
          uploadPreset:"estate",
          multiple:false,
          maxImageFileSize:200000,
          folder:"avatars"
        }}
        setState={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
