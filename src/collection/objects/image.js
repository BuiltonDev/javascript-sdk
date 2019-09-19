const Component = require('./_objects');

class Image extends Component {
  constructor(request, props) {
    super(request, props, []);
    this.apiPath = 'images';
  }
}

module.exports = Image;
