import { useState, useEffect } from "react";

export default function Odliczanie() {
    const [czas, setCzas] = useState(15.0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    const czyOdlicza = intervalId !== null;
    const przyciskTekst = czas <= 0 ? 'Odliczanie zakończone' : czyOdlicza ? 'STOP' : 'START';

    const startOdliczanie = () => {
        if (intervalId) clearInterval(intervalId);

        const id = setInterval(() => {
            setCzas(prev => {
                const nowyCzas = Math.round((prev - 0.1) * 10) / 10;

                if (nowyCzas <= 0) {
                    clearInterval(id);
                    setIntervalId(null);
                    return 0;
                }
                
                return nowyCzas;
            });
        }, 100);

        setIntervalId(id);
    };

    const stopOdliczanie = () => {
        if(intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };

    const handleStartStop = () => {
        if (czas <= 0) return;
        if (czyOdlicza) stopOdliczanie();
        else startOdliczanie(); 
    };

    useEffect(() => {
        return () => {
            if(intervalId) clearInterval(intervalId);
        }
    }, [intervalId]);

    return (
        <div>
            <div>{czas}</div>
            <button onClick={handleStartStop} disabled={czas <= 0}>{przyciskTekst}</button>
        </div>
    );
}