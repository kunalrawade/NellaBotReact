import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './header.scss';

const redirectTo = (path, history) => {
	history.push(path);
};

const Header = (props) => {
	return (
		<Row>
			<Col xs={11}>
          <Col xs={4}>
            <span onClick={() => { redirectTo('/login', props.history); }}>
             
						</span>
				</Col>			
			</Col>
		</Row >
	);
};

export default Header;
