import axios from "axios";
import React, { useEffect, useState } from "react";
import UserData from "./UserData";

const UserInfo = () => {

    const [profileData, setprofileData] = useState({
        Fname: '',
        Email: '',
        Address: ''
    });

    const [userInfo, setUserInfo] = useState([]);
    const [selectedItem, setselectedItem] = useState(null);

    const fetchUserData = async () => {
        let result = await axios('http://localhost:4201/profile');
        //let response = await result.json();
        setUserInfo(result.data);
    }

    useEffect(() => {
        fetchUserData();
    }, []);


    const submitInfo = (e) => {
        e.preventDefault();

        if (selectedItem) {
            UpdateUserData();

        } else {
            postData();
        }

        // let newRecord = {...profileData,id:new Date().getTime().toString()};
        // SetRecords([...records,newRecord]);
        setprofileData({ Fname: '', Email: '', Address: '' });
    }


    const postData = async () => {
        let response = await axios.post('http://localhost:4201/profile', profileData);
        fetchUserData();
    }

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setprofileData({ ...profileData, [name]: value });

    }

    const DeleteData = async (id) => {
       let deleteRecord =  await axios.delete(`http://localhost:4201/profile/${id}`);
        fetchUserData();
    }

    const ediData = async (item) => {
        setselectedItem(item);
        setprofileData({ Fname: item.Fname, Email: item.Email, Address: item.Address });
    }

    const UpdateUserData = async (item) => {
       let updateRecord =  await axios.put(`http://localhost:4201/profile/${selectedItem.id}`, profileData);
        fetchUserData();
        setselectedItem(null);
    }



    return (
        <>
            <h2>User Information</h2>
            <form onSubmit={submitInfo}>
                <div>
                    <label>Name</label>
                    <input type="text" className="form-control" name="Fname" value={profileData.Fname} onChange={handleInput} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" className="form-control" name="Email" value={profileData.Email} onChange={handleInput} />
                </div>
                <div>
                    <label>Address</label>
                    <input type="text" className="form-control" name="Address" value={profileData.Address} onChange={handleInput} />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>

            <div>
                <UserData userInfo={userInfo} DeleteData={DeleteData} ediData={ediData} />
            </div>
        </>
    )
}



export default UserInfo;