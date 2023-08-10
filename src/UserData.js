

const UserData = (props) => {

    let userInfo = props.userInfo;
  
    return (
        <>
            <h1>User Information</h1>

            <div className="container">
                <div className="row">
                    <table className="table" border="1">
                        <thead>
                            <tr >
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Edit Info</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userInfo.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.Fname}</td>
                                            <td>{item.Email}</td>
                                            <td>{item.Address}</td>
                                            <td><button onClick={()=>props.ediData(item)}>Edit</button></td>
                                            <td><button onClick={()=>props.DeleteData(item.id)}>Delete</button></td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default UserData;