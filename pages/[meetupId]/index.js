import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";


const MeetupDetails = (props) => {
    return (<>
        <img width="800px" src={props.image}
        alt={props.title}/>
        <h1> {props.title} </h1>
        <address>{props.address}</address>
        <p> {props.description} </p>
    </>);
}

export async function getStaticPaths() {
    const cnt = await MongoClient.connect('mongodb+srv://ochumirochu:Lanet1234@cluster0.ksccwuk.mongodb.net/');
        const db = cnt.db();
        const col = db.collection('meetups');
        const mt = await col.find({},{_id: 1}).toArray();
   
    return {
        fallback: false,
        paths: mt.map(m => ({
            params: {meetupId: m._id.toString()}
        }))
    };
}

export async function getStaticProps(e) {
    const cnt = await MongoClient.connect('mongodb+srv://ochumirochu:Lanet1234@cluster0.ksccwuk.mongodb.net/');
        const db = cnt.db();
        const col = db.collection('meetups');
        const mt = await col.find({},{_id: 1}).toArray();
     const meetupId = e.params.meetupId;
    //  console.log(mt);
    const c1 = mt.map(m =>
        ({
            id: m._id.toString(),
            image: m.image,
            title: m.title,
            address: m.address,
            description: m.description
        })
    );
//     let c2;
//    for(const elm in c1){

//     if(c1[elm].id === e.params.meetupId){
//         c2 = c1[elm];
       
//     }
//    }

console.log(meetupId);
const mid = new ObjectId(meetupId);
   const c2 = await col.findOne({_id: mid});
     console.log(c2);
     const c3 = {
        ...c2,
        _id: meetupId
     }
     console.log(c3);
   cnt.close();
    return{
    
        
        props: {
            id: c3._id,
            title: c3.title,
            description: c3.description,
            image: c3.image,
            address: c3.address
        
        }

        
         
        
    }
}

export default MeetupDetails;