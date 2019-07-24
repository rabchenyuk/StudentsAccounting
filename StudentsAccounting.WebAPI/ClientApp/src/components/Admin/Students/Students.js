import React, { Component } from 'react';
import { Table, Input, Button } from 'semantic-ui-react';
import Pagination from '../../Pagination/Pagination';

export default class Students extends Component {
    state = { search: '' };

    getKeys = () => {
        return Object.keys(this.props.students[0]);
    }

    generateKey = (pre) => {
        return `${pre}_${Math.random()}`;
    }

    getHeader = () => {
        const keys = this.getKeys();
        return keys.map((val) => {
            return <Table.HeaderCell onClick={() => this.props.clickHandler(val)} key={this.generateKey(val)}>{val.toUpperCase()}</Table.HeaderCell>
        })
    }

    renderRow = (keys, data) => {
        return keys.map((key) => {
            return <Table.Cell key={this.generateKey(key)}><React.Fragment>{data[key]}</React.Fragment></Table.Cell>
        })
    }

    renderStudentsTab = () => {
        let keys = this.getKeys();
        return this.props.students.map((row) => {
            return <Table.Row key={this.generateKey(row)}>{this.renderRow(keys, row)}</Table.Row>
        })
    };

    inputHandler = () => {
        this.props.inputHandler(this.state.search);
    }

    handleInputChange = e => {
        this.setState({ search: e.target.value });
    }

    render() {
        let tabContent = (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        {this.props.students.length === 0 ? null : this.getHeader()}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.props.students.length === 0 ? null : this.renderStudentsTab()}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>
                            <Pagination
                                currentPage={this.props.currentPage}
                                loadData={this.props.loadStudents}
                                totalPages={this.props.totalPages} />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );

        if (this.props.students.length === 0) {
            tabContent = <h1>No results...</h1>;
        }

        return (
            <React.Fragment>
                <Input
                    action={{ icon: 'search', onClick: () => this.inputHandler() }}
                    onChange={this.handleInputChange}
                    placeholder='Search...' />
                <Button onClick={this.props.resetSearch}>Reset</Button>
                {tabContent}
            </React.Fragment>
        );
    }
}