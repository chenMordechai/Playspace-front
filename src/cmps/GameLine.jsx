

export function GameLine({ stages, activities, onChangeStageIdx, onChangeActivityIdx }) {
    return (
        <section className="game-line">
            {stages && <ul className="stage-line" >
                {stages.map((stage, i) => <li key={stage.name}
                    onClick={() => onChangeStageIdx(i)}>
                    {stage.name}
                    <ul className="activity-line">
                        {stage.activities.map((activity, j) => <li key={activity.name}
                            onClick={() => onChangeActivityIdx(i, j)}>
                            שאלה {j + 1}
                        </li>)}
                    </ul>
                </li>)}
            </ul>}

        </section>
    )
}