import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import routes from './routes';
import { isLoggedIn } from './utils/user-utils';

const App = () => {
	return (
		<Router>
			<Switch>
				{routes.map((item, index) => {
					if(item.hasOwnProperty('isPublic') && item.isPublic) {
						return (
							<Route exact path={item.path} key={index}>
								{ item.component }
							</Route>
						)
					}
					return (
						<ProtectedRoute exact path={item.path} key={index}>
							{ item.component }
						</ProtectedRoute>
					)
				})}
			</Switch>
		</Router>
	);
}

const ProtectedRoute = ({child, ...all}) => {
	return (
		<Route 
			{...all}
			render={({location}) => isLoggedIn() ? (
					child
				) : (
					<Redirect to={{ pathname: "/", state: {from: location} }} />
				)
			}
		/>
	)
}

export default App;
