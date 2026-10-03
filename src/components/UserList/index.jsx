import { Component } from "react";
import getUsers from "../../api";
import UserListItem from "../UserListItem";
import styles from "./UserList.module.css";

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isFetching: false,
      error: null,
      currentPage: 1,
    };
  }

  removeUser = (email) => {
    this.setState(({ users }) => ({
      users: users.filter((u) => u.email !== email),
    }));
  };

  loadUsers = () => {
    const { currentPage } = this.state;
    this.setState({ isFetching: true });
    getUsers({ page: currentPage, results: 5 })
      .then((data) => this.setState({ users: data.results }))
      .catch((e) => this.setState({ error: e }))
      .finally(() => this.setState({ isFetching: false }));
  };
  componentDidMount() {
    this.loadUsers();
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentPage } = this.state;
    if (prevState.currentPage !== currentPage) {
      this.loadUsers();
    }
    console.log("this.state.users :>> ", this.state.users);
  }

  prevPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) this.setState({ currentPage: currentPage - 1 });
  };

  nextPage = () => {
    const { currentPage } = this.state;
    this.setState({ currentPage: currentPage + 1 });
  };

  render() {
    const { users, isFetching, error } = this.state;
    return (
      <div className={styles.listContainer}>
        <header className={styles.listHeader}>
          <h1>Users List</h1>
        </header>
        {error && <div className={styles.errorContainer}>!!!Error!!!</div>}
        {isFetching && <div className={styles.loadContainer}>Loading...</div>}
        {!error && !isFetching && (
          <>
            <ul className={styles.userList}>
              {users.map((u) => (
                <UserListItem
                  key={u.email}
                  userInfo={u}
                  deleteUser={this.removeUser}
                />
              ))}
            </ul>
            <div className={styles.btnContainer}>
              <button className={styles.switchBtn} onClick={this.prevPage}>
                {"<"}
              </button>
              <button className={styles.switchBtn} onClick={this.nextPage}>
                {">"}
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default UserList;
