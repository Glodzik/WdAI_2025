import { useState } from "react";
import Przycisk from "./Przycisk";

export default function NowyLicznik() {
    const [licznik, setLicznik] = useState(0);

    return (
        <div>
            <h3>Licznik (nowy): {licznik}</h3>
            <Przycisk zwieksz={() => setLicznik(licznik + 1)} />
        </div>
    )
}