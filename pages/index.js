import MeetupList from '../components/meetups/MeetupList';
import Layout from '../components/layout/Layout';
import { Fragment, useEffect, useState } from 'react';
import { MongoClient } from 'mongodb';
import Head from 'next/head';
const dums = [
    {
        id: 'm1',
        image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f504dd27-54d5-48c8-b61e-36a7850a0757/dg3ej9d-477d4795-5b6b-4968-a732-3942577134ce.png/v1/fit/w_414,h_311,q_70,strp/poof_s_killergarten_by_sronico_dg3ej9d-414w.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTI1IiwicGF0aCI6IlwvZlwvZjUwNGRkMjctNTRkNS00OGM4LWI2MWUtMzZhNzg1MGEwNzU3XC9kZzNlajlkLTQ3N2Q0Nzk1LTViNmItNDk2OC1hNzMyLTM5NDI1NzcxMzRjZS5wbmciLCJ3aWR0aCI6Ijw9NzAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.VR4JN-p-aqB5qXsJgALrIIHAmJU2a-MQUjTwsmVM1ug',
        title: 'A',
        address: '1',
        description: '1'
        
    },
    {
        id: 'm2',
        image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f504dd27-54d5-48c8-b61e-36a7850a0757/dg3ej9d-477d4795-5b6b-4968-a732-3942577134ce.png/v1/fit/w_414,h_311,q_70,strp/poof_s_killergarten_by_sronico_dg3ej9d-414w.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTI1IiwicGF0aCI6IlwvZlwvZjUwNGRkMjctNTRkNS00OGM4LWI2MWUtMzZhNzg1MGEwNzU3XC9kZzNlajlkLTQ3N2Q0Nzk1LTViNmItNDk2OC1hNzMyLTM5NDI1NzcxMzRjZS5wbmciLCJ3aWR0aCI6Ijw9NzAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.VR4JN-p-aqB5qXsJgALrIIHAmJU2a-MQUjTwsmVM1ug',
        title: 'B',
        address: '2',
        description: '2'
    }
];


const HomePage = (props) => {
    const [loaded, setLoads] = useState();
    // const fetchDums = async () =>{
    //     const resp = await fetch('/api/getdata');

    //     // const data = await resp.json();
    //     console.log(resp);
    //     // setLoads(data);
    // }

    // fetchDums();
    useEffect(()=>{
        
        setLoads(dums);
    },[]);
    console.log(123);
    return (
       <Fragment>
       
       {loaded && <MeetupList meetups={props.meetups} />} 
       </Fragment>
    );
}


export const getStaticProps = async () => {
        //fetch
     

        const cnt = await MongoClient.connect('mongodb+srv://ochumirochu:Lanet1234@cluster0.ksccwuk.mongodb.net/');
        console.log(cnt);
        const db = cnt.db();

        const mtsCol = db.collection('meetups');

        const mC = await mtsCol.find().toArray();

        cnt.close();
        return {
            props: {
                meetups: mC.map(m => ({
                    title: m.title,
                    address: m.address,
                    image: m.image,
                    description: m.description,
                    id: m._id.toString()
                })),

            },
            revalidate: 1,
            
        };  
}

export default HomePage;