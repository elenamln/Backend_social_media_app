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

// user CRUD endpoints:

// 1. create user
router.post('/signup', async (req,res) => {
	const {email, name, password} = req.body;
	try {
		const result = await prisma.user.create({
			data: {
				email,
				name,
				password
			}
		});

		res.json(result);
	} catch (e) {
		res.status(400).json({error: `Failed to create user`});
	}
});

// 2. list users

router.get('/list', async (req,res) =>{
	const { token } = req.body;
	const s = await findRefreshToken(token);

	/// console.log(s);

	if (s === null) {
		res.status(404).send('Not available');
		//console.log("null value found.");
	}
	else { const allUser = await prisma.user.findMany(); // prisma.tableIwanttoquery
		res.json(allUser);
	}

	///const chk = isTokenValid("451525852");

  ///	console.log("ok4");
	///  console.log(chk);

///	if ((typeof chk) == null) {
 ///   	return res.status(403).json({ error: 'Invalid token!' });
///  		}
//7	else { const allUser = await prisma.user.findMany(); // prisma.tableIwanttoquery
	// res.json(allUser);
		/// res.json("pippo");
//	}

});

// 3. get one user
router.get('/:id', async (req,res) =>{

	const { token } = req.body;
	const s = await findRefreshToken(token);

	if (s === null) {res.status(404).send('Not available');
		} //console.log("null value found.");

	else {

	const { id } = req.params;
	const user = await prisma.user.findUnique({where: {id:Number(id)}})
	res.json(user);
		}
});

// 4. update user (put)
router.put('/:id', async (req, res) => {

	const { token, name } = req.body;
	const s = await findRefreshToken(token);

	if (s === null) {res.status(404).send('Not available');
		} //console.log("null value found.");

	else {
		const { id } = req.params;

    		const result = await prisma.user.update({
      		where: { id: Number(id) },
      		data: { name: name }, //update only name, not the email
    		});
    		res.json(result);

    	res.status(400).json({ error: `Failed to update the user` });
  	}


});

// 5. delete user
router.delete('/:id', async (req, res) => {

	const { token } = req.body;
	const s = await findRefreshToken(token);

	if (s === null) {res.status(404).send('Not available');
		} //console.log("null value found.");

	else {
		const { id } = req.params;

		await prisma.comment.delete({
			where:
				{id:Number(id)}
		});

		await prisma.message.delete({
			where:
				{id:Number(id)}
		});

		await prisma.user.delete({
			where:
				{id:Number(id)}
		});
  }});

export default router;
