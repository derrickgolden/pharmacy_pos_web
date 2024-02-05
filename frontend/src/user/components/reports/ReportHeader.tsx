import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import DatePicker, {ReactDatePickerProps} from 'react-datepicker';

import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { salesProps } from "./SalesTable";
import { CSVLink } from 'react-csv';
import { csvAttributes, csvPaymentsAttributes } from "./csvAttributes";

interface PagesHeaderProps{
    handleRegenerateGraph: (date: SelectedDate) => void;
    salesData: salesProps[] | undefined
    dataType: "Payments" | "Sales"
}
export interface SelectedDate {
    startDate: Date;
    endDate: Date;
}
const CustomDatePickerInput: React.FC<any> = ({ value, onClick, onChange, ...rest }) => (
    <div className="d-flex align-items-center custom-datepicker-input" onClick={onClick}>
      {value} <SlCalender size={14} style={{marginLeft: "4px"}}/>
      <input
        {...rest}
        style={{ display: 'none' }}
        onChange={(e) => onChange && onChange(new Date(e.target.value))}
        // Parse the input value to a Date object
      />
    </div>
  );

const today = new Date();
const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

const ReportHeader: React.FC<PagesHeaderProps> = ({handleRegenerateGraph, salesData, dataType}) =>{
    const [selectedDate, setSelectedDate] = useState<SelectedDate>({
        startDate:  thirtyDaysAgo,
        endDate: new Date(),
    });

    const handleDateChange = (date: Date | [Date, Date]) => {
        if (Array.isArray(date)) {            
            setSelectedDate({ startDate: date[0], endDate: date[1] });
        } else {
            setSelectedDate((dates) =>({ ...dates, startDate: date }));
        }
    };

    // Trigger download
    const handleDownload = () => {
        // console.log(salesData);
        let data;
        if(dataType === "Sales"){
            data = csvAttributes(salesData);
        }else if(dataType === "Payments"){
            data = csvPaymentsAttributes(salesData);
        }
        if(data){
            const startDate = new Date(selectedDate.startDate).toLocaleDateString()
            const endDate = new Date(selectedDate.endDate).toLocaleDateString()

            const blob = new Blob([data.csvData], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${dataType} Report ${startDate}-${endDate}.csv`;
            link.click();
        }
    };

    return(
        <section className="upper-section bg-light px-2 pt-5 mb-md-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center px-md-5">
                <div>
                    <div className="d-flex align-items-center">
                        <h1 className="font-weight-bold fs-4 lh-1" 
                            style={{fontFamily: 'sans-serif', color: 'rgba(29, 36, 46, 0.5)'}}>
                                Reports &nbsp;
                        </h1>
                        <FaChevronRight />
                        <h1 className="font-weight-bold fs-4" style={{ fontFamily: 'Poppins', color: '#1D242E' }}>
                            &nbsp; {dataType} Report
                        </h1>
                    </div>
                    <p className="font-family-poppins font-weight-400 font-size-14 line-height-21 text-dark">
                        {dataType} related report of the pharmacy.
                    </p>
                </div>                
                <button className="btn btn-outline-primary align-content-center" onClick={handleDownload}>
                    Download {dataType} Report
                </button>
            </div>
            <div className="d-flex  col-11 m-auto gap-5 align-items-center">
                <div className="d-flex flex-wrap mt-4 mt-sm-0 align-items-end gap-1 gap-sm-4">
                    <div className="my-0 my-sm-0 ">
                        <span>Date Range</span>
                        <div className="d-flex gap-2 border p-2 rounded "
                        style={{width: "fit-content"}}>
                        <DatePicker
                            selected={selectedDate.startDate}
                            onChange={handleDateChange}
                            startDate={selectedDate.startDate}
                            endDate={selectedDate.endDate}
                            selectsRange // Enable range selection
                            customInput={<CustomDatePickerInput />}
                            dateFormat="dd MMMM yyyy"
                            className="custom-datepicker"
                            wrapperClassName="text-poppins-regular datepicker-wrapper custom-datepicker-wrapper"
                            calendarClassName="custom-calendar"
                            maxDate={today}
                        />
                        </div>
                    </div>
                    <button onClick={() => handleRegenerateGraph(selectedDate)}
                        type="button" className="btn btn-outline-secondary " 
                        style={{height: "40px"}}>
                            Regenerate
                    </button>
                </div>
                <div className="bg-white align-items-center bg-light" >
                    {/* <p className="bg-light col-12 m-0">Medicine Group</p>
                    <select className="form-select bg-light m-0 flex-grow-1 font-family-poppins font-weight-400 font-size-15 line-height-22 text-dark"
                    aria-label="Download Report">
                        <option value="download">- Select Group -</option>
                        <option value="sales">Day Sales</option>
                        <option value="payments">Week Sales</option>
                        <option value="payments">Month Sales</option>
                    </select> */}
                </div>  
            </div>
        </section>
    )
}

export default ReportHeader;