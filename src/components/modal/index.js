import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const MyModal = (props) => {

	const { buttonLabel, children, disabledButton, isOpen, onClick, title, toggle, size } = props;

	return (
		<div>
			<Modal
				isOpen={isOpen}
				centered
				size={size}
			>
				{title && <ModalHeader toggle={toggle}>{title}</ModalHeader>}
				<ModalBody>
					{children}
				</ModalBody>
				{buttonLabel && (
					<ModalFooter>
						<Button color="primary" onClick={onClick}
						        disabled={disabledButton}>{buttonLabel}</Button>
					</ModalFooter>
				)}
			</Modal>
		</div>
	);
};

export default MyModal;
