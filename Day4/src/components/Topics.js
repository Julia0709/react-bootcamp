import React from 'react';

import { BrowserRouter, Route, Link } from 'react-router-dom';

function Topic(props) {
  console.log(`Props to topic: ${props}`);
  return <h3>{props.match.params.topicId}</h3>;
}

export default function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/rendering`}>Rentering with React</Link>
        </li>
        <li>
          <Link to={`${match.url}/components`}>Components with React</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-vs-state`}>Props vs State</Link>
        </li>
      </ul>

      <hr />

      <Route path={`${match.url}/:topicId`} component={Topic} />
      <Route />
      <Route
        exact
        path={match.path}
        render={() => {
          return <p>Please select a topic</p>;
        }}
      />
    </div>
  );
}
