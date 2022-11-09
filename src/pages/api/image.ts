import formidable, { File } from 'formidable';
import fs, { unlink } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { prisma } from '../../server/db/client';

// File requirements
const MAX_FILE_SIZE = 500000;
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

// Validation schemas
const EmailSchema = z.string().email();
const FileSchema = z
	.any()
	.refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
	.refine(
		(file) => ACCEPTED_FILE_TYPES.includes(file?.type),
		'Only .jpg, .jpeg, and .png formats are supported.'
	);

// Validator function
const validateInput = async (email: string | undefined, file: File) => {
	try {
		const validEmail = EmailSchema.parse(email);
		const validFile = FileSchema.parse(file);
		if (!validEmail || !validFile) return false;
		return true;
	} catch (err) {}
};

// Upload image and delete old if it's saved locally
export default function image(req: NextApiRequest, res: NextApiResponse) {
	try {
		// Validate token

		if (req.method === 'POST') {
			// Upload file
			const form = new formidable.IncomingForm();
			// Parse form and save files
			form.parse(req, async function (err, fields, files) {
				if (err) return res.status(500).send('Cannot parse form data');
				if (typeof files === 'undefined')
					return res.status(400).send('Missing image');
				if (!fields.email) return res.status(400).send('Missing email address');
				let file: File | undefined;
				if (Array.isArray(files.files)) file = files.files[0];
				else file = files.files as unknown as File;
				if (typeof file === 'undefined') return;
				let email;
				if (Array.isArray(fields.email)) email = fields.email[0];
				else email = fields.email;
				if (!validateInput(email, file))
					return res.status(400).send('Invalid input variables');
				// Create new filename
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
					return res.status(500).send('Failed to write filename to database');
				if (oldImage?.image === '')
					return res.status(201).json({ message: 'Image updated successfully', filename: filename });
				// If old image is local, delete it
				if (oldImage?.image?.search('http') !== 0) {
					console.log('Deleting old image', oldImage);
					unlink(`./public/images/${oldImage?.image}`, (err) => {
						if (err) {
							console.error(err);
							return res
								.status(500)
								.json({ message: 'Could not delete old image' });
						}
					});
				}

				return res
					.status(201)
					.json({ message: 'Image updated successfully', filename: filename });
			});
		}
		if (req.method === 'DELETE') {
			// Delete file
		}
	} catch (err) {
		console.error(err);
		return res.status(500).send('Something went wrong');
	}
}

// Save file to disk
const saveFile = async (file: File, filename: string) => {
	console.log('Trying to save the file', file);
	const data = fs.readFileSync(file.filepath);
	console.log('File read successfully');
	fs.writeFileSync(`./public/images/${filename}`, data);
	console.log('File written successfully');
	fs.unlinkSync(file.filepath);
	return;
};

// Body parses must be set to false for formidable to work
export const config = {
	api: {
		bodyParser: false,
	},
};
