

export function GameLine({ stages, activities, onChangeStageIdx }) {
    return (
        <section className="game-line">
            {stages && <ul className="stage-line" >
                {stages.map((stage, i) => <li key={stage.name}
                    onClick={() => onChangeStageIdx(i)}>
                    {stage.name}
                    <ul className="activity-line">
                        {stage.activities.map((activity, j) => <li>
                            {j}
                        </li>)}
                    </ul>
                </li>)}
            </ul>}

        </section>
    )
}