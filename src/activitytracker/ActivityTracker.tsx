import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import styles from "./activitytracker.module.css"
import { count } from 'console';
import { useInterval } from './UseInterval';
import { useState } from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group"
import * as React from 'react';
import { useTransition, animated } from '@react-spring/web'

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
            let event = new AndroidEvent(data.length + 1 + '', 'Activity', { text: 'MainActivity => OnCreate'+(data.length+1) })
            let event1 = new AndroidEvent(data.length + 2 + '', 'Activity', { text: 'MainActivity => OnCreate'+(data.length+2) })
            let event2 = new AndroidEvent(data.length + 3 + '', 'Activity', { text: 'MainActivity => OnCreate'+(data.length+3) })
            addNewItems([event])
        }, 2000);


 

        let addNewItems = (newItems : Array<AndroidEvent>) => {
            setData([...newItems, ...data])
        }


        const transitions = useTransition(data, {
            from: item => {
                return { height : '0px', opacity : '0', transform: 'scaleX(0)' }
            },
            enter: item => {
                return { height : '60px' , opacity : '1', transform: 'scaleX(1)'}
            },
        })

        return (
            <div className={styles.maincontainer}>
                <h3>Activity/Fragment lifecycle tracker</h3>
                <List className={styles.list}>
                    {
                        transitions((style, item) => (
                            <animated.div style={style} key={item.id}>
                                <VWEventItem  info={item}></VWEventItem>
                            </animated.div>
                        ))
                    }
                </List>

            </div>
        );
    }
}


