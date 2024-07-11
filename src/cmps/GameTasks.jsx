import arrow from '../assets/img/arrow-down.png'
import goblet from '../assets/img/goblet.png'

export function GameTasks({ tasks, doneTasks }) {
    console.log('doneTasks:', doneTasks)
    console.log('tasks:', tasks)
    return (
        <ul className="game-tasks">
            {tasks.map((task, idx) => <li key={task.id} className={doneTasks.includes(tasks.id) ? 'open' : 'close'}>
                <div className="img-container">
                    <img src={goblet} />
                </div>
                <span> משימה {idx + 1}</span>
                <img className="arrow" src={arrow} />
            </li>)}
        </ul>
    )
}