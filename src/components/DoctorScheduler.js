import React from 'react';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton,
  WeekView,
  MonthView,
  ViewSwitcher
} from '@devexpress/dx-react-scheduler-material-ui';
import * as Colors from '../constants/colors';

const currentDate = '2018-11-01';
const schedulerData = [
  { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
  { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
];


// custom appointment style
const Appointment = ({
    children, style, ...restProps
  }) => (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        backgroundColor: Colors.darkBlue,
        borderRadius: '8px',
      }}
    >
      {children}
    </Appointments.Appointment>
  );

export default function DoctorScheduler() {

    return (
    <React.Fragment>
        <Scheduler
            data={schedulerData}
        >
            <ViewState
                currentDate={currentDate}
            />
            <Toolbar />
            <ViewSwitcher />
            <DayView
                startDayHour={9}
                endDayHour={14}
            />
            <WeekView startDayHour={9} endDayHour={19} />
            <MonthView />
            <DateNavigator />
            <TodayButton />
            <Appointments appointmentComponent={Appointment} />
        </Scheduler>
    </React.Fragment>)
}