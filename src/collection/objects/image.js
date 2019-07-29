const Component = require('./_objects');
const {
  get,
  refresh,
} = require('./_methods');

class Image extends Component {
  constructor(request, props) {
    super(request, props, [get, refresh]);
    this.apiPath = 'images';
  }
}

module.exports = Image;
