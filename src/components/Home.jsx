import "./../styles/home.css";
import { useState, useEffect } from "react";
import Datepick from "./Datepick";
import AlarmCard from "./AlarmCard";
import audio from "./../alarm_sound.mp3";
var increment = 6;

function checkDates(date1, date2) {
    if ((date1.getDate() === date2.getDate()) && (date1.getMonth() === date2.getMonth()) &&
        (date1.getFullYear() === date2.getFullYear()) &&
        (date1.getHours() === date2.getHours()) &&
        (date1.getMinutes() === date2.getMinutes())) {
        return true;
    }
    return false;
}

function getTime() {
    const current = new Date();
    const time = current.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });
    return time;
}

function incrementbyMins(date, x) {
    date.setMinutes(date.getMinutes() + x);
    return date;
}

function clone(src) {
    return src.concat();
}

function Home() {
    const [time, setTime] = useState(getTime());
    const [alarms, setAlarms] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [alarmState, setAlarmState] = useState(false);
    const [countSnooze, setCountSnooze] = useState(0);




    useEffect(() => {
        if (alarmState) {
            console.log("true");
            let ringtone = new Audio(audio);
            ringtone.play();
            ringtone.loop = true;

            if (countSnooze < 3) {
                // alert("Will snooze ");
                setTimeout(() => {
                    ringtone.pause();
                    var a = clone(alarms);
                    a.push(incrementbyMins(a[0], increment));
                    a.sort((a, b) => Date.parse(a) - Date.parse(b));
                    if (countSnooze < 1)
                        setAlarms(a);
                    else if (countSnooze === 1) {
                        console.log("Last alarm");
                        setAlarms(a);
                    }

                    setCountSnooze(countSnooze + 1);
                }, 60000);

            }
            else {
                ringtone.pause();
                setCountSnooze(0);
            }

        }
    }, [alarmState])

    useEffect(() => {
        const current = new Date();
        if (alarms.length >= 1 && checkDates(current, alarms[0])) {
            console.log("true in time useEffect");
            setAlarmState(true);
            return () => setAlarmState(false);
        }
    }, [time]);

    useEffect(() => {
        const interval = setInterval(() => setTime(getTime()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleSetAlarmButton = () => {
        const current = new Date();
        if (current - selectedDate > 0) {
            console.log("Select a time in future");
            return;
        }
        var a = clone(alarms);
        a.push(selectedDate);
        a.sort((a, b) => Date.parse(a) - Date.parse(b));
        setAlarms(a);
    }


    return (
        <div className="wrapper">
            <h1 style={{ fontSize: '2rem' }}>Current Time : {time}</h1>

            <h3>Select new Alarm : </h3><Datepick alarmDate={selectedDate} setAlarmDate={setSelectedDate} />
            <div className="setAlarmButton">
                <button className="Alarm-Set-Btn" onClick={() => handleSetAlarmButton()}>Set Alarm</button>
            </div>
            <AlarmCard alarmset={alarms} setAlarmset={setAlarms} />
        </div>
    )
}
export default Home;