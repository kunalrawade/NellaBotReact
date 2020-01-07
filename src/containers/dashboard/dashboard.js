import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
	}

	render() {
	console.log('inside dashboard.');	
		return (
			<Row>
				<Col xs={12}>
					<p>Dashboard Page</p>
					<p>Dashboard Page</p>
					<p>Dashboard Page</p>
					<p>Dashboard Page</p>
					<p>Dashboard Page</p>
				</Col>
			</Row>
		);
	}
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(
	Dashboard
);