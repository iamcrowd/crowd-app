import * as jwt from 'jsonwebtoken';

import Diagram from '../models/diagram';
import BaseCtrl from './base';

class DiagramCtrl extends BaseCtrl {
  model = Diagram;
}

export default DiagramCtrl;
