import express,{Application,Request,Response} from 'express';

const app = express();
const PORT = 3001;

app.get("/",(req:Request,res:Response):void => {
    res.json({message:"test"});
});

app.listen(PORT,()=>{
    console.log('通信は成功');
});



