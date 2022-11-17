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
import { makeRandomString } from '../Utils';


const MAX_EVENTS_TO_DISPLAY = 100
const POLLING_INTERVAL = 2000


export interface IAndroidEvent {
    eventName : string 
    data : string 
    id : string 
}
export class AndroidEvent implements IAndroidEvent {
    eventName: string = ""
    data: string = ""
    id: string = ''
    constructor(id: string, eventType: string, eventData: string) {
        this.eventName = eventType
        this.data = eventData
        this.id = id
    }
}

function VWEventItem(props: any) {
    let data: IAndroidEvent = props.info
    console.log("Rendering")
    console.log(data)
    return (
        <ListItem className={styles.listItem}>
            <div className={styles.eventFullContainer}>
                <Card className={styles.tagCard} style={{ "backgroundColor": "lavender" }}><p >{data.eventName}</p></Card>
                <Card className={styles.card} style={{ "backgroundColor": "cadetblue" }}>
                    <p>{data.data}</p>
                </Card>
            </div>
        </ListItem>)
}

export function getEvents() {
    return fetch('http://localhost:4200/getalllifecycleevents/')
        .then(data => {
            return data.json().then(newData => JSON.parse(newData))
        }).then(data => {
            return data.map((event: any) => {
                let androidEvent : IAndroidEvent = event
                androidEvent.id = makeRandomString(10)
                return event;
            })
        }).catch(err => {
            return new Promise((resolveInner) => {
                resolveInner([new AndroidEvent("384234","Error","Something has gone wrong, activity tracker not able to connect with api.")]) 
              })
        })
}



export function VWEventListing() {
    {
        let [data, setData] = useState(new Array<IAndroidEvent>())
        useInterval(() => {
               getEvents().then(data => {
                addNewItems(data)
               })
        }, POLLING_INTERVAL);


        let addNewItems = (newItems: Array<IAndroidEvent>) => {
            if(data.length >= MAX_EVENTS_TO_DISPLAY){
                for(var i = 0;i<Math.min(newItems.length,data.length);i++){
                    data.pop()
                }
            }
            setData([...newItems, ...data])
        }

        const transitions = useTransition(data, {
            from: item => {
                return { height: '0px', opacity: '0', transform: 'scaleX(0)' }
            },
            enter: item => {
                return { height: '60px', opacity: '1', transform: 'scaleX(1)' }
            }
        })
       
        return (
            <div className={styles.maincontainer}>
                <h3>Activity/Fragment lifecycle tracker</h3>
                <h5>Polling Interval = {POLLING_INTERVAL}, Currently dispalyed event count = {data.length}</h5>
                <List className={styles.list}>
                    {
                        transitions((style, item) => (
                            <animated.div style={style} key={item.id}>
                                <VWEventItem info={item}></VWEventItem>
                            </animated.div>
                        ))
                    }
                </List>

            </div>
        );
    }
}


