import classNames from "classnames";
import styles from "./UserListItem.module.css";

function UserListItem({ userInfo, deleteUser, selectList }) {
  const {
    name: { first, last },
    dob: { age },
    picture: { medium },
    email,
    isSelected,
  } = userInfo;

  const selectedUser = classNames({
    [styles.userCard]: true,
    [styles.selectListItem]: isSelected,
  });

  return (
    <li className={selectedUser} onClick={() => selectList(email)}>
      <img className={styles.userImg} src={medium} alt={`${first} ${last}`} />
      <div className={styles.nameContainer}>
        <span className={styles.userName}>{first}</span>
        <span className={styles.userName}>{last}</span>
      </div>
      <span className={styles.userAge}>Age: {age}</span>
      <button
        className={styles.deleteBtn}
        onClick={(e) => {
          e.stopPropagation();
          deleteUser(email);
        }}
      >
        x
      </button>
    </li>
  );
}

export default UserListItem;
