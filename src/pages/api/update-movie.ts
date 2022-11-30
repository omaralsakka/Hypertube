import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/db/client';
var { spawn } = require('child_process');
const path = require('path');

const updateMovie = async (req: NextApiRequest, res: NextApiResponse) => {
	console.log('hi');
	//const pythonProcess = spawn('python3', ['hello.py']);

	function runScript() {
		return spawn('python3', ['-u', path.join(__dirname, 'hello.py')]);
	}
	let dataToSend = '';
	const subprocess = runScript();
	subprocess.stdout.on('data', (data) => {
		console.log(`data:${data}`);
		dataToSend += data.toString();
	});

	return res.status(200).json({ message: dataToSend });
};
export default updateMovie;
