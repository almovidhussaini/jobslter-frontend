import axios from 'axios'

const API_URI='http://localhost:5000/api/user/'

//register user

const register = async (userData)=>{
    const response = await axios.post(API_URI,userData)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}

const login = async (userData)=>{
    // console.log('log in checking')
    //  console.log(userData,'user data testing')
    const response = await axios.post(API_URI+'login',userData)
    // console.log('log2 in checking')
    // console.log(API_URI+'login','url checking')
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}

const logout=()=>{
    localStorage.removeItem('user')
}

const authService = {
    register,logout,login
}
export default authService