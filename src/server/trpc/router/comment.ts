import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const commentRouter = router({
	getMovieComments: publicProcedure
		.input(z.object({ imdb_code: z.number() }))
		.query(async ({ input, ctx }) => {
			const comments: any = await ctx.prisma.comment.findMany({
				where: { imdb_code: input.imdb_code },
				select: {
					id: true,
					imdb_code: true,
					comment_text: true,
					created_at: true,
					user: {
						select: {
							name: true,
							image: true,
						},
					},
				},
			});

			if (!comments)
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'No comments found',
					cause: input.imdb_code,
				});
			return {
				comments,
			};
		}),

	createComment: publicProcedure
		.input(
			z.object({
				imdb_code: z.number().min(1),
				comment_text: z.string().min(1),
				user_id: z.string().min(1),
			})
		)
		.mutation(async ({ input, ctx }) => {
			const newComment: any = await ctx.prisma.comment.create({
				data: {
					imdb_code: input.imdb_code,
					comment_text: input.comment_text,
					userId: input.user_id,
				},
			});
			//console.log(newComment);
			return {
				message: 'Comment inserted into table successfully',
			};
		}),
});

/*

    // then match the ratings with posts
    const mappedRatings = posts.map( (post, idx) => {
        return {
            ...post,
            userRating: averages[idx]._avg.rating
        }
    })

CREATE TABLE IF NOT EXISTS `camagru`.`comment` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `creation_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `description` VARCHAR(140) NOT NULL,
  `user` INT UNSIGNED NOT NULL,
  `photo` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `user`, `photo`),
  FOREIGN KEY (`photo`) REFERENCES `camagru`.`photo` (`id`) ON DELETE CASCADE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_comment_photo_idx` (`photo` ASC),
  INDEX `fk_comment_user_idx` (`user` ASC));


  	function send_comment_email($commenter, $photo_id, $conn, $website_hostname) {
		$photo = get_photo_byid($photo_id, $conn);
		$receiving_user = get_user_by_id($photo['user'], $conn);
		//Dont send email if the commenter is owner of the picture, or the email is not active
		if ($receiving_user[0]['active'] == 0 || $receiving_user[0]['username'] == $commenter)
			return;
		$email = $receiving_user[0]['email'];
		if ($receiving_user[0]['wants_comment_mail'] == 1) {
			$subject = ''.$commenter.' commented your photo';
			$message = 'View your comment: https://'.$website_hostname.'/view_single.php?photo_id='.$photo_id;
			mail($email, $subject, $message);
		}
	}

	function create_comment($user_id, $description, $photo_id, $website_hostname, $conn) {
		try {
			$stmt = $conn->prepare('INSERT INTO `comment` (user, description, photo) VALUES (:user_id, :description, :photo_id)');
			$stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
			$stmt->bindParam(':description', $description, PDO::PARAM_STR);
			$stmt->bindParam(':photo_id', $photo_id, PDO::PARAM_INT);
			$stmt->execute();
			$commenter = get_username_by_id($user_id, $conn);
			send_comment_email($commenter, $photo_id, $conn, $website_hostname);
			if(isset($_SESSION['last_page']))
				header('Location: '.$_SESSION['last_page']);
	
		} catch (PDOException $mess) {
			echo 'Error: '.$mess->getMessage();
			echo $user_id.'<br>';
			echo $photo_id.'<br>';
			echo $description.'<br>';
			exit;
		}
	}
	
	function get_comments_by_id($photo_id, $conn) {
		try {
			$stmt = $conn->prepare('SELECT `description`, comment.creation_date, `username`, `realname` FROM comment INNER JOIN user ON user.id = comment.user WHERE photo=:photo_id ORDER BY creation_date ASC');
			$stmt->bindParam(':photo_id', $photo_id, PDO::PARAM_INT);
			$stmt->execute();
			$query = $stmt->fetchAll(PDO::FETCH_ASSOC);
			return $query;
		} catch (PDOException $mess) {
			echo 'Error: '.$mess->getMessage();
			echo $photo_id.'<br>';
			exit;
		}
	}

  
  */
