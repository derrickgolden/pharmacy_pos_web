import { FaAngleLeft } from "react-icons/fa6";

interface ValidateOrderNavbarProps{
    setEntryStep: (step: string) =>void;
    totalPrice: number;
    step: {step: string}
}

const ValidateOrderNavbar: React.FC<ValidateOrderNavbarProps> = ({ setEntryStep, totalPrice, step }) => {
    return (
        <nav className="d-flex justify-content-between navbar navbar-light bg-light px-3">
            <div>
                {
                step.step ===  "payment" && (
                    <button onClick={() => setEntryStep("inProgress")}
                        className="navbar-brand pl-2 btn btn-outline-secondary">
                            &nbsp;<FaAngleLeft /> Back
                    </button>
                    )
                }
            </div>

            <div className="d-flex mx-auto align-items-center">
                <h1 className="m-0">
                    {step.step ===  "receipt"? `${totalPrice} Ksh`: "Payment"}
                </h1>
            </div>
        </nav>
    );
};

export default ValidateOrderNavbar;
