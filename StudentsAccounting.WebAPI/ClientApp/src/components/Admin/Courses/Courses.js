import React, { Component } from 'react';
import { Icon, Menu, Table } from 'semantic-ui-react';

export default class Courses extends Component {
    getKeys = () => {
        return Object.keys(this.props.courses[0]);
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
        return this.props.courses.map((row) => {
            return <Table.Row key={this.generateKey(row)}>{this.renderRow(keys, row)}</Table.Row>
        })
    }

    render() {
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        {this.getHeader()}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.renderStudentsTab()}
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>
                            <Menu floated='right' pagination>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron left' />
                                </Menu.Item>
                                <Menu.Item as='a'>1</Menu.Item>
                                <Menu.Item as='a'>2</Menu.Item>
                                <Menu.Item as='a'>3</Menu.Item>
                                <Menu.Item as='a'>4</Menu.Item>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron right' />
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
}