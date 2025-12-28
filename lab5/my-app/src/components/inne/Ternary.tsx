export default function Ternary() {
    const a: boolean = true;
    const b: boolean = false;

    return (
        <div>
            {
                a ? (
                    <div>Stwierdzenie a jest prawdziwe</div>
                ) : (
                    <div>Stwierdzenie a jest fałszywe</div>
                )
            }

            {
                b ? (
                    <div>Stwierdzenie b jest prawdziwe</div>
                ) : (
                    <div>Stwierdzenie b jest fałszywe</div>
                )
            }
        </div>
    )
}