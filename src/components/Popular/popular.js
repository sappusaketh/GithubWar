import React from 'react';
import Languages from './Languages';
import Loading from '../Common/Loading';
import RepoView from './RepoView';
import { getPopularRepos } from '../api/DataModel';
export default class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      lang: 'All',
      repos: ''
    };
    this.handleLangaugeChange = this.handleLangaugeChange.bind(this);
    this.getRepos = this.getRepos.bind(this);
  }

  componentDidMount() {
    this.getRepos(this.state.lang);
  }
  handleLangaugeChange(lang) {
    // console.log(lang)
    this.setState({
      lang: lang,
      repos: null
    });

    this.getRepos(lang);
  }

  getRepos(lang) {
    getPopularRepos(lang).then(data => {
      this.setState({
        repos: data
      });
    });
  }
  render() {
    if (!this.state.isLoading) {
      return (
        <div>
          <Languages
            handleLangaugeChange={this.handleLangaugeChange}
            lang={this.state.lang}
          />
          {this.state.repos ? (
            <RepoView repos={this.state.repos} />
          ) : (
            <Loading />
          )}
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}
