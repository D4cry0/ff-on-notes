import React from 'react';
import pkg from '@material-tailwind/react';
import { Form } from '@remix-run/react';
const { Card, CardBody, CardHeader, Typography, Input, Button } = pkg;

const login = () => {
    return (
        <section className='flex justify-center w-full'>
            <Card className='w-3/6 pt-12 mt-14'>
                <CardBody className='flex flex-col gap-4'>
                    <Typography
                        variant='h1'
                    >
                        Login
                    </Typography>
                    <Form action='/login' method='post' className='flex flex-col gap-4'>
                        <Input label='Username' id='username' name='username' type='text' crossOrigin={undefined} />
                        <Input label='Password' id='password' name='password' type='password' crossOrigin={undefined} />
                        <Button type='submit'>Login</Button>
                    </Form>
                </CardBody>
            </Card>
        </section>
    )
}

export default login