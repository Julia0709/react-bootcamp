function Avatar(props) {
  return <img src={props.img} />;
}

function Label(props) {
  return <h1>Name: {props.name}</h1>;
}

function ScreenName(props) {
  return <h3>Username: {props.username}</h3>;
}

function Badge(props) {
  return (
    <div>
      <Avatar img={props.user.img} />
      <Label name={props.user.name} />
      <ScreenName username={props.user.use} />
    </div>
  );
}

ReactDOM.render(
  <Badge
    user={{
      name: 'Tyler McGinnis',
      img: 'https://avatars0.githubusercontent.com/u/2933430?v=3&s=460',
      username: 'tylermcginnis',
    }}
  />,
  document.getElementById('app'),
);
