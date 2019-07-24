import React from 'react';
import { Button } from 'semantic-ui-react';

const pagination = props => (
    <div className="ui pagination left floated menu">
        <Button className="icon item" disabled={props.currentPage === 1} onClick={() => props.loadData(props.currentPage - 1)}><i className="chevron left icon"></i></Button>
        {
            props.totalPages.map((val, index) => {
                return <span
                    className="item"
                    key={index}
                    style={val === props.currentPage ? { color: 'red' } : { }}> {val}
                </span>
            })
        }
        <Button className="icon item" disabled={props.totalPages.length === props.currentPage} onClick={() => props.loadData(props.currentPage + 1)}><i className="chevron right icon"></i></Button>
    </div>
);

export default pagination;