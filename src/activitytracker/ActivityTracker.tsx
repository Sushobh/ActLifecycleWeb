import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import styles from "./activitytracker.module.css"
import { count } from 'console';
import { useInterval } from './UseInterval';
import { useState } from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group"
import * as React from 'react';


export class AndroidEvent {
    eventType: string = ""
    eventData: any = {}
    id: string = ''
    constructor(id: string, eventType: string, eventData: any) {
        this.eventType = eventType
        this.eventData = eventData
        this.id = id
    }
}

function VWEventItem(props: any) {
    let data: AndroidEvent = props.info
    return (
        <ListItem className={styles.listItem}>
            <div className={styles.eventFullContainer}>
                <Card className={styles.tagCard} style={{ "backgroundColor": "lavender" }}><p >{data.eventType}</p></Card>
                <Card className={styles.card} style={{ "backgroundColor": "cadetblue" }}>
                    <p>{data.eventData.text}</p>
                </Card>
            </div>
        </ListItem>)
}

export function VWEventListing() {
    {
        let [data, setData] = useState(new Array<AndroidEvent>())
        useInterval(() => {
            let event = new AndroidEvent(data.length + 1 + '', 'Activity', { text: 'MainActivity => OnCreate' })
            setData([...data, event])
        }, 1000);

        return (

            <div className={styles.maincontainer}>
                <h3>Activity/Fragment lifecycle tracker</h3>
                <List className={styles.list}>
                    {
                        data.map((_, i) => {
                            return <VWEventItem key={data[i].id} info={data[i]}></VWEventItem>
                        }
                        )
                    }
                </List>

            </div>
        );
    }
}


