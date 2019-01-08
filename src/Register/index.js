// @flow
import * as React from 'react'
import * as Yup from 'yup'
import { withFormik, Formik, Field, Form } from 'formik'
import { navigate } from '@reach/router'
import getLocale from 'get-user-locale'
import {
  Background,
  TextInput,
  withField,
  Card,
  Absolute,
  View,
  Heading,
  Button,
  Text,
  DisplayError,
} from '../Components'
import type { FormikProps } from 'formik'

type FormValues = {
  username: string,
  firstName: string,
  lastName: string,
  langKey: string,
}

const registerUser = async (values: FormValues, form) => {
  form.setStatus(null)
  console.log(values)
  const { ok, status } = await fetch('/user-registration/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  })
  form.setStatus(status)
  form.setSubmitting(false)
  console.log(ok, status)
}

type Props = {}

const Register = (props: Props) => {
  return (
    <Background>
      <Absolute
        top="50%"
        left={0}
        right={0}
        style={{ transform: 'translateY(-50%)' }}>
        <Card mx="auto" width={512} py={3} px={4}>
          <View my={3} ml={3}>
            <Heading>Register</Heading>
          </View>
          <Formik
            initialValues={{
              username: '',
              firstName: '',
              lastName: '',
              langKey: getLocale(),
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string()
                .email()
                .required(),
              firstName: Yup.string().required(),
              lastName: Yup.string().required(),
              langKey: Yup.string().required(),
            })}
            onSubmit={registerUser}>
            {({ handleChange, handleBlur, values, isSubmitting, status }) => {
              return status && status >= 200 && status < 300 ? (
                <View>
                  <View my={3}>
                    <TextInput
                      name="username"
                      type="text"
                      label="E-mail address"
                      value={values.username}
                      onChange={() => {}}
                      component={TextInput.Field}
                      disabled
                      width={1}
                    />
                  </View>
                  <View my={3} mx={24}>
                    <Text>
                      You will receive an e-mail with an activation link
                      shortly!
                    </Text>
                  </View>
                  <View my={3}>
                    <Button bg="success">Success!</Button>
                  </View>
                </View>
              ) : (
                <Form>
                  <DisplayError>{status}</DisplayError>
                  <View my={3}>
                    <Field
                      name="username"
                      type="text"
                      label="E-mail address"
                      component={TextInput.Field}
                      width={1}
                    />
                  </View>
                  <View my={3}>
                    <Field
                      name="firstName"
                      type="text"
                      label="First name"
                      width={1}
                      component={TextInput.Field}
                    />
                  </View>
                  <View my={3}>
                    <Field
                      name="lastName"
                      type="text"
                      label="Last name"
                      component={TextInput.Field}
                      width={1}
                    />
                  </View>
                  <View my={3}>
                    <Button type="submit" disabled={isSubmitting}>
                      Submit
                    </Button>
                  </View>
                </Form>
              )
            }}
          </Formik>
        </Card>
      </Absolute>
    </Background>
  )
}

export { Register }