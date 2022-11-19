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


const MAX_EVENTS_TO_DISPLAY = 50
const POLLING_INTERVAL = 500


export interface IAndroidEvent {
    eventName : string 
    data : string 
    id : string
    style : any

    isErrorEvent() : boolean
}



export class ErrorEvent implements IAndroidEvent {
    eventName: string = "";
    data: string = "Unable to connect with API :(";
    id: string = "";
    style : any = {}
    isErrorEvent(): boolean {
        return true
    }
}



export class AndroidEvent implements IAndroidEvent {
    eventName: string 
    data: string 
    id: string 
    style: any
    event : IAndroidEvent
    constructor(event : IAndroidEvent){
        this.event = event
        this.eventName = this.event.eventName;
        this.data = this.event.data;
        this.id = this.event.id;
        this.style = this.event.style;
    }
    isErrorEvent(): boolean {
        return false
    }

}

function VWEventItem(props: any) {
    let data: IAndroidEvent = props.info
    if(data.isErrorEvent()){
        return (<ListItem>
                   <ListItemText>Unable to connect with Api :(</ListItemText>
        </ListItem>)
    }
    return (
        <ListItem className={styles.listItem}>
            <div className={styles.eventFullContainer}>
                <Card className={styles.tagCard} style={data.style.tagStyle ? data.style.tagStyle : {}}><p >{data.eventName}</p></Card>
                <Card className={styles.card} style={data.style.cardStyle ? data.style.cardStyle : {}}>
                    <p>{data.data}</p>
                </Card>
            </div>
        </ListItem>)
}

export function getEvents() {
    return fetch('/getlifecycleevents/')
        .then(data => {
            return data.json().then(newData => JSON.parse(newData))
        }).then(data => {
            
            return data.map((event: any) => {
                let androidEvent : IAndroidEvent = event
                return new AndroidEvent(androidEvent);
            })
        }).catch(err => {
            return new Promise((resolveInner) => {
                resolveInner([new ErrorEvent()]) 
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
            if(data.length > 0 && data[0].isErrorEvent() && newItems.length > 0 && newItems[0].isErrorEvent()){
                //Already displaying an error message, no need to add a new row of error message
                return
            }
            if(data.length + newItems.length > MAX_EVENTS_TO_DISPLAY){
                let numOfItemsToRemove = data.length+newItems.length - MAX_EVENTS_TO_DISPLAY
                for(var i = 0;i<Math.min(numOfItemsToRemove,data.length);i++){
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
        let pollingIntervalText = (POLLING_INTERVAL/1000)+ ' seconds' 
        return (
            <div className={styles.maincontainer}>
                <h3>Activity/Fragment lifecycle tracker</h3>
                <h5>Polling Interval = {pollingIntervalText}, Currently dispalyed event count = {data.length} , event limit = {MAX_EVENTS_TO_DISPLAY}</h5>
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


