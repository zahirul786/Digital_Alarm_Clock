import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


const Datepick = ({ alarmDate, setAlarmDate }) => {
    const dateHandler = (date) => {
        setAlarmDate(date);

    }
    return (
        <div>
            <DatePicker locale="en" selected={alarmDate} onChange={(date) => dateHandler(date)} showTimeSelect timeIntervals={1} dateFormat="MMMM d, yyyy h:mm aa" />
        </div>
    );
};

export default Datepick;