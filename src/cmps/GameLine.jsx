

export function GameLine({ stages, activities, onChangeStageIdx, onChangeActivityIdx }) {
    return (
        <section className="game-line">
            {stages && <ul className="stage-line" >
                {stages.map((stage, i) => <li key={stage.name}
                    onClick={() => onChangeStageIdx(i)}>
                    {stage.name}
                    <ul className="activity-line">
                        {stage.activities.map((activity, j) => <li key={activity.name}
                            onClick={() => onChangeActivityIdx(j, i)}>
                            שאלה {j + 1}
                        </li>)}
                    </ul>
                </li>)}
            </ul>}

            {activities && <ul className="activity-line">
                {activities.map((activity, i) => <li key={activity.name}
                    onClick={() => onChangeActivityIdx(i)}>
                    שאלה {i + 1}
                </li>)}
            </ul>}



        </section>
    )
}