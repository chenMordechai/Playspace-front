import React from 'react';

const handleYesNoButtonClick = (ev, i, j, onHandleActivityChange, corrAns) => {
    ev.target.value = corrAns
    ev.target.name = "correctAnswer"
    onHandleActivityChange(ev, i, j)
};

const CorrectAnswerEdit = ({ activity, i, j, onHandleActivityChange }) => {
  return (
    <div>
      {activity.activityType === "yesno" ? (
        <div className='yes-no-buttons-container'>
          <button 
            className={activity.correctAnswer === 'yes' ? 'active' : ''}
            type="button" 
            onClick={(ev) => handleYesNoButtonClick(ev, i, j, onHandleActivityChange, 'yes')}
          >
            נכון
          </button>
          <button 
            className={activity.correctAnswer === 'no' ? 'active' : ''}
            type="button" 
            onClick={(ev) => handleYesNoButtonClick(ev, i, j, onHandleActivityChange, 'no')}
          >
            לא נכון
          </button>
        </div>
      ) : (
        <input
          required
          type="text"
          name="correctAnswer"
          id="correctAnswer"
          value={activity.correctAnswer}
          onChange={(event) => onHandleActivityChange(event, i, j)}
        />
      )}
    </div>
  );
};

export default CorrectAnswerEdit;