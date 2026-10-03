import styles from "./UserListItem.module.css";

function UserListItem({ userInfo }) {
  const {
    name: { first, last },
    dob: { age },
    picture: { medium },
  } = userInfo;

  return (
    <li className={styles.userCard}>
      <img className={styles.userImg} src={medium} />
      <div className={styles.nameContainer}>
        <span className={styles.userName}>{first}</span>
        <span className={styles.userName}>{last}</span>
      </div>
      <span className={styles.userAge}>Age: {age}</span>
    </li>
  );
}

export default UserListItem;
