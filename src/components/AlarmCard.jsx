function clone(src) {
    return src.concat();
}
function AlarmCard({ alarmset, setAlarmset }) {
    const handleDelete = (index) => {
        var arr = [];
        for (var i = 0; i < alarmset.length; i++) {
            if (i === index) continue;
            arr.push(alarmset[i]);
        }
        setAlarmset(arr);
    }
    return (
        <div>
            <div style={{ backgroundColor: '#0ff92c', width: '400px', paddingBottom: '25px', paddingLeft: '20px', color: 'black', borderRadius: '10px' }}>
                <h1>Upcoming Alarms</h1>
                {alarmset.map((date, index) => (
                    <div className="dates" key={index}>
                        {`Alarm on ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} 
                     @${date.getHours()}:${date.getMinutes()}`}
                        <button onClick={() => handleDelete(index)}>Delete</button>
                    </div>
                ))
                }
            </div >
        </div>
    )
}

export default AlarmCard;