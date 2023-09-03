import React, { useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Place } from '@mui/icons-material';
import axios from 'axios';

//url base para el api de openstraeet map 
const baseURL =  "https://nominatim.openstreetmap.org/search?"
//parametros adicionales para la url
const params = {
    q: '',
    format: 'json',
    addressdetails: 'addressdetails'
}

//configuracion del input
export const Search = (props) => {
    const {selectPosition, setPosition} = props;
    const [searchText, setSearchText] = useState("")
    const [lugares, setLugares] = useState([])
   
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex'}}>
                <div style={{flex: 1}}>
                    <OutlinedInput 
                        style={{width: '100%'}} 
                        value={searchText} 
                        onChange={
                            (e)=>{
                                setSearchText(e.target.value)
                            }
                        }
                    />
                </div>
                <div style={{display: 'flex', alignItems: 'center', padding: '0px 20px'}}>
                    <Button 
                        variant='contained' 
                        color='primary' 
                        onClick={
                            () => {
                                const params = {
                                    q : searchText ,
                                    format: 'json',
                                    addressdetails: 1,
                                    polygon_geojson: 0
                                }
                                const queryString = new URLSearchParams(params).toString()
                                const requestOptions = {
                                    method: 'GET',
                                    redirect: 'follow'
                                }
                               
                                fetch(`${baseURL}${queryString}`, requestOptions)
                                .then((response) => response.text())
                                .then((result) => {
                                    setLugares(JSON.parse(result))
                                })
                                .catch((err) => console.log('err: ', err))

                            }
                        }>
                        Buscar
                    </Button>
                </div>
            </div>
            <div>
                <nav aria-label="main mailbox folders">
                    
                    <List>
                        {
                            lugares.map((item) => {
                                return(
                                    <div key={item?.place_id}>
                                        <ListItem disablePadding>
                                            <ListItemButton onClick={() =>{ setPosition(item) }}>
                                            <ListItemIcon>
                                                <Place />
                                            </ListItemIcon>
                                            <ListItemText primary={item?.display_name} />
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider />
                                    </div>
                                )
                            })
                        }
                        
                    </List>
                </nav>
            </div>
        </div>

        
    )
}
