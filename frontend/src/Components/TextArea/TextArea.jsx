import { Field } from 'formik';
import React from 'react';
import Toolbar from './Toolbar';

const TextArea = () => {
    return (
        <>
            <Toolbar first={'Bold'} second={"Italic"} third={"Center"} fourth={"Clear all"} />
            <Field as="textarea" value=""  />
        </>
    );
}

export default TextArea;
