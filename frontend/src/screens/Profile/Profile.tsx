import { Button, Typography } from "@mui/material";
import { useRef } from "react";
import { useProfile } from "../../hooks/useProfile";

const Profile = () => {
    const formRef = useRef<any>(null);
    const {updateUserDetails} = useProfile();
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
