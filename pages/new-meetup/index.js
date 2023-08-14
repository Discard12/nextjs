import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetup() {
    const rou = useRouter();
    const addMh = async (e) => {
        console.log(e);
        const resp = await fetch('/api/new-meetup',
        {method: 'POST',
        body: JSON.stringify(e),
        headers: {
        'Content-Type':'application/json'
        }});
        console.log(2);
        const data = await resp.json();

        console.log(data);
        rou.push('/');
    }
    const addMeetup = (e) =>{   
        console.log(e);
    }
    return <NewMeetupForm onAddMeetup={addMh} />
}

export default NewMeetup;