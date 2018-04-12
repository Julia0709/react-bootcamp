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
        ? this.setState({ text: 'Loading' })
        : this.setState(prevState => ({
            text: prevState.text + '.',
          }));
    }, 300);
  }
  componentWillUnmount() {
    window.clearInterval(this.interval);
  }
  render() {
    return <h2>{this.state.text}</h2>;
  }
}

function ActiveFriends(props) {
  return (
    <div>
      <h2>Active Friends</h2>
      <ul>
        {props.list.map(friend => (
          <li key={friend.name}>
            <span>{friend.name}</span>
            <button onClick={() => props.onRemoveFriend(friend.name)}>
              Remove
            </button>
            <button onClick={() => props.onToggleFriend(friend.name)}>
              Deactivate
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
function InactiveFriends(props) {
  return (
    <div>
      <h2>Inactive Friends</h2>
      <ul>
        {props.list.map(friend => (
          <li key={friend.name}>
            <span>{friend.name}</span>
            <button onClick={() => props.onToggleFriend(friend.name)}>
              Activate
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      input: '',
      loading: 'true',
    };
    this.handleRemoveFriend = this.handleRemoveFriend.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.handleAddFriend = this.handleAddFriend.bind(this);
    this.handleToggleFriend = this.handleToggleFriend.bind(this);
  }

  componentDidMount() {
    API.fetchFriends().then(friends => {
      this.setState({
        friends,
        loading: false,
      });
    });
  }

  handleAddFriend() {
    this.setState(currentState => {
      return {
        friends: currentState.friends.concat([
          {
            name: this.state.input,
            active: true,
          },
        ]),
        input: '',
      };
    });
  }
  handleRemoveFriend(name) {
    this.setState(currentState => {
      return {
        friends: currentState.friends.filter(friend => friend.name !== name),
      };
    });
  }
  handleToggleFriend(name) {
    this.setState(currentState => {
      const friend = currentState.friends.find(friend => friend.name === name);
      return {
        friends: currentState.friends
          .filter(friend => friend.name !== name)
          .concat([
            {
              name,
              active: !friend.active,
            },
          ]),
      };
    });
  }
  updateInput(e) {
    const value = e.target.value;
    this.setState({
      input: value,
    });
  }
  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <div>
        <input
          type="text"
          placeholder="new friend"
          value={this.state.input}
          onChange={this.updateInput}
        />
        <button onClick={this.handleAddFriend}>Submit</button>
        <div>
          <button
            onClick={() =>
              this.setState({
                friends: [],
              })
            }
          >
            Clear All
          </button>
        </div>
        <ActiveFriends
          list={this.state.friends.filter(friend => friend.active === true)}
          onRemoveFriend={this.handleRemoveFriend}
          onToggleFriend={this.handleToggleFriend}
        />
        <InactiveFriends
          list={this.state.friends.filter(friend => friend.active === false)}
          onToggleFriend={this.handleToggleFriend}
        />
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('app'));
