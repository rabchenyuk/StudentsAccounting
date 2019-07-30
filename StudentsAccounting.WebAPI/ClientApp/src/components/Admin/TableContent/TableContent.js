import React, { Component } from 'react';
import { Table, Input, Button } from 'semantic-ui-react';
import Pagination from '../../Pagination/Pagination';
import Loader from '../../UI/Loader/Loader';
import styled from 'styled-components';

const StyledInput = styled(Input)`
    margin-right: 5px;
`;

export default class TableContent extends Component {
    state = {
        search: '',
        column: null,
        direction: null
    };

    getKeys = () => {
        return Object.keys(this.props.value[0]);
    }

    generateKey = (pre) => {
        return `${pre}_${Math.random()}`;
    }

    getHeader = () => {
        const { search, column, direction } = this.state;
        const keys = this.getKeys();
        return keys.map((val) => {
            return <Table.HeaderCell sorted={column === val ? direction : null} onClick={() => this.clickHandler(val)} key={this.generateKey(val)}>{val.toUpperCase()}</Table.HeaderCell>
        })
    }

    clickHandler = clickedColumn => {
        const { search, column, direction } = this.state;
        if (column !== clickedColumn) {
            this.props.clickHandler(clickedColumn);
            this.setState({
                column: clickedColumn,
                direction: 'ascending',
            })
            return
        }
        this.setState({
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
        this.props.clickHandler(clickedColumn);
    };

    renderRow = (keys, data) => {
        return keys.map((key) => {
            return <Table.Cell key={this.generateKey(key)}><React.Fragment>{data[key]}</React.Fragment></Table.Cell>
        })
    }

    renderStudentsTab = () => {
        let keys = this.getKeys();
        return this.props.value.map((row) => {
            return <Table.Row key={this.generateKey(row)}>{this.renderRow(keys, row)}</Table.Row>
        })
    };

    inputHandler = () => {
        this.setState({ search: '' });
        this.props.inputHandler(this.state.search);
    }

    handleInputChange = e => {
        this.setState({ search: e.target.value });
    }

    render() {
        let tabContent = (
            <Table sortable celled>
                <Table.Header>
                    <Table.Row>
                        {this.props.value.length === 0 ? null : this.getHeader()}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.props.value.length === 0 ? null : this.renderStudentsTab()}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='8'>
                            <Pagination
                                currentPage={this.props.currentPage}
                                loadData={this.props.loadData}
                                totalPages={this.props.totalPages} />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );

        if (this.props.value.length === 0) {
            tabContent = <h1>No results...</h1>;
        }

        if (this.props.loading) {
            tabContent = <Loader />;
        }

        return (
            <React.Fragment>
                <StyledInput
                    value={this.state.search}
                    action={{ icon: 'search', onClick: () => this.inputHandler() }}
                    onChange={this.handleInputChange}
                    placeholder='Search...' />
                <Button onClick={this.props.resetSearch}>Reset</Button>
                {tabContent}
            </React.Fragment>
        );
    }
}