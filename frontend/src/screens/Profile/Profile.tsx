import { Alert, Button, Snackbar, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import { useCustomSnackbar } from "../../components/ui/CustomSnackbarProvider/CustomSnackbarProvider";

const Profile = () => {
    const formRef = useRef<any>(null);
    const {show} = useCustomSnackbar();
    const updateProfileCallback = (succeeded, error: any) => {
        console.log("updateProfileCallback", succeeded, error);
        if(succeeded) {
            show("Profile updated successfully", "success");
        }else
        {
            show("Profile update failed: " + JSON.stringify(error), "error");
        }
    }
    const {updateUserDetails} = useProfile(updateProfileCallback);
    const onSubmit = (e: any) => {
        e.preventDefault();
        console.log(formRef.current?.elements[0].files[0])
        const formData = new FormData();
        formData.append("image", formRef.current?.elements[0].files[0]);
        console.log("image", formRef.current?.elements[0].files[0]);
        formData.append("filename", formRef.current?.elements[0].files[0].name);
        updateUserDetails(formData);

    }
    return (
        <div>
            <Typography variant="h3">Profile</Typography>
            <form ref={formRef} onSubmit={onSubmit}>
                <div>
                    <input type="file"/> 
                </div>
               <div>
                <Button type="submit" variant="contained">Upload picture</Button>
               </div>
            </form>
        </div>
    );
};

export default Profile;
