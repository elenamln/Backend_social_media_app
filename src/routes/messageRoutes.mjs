import {Router} from 'express';
import { PrismaClient } from '@prisma/client';


const router = Router();
const prisma = new PrismaClient();

// used to check if the token sent by the user is in the database.
function findRefreshToken(token) {
  return prisma.token.findUnique({
    where: {
      emailToken: token,
    },
  });
}

// message CRUD endpoints:

// 1. create message
router.post('/:id', async (req, res) => {

  	const { token, title, topic, content } = req.body;
	const s = await findRefreshToken(token);

	/// console.log(s);

	if (s === null) {
		res.status(404).send('Not available');
		//console.log("null value found.");
	}

    else {
        const { id } = req.params;
        const timeElapsed = Date.now();
        const expirationTime = new Date(timeElapsed + 5 * 60 * 1000); // 5 minutes


      //try {
       const allowedTopics = ['Politics', 'Health', 'Sport', 'Tech'];

        if (!allowedTopics.includes(topic)) {
          return res.status(400).json({ error: 'Invalid topic' }); // allow only the four topics
        }

        const result = await prisma.message.create({
          data: {
            title,
            topic,
            content,
            userId: Number(id), // trovare l'utente corrispondente al token
            expiresAt: expirationTime

          },
          include: { user: true },
        });

        res.json(result);
      //} catch (e) {
      //  res.status(500).json({ error: 'Cannot post message'});
     // }

  } // else

});

// 2. list message
router.get('/', async (req, res) => {

  const { token } = req.body;
  const s = await findRefreshToken(token);

  if (s === null) {res.status(404).send('Not available');
  } //console.log("null value found.");

  else {

  const allMessages = await prisma.message.findMany();
  res.json(allMessages);

  } //else

});

// 3. get one message
router.get('/:id', async (req, res) => {

  const { token } = req.body;
  const s = await findRefreshToken(token);

  if (s === null) {res.status(404).send('Not available');
  } //console.log("null value found.");

  else {

  const { id } = req.params;
  console.log('Find message with the id: ', id);

  const message = await prisma.message.findUnique({
    where: { id: Number(id) },
    include: { user: true },
  });
  if (!message) {
    return res.status(404).json({ error: 'Message not found!' });
  }

  res.json(message);

  } // else

});

// 4. update message
router.put('/:id', async (req, res) => {

  const { token, content } = req.body;
  const s = await findRefreshToken(token);

  if (s === null) {res.status(404).send('Not available');
  } //console.log("null value found.");

	else {
		const { id } = req.params;

    		const result = await prisma.message.update({
      		where: { id: Number(id) },
      		data: { content: content }, //update only content
    		});
    		res.json(result);

  	} // else

});


export default router;