import { List, ListItem, ListItemButton, ListItemText } from "@mui/material"



export class ActivityListInfo {
    items : Array<ActivityItem> = []
    
    addItem(item : ActivityItem){
        this.items.push(item)
    }
}

export class ActivityItem {

    name : String = ""
    isSelected : boolean = false

    constructor(name : String, isSelected : boolean){
       this.isSelected = isSelected
       this.name = name
    }
}

export function ActivityListing(props : any) {
    let info : ActivityListInfo = props.info
    return (
          <List>  
               {info.items.map( (item : ActivityItem) => {
                  return <ListItem>
                  <ListItemButton selected={item.isSelected}>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
               })}
          </List>
    )
}