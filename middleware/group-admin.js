module.exports = function (req, res, next) {
    
    if (req.user._id !== req.group.groupAdmin ) return res.status(403).send('Access denied.');

    next();
}