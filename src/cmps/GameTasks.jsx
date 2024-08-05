
import { GameTask } from './GameTask'

export function GameTasks({ tasks, doneTasks, gameType }) {
    console.log('doneTasks:', doneTasks)
    console.log('tasks:', tasks)
    return (
        <ul className="game-tasks">
            {tasks.map((task, idx) =>
                <GameTask gameType={gameType} key={task.id} task={task} idx={idx} doneTasks={doneTasks} />)}
            {/* <GameTask gameType={gameType} key={task.id} task={task} idx={idx} doneTasks={doneTasks} />)} */}
        </ul>
    )
}