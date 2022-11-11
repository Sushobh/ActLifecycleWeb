import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import styles from './style.module.css'
export class FragmentItem {
    name: string = ""
    lastCallBackName: string = ""

    constructor(name: string, lastCallBackName: string) {
        this.name = name
        this.lastCallBackName = lastCallBackName
    }
}

export function VWFragmentListing(props: any) {

    const fragmentItems: Array<FragmentItem> = props.items

    return (<List>
        {fragmentItems.map((item) => {
            return <ListItem>
            <VWFragmentItem item={item}></VWFragmentItem>
           </ListItem>
            
        })
        }

    </List>);

}

export function VWFragmentItem(props: any) {

    const fragmentItem: FragmentItem = props.item

    return (<Card className={styles.fragmentCard}>
        <CardContent>
            <p className={styles.fragmentName}> {fragmentItem.name}</p>
            <p className={styles.callbackName}> {'onCreate'}</p>
        </CardContent>
    </Card>);

}