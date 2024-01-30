import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { BottomSummaryCardProps, BottomSummaryCardValueProps } from "./types";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from "react";
import { Link } from "react-router-dom";

interface CustomDatePickerInputProps {
    value: string;
    onClick: () => void;
    onChange: (date: Date | null) => void; // Adjusted onChange prop
  }
  
  const CustomDatePickerInput: React.FC<any> = ({ value, onClick, onChange, ...rest }) => (
    <div className="d-flex align-items-center custom-datepicker-input" onClick={onClick}>
      {value} <FaChevronDown size={14} />
      <input
        {...rest}
        style={{ display: 'none' }}
        onChange={(e) => onChange && onChange(new Date(e.target.value))}
      />
    </div>
  );

const BottomSummaryCard: React.FC<{data: BottomSummaryCardValueProps}> = ({data}) =>{
    const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    
  };

    return(
        <div className="card border-secondary mb-5 col-sm-5 p-0" >
            <div className="card-header d-flex justify-content-between align-items-center">
            <p className="text-poppins-semibold mb-0">{data.title}</p>
            {!data.display_date_picker &&
                (
                    <Link className="text-poppins-regular" to={data.side_title_link}>
                        {data.side_title_link_caption} <MdOutlineKeyboardDoubleArrowRight />
                    </Link>
                ) || (
                    <div >
                        <DatePicker 
                            selected={selectedDate}
                            onChange={handleDateChange}
                            customInput={<CustomDatePickerInput />}
                            dateFormat="dd/MM/yyyy"
                            className="custom-datepicker"
                            wrapperClassName="text-poppins-regular datepicker-wrapper custom-datepicker-wrapper"
                            calendarClassName="custom-calendar"
                        />
                    </div>
                )
            }
            </div>

            <div className="d-flex justify-content-between card-body text-dark ">
                <div className="col-6 text-left">
                    <h5 className="card-title text-poppins-bold">{data.left_totals}</h5>
                    <p className="card-text text-poppins">
                        {data.left_totals_caption }
                    </p>
                </div>
                <div className="col-6 text-left">
                    <h5 className="card-title text-poppins-bold">
                        {data.title === "Customers"? data.freq_bought_item: data.right_totals}
                    </h5>
                    <p className="card-text text-poppins">{data.right_totals_caption}</p>
                </div>
            </div>
        </div>
    )
}


export default BottomSummaryCard;