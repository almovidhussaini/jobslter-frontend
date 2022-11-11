import { useDispatch } from 'react-redux'
// import { deleteGoal } from '../features/goals/goalSlice'
import {deleteGoal} from '../features/jobs/JobSlice'

function Goalitem({goal}) {
    const dispatch = useDispatch()
    // console.log('inside goal item')
  return (
    <div>
        <div className='goal'>
            <div>
                {new Date(goal.createdAt).toLocaleString
                ('en-US')}
                
            </div>
            <h2>{goal.text}</h2>
            <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
        X
      </button>
        </div>
    </div>
  )
}

export default Goalitem
