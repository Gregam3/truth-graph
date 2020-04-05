import * as React from "react";
import {Button} from '@material-ui/core';

export class NodeContent extends React.Component {
    constructor(props) {
        super(props);
        this.resetDisplayedNode = props.resetDisplayedNode;
        this.state = {
            node: props.displayedNode
        };
    }

    render() {
        const node = this.state.node;
        console.log(node);
        return <div style={{padding: 20}}>
            <h1>Truth Node: {node.id}</h1>
            {node.content.definitions.size > 0 && <div><h2>Definitions</h2> {node.content.definitions}</div>}
            {node.content.reasoning && <div><h2>Reasoning</h2> {node.content.reasoning}</div>}
            {node.parent && node.parent.content.reasoningForDependents && <div>
                <h2>Dependencies</h2>{node.parent.content.reasoningForDependents}</div>}
                <h2>Dependant assumed true certainty</h2> {node.content.certainty * 100}%
            <h2>Logical Certainty</h2> {this.calculateLogicalTruthValue(node.parent) * 100}%
            <br/>
            <Button variant="contained" color="primary" onClick={this.resetDisplayedNode}>Back to graph</Button>
        </div>
    }

    calculateLogicalTruthValue(parent) {
        if (parent == null) {
            return 1;
        }

        return this.calculateLogicalTruthValue(parent.parent) * parent.content.certainty;
    }
}