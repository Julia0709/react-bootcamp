function Label(props) {
  return <h1>{props.title}</h1>;
}

function Button(props) {
  return <button onClick={props.onClick}>{props.text}</button>;
}

function FriendsList(props) {
  return (
    <ul>
      {props.list.map(name => (
        <li key={name}>
          <span>{name}</span>
          <Button onClick={() => props.onRemoveFriend(name)} text="Remove" />
          <Button
            onClick={() => props.onDeactivateFriend(name)}
            text="Deactivate"
          />
        </li>
      ))}
    </ul>
  );
}

function InactiveFriendsList(props) {
  return (
    <ul>
      {props.list.map(name => (
        <li key={name}>
          <span>{name}</span>
          <Button
            onClick={() => props.onActivateFriend(name)}
            text="Activate"
          />
        </li>
      ))}
    </ul>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: ['Jordyn', 'Mikenzi', 'Jake'],
      inactiveFriends: ['Brooke'],
      input: '',
    };

    this.handleClearFriend = this.handleClearFriend.bind(this);
    this.handleAddFriend = this.handleAddFriend.bind(this);
    this.handleRemoveFriend = this.handleRemoveFriend.bind(this);
    this.handleDeactivateFriend = this.handleDeactivateFriend.bind(this);
    this.handleActivateFriend = this.handleActivateFriend.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  handleClearFriend(name) {
    this.setState(currentState => {
      return {
        friends: [],
      };
    });
  }

  handleAddFriend(name) {
    this.setState(currentState => {
      return {
        friends: currentState.friends.concat([this.state.input]),
        input: '',
      };
    });
  }

  handleRemoveFriend(name) {
    this.setState(currentState => {
      return {
        friends: currentState.friends.filter(friend => friend !== name),
      };
    });
  }

  handleDeactivateFriend(name) {
    this.setState(currentState => {
      return {
        friends: currentState.friends.filter(friend => friend !== name),
        inactiveFriends: currentState.inactiveFriends.concat(name),
      };
    });
  }

  handleActivateFriend(name) {
    this.setState(currentState => {
      return {
        inactiveFriends: currentState.inactiveFriends.filter(
          friend => friend !== name,
        ),
        friends: currentState.friends.concat(name),
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
    return (
      <div>
        <input
          type="text"
          placeholder="new friend"
          value={this.state.input}
          onChange={this.updateInput}
        />
        <Button onClick={this.handleAddFriend} text="Add" />
        <Button onClick={this.handleClearFriend} text="Clear all" />
        <Label title="Activate friends" />
        <FriendsList
          list={this.state.friends}
          onRemoveFriend={this.handleRemoveFriend}
          onDeactivateFriend={this.handleDeactivateFriend}
        />
        <Label title="Inactivate friends" />
        <InactiveFriendsList
          list={this.state.inactiveFriends}
          onRemoveFriend={this.handleRemoveFriend}
          onActivateFriend={this.handleActivateFriend}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
