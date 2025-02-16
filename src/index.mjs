import express from 'express';
import userRoutes from './routes/userRoutes.mjs';
import messageRoutes from './routes/messageRoutes.mjs';
import authRoutes from "./routes/authRoutes.mjs";
import commentRoutes from "./routes/commentRoutes.mjs";
import likeRoutes from "./routes/likeRoutes.mjs";
import dislikeRoutes from "./routes/dislikeRoutes.mjs";


const app = express();
app.use(express.json()) // parse data to json instead of body-parser

app.use('/user', userRoutes);
app.use('/message', messageRoutes);
app.use('/auth', authRoutes);
app.use('/comments', commentRoutes);
app.use('/like', likeRoutes);
app.use('/dislike', dislikeRoutes);


app.get('/', (req,res) =>{
	res.send("hello");
});

app.listen(3000, () =>{
	console.log("server is working! :) ");
})