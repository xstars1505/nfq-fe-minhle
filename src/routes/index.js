import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { HomeContainer, NasaSearchContainer, MediaContainer } from '../container';

const TopLevelRoutes = () => (
	<Switch>
		<Route exact path="/" component={HomeContainer}/>
		<Route exact path="/nasa-search" component={NasaSearchContainer}/>
		<Route
			path="/media"
			render={props =>
				props.location.state ? <MediaContainer/> : <Redirect to="/"/>
			}
		/>
		<Redirect path="*" to="/"/>
	</Switch>
);

export default TopLevelRoutes;
