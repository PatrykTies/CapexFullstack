import {useRouter} from 'next/router';
import { FC, useState } from 'react';
import {useSWRConfig} from 'swr';
import {auth} from '../lib/mutations';

const AuthForm: FC<{mode: 'signin' | 'signup'}> = ({mode}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setIsLoading] = useState(false)
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const user = await auth(mode, {email,password});
        setIsLoading(false);
        router.push('/');
    }

    return (
        <div>
            <div className='flex center'>
                
            </div>
            <div className='flex center'>

            </div>
        </div>
    )


}

export default AuthForm;