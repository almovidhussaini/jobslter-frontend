import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import goalService from './goalService'

const initialState = {
  goals:[],
  isError :false,
  isSuccess: false,
  isLoading:false,
  message:''
}

export const createGoal= createAsyncThunk('goals/create', async (goalData,thunkAPI)=>{
  try{
    const token = thunkAPI.getState().auth.user.token
    return await goalService.createGoal(goalData,token)

  }catch(error){
    const message=(error.message&& error.response.data&&error.response.data.message)||error.message||error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//get user goal
export const getGoals= createAsyncThunk('goals/getall',async(_,thunkAPI)=>{
  try {
    const token = thunkAPI.getState().auth.user.token
    
    return await goalService.getGoals(token)
    // console.log(token)
    
    
  } catch (error) {
    const message=(error.message&& error.response.data&&error.response.data.message)||error.message||error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


export const deleteGoal= createAsyncThunk('goals/deletegoal', async (id,thunkAPI)=>{
  try{
    const token = thunkAPI.getState().auth.user.token
    return await goalService.deleteGoal(id,token)

  }catch(error){
    const message=(error.message&& error.response.data&&error.response.data.message)||error.message||error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})



export const goalSlice = createSlice({
  name:'goal',
  initialState,
  reducers:{
    reset:(state)=>initialState
  },
  extraReducers:(builder)=>{
    builder
    .addCase(createGoal.pending,(state)=>{
      state.isLoading= true
    })
    .addCase(createGoal.fulfilled,(state,action)=>{
      state.isLoading=false
      state.isSuccess= true
      state.goals.push(action.payload)
    })
    .addCase(createGoal.rejected,(state,action)=>{
      state.isLoading=false
      state.isSuccess= true
      state.message = action.payload
    })


    .addCase(getGoals.pending,(state)=>{
      state.isLoading= true
    })
    .addCase(getGoals.fulfilled,(state,action)=>{
      state.isLoading=false
      state.isSuccess= true
      state.goals= action.payload
      // console.log(action.payload)
    })
    .addCase(getGoals.rejected,(state,action)=>{
      state.isLoading=false
      state.isSuccess= true
      state.message = action.payload
    })


    .addCase(deleteGoal.pending,(state)=>{
      state.isLoading= true
    })
    .addCase(deleteGoal.fulfilled,(state,action)=>{
      state.isLoading=false
      state.isSuccess= true
      console.log(state.goals,'before filtering')
      state.goals= state.goals.filter((goal)=>goal._id !==action.payload.id)
      // console.log(action.payload)
      console.log(state.goals,'after filtering')
    })
    .addCase(deleteGoal.rejected,(state,action)=>{
      state.isLoading=false
      state.isError= true
      state.message = action.payload
    })
  }
})

export const {reset} = goalSlice.actions
export default goalSlice.reducer