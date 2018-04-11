const user = {
  name: 'Tyler McGinnis',
  img: 'https://avatars0.githubusercontent.com/u/2933430?v=3&s=460',
  username: 'tylermcginnis',
};

const avatar = React.createElement('img', { src: user.img });
const label = React.createElement('h1', null, user.name);
const screenName = React.createElement('h3', null, user.username);

const badge = React.createElement('div', null, avatar, label, screenName);

ReactDOM.render(badge, document.getElementById('app'));
