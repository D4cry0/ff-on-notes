import React from 'react';
import pkg from '@material-tailwind/react';
import { Form } from '@remix-run/react';
const { Card, CardBody, CardHeader, Typography, Input, Button } = pkg;

const login = () => {
    return (
        <section className='flex justify-center w-full'>
            <Card className='w-3/6'>
                <CardHeader>
                    <Typography
                        variant='h1'
                    >
                        Login
                    </Typography>
                </CardHeader>
                <CardBody>
                    <Form action='/login' method='post'>
                        <div>
                            <Input label='Username' id='username' name='username' type='text' crossOrigin={undefined} />
                        </div>
                        <div>
                            <Input label='Password' id='password' name='password' type='password' crossOrigin={undefined} />
                        </div>
                        <Button type='submit'>Login</Button>
                    </Form>
                </CardBody>
            </Card>
        </section>
    )
}

export default login