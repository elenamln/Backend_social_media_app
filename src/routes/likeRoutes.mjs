import {Router} from 'express';
import {PrismaClient} from '@prisma/client'

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


// 1. create like

router.post('/:userid/:mid',  async (req,res) => {

    const { token } = req.body;
	const s = findRefreshToken(token);

	if (s === null) {res.status(404).send('Not available');
		} //console.log("null value found.");

    else {

    const{ userid, mid } = req.params;


		const result = await prisma.like.create({
			data: {
                userId: Number(userid),
                messageId: Number(mid),
			}
		});

		res.json(result);

    } //else
}
);

export default router;