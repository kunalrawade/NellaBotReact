import React from 'react';
import {
  Diagram,
  store as diagramStore,
  setEntities,
  setConfig,
  diagramOn,
} from 'react-flow-diagram';
import model from './CustomDiagram/model-example';
import { config, customEntities } from './CustomDiagram/config-example';
import './flowChart.css';
 
class CustomDiagram extends React.PureComponent {
  componentWillMount() {

    diagramStore.dispatch(setConfig(config));
    diagramStore.dispatch(setEntities(model));
 
    diagramOn('anyChange', entityState =>
      // You can get the model back
      // after modifying the UI representation
      console.info(entityState)
    );
  }
  render() {
    return <div><Diagram customEntities={customEntities}/></div>;
  }
}
 
export default CustomDiagram;