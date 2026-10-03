import styles from "./UserListItem.module.css";

function UserListItem({ userInfo, deleteUser, selectList }) {
  const {
    name: { first, last },
    dob: { age },
    picture: { medium },
    email,
    isSelected,
  } = userInfo;

  return (
    <li
      className={`${styles.userCard} ${isSelected ? styles.selectListItem : ""}`}
      onClick={() => selectList(email)}
    >
      <img className={styles.userImg} src={medium} />
      <div className={styles.nameContainer}>
        <span className={styles.userName}>{first}</span>
        <span className={styles.userName}>{last}</span>
      </div>
      <span className={styles.userAge}>Age: {age}</span>
      <button className={styles.deleteBtn} onClick={() => deleteUser(email)}>
        x
      </button>
    </li>
  );
}

export default UserListItem;
