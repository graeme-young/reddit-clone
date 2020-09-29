import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@chakra-ui/core';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';

interface registerProps {

}


const Register: React.FC<registerProps> = ({}) => {
    const router = useRouter()
    const [,register] = useRegisterMutation();
    return (
        <Wrapper variant="small"> 
            <Formik
                initialValues={{ username: "", password: ""}}
                onSubmit={async (values, {setErrors}) => {
                    const response = await register({username: values.username, password: values.password});
                    if (response.data?.register.errors) {
                        //console.log("Registered");
                        [{field: 'username', message: 'something wrong'}];
                        setErrors (toErrorMap(response.data?.register.errors));
                    } else if (response.data?.register.user) {
                        //worked
                        console.log("Registered")
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
                            Register
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default Register;