function UserListItem({userInfo}) {
   
  const {
    name: { first, last },
    dob: { age },
    picture: { medium },
    } = userInfo;
   
    return (
      <li>
        <img src={medium}/>
        <div>
            <span>{first}</span>
            <span>{last}</span>
        </div>
        <span>{age}</span>
      </li>
    )
}


export default UserListItem