import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@chakra-ui/core';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';

interface registerProps {

}


const Login: React.FC<registerProps> = ({}) => {
    const router = useRouter()
    const [,login] = useLoginMutation();
    return (
        <Wrapper variant="small"> 
            <Formik
                initialValues={{ username: "", password: ""}}
                onSubmit={async (values, {setErrors}) => {
                    const response = await login({ options: values });
                    if (response.data?.login.errors) {
                        //console.log("Registered");
                        [{field: 'username', message: 'something wrong'}];
                        setErrors (toErrorMap(response.data?.login.errors));
                    } else if (response.data?.login.user) {
                        //worked
                        console.log("Logged In")
                        router.push("/");
                    }
                }}
            >
                {( {isSubmitting} ) => (
                    <Form>
                        <InputField 
                            name='username'
                            label='Username'
                            placeholder='Username'
                            id='username'
                        />
                        <Box mt={4}>
                        <InputField 
                            name='password'
                            label='Password'
                            id='password'
                            placeholder='Password'
                            type='password'
                        />
                        </Box>
                        <Button
                            mt={4}
                            type='submit'
                            variantColor="teal"
                            isLoading={isSubmitting}
                        >
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default Login;