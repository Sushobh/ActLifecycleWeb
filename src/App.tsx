
import styles from './App.module.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ActivityItem, ActivityListInfo, VWActivityListing } from './activitylisting/ActivityListing';
import { FragmentItem, VWFragmentListing } from './activitylisting/fragmentlisting/FragmentListing';
import { VWEventListing } from './activitytracker/ActivityTracker';
/* function App() {

  const activityInfo = new ActivityListInfo()
  activityInfo.addItem(new ActivityItem('MainActivity',false,'onCreate'))
  activityInfo.addItem(new ActivityItem('PaymentActivity',false,'onDestroy'))
  activityInfo.addItem(new ActivityItem('Settings Activity',true,'onResume'))
  activityInfo.addItem(new ActivityItem('Product Activity',false,'onCreateView'))

  const fragmentItems : Array<FragmentItem> = []
  fragmentItems.push(new FragmentItem('ChildFragment1',"onCreate"))
  fragmentItems.push(new FragmentItem('ChildFragment2',"onStop"))
  fragmentItems.push(new FragmentItem('ChildFragment3',"onResume"))
  return (
    <div className={styles.MainContainer}>
          <h2>Activity Tracker</h2> 
          <div className={styles.MainContainer2}>
              <VWActivityListing info={activityInfo}></VWActivityListing> 
              <VWFragmentListing items={fragmentItems}>
              </VWFragmentListing>
          </div>
    </div>
  );
}
 */

function App() {
  return (<VWEventListing></VWEventListing>)
}
export default App;
