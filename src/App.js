import React from 'react';
import muffin from './muffin.png';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

const durations = [
    {name: "15 min", value: 15},
    {name: "30 min", value: 30},
    {name: "1 h", value: 60},
    {name: "2 h", value: 120},
];

function App() {
    const [duration, setDuration] = React.useState(15);
    const [dateTime, setDateTime] = React.useState(new Date());
    const [result, setResult] = React.useState(null);

    const invoke = () => {
        fetch('https://vbzqg5rap5.execute-api.eu-central-1.amazonaws.com/test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({start: dateTime, duration: duration})
        })
            .then(response => response.json())
            .then(data => setResult(data))
            .catch(err => console.log(err));
    };

    const getResultText = () => {
        if (result != null) {
            return result === true
                ? "The meeting can be accepted to the calendar"
                : "Please select another time"
        }
        return "";
    };

    return (
        <div className="App">
            <img src={muffin} className="muffin" alt="muffin"/>
            <div className="container">
                <h3>Please pick the date, time and the duration of the meeting to see if it can be added to the
                    calendar</h3>
                <form className="form" noValidate>
                    <TextField
                        id="datetime-local"
                        label="Pick a date and time"
                        type="datetime-local"
                        value={dateTime}
                        onChange={(event) => {setDateTime(event.target.value);}}
                        className="dateTimePicker"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="standard-select-currency"
                        select
                        label="Select the duration"
                        className="duration"
                        value={duration}
                        onChange={(event) => {setDuration(event.target.value);}}
                    >
                        {durations.map((option, index) => (
                            <MenuItem key={index} value={option.value}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button size="small" variant="outlined" onClick={invoke}>
                        Check availability
                    </Button>
                </form>
                <p>{getResultText()}</p>
            </div>
        </div>
    );
}

export default App;
