import React from 'react'
import AnswerComp from '../components/AnswerComp'
import { useLocation } from 'react-router-dom'

const StartInterview = () => {
    const { state } = useLocation();
    const { interviewId } = state || {};
    return (
    <div>
        <AnswerComp interviewId={interviewId}/>
    </div>
  )
}

export default StartInterview