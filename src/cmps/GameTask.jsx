import { useState } from 'react'
import arrow from '../assets/img/arrow-down.png'
import goblet from '../assets/img/goblet.png'
import star from '../assets/img/gold-star.png'
import lock from '../assets/img/lock.png'
import v from '../assets/img/gold-v.png'

export function GameTask({ task, idx, doneTasks, gameType }) {
    const [openTask, setOpenTask] = useState(false)
    const isTaskDone = doneTasks.includes(task.id) ? true : false

    function onOpenTask() {
        if (isTaskDone) {
            setOpenTask(prev => !prev)
        }
    }

    return (
        <li className={(isTaskDone ? 'open' : 'close')}>
            <div className="content">

                <div className={'img-container ' + (isTaskDone ? 'open' : 'close')}>
                    <img src={(isTaskDone ? star : lock)} />
                </div>
                <span> משימה {idx + 1}</span>
                {gameType === 'stages' && < img className={'arrow ' + (openTask ? 'rotate' : '')}
                    onClick={onOpenTask} src={arrow} />}
            </div>
            {openTask && <div className="more-content">
                <ul>
                    <li>
                        <img src={v} alt="gold-v" />
                        <span>עוד מידע מרגש על המשימה</span>
                    </li>
                    <li>
                        <img src={v} alt="gold-v" />
                        <span>עוד מידע מרגש על המשימה</span>
                    </li>
                    <li>
                        <img src={v} alt="gold-v" />
                        <span>עוד מידע מרגש על המשימה</span>
                    </li>
                    <li>
                        <img src={v} alt="gold-v" />
                        <span>עוד מידע מרגש על המשימה</span>
                    </li>
                </ul>

            </div>}
        </li>
    )
}