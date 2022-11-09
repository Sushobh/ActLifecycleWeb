import React from 'react';
import logo from './logo.svg';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import InboxIcon from '@mui/icons-material/Inbox';
import ListItemIcon from '@mui/material/ListItemIcon';
import List from '@mui/material/List';
import { Divider, ListItemButton } from '@mui/material';
import { ActivityItem, ActivityListInfo, ActivityListing } from './activitylisting/ActivityListing';
function App() {

  const activityInfo = new ActivityListInfo()
  activityInfo.addItem(new ActivityItem('MainActivity',false))
  activityInfo.addItem(new ActivityItem('PaymentActivity',false))
  activityInfo.addItem(new ActivityItem('Settings Activity',true))
  activityInfo.addItem(new ActivityItem('Product Activity',false))
  return (
    <div className="App">
         <ActivityListing info={activityInfo}></ActivityListing>
    </div>
  );
}

export default App;
