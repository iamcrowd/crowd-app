import * as express from 'express';

import UserCtrl from './controllers/user';
import DiagramCtrl from './controllers/diagram';
import NamespaceCtrl from './controllers/namespace';
import ReasonerCtrl from './controllers/reasoner';

function setRoutes(app): void {
  const router = express.Router();
  const userCtrl = new UserCtrl();
  const diagramCtrl = new DiagramCtrl();
  const namespaceCtrl = new NamespaceCtrl();
  const reasonerCtrl = new ReasonerCtrl();

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  //Diagrams
  router.route('/diagrams').get(diagramCtrl.getAll);
  router.route('/diagrams/count').get(diagramCtrl.count);
  router.route('/diagram').post(diagramCtrl.insert);
  router.route('/diagram/:id').get(diagramCtrl.get);
  router.route('/diagram/:id').put(diagramCtrl.update);
  router.route('/diagram/:id').delete(diagramCtrl.delete);

  //Namespaces
  router.route('/namespaces').get(namespaceCtrl.getAll);
  router.route('/namespaces/count').get(namespaceCtrl.count);
  router.route('/namespace').post(namespaceCtrl.insert);
  router.route('/namespace/:id').get(namespaceCtrl.get);
  router.route('/namespace/:id').put(namespaceCtrl.update);
  router.route('/namespace/:id').delete(namespaceCtrl.delete);

  // Reasoners
  router.route('/reasoners/ervt/reason').post(reasonerCtrl.reasonErvt);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}

export default setRoutes;
