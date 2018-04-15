class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Loading',
    };
  }
  componentDidMount() {
    const stopper = this.state.text + '...';
    this.interval = window.setInterval(() => {
      this.state.text === stopper
        ? this.setState(() => ({ text: 'Loading' }))
        : this.setState(prevState => ({ text: prevState.text + '.' }));
    }, 300);
  }
  componentWillUnmount() {
    window.clearInterval(this.interval);
  }
  render() {
    return <p>{this.state.text}</p>;
  }
}

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ul>
        {this.props.languages.map(lang => (
          <li key={lang} onClick={() => this.props.onToggleLanguage(lang)}>
            {lang}
          </li>
        ))}
      </ul>
    );
  }
}

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }
  render() {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {this.props.list.map(
          ({ name, owner, stargazers_count, html_url }, i) => {
            return (
              <ul key={i} style={{ margin: 40 }}>
                <li key="name">
                  <a href={html_url} target="_blank">
                    {name}
                  </a>
                </li>
                <li key="owner">@{owner.login}</li>
                <li key="star">{stargazers_count}</li>
              </ul>
            );
          },
        )}
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'all',
      list: [],
      loading: true,
    };
    this.languages = ['all', 'javascript', 'ruby', 'python'];
    this.handleToggleLanguage = this.handleToggleLanguage.bind(this);
  }
  handleToggleLanguage(language) {
    this.setState({ language }, () => {
      this.fetchRepos();
    });
  }
  componentDidMount() {
    this.fetchRepos();
  }
  fetchRepos() {
    API.fetchPopularRepos(this.state.language).then(list => {
      this.setState({
        list,
        loading: false,
      });
    });
  }
  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <div>
        <Navigation
          onToggleLanguage={this.handleToggleLanguage}
          languages={this.languages}
        />
        <Content list={this.state.list} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
