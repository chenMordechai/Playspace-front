import React, { useEffect, useState } from 'react';
import { gameService } from '../services/game.service.js';

export function Statistics() {


    

        const [statistics, setStatistics] = useState(null);

        useEffect(() => {
            init()
            
        }, []);

        async function init() {
            try {
                const statistics = await gameService.getStatistics();
                setStatistics(statistics);
            } catch (err) {
                console.log('err:', err);
            }
        }

        return (
            <section className="statistics">
                {statistics ? (
                    <pre>{JSON.stringify(statistics, null, 2)}</pre>
                ) : (
                    <p>Loading statistics...</p>
                )}
            </section>
        );
}