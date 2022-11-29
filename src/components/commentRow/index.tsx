import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import {
	AiOutlineLike,
	AiFillLike,
	AiFillDislike,
	AiOutlineDislike,
} from 'react-icons/ai';
import { Comment } from '../../types/appTypes';
import Link from 'next/link';

const CommentRow = ({ comment }: { comment: Comment }) => {
	const [liked, setLiked] = useState(false);
	const [disliked, setDisliked] = useState(false);
	const [userImg, setUserImg] = useState('/defaultImg2.png');

	const isLiked = (liked: boolean) => {
		return liked ? (
			<AiFillLike className="fs-5" />
		) : (
			<AiOutlineLike className="fs-5" />
		);
	};
	const isDisLiked = (disliked: boolean) => {
		return disliked ? (
			<AiFillDislike className="fs-5" style={{ transform: 'scale(-1, 1)' }} />
		) : (
			<AiOutlineDislike
				className="fs-5"
				style={{ transform: 'scale(-1, 1)' }}
			/>
		);
	};
	useEffect(() => {
		if (comment.user.image) {
			setUserImg('/images/' + comment.user.image);
		}
	}, [comment.user.image]);
	return (
		<>
			<Container className="mb-4 p-0" fluid>
				<Row>
					<Container className="d-flex">
						<div className="avatar-big">
							<Link href={`/profile/${comment.user.id}`}>
								<img
									style={{ cursor: 'pointer' }}
									src={userImg}
									className="avatar-img rounded-circle"
								/>
							</Link>
						</div>
						<Container className="ms-0">
							<div className="d-flex">
								<Link href={`/profile/${comment.user.id}`}>
									<p className="mb-0 me-2">
										<strong style={{ cursor: 'pointer' }}>
											{comment.user.name}
										</strong>{' '}
									</p>
								</Link>
								<span className="text-muted">
									{
										comment.created_at
											.toString()
											.substring(
												0,
												comment.created_at.toString().indexOf('G')
											) as string
									}
								</span>
							</div>
							<div>
								<p className="mb-0">{comment.comment_text}</p>
								{/* <Container className="mt-0 px-0" fluid>
									<button
										className="like-button"
										onClick={() => setLiked(!liked)}
									>
										{isLiked(liked)}
									</button>
									<button
										className="like-button "
										onClick={() => setDisliked(!disliked)}
									>
										{isDisLiked(disliked)}
									</button>
								</Container> */}
							</div>
						</Container>
					</Container>
				</Row>
			</Container>
		</>
	);
};

export default CommentRow;
