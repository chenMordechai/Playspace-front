import {useState} from 'react'

export function ActivityPreview ({activity,moveToNextActivity}){
    console.log('activity:', activity)
    const [closeMessageBefore, setCloseMessageBefore] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)

    const [textAreaValue , setTextAreaValue] = useState('')


    function checkMultipleAnswer(i){
        if(i === activity.correctAnswerId) setIsAnswerCorrect(true)
        else {
    // check max error
    }

    }

    function onMoveToNextActivity(){
        moveToNextActivity()
        setIsAnswerCorrect(false)
    }

    function handlaChange(ev){
        const {value} = ev.target
        setTextAreaValue(value)
    }

    if(!activity) return ''
    return (
        <section className="activity-preview">
            <h2>ActivityPreview</h2>
            {activity.messageBefore && !closeMessageBefore && <>
             <h3>ההודעה לפני:{activity.messageBefore}</h3>
             <button onClick={()=>setCloseMessageBefore(prev=>!prev)}>התקדם לשאלה</button>
             </>}
           
        
          { closeMessageBefore && <section> 
            <h3>השאלה: {activity.name}</h3>

            <section className="answer-container">
                <h2>Answer:</h2>
                { activity.activityType === 'multiple' && 
                    <div className="multiple-answer">
                         {activity.activityAnswers.map((a,i)=> <button key={a}
                         onClick={()=>checkMultipleAnswer(i)}>
                                {a}
                         </button>)}
                    </div> }

                    {activity.activityType === 'open' && 
                    <div className="open-answer">
                        <textarea value={textAreaValue} onChange={handlaChange}/>


                        </div>}
            </section>

            

           { isAnswerCorrect&& <section>
                <h3>יופי !!  תשובה נכונה</h3>
           <button onClick={onMoveToNextActivity}>מעבר לשאלה הבאה</button>
           </section>}
            </section>}

        </section>
    )
}