import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const EMAIL_TOKEN_EXPIRATION_MINUTES = 10; // 10 minutes

const router = Router();
const prisma = new PrismaClient();

// function to generate random 8 digit token as email token
function generateEmailToken() {
	return Math.floor(100000000 + Math.random() * 900000000).toString();
  }

// define 2 endpoints for routes

// 1. login a user
router.post('/login', async (req,res)=>{
	const { email, password } = req.body;

	// check if password is on db and if not send error message

	const dbpassword = await prisma.user.findUnique({
    where: { email: email },
    select: { password: true },
  		});

	// forbidden error
	if (dbpassword === null) {

		 return res.status(403).json({ error: 'Fail to login1!' })
		//	return res.status(403).json( { error: email } );

		}

	// check password
  	if (dbpassword.password !== password) {
    	return res.status(403).json({ error: 'Fail to login!' });
  		}

	// generate a token after the login
	const emailToken = generateEmailToken();
	const expiration = new Date(
		new Date().getTime() + EMAIL_TOKEN_EXPIRATION_MINUTES * 60 * 1000); // token expires after 10 mins, but we need milliseconds conversion
try {
	const createdToken = await prisma.token.create({
		data: {
			type: 'EMAIL',
			emailToken,
			expiresAt: expiration,
   				user: {
  					connect: { email }
				}

			}
	});
	console.log(createdToken); // visualize the json on the terminal below

	res.sendStatus(200); // all good
 } catch (error) {
	console.log(error);
	res.status(400).json({error: 'Cannot log in'});
}
});

// 2. Validate the emailtoken

router.post('/authenticate', async (req, res) => {
  const { email, emailToken } = req.body;

  const dbEmailToken = await prisma.token.findUnique({
    where: {
      emailToken: emailToken,
    },
    include: {
      user: true,
    },
  });

if (!dbEmailToken || !dbEmailToken.valid) {
  return res.status(401).json({ error: 'Invalid or expired token' });
}
	if (dbEmailToken.expiration < new Date()) {
		return res.status(401).json({ error: 'Token is expired' });
	}

	// at this point, the user is validated

	res.sendStatus(200);

})

export default router;