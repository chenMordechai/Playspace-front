

export function GameLine({ stages, activities, onChangeStageIdx, onChangeActivityIdx }) {
    return (
        <section className="game-line">
            {stages && <ul className="stage-line" >
                {stages.map((stage, i) => <li key={i}
                    onClick={() => onChangeStageIdx(i)}>
                    {stage.name}
                    <ul className="activity-line">
                        {stage.activities.map((activity, j) => <li key={j}
                            onClick={() => onChangeActivityIdx(j, i)}>
                            שאלה {j + 1}
                        </li>)}
                    </ul>
                </li>)}
            </ul>}

            {activities && <ul className="activity-line">
                {activities.map((activity, i) => <li key={i}
                    onClick={() => onChangeActivityIdx(i)}>
                    שאלה {i + 1}
                </li>)}
            </ul>}



        </section>
    )
}