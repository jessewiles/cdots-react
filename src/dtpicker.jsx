import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class DateTimePicker extends Component {
    render() {
        const klass = this.props.klass,
              aid = this.props.aid,
              date = this.props.date,
              time = this.props.time;
              console.log(klass);
              console.log(aid);
              console.log(date);
              // TODO: finish these components
        return (
            <div className="dtpicker">
                <div className="specify-time-group">
                    <input type="checkbox" name="start-specify-time-ctrl-{aid}" defaultChecked/>
                    <label htmlFor="start-specify-time-ctrl-{aid}">Specify time</label>
                </div>

                <div>
                    <div className="inb">
                        <div className="input-group date" id="start-dtpicker-date-{aid}">
                            <input type="text" className="form-control" value="{date}" readOnly/>
                            <span className="input-group-addon">
                                <span className="glyphicon glyphicon-calendar">
                                </span>
                            </span>
                        </div>
                    </div>

                    <div className="inb" id="start-time-ctrl-{aid}">
                        <div className="input-group time" id="start-dtpicker-time-{aid}">
                            <input type="text" className="form-control" value="{time}" readOnly/>
                            <span className="input-group-addon">
                                <span className="glyphicon glyphicon-time">
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DateTimePicker