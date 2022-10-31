import { Container, Card, Row, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { Comment } from '../../types/appTypes';
import CommentRow from '../commentRow';

const CommentsSection = ({ comments }: { comments: Comment[] }) => {
	const [addCommentBtn, setAddCommentBtn] = useState(true);

	return (
		<>
			<Row className="mb-2">
				<Card.Title>{comments.length} Comments</Card.Title>
			</Row>
			<Row className="mb-3">
				<Form>
					<Form.Group>
						<Form.Control
							className="border-bottom comment-form bg-transparent"
							placeholder="Add comment"
							onFocus={() => setAddCommentBtn(false)}
						></Form.Control>
					</Form.Group>
					<Container className="d-flex justify-content-end mt-3" fluid>
						<Button
							className="me-3"
							hidden={addCommentBtn}
							variant="warning"
							type="submit"
						>
							Add comment
						</Button>
						<Button
							hidden={addCommentBtn}
							variant="outline-dark"
							onClick={() => setAddCommentBtn(true)}
						>
							Cancel
						</Button>
					</Container>
				</Form>
			</Row>
			<Container fluid>
				{comments.map((comment) => (
					<CommentRow comment={comment} />
				))}
			</Container>
		</>
	);
};

export default CommentsSection;
