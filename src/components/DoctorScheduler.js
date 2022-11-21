import React, { useState } from 'react';
import url from '../constants/link';
import Paper from '@mui/material/Paper';
import { EditingState, ViewState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton,
  WeekView,
  ViewSwitcher,
  AppointmentForm,
  AppointmentTooltip,
  Resources,
  ConfirmationDialog
} from '@devexpress/dx-react-scheduler-material-ui';
import * as Colors from '../constants/colors';

// appointment states
const STATES = {
  AVAILABLE: 'Available',
  BOOKED: 'Booked',
}

// map external data to component data
const mapAppointmentData = appointment => ({
  id: appointment.id,
  startDate: appointment.startDate,
  endDate: appointment.endDate,
  title: appointment.title,
  notes: appointment.notes,
  state: appointment.state,
  patientID: appointment.patientID
})

// custom appointment style
const Appointment = ({
    children, 
    style,
    ...restProps
    
  }) => (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        borderRadius: '8px',
      }}
    >

    {children}
    
      
      
      
    </Appointments.Appointment>
  );

// custom appointment form
const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  const onCustomFieldChange = (nextValue) => {
    onFieldChange({ patientID: nextValue });
  };

  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    >
      <AppointmentForm.Label
        text="Patient ID"
        type="title"
      />
      <AppointmentForm.TextEditor
        value={appointmentData.patientID}
        onValueChange={onCustomFieldChange}
        readOnly={appointmentData.state === STATES.BOOKED ? true : false}
      />
    </AppointmentForm.BasicLayout>
  );
};


// initial data
const initialState = {
  data: [],
  loading: false,
  currentDate: new Date().toLocaleDateString(),
  currentViewName: 'Day',
  resources: [
    {
      fieldName: 'state',
      title: 'State',
      instances: [
        {id: STATES.AVAILABLE, text: STATES.AVAILABLE, color: Colors.lightGreen},
        {id: STATES.BOOKED, text: STATES.BOOKED, color: Colors.lightBlue}
      ]
    },

  ]
}

// 
const reducer = (state, action) => {
  switch (action.type) {
    case 'setLoading':
      return { ...state, loading: action.payload };
    case 'setData':
      return { ...state, data: action.payload.map(mapAppointmentData) };
    case 'setCurrentViewName':
      return { ...state, currentViewName: action.payload };
    case 'setCurrentDate':
      return { ...state, currentDate: action.payload };
    default:
      return state;
  }
}

export default function DoctorScheduler({id}) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  
  const {
    data, loading, currentViewName, currentDate, resources
  } = state;
  const setCurrentViewName = React.useCallback(nextViewName => dispatch({
    type: 'setCurrentViewName', payload: nextViewName,
  }), [dispatch]);
  const setData = React.useCallback(nextData => dispatch({
    type: 'setData', payload: nextData,
  }), [dispatch]);
  const setCurrentDate = React.useCallback(nextDate => dispatch({
    type: 'setCurrentDate', payload: nextDate,
  }), [dispatch]);
  const setLoading = React.useCallback(nextLoading => dispatch({
    type: 'setLoading', payload: nextLoading,
  }), [dispatch]);

  // change item in data
  const commitChanges = ({ added, changed, deleted }) => {
    let data = state.data;
    if (added) {
      const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
      data = [...data, Object.assign({},{id: startingAddedId}, added)];
      console.log(added);
    }
    if (changed) {
      data = data.map(appointment => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      console.log(changed);  
    }
    if (deleted !== undefined) {
      console.log(deleted);
      data = data.filter(appointment => appointment.id !== deleted);
    }
    console.log(data);
    setData(data);
  };

  // eslint-disable-next-line no-extend-native
  Date.prototype.addHours = function(h) {
    this.setHours(this.getHours() + h);
    return this;
  }

  // example data
  const exampleData = [{
    id: 1,
    createBy: 'DD18129855',
    startDate: new Date().toISOString(),
    endDate: new Date().addHours(2),
    isAvailable: true,
    patientID: 'PD18129855',
  },
  {
    id: 2,
    createBy: 'DD18129855',
    startDate: new Date().toISOString(),
    endDate: new Date().addHours(4).toISOString(),
    isAvailable: false,
    patientID: 'PD18129855',
  }]
  React.useEffect(() => {
    // setData(exampleData);
  // get appointment data
  //   setLoading(true);
  //   fetch(url + "/schedule" + id, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }).then(res => res.json())
  //   .then()
  },[setData, currentViewName, currentDate])

  return (
  <React.Fragment>
    <Paper>
      <Scheduler
          data={data}
      >
          <ViewState
              currentDate={currentDate}
              currentViewName={currentViewName}
              onCurrentViewNameChange={setCurrentViewName}
              onCurrentDateChange={setCurrentDate}
          />

          <EditingState
            onCommitChanges={commitChanges}
          />
          <IntegratedEditing />
          <DayView
              startDayHour={9}
              endDayHour={15}
          />
          <WeekView startDayHour={9} endDayHour={15} />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <ConfirmationDialog />
          <Appointments 
            appointmentComponent={Appointment}  
            // appointmentContentComponent={AppointmentContent}
            />
          <AppointmentTooltip
            showOpenButton
            showCloseButton
          />
          <Resources
              data={resources}
              mainResourceName='state'
          />
          <AppointmentForm 
            basicLayoutComponent={BasicLayout}/>
      </Scheduler>
    </Paper>
  </React.Fragment>)
}