import React from 'react';
import { Link } from 'react-router-dom';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink } from 'reactstrap';

class MyNavbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false
		};
	}

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	};

	render() {
		return (
			<div>
				<Navbar color="dark" dark expand="md">
					<NavbarBrand href="/">Nasa Collection</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink tag={Link} to="/">Collection</NavLink>
							</NavItem>
							<NavItem>
								<NavLink tag={Link} to="/nasa-search">Nasa Search</NavLink>
							</NavItem>
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}

export default MyNavbar;
