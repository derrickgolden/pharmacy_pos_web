import { Link, useNavigate } from "react-router-dom";
import { TopSummaryCardProps } from "./types";

import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const customCardStyle: Record<string, { border: string; text: string; bg: string }> = {
    success:{border: "border-success", text: "text-success", bg: "bg-success-light"},
    warning:{border: "border-warning", text: "text-warning", bg: "bg-warning-light"},
    info:{border: "border-info", text: "text-info", bg: "bg-info-light"},
    danger:{border: "border-danger", text: "text-danger", bg: "bg-danger-light"},
}
const TopSummaryCard: React.FC<TopSummaryCardProps> = ({ data }) =>{
    const navigate = useNavigate()

    return(
        <div className={`${customCardStyle[data?.forCssDispaly]?.border} p-0 card bg-light mb-4
        text-center col-5 col-sm-5 col-lg-2 bg-primary-light border border-1 rounded-4`} 
        style={{ boxSizing: 'border-box' }}>
            <div className={`${customCardStyle[data?.forCssDispaly]?.border} card-body 
            bg-white border rounded-top`}>
                <h5 className={`${customCardStyle[data?.forCssDispaly]?.text} card-title`}>
                    {data.icon}
                </h5>
                <h3 className="card-text text-poppins-bold"> {data.totals} &nbsp;
                    {data.caption === "Inventory Status"? data.status : ""}
                </h3>
                <p className="text-poppins capitalize">{data.caption}</p>
            </div>
            <div onClick={() =>{navigate("/user/dashboard/details", 
                {state: {data: data.data, caption: data.caption , color: customCardStyle[data?.forCssDispaly]?.text }})
            }}
            className={`${customCardStyle[data?.forCssDispaly]?.bg} d-flex 
            justify-content-around align-items-center card-footer `}
            style={{cursor: "pointer"}}>
                <Link to="#" className="text-poppins-regular">{data.footerCaption}</Link>
                <MdOutlineKeyboardDoubleArrowRight />
            </div>
        </div>
    )
}

export default TopSummaryCard;