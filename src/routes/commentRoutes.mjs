import { Router } from 'express';
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

// comment CRUD endpoints:

// 1. create comment
router.post('/:userid/:mid', async (req, res) => {

  	const { token, content } = req.body;
	const s = await findRefreshToken(token);

	/// console.log(s);

	if (s === null) {
		res.status(404).send('Not available');
		//console.log("null value found.");
	}

    else {
        const { userid, mid } = req.params;
        const result = await prisma.comment.create({
          data: {
            content,
            userId: Number(userid), // trovare l'utente corrispondente al token
              messageId: Number(mid)

          },
        });

        res.json(result);
      //} catch (e) {
      //  res.status(500).json({ error: 'Cannot post message'});
     // }

  } // else

});


export default router;