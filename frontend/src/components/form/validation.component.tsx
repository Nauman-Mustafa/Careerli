import React from 'react'
import { Form } from 'react-bootstrap'

export const ValidationError = ( { errors, sErrors, name }: any ) => {

    const validationError = () => {
        let message = '';
        if (errors && errors[name] && errors[name].message) message = errors[name].message;
        if (sErrors && sErrors[name]) message = sErrors[name];
        return message;
    }
    return validationError() ? (
        <Form.Text className="text-danger">
            { validationError() }
        </Form.Text>
    ) : <React.Fragment></React.Fragment>
}
