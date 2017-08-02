const { treeMenu, arrayMenu, useArrayMenu } = require('../menu')

module.exports = {
  'GET /menus': function (req, res) {
    res.status(200).json(arrayMenu).end()
  },
}
