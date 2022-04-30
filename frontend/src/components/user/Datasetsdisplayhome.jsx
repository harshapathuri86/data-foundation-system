import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import { useNavigate } from "react-router-dom"
import { useState,useEffect } from 'react';
import axios from 'axios';
import Card from '../templates/Card';

// import SearchBar from 'material-ui-search-bar';

import Navbar from '../templates/Navbar';



export default function Datasetsdisplayhome() {
    let navigate = useNavigate();
    let [datasets, setDatasets] = useState([]);
    
    useEffect(() => {
        if (localStorage.getItem('user')) {
            let user = JSON.parse(localStorage.getItem('user'));
            console.log("user", user);
            if (user.group === "admin") {
                navigate("/approve");
            } else if (user.group === "publisher") {
                navigate("/mydatasets");
            } else {
                navigate("/");
            }
        }
    }, [navigate]);

    // make request to "api/api/datasets/" to get all the datasets and store them in datasets
    useEffect(() => {
        axios.get("/api/api/datasets/", {
            headers: {}
        })
            .then(res => {
                console.log("res", res);
                setDatasets(res.data);
            })
            .catch(err => {
                console.log("err", err);
            });
    }, []); 


    return (

        <div className="myDatasets" >
            <Navbar />

            <div className="myDatasets-heading" style={{marginTop:'10vh'}}>
                <h2 style={{fontSize:'xx-large'}}>DATA FOUNDATION</h2>
            </div>

            <div className="myDatasets-list">
                <Stack direction="row" spacing={2} justifyContent="right" alignItems="flex-end" sx={{ "margin": '10px' }}>

                    <Button variant="contained" color="info" onClick={ () => { navigate("/login"); } }>Login</Button>
                    <Button variant="outlined"  color="info" onClick={ () => { navigate("/register");}}>Register</Button>
                    

                </Stack>
                {/* <SearchBar />

                <br /><br /><br /> */}

                <List className='list' sx={{ width: '100%', alignSelf:'center', justifyContent:'center', alignItems:'center' }}>
                    {
                        datasets.map(
                            (dataset, index) => {
                                console.log(dataset)
                                return (
                                    < Card info={dataset} key={index} />
                                )
                            }
                        )
                    }
                </List>

            </div>
        </div>
    );
}

