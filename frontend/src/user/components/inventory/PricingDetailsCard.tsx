
interface PricingDetailsCardProps{
    handlePricingInput: () => void; 
    pricingDetails: {
        price: number;
        unit_of_mesurement: string;
        package_size: number
    }
}

const units = ['tablet', 'capsule', 'milliliter', 'gram'];
const PricingDetailsCard: React.FC<PricingDetailsCardProps> = ({handlePricingInput, pricingDetails}) =>{
    return(
        <div className="d-flex flex-wrap justify-content-between align-items-center p-5  bg-light mb-2">
                <div className="form-group mb-3 col-sm-5">
                    <label htmlFor="price">Price per unit</label>
                    <input onChange={handlePricingInput} value={pricingDetails?.price}
                        type="number" className="form-control" id="price" name="price"
                        placeholder="0.00" required/>
                </div>
                <div className="form-group mb-3 col-sm-5">
                        <label htmlFor="exampleFormControlSelect1">Unit of Medicine</label>
                        <select onChange={handlePricingInput} value={pricingDetails?.unit_of_mesurement}
                        className="form-control" id="exampleFormControlSelect1" name="unit_of_mesurement">
                            <option>-select unit-</option>
                            {units.map((unit, i)=>(
                                <option key={i} >{unit}</option>
                            ))}
                        </select>
                </div>

                <div className="form-group mb-3 col-sm-5">
                    <label htmlFor="package_size">Units per container</label>
                    <input onChange={handlePricingInput} value={pricingDetails?.package_size}
                        type="number" className="form-control" id="package_size" name="package_size"
                        placeholder="How many units in 1 package" required/>
                </div>
       
        </div>
    )
}

export default PricingDetailsCard;

