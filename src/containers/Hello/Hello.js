import React, {Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUserData, getRepoIssues, changeUser } from '../../redux/modules/HelloReducer';
import sampleData from '../../../data';

@connect(
  state => ({
    data: state.dataReducer.data,
    fetching: state.dataReducer.fetching,
    fetched: state.dataReducer.fetched,
    issueData: state.issueReducer.issueData,
    fetchingIssues: state.issueReducer.fetchingIssues,
    fetchedIssues: state.issueReducer.fetchedIssues,
    user: state.dataReducer.user
  }), {
    getUserData,
    getRepoIssues,
    changeUser
  }
)
export default class Hello extends Component {

  static propTypes = {
    data: PropTypes.array,
    fetching: PropTypes.bool,
    fetched: PropTypes.bool,
    getUserData: PropTypes.func,
    issueData: PropTypes.array,
    fetchingIssues: PropTypes.bool,
    fetchedIssues: PropTypes.bool,
    getRepoIssues: PropTypes.func,
    changeUser: PropTypes.func,
    user: PropTypes.string
  }

  userSearch(event) {
    if (event.which === 13 && !event.shiftKey || event.which === 2) {
      const username = event.target.value;
      this.props.changeUser(username);
      this.props.getUserData(username);
    }
  }

  repoIssues(event) {
    const repoName = event.target.value;
    const { user } = this.props;
    this.props.getRepoIssues(repoName, user);
  }

  render() {
    const { issueData } = this.props;
    const mapData = data.map((repo) =>
      <option value={repo.name}>
        {repo.name}
      </option>);
    const mapIssues = issueData.map((issue, index) => {
      if (index === 0) {
        return <option selected value={issue.title}>{issue.title}</option>;
      }
      return <option value={issue.title}>{issue.title}</option>;
    });
    return (
      <div className="container">
        <h1>Hello, Peng</h1>
        <h3>{this.props.user}</h3>
        <input type="text" onKeyPress={this.userSearch.bind(this)} />
        <select name="repo" onChange={this.repoIssues.bind(this)}>
          <option value="Some Repo Name">Some Repo Name</option>
          {mapData}
        </select>
        <select name="issues">
          {mapIssues}
        </select>
      </div>
    );
  }
}

