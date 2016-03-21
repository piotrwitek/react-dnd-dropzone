import './dragula-example-esnext.css!';

import * as React from "react";
import Dragula from 'react-dragula';


interface IProps extends React.Props<DragulaExampleEsnext> {
  date?: Date;
}

interface IState {
}

export class DragulaExampleEsnext extends React.Component<IProps, IState> {
  date: Date;
  asd: any;
  state: IState = {
  }

  dragulaDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = {
        revertOnSpill: true
      };
      Dragula([componentBackingInstance], options)
        .on('drag', function(el) {
          el.className = el.className.replace('ex-moved', '');
        }).on('over', function(el, container) {
          container.className += ' ex-over';
        }).on('out', function(el, container) {
          container.className = container.className.replace('ex-over', '');
        });
    }
  };

  constructor() {
    super();
    this.date = new Date();
    this.asd = "start";
  }

  render(): JSX.Element {
    return (
      <div className='container' ref={this.dragulaDecorator}>
        <div>dra</div>
        <div>Swap her around</div>
        <div>Swap him around</div>
        <div>Swap them around</div>
        <div>Swap us around</div>
        <div>Swap things around</div>
        <div>Swap everything around</div>
        <input type="text" placeholder="Your name here" value={this.asd} onChange={(e: any) => { this.asd = e.target.value; this.date = new Date(); this.forceUpdate() } }/>
        It is {this.date.toLocaleTimeString() }
      </div>
    );
  }
}
