import { useState } from 'react'
import arrow from '../assets/img/arrow-down.png'
import goblet from '../assets/img/goblet.png'
import v from '../assets/img/gold-v.png'

export function GameTask({ task, idx, doneTasks }) {
    const [openTask, setOpenTask] = useState(false)

    function onOpenTask() {

    }
    return (
        <li className={doneTasks.includes(task.id) ? 'open' : 'close'}>
            <div className="content">

                <div className="img-container">
                    <img src={goblet} />
                </div>
                <span> משימה {idx + 1}</span>
                <img className={'arrow ' + (openTask ? 'rotate' : '')} onClick={() => { setOpenTask(prev => !prev) }} src={arrow} />
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