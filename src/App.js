import React from 'react';
import './App.css';

import {Graph} from "react-d3-graph";
import {NodeContent} from "./NodeContent";
import data from "./graph-data";

const NODE_NAME_OFFSET = 100;

let nodeNames = {
    100: "Absolute truth exists",
    101: "Absolute truth is not accessible to humans",
    102: "Truth values can be ascribed without certainty",
    103: "One should act based on perceived truth values",
    104: "All perceived truth values are subject to human biases",
    105: "Truth value strength correlates to action commitment",
    106: "Inconvenient truths are more valuable",
    107: "Truths should be attacked"
};

function addNamesToGraph(data) {
    let graphData = data;

    graphData.nodes = graphData.nodes.map(node => {
        node.id = makeNodeName(node.id);
        return node;
    });

    graphData.links = graphData.links.map(link => {
        const source = link.items[0];
        const target = link.items[1];

        link.source = makeNodeName(link.items[0]);
        link.target = makeNodeName(link.items[1]);

        graphData.nodes[target - NODE_NAME_OFFSET].parent =  graphData.nodes[source - NODE_NAME_OFFSET];
        return link;
    });

    return graphData;
}

function makeNodeName(nodeId) {
    return (nodeId - NODE_NAME_OFFSET) + ": " + nodeNames[nodeId];
}

let graphData = addNamesToGraph(data);

// the graph configuration, you only need to pass down properties
const nodeConfig = {
    nodeHighlightBehavior: true,
    width: window.innerWidth,
    height: window.innerHeight,
    node: {
        color: "red",
        size: 5000,
        highlightStrokeColor: "blue",
        fontSize: 20
    },
    link: {
        highlightColor: "lightblue",
    },
    d3: {
        linkLength: 800
    }
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.resetDisplayedNode = this.resetDisplayedNode.bind(this);
        this.state = {
            displayedNode: null
        }
    }

    render() {
        return <div>
            {this.state.displayedNode ?
                <NodeContent
                    displayedNode={this.state.displayedNode}
                    resetDisplayedNode={() => this.resetDisplayedNode()}/> :
                <div>
                    <Graph
                        id="graph-id"
                        data={graphData}
                        config={nodeConfig}
                        onClickNode={this.changeDisplayNode}
                    />
                </div>
            }
        </div>
    }

    changeDisplayNode = nodeId => {
        let displayedNode = graphData.nodes.filter(node => node.id === nodeId)[0];
        this.setState({displayedNode});
    };

    resetDisplayedNode = () => this.setState({displayedNode: null});
}

export default App;
