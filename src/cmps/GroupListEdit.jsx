import React from 'react';

const GameGroupsEdit = ({ groups, onHandleGroupNameChange, onAddGroup, onRemoveGroup }) => {
    return (
        <>
            <label htmlFor="groups">מספר הקבוצות</label>
            <div className='group-count-container'>
                <button type="button" onClick={onRemoveGroup}>-</button>
                <p>{groups?.length || 0}</p>
                <button type="button" onClick={onAddGroup}>+</button>
            </div>
            
            {groups && <>
                <label>שמות הקבוצות</label>
                <ul className="groups">
                    {groups.map((group, i) => (
                        <li key={group.id}>
                            <label htmlFor={`groupName-${i}`}>קבוצה {i + 1}</label>
                            <input
                                type="text"
                                name="teamName"
                                id={`groupName-${i}`}
                                value={group.name}
                                onChange={(event) => onHandleGroupNameChange(event, i)}
                            />
                        </li>
                    ))}
                </ul>
            </>}
        </>
    );
};

export default GameGroupsEdit;
