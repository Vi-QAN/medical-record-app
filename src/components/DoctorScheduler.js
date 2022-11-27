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
import Alert from 'react-bootstrap/Alert'

// id generator
import { v4 as uuidv4 } from 'uuid';

// appointment states
const STATES = {
  AVAILABLE: 'Available',
  BOOKED: 'Booked',
}

// map external data to component data
const mapAppointmentData = appointment => ({
  id: appointment._id,
  startDate: new Date(appointment.startDate),
  endDate: new Date(appointment.endDate),
  title: appointment.title,
  notes: appointment.notes,
  state: appointment.state,
  patientID: appointment.patientID,
  createdBy: appointment.createdBy,
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

async function onAddAppointment({id, newItem}) {
  await fetch(url + "/doctor/" + id + "/appointments", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Object.assign({}, {token: localStorage.getItem('token')},newItem))
  }).then(res => res.json())
  .then((result) => {
    console.log(result);
  }).catch(err => {
    console.log(err);
  })
}

async function onUpdateAppointment({id, appointmentID, changed}){
  // do update 
  await fetch(url + "/doctor/" + id + "/appointment/" + appointmentID, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Object.assign({}, {token: localStorage.getItem('token')},changed[appointmentID]))
  }).then(res => res.json())
  .then(result => console.log(result))
  .catch(err => console.log(err));
}

async function onDeleteAppointment({id, deleted}){ 
  await fetch(url + "/doctor/" + id + "/appointment/" + deleted, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({token: localStorage.getItem('token')})
  }).then(res => res.json())
  .then(result => {
    console.log(result);
  })
  .catch(err => console.log(err));
}

export default function DoctorScheduler({id}) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const [successMsg, setSuccessMsg] = React.useState(null);

  const [errorMsg, setErrorMsg] = React.useState(null);
  
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
      // setLoading(true);
      const newItem = Object.assign({},{_id: uuidv4()}, added);
      data = [...data, newItem];
      onAddAppointment({id: id, newItem: newItem});
      setData(data);      
      // set loading state
      // setLoading(false);
      setSuccessMsg('Appointment added');
    }
    if (changed) {
      // setLoading(true);
      let appointmentID = '';
      data = data.map(appointment => {
        if (changed[appointment.id]){
          appointmentID = appointment.id;
          return { ...appointment, ...changed[appointment.id] }
        }
        else {
          return appointment;
        }
      })
      console.log(appointmentID);
      onUpdateAppointment({id: id, appointmentID: appointmentID, changed: changed});
      setData(data);
      // setLoading(false);
      setSuccessMsg('Appointment updated');
    }
    if (deleted !== undefined) {
      // setLoading(true);
      data = data.filter(appointment => appointment.id !== deleted);
      onDeleteAppointment({id: id, deleted: deleted});
      setData(data);
      // setLoading(false);
      setSuccessMsg('Appointment deleted')
    }
  };

  // eslint-disable-next-line no-extend-native
  Date.prototype.addHours = function(h) {
    this.setHours(this.getHours() + h);
    return this;
  }

  React.useEffect(() => {
    // get appointment data
    setLoading(true);
    fetch(url + "/doctor/" + id + "/appointments", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
    .then(result => { 
      setData(result.appointments)
    })
    .catch(err => console.log(err))
    .finally(setLoading(false));
  },[currentViewName, currentDate])

  return (
  <React.Fragment>
    {successMsg && <Alert variant={'success'}>
      {successMsg}
    </Alert>}
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