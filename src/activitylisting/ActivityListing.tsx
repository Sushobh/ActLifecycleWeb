import { List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { useState } from "react"
import { FragmentItem } from "./fragmentlisting/FragmentListing"



export class ActivityListInfo {
    items: Array<ActivityItem> = []
    
    addItem(item: ActivityItem) {
        this.items.push(item)
    }
}

export class ActivityItem {

    name: string = ""
    isSelected: boolean = false
    lastCallBackName : string = ""
    fragmentItems : Array<FragmentItem> = []
    constructor(name: string, isSelected: boolean,lastCallBackName : string) {
        this.isSelected = isSelected
        this.name = name
        this.lastCallBackName = lastCallBackName
    }
}

export function VWActivityListing(props: any) {
    let info: ActivityListInfo = props.info
    const [selectedIndex, setSelectedIndex] = useState(-1)
    return (
        <List style={{ 'width': '500px' }}>
            {info.items.map((item: ActivityItem, index: number) => {
                return <ListItem>
                    <ListItemButton selected={item.isSelected}>
                        <ListItemText primary={item.name + '      ('+item.lastCallBackName+')'} />
                    </ListItemButton>
                </ListItem>
            })}
        </List>
    )
}