import formidable, { File } from 'formidable';
import fs, { unlink } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { prisma } from '../../server/db/client';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const uploadFormSchema = z.object({
	name: z.string().min(1),
	email: z.string().email(),
	image: z
		.any()
		.refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
		.refine(
			(file) => ACCEPTED_FILE_TYPES.includes(file?.type),
			'Only .jpg, .jpeg, and .png formats are supported.'
		),
});
export default function image(req: NextApiRequest, res: NextApiResponse) {
	try {
		// Validate token

		if (req.method === 'POST') {
			// Upload file
			const { body } = req;
			const isValid = uploadFormSchema.parse(body);
			if (!isValid) return res.status(400).send('Invalid input data');
			const form = new formidable.IncomingForm();
			// Parse form and save files
			form.parse(req, async function (err, fields, files) {
				if (err) return res.status(500).send('Cannot parse form data');
				if (typeof files === 'undefined')
					return res.status(400).send('Missing image');
				if (!fields.email) return res.status(400).send('Missing email address');
				let file: File;
				if (Array.isArray(files)) file = files[0];
				else file = files as unknown as File;
				if (typeof file === 'undefined') return;
				let email;
				if (Array.isArray(fields.email)) email = fields.email[0];
				else email = fields.email;
				await saveFile(file);
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
						image: file.newFilename,
					},
					where: {
						email: email,
					},
				});
				if (!photo) return res.status(500).send('Failed to write filename to database')
				// If old image is local, delete it
				if (oldImage?.image?.search('http') !== 0) {
					unlink(`./public/images/${oldImage?.image}`, (err) => {
						if (err) {
							console.error(err);
							return res.status(500).json({ message: 'Could not delete old image' });
						}
					});
				}
				
				return res.status(201).send('Image updated successfully');
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

const saveFile = async (file: File) => {
	const data = fs.readFileSync(file.filepath);
	fs.writeFileSync(`./public/images/${file.newFilename}`, data);
	fs.unlinkSync(file.filepath);
	return;
};

export const config = {
	api: {
		bodyParser: false,
	},
};
