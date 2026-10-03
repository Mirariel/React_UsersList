import { Component } from 'react'
import getUsers from '../../api'

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

  render() {
    return (
      <ul></ul>
    )
  }
}

export default UserList