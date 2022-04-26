import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import axios from "axios";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";
import { Audio } from 'react-loader-spinner';
import { TailSpin } from "react-loader-spinner";
import { useParams } from 'react-router';
import Navbar from "../templates/Navbar";



import Button from "@mui/material/Button";
import { useAlert } from "react-alert";



const Versionupdate = () => {


    let navigate = useNavigate();
    const params = useParams();

    const defaultValues = {
        comment: "",    
        reference: null,
        dataset : params.id,
    };
    

    React.useEffect(() => {
        console.log(params.id);
        if (localStorage.getItem('user')) {
            let user = JSON.parse(localStorage.getItem('user'));
            if (user.group == "publisher") {
                //do nothing
            }
            else if (user.group == "admin") {
                navigate("/approve");
            }
            else {
                navigate("/login");
            }
        }
        else {
            navigate("/login");
        }
    }, [navigate]);

    const alert = useAlert();
    const [formValues, setFormValues] = useState(defaultValues);
    const [load, setLoad] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const boolvalue = (name === "reference");
        if(!boolvalue){
            setFormValues({ ...formValues, [name]: value });
        }
    };

    const hiddenFileInput = React.useRef(null);

    const handleChange = (event) => {
        const fileUploaded = event.target.files[0];
        setFormValues({
            ...formValues,
            'reference': fileUploaded,
        });

    };

    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        var formData = new FormData();
        formData.append('comment', formValues.comment);
        formData.append('status', formValues.status);
        formData.append('reference', formValues.reference, formValues.reference.name);
        formData.append('dataset', formValues.dataset);

        setLoad(true);
        axios.post("http://10.1.38.115:8000/api/versions/", formData, {
            headers:{
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem('user')).token,
            }
        },
        {

        }
        )
        .then((res) => {
            console.log(res);
            setLoad(false);
            alert.show("Version updated successfully", {type: "success"});
            setFormValues(defaultValues);
        })
        .catch((err) => {
            setLoad(false);
                console.log("err request", err.request);
                console.log("err response", err.response);
                if (err.response.data.reference) {
                    alert.show(err.response.data.reference[0], { type: 'error' })
                }
                else {
                    alert.show(err.response.data.detail, { type: 'error' });
                }
        });
    };

    return (
        <div className='myDatasets'>

            <Navbar />
        <Box
            component="img"
            sx={{
                height: 200,
                width: 200,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
                alignSelf: "center",
                marginTop: "5vh",

            }}
            src="https://d1hl0z0ja1o93t.cloudfront.net/wp-content/uploads/2017/04/21165916/logo2.png"
        />


        <div className="myDatasets-heading">
            <h2>Add a new Version </h2>
        </div>
        <form onSubmit={handleSubmit} sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Grid container alignItems="center" justify="center" display='flex' direction='column'>



                

                <TextField
                    id="filled-textarea"
                    name="comment"
                    label="Commit Message, describe the changes in a few sentences"

                    type="text"
                    variant='filled'
                    value={formValues.comment}
                    onChange={handleInputChange}
                    sx={{ width: '50%', margin: '10px' }}
                    required

                />

                {/* create a filed for collecting source url */}
            
                <div style={{ margin: '20px', alignSelf: 'flex-start', display: 'flex', flexDirection: 'row' }}>

                    {/* create a styled button for collecting reference */}
                    <Button variant='contained' color="primary" onClick={handleClick}>
                        Upload a file
                    </Button>
                    <input type="file" style={{ display: 'none' }} ref={hiddenFileInput} onChange={handleChange} required />
                    {
                        formValues.reference &&


                        <Typography mt={2} sx={{ fontSize: '10px', color: 'green', margin: '10px' }}>
                            {formValues.reference.name}
                        </Typography>
                    }

                </div>


                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>

                {
                    load &&

                    <div
                        style={{
                            width: "100%",
                            height: "100",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "absolute",
                            top: "5%",
                        }}
                    >
                        <TailSpin color="#00BFFF" height={160} width={160} color ='blue' ariaLabel='loading' />
                        
                    </div>

                }





            </Grid>
        </form>
    </div>
    );
};

        
export default Versionupdate;
