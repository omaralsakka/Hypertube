import { Container, Card, Row, Button, Form } from 'react-bootstrap';
import { trpc } from '../../utils/trpc';
import { useState } from 'react';
import { Comment } from '../../types/appTypes';
import CommentRow from '../commentRow';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { i18translateType } from '../../types/appTypes';
// import { useRouter } from 'next/router';

type Inputs = {
	comment_text: string;
};
const schema = z.object({
	comment_text: z.string().min(1, {}).max(250),
});

const CommentsSection = ({ imdb_code }: { imdb_code: string }) => {
	// const router = useRouter();
	const context = trpc.useContext();
	const { data: session } = useSession();
	const [addCommentBtn, setAddCommentBtn] = useState(true);
	const mutation = trpc.comment.createComment.useMutation();
	const addComment = (imdb_code: string, comment_text: string) => {
		try {
			if (!session?.token.user.id) return
			mutation.mutate(
				{
					imdb_code,
					comment_text,
					user_id: session?.token.user.id,
				},
				{
					onSuccess: () => {
						context.invalidate();
					},
				}
			);
		} catch (err) {
			console.error(err);
		}
	};
	const { data } = trpc.comment.getMovieComments.useQuery({
		imdb_code: imdb_code,
	});
	const {
		register,
		handleSubmit,
		reset,
	} = useForm<Inputs>({
		mode: 'onChange',
		resolver: zodResolver(schema),
	});
	const { t }: i18translateType = useTranslation('common');

	const onSubmit: SubmitHandler<Inputs> = async (data, event) => {
		event?.preventDefault();
		reset();
		addComment(imdb_code as string, data.comment_text as string);
	};

	return (
		<>
			<Row className="mb-2">
				<Card.Title>
					{data?.comments?.length} {t('movieInfo.comments')}
				</Card.Title>
			</Row>
			<Row className="mb-3">
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group>
						<Form.Control
							className="border-bottom comment-form bg-transparent"
							placeholder={t('movieInfo.addComment')}
							maxLength={100}
							{...register('comment_text')}
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
							{t('movieInfo.addComment')}
						</Button>
						<Button
							hidden={addCommentBtn}
							variant="outline-dark"
							onClick={() => setAddCommentBtn(true)}
						>
							{t('movieInfo.cancel')}
						</Button>
					</Container>
				</Form>
			</Row>
			<Container fluid>
				{data?.comments &&
					data.comments.map((comment: Comment) => (
						<div key={comment.id}>
							<CommentRow comment={comment} />
						</div>
					))}
			</Container>
		</>
	);
};
export default CommentsSection;
