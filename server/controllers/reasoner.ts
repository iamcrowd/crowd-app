import BaseCtrl from './base';

class ReasonerCtrl extends BaseCtrl {

  //reason over the ervt model
  reasonErvt = async (req, res) => {
    try {
      res.status(200).json("Execute ervt reasoner");
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

}

export default ReasonerCtrl;
