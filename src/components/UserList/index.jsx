import { Component } from 'react'
import getUsers from '../../api'
import UserListItem from '../UserListItem'

 class UserList extends Component {
    constructor(props) {
      super(props)

      this.state = {
         users: [],
         isFetching: false,
         error: null,
         currentPage: 1         
      }
    }

  loadUsers = () => {
    const {currentPage} = this.state
    this.setState({isFetching: true});
    getUsers({page: currentPage, results: 5})
    .then(data => this.setState({users: data.results}))
    .catch(e => this.setState({error: e}))
    .finally(()=>this.setState({isFetching: false}))
  }
  componentDidMount() { 
    this.loadUsers();
   }

   componentDidUpdate(prevProps, prevState) {
    const {currentPage} = this.state;
    if (prevState.currentPage!==currentPage){
      this.loadUsers();
    }
   }
   
  prevPage = () => {
    const {currentPage} = this.state;
    if (currentPage>1)
    this.setState({currentPage: currentPage-1});
  }

  nextPage = () => {
    const {currentPage} = this.state;
    this.setState({currentPage: currentPage+1});
  }

  render() {
    const {users, isFetching, error} = this.state;
    return (
      
    <div>
    {error && <div>!!!Error!!!</div>}
    {isFetching && <div>Loading...</div>}     
    {!error && !isFetching &&    
    <>
        <ul>{users.map(u => <UserListItem userInfo={u}/>)}</ul>
        <button onClick={this.prevPage}>{'<'}</button>
        <button onClick={this.nextPage}>{'>'}</button>
    </>
    }   
    </div>
    )
  }
}

export default UserList