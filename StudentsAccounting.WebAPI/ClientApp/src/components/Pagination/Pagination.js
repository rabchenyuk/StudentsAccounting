import React from 'react';
import { Button } from 'semantic-ui-react';

const pagination = props => (
    <React.Fragment>
        <Button disabled={props.currentPage === 1} onClick={() => props.loadCourses(props.currentPage - 1)}>Previous</Button>
        {
            props.totalPages.map((val, index) => {
                return <span
                    key={index}
                    style={val === props.currentPage ? { color: 'red' } : { }}> {val}
                </span>
            })
        }
        <Button disabled={props.totalPages.length === props.currentPage} onClick={() => props.loadCourses(props.currentPage + 1)}>Next</Button>
    </React.Fragment>
);

export default pagination;