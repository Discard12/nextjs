import {MongoClient} from 'mongodb';
// api/
//POST

const handler = async (req, res) => {

    if(req.method === 'POST'){
        console.log('manat2');
        const data = req.body;
        // const { title, image, address, description} = data;

        const cnt = await MongoClient.connect('mongodb+srv://ochumirochu:Lanet1234@cluster0.ksccwuk.mongodb.net/');
        console.log(cnt);
        const db = cnt.db();

        const mtsCol = db.collection('meetups');

        const resp = await mtsCol.insertOne(data);
      
        cnt.close();

        res.status(201).json({message: '123'});
    }
}


export default handler;