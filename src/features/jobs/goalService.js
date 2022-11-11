import axios from 'axios'

const API_URI='http://localhost:5000/api/goals/'

//create new goal
const createGoal=async(goalData,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URI,goalData, config)
    return response.data
}

const getGoals=async(token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URI,config)
    return response.data
}

const deleteGoal=async(goalId,token)=>{
    console.log('deletegoal testing')
    const config={
        headers:{
            Authorization:`Bearer ${token}`,
        },
    }
    const response = await axios.delete(API_URI+goalId,config)
    
    return response.data
}

const goalService={
    createGoal, getGoals,deleteGoal
}
export default goalService

