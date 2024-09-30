const User = require('../models/User');
const Temple = require('../models/Temple'); // Replace with the actual model

module.exports = async (req, res) => {
  try {
    // ดึงข้อมูลผู้ใช้จาก session
    let UserData = await User.findById(req.session.userId);
    const { templeId } = req.body;
    const temple = await Temple.findById(templeId);
    const msg = req.flash('errsp');
   

    if (!UserData) {
      return res.status(404).send("User not found");
    }

    // ตรวจสอบว่ามี savedplace หรือไม่
    if (UserData.savedplace) {
      const alreadyadded = UserData.savedplace.some((id) => id.toString() === templeId);
      if (alreadyadded) {
        // ลบ templeId จาก savedplace ถ้ามีแล้ว
        UserData = await User.findByIdAndUpdate(
          req.session.userId,
          {
            $pull: { savedplace: templeId },
          },
          { new: true } // คืนค่าที่ถูกอัพเดตกลับมา
        );
        console.log(UserData);
        req.flash('errsp', "Temple removed from saved places" );
        res.send("Temple removed from saved places");
  
        
      } else {
        // ถ้า templeId ยังไม่มี ให้เพิ่มลงใน savedplace
        UserData = await User.findByIdAndUpdate(
          req.session.userId,
          {
            $push: { savedplace: templeId },
          },
          { new: true } // คืนค่าที่ถูกอัพเดตกลับมา
        );
        console.log(UserData);
        req.flash('errsp', "Temple added to saved places");
        res.send("Temple added to saved places");
        

      }
    } else {
      // กรณีที่ savedplace เป็น null หรือไม่มี ให้เพิ่ม templeId เข้าไป
      UserData = await User.findByIdAndUpdate(
        req.session.userId,
        {
          $push: { savedplace: templeId },
        },
        { new: true }
      );
      console.log(UserData);
      req.flash('errsp', "Temple added to saved places");
      res.send("Temple added to saved places");
     
    }
    
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
};






        