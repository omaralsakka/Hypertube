import formidable, { File } from 'formidable';
import fs, { unlink } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import { z } from 'zod';
import { prisma } from '../../server/db/client';

// File requirements
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

// Validation schemas
const EmailSchema = z.string().email();
const FileSchema = z
	.any()
	.refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
	.refine(
		(file) => ACCEPTED_FILE_TYPES.includes(file?.mimetype),
		'Only .jpg, .jpeg, and .png formats are supported.'
	);

// Validator function
const validateInput = async (email: string | undefined, file: File) => {
	try {
		const validEmail = EmailSchema.parse(email);
		const validFile = FileSchema.parse(file);
		if (!validEmail || !validFile) return false;
		return true;
	} catch (err) {
		return false;
	}
};

// Upload image and delete old if it's saved locally
export default async function image(req: NextApiRequest, res: NextApiResponse) {
	const session = await unstable_getServerSession(req, res, authOptions);
	if (session?.token) {
		try {
			if (req.method === 'POST') {
				// Upload file
				const form = new formidable.IncomingForm();
				// Parse form and save files
				form.parse(req, async function (err, fields, files) {
					if (err) return res.send('Cannot parse form data');
					if (typeof files === 'undefined')
						return res.send('Missing image');
					if (!fields.email) return res.send('Missing email address');
					let file: File | undefined;
					if (Array.isArray(files.files)) file = files.files[0];
					else file = files.files as unknown as File;
					if (typeof file === 'undefined') return;
					let email;
					if (Array.isArray(fields.email)) email = fields.email[0];
					else email = fields.email;
					const isValidated = await validateInput(email, file);
					if (isValidated === false) {
						return res.send('Invalid input variables');
					}
					// Create new filename
					// eslint-disable-next-line @typescript-eslint/no-inferrable-types
					const filename: string = `${file.newFilename}.${file.mimetype
						?.split('/')
						.pop()}`;
					await saveFile(file, filename);
					// Get current image
					const oldImage = await prisma.user.findUnique({
						where: {
							email: email,
						},
						select: {
							image: true,
						},
					});
					// Write new filename to DB
					const photo = await prisma.user.update({
						data: {
							image: filename,
						},
						where: {
							email: email,
						},
					});
					if (!photo)
						return res.status(400).send('Failed to write filename to database');
					if (oldImage?.image === '')
						return res.status(201).json({ message: 'Image updated successfully', filename: filename });
					// If old image is local, delete it
					if (oldImage?.image && oldImage.image.search('http') !== 0) {
						unlink(`./public/images/${oldImage?.image}`, (err) => {
							if (err) {
								console.error(err);
								return res
									.status(400)
									.json({ message: 'Could not delete old image' });
							}
						});
					}
					return res
						.status(201)
						.json({ message: 'Image updated successfully', filename: filename });
				});
			}
			else {
				res.redirect('/home');
			}
			if (req.method === 'DELETE') {
				// Delete file
			}
		} catch (err) {
			console.error(err);
			return res.status(400).send('Something went wrong');
		}
	} else {
		res.redirect('/');
	}
}

// Save file to disk
const saveFile = async (file: File, filename: string) => {
	const data = fs.readFileSync(file.filepath);
	fs.writeFileSync(`./public/images/${filename}`, data);
	fs.unlinkSync(file.filepath);
	return;
};

// Body parses must be set to false for formidable to work
export const config = {
	api: {
		bodyParser: false,
		externalResolver: true,
	},
};
