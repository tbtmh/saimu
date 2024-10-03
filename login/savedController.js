const User = require('../models/User');
const Temple = require('../models/Temple'); // Replace with the actual model

module.exports = async (req, res) => {
  try {
    let UserData = await User.findById(req.session.userId);
    const { templeId } = req.body;
    const temple = await Temple.findById(templeId);

    if (!UserData) {
      return res.status(404).send("User not found");
    }

    if (UserData.savedplace) {
      const alreadyadded = UserData.savedplace.some((id) => id.toString() === templeId);
      if (alreadyadded) {
        // ลบ templeId จาก savedplace
        UserData = await User.findByIdAndUpdate(
          req.session.userId,
          { $pull: { savedplace: templeId } },
          { new: true }
        );
        console.log(UserData)
        req.flash('errsp', "Temple removed from saved places");
        return res.redirect(`/temple/${templeId}`);
      } else {
        // เพิ่ม templeId ใน savedplace
        UserData = await User.findByIdAndUpdate(
          req.session.userId,
          { $push: { savedplace: templeId } },
          { new: true }
        );
        console.log(UserData)
        req.flash('errsp', "Temple added to saved places");
        return res.redirect(`/temple/${templeId}`);
      }
    } else {
      // กรณีที่ไม่มี savedplace ให้เพิ่ม templeId ลงไป
      UserData = await User.findByIdAndUpdate(
        req.session.userId,
        { $push: { savedplace: templeId } },
        { new: true }
      );
      console.log(UserData)
      req.flash('errsp', "Temple added to saved places");
      return res.redirect(`/temple/${templeId}`);
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
};
