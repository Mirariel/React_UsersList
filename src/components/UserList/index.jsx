import { Component } from "react";
import getUsers from "../../api";
import UserListItem from "../UserListItem";
import styles from "./UserList.module.css";

const PAGE_SIZE = 5;

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isFetching: false,
      error: null,
      currentPage: 1,
      genderFilter: "",
    };
  }

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    this.setState({ isFetching: true, error: null });
    getUsers({ results: 100 })
      .then((data) => {
        const users = data.results.map((u) => ({ ...u, isSelected: false }));
        this.setState({ users });
      })
      .catch((e) => this.setState({ error: e }))
      .finally(() => this.setState({ isFetching: false }));
  };

  handleGenderChange = (e) => {
    this.setState({ genderFilter: e.target.value, currentPage: 1 });
  };

  getFilteredUsers = () => {
    const { users, genderFilter } = this.state;
    return genderFilter
      ? users.filter((u) => u.gender === genderFilter)
      : users;
  };

  removeUser = (email) => {
    this.setState(({ users, currentPage, genderFilter }) => {
      const newUsers = users.filter((u) => u.email !== email);
      const filtered = genderFilter
        ? newUsers.filter((u) => u.gender === genderFilter)
        : newUsers;
      const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
      return {
        users: newUsers,
        currentPage: Math.min(currentPage, totalPages),
      };
    });
  };

  selectList = (email) => {
    this.setState(({ users }) => ({
      users: users.map((u) =>
        u.email === email ? { ...u, isSelected: !u.isSelected } : u,
      ),
    }));
  };

  prevPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) this.setState({ currentPage: currentPage - 1 });
  };

  nextPage = () => {
    const { currentPage } = this.state;
    const totalPages = Math.ceil(this.getFilteredUsers().length / PAGE_SIZE);
    if (currentPage < totalPages) {
      this.setState({ currentPage: currentPage + 1 });
    }
  };

  render() {
    const { isFetching, error, currentPage, genderFilter } = this.state;
    const filtered = this.getFilteredUsers();
    const pageUsers = filtered.slice(
      (currentPage - 1) * PAGE_SIZE,
      currentPage * PAGE_SIZE,
    );

    return (
      <div className={styles.listContainer}>
        <header className={styles.listHeader}>
          <h1>Users List</h1>
          <select value={genderFilter} onChange={this.handleGenderChange}>
            <option value="">Всі</option>
            <option value="male">Чоловіки</option>
            <option value="female">Жінки</option>
          </select>
        </header>
        {error && <div className={styles.errorContainer}>!!!Error!!!</div>}
        {isFetching && <div className={styles.loadContainer}>Loading...</div>}
        {!error && !isFetching && (
          <>
            <ul className={styles.userList}>
              {pageUsers.map((u) => (
                <UserListItem
                  key={u.email}
                  userInfo={u}
                  deleteUser={this.removeUser}
                  selectList={this.selectList}
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
