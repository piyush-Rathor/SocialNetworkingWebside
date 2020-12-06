const User = require("../models/User");
exports.searchController = (req, res, next) => {
    const userId = req.query.userId;
    const searchname = req.body.search;
   User.find({
        $or: [{
            name: {
                $regex: searchname,
                $options: 'si'
            }
        }, {
            email: {
                $regex: searchname,
                $options: 'si'
            }
        }]
    }).then(user => {
        return res.status(201).send(user);
    })
}