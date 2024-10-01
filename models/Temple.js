const mongoose = require('mongoose');

const templeSchema = new mongoose.Schema({
  สถานที่: {
    type: String,
    required: 'This field is required.'
  },
  จุดเด่น: {
    type: String,
    required: 'This field is required.'
  },
  ที่อยู่: {
    type: String,
    required: 'This field is required.'
  },
  วันที่เปิดทำการ: {
    type: String,
    required: 'This field is required.'
  },
  เวลาเปิดทำการ: {
    type: Array,
    required: 'This field is required.'
  },
  รายละเอียดเพิ่มเติม: {
    type: String, 
    required: 'This field is required.'
  },
  บูชา: {
    type: String,
    required: 'This field is required.'
  },
  ภาพสถานที่: {
    type: String,
    required: 'This field is required.'
  },
  หมวดหมู่: {
    type: String,
    enum: ['ความรัก', 'สุขภาพ', 'การเงิน', 'การงาน', 'เสริมดวง', 'เดินทาง', 'การเรียน'],
    required: 'This field is required.'
  },
});

templeSchema.index({ สถานที่: 'text', รายละเอียดเพิ่มเติม: 'text' });


module.exports = mongoose.model('Temple', templeSchema, 'dataset01(temple)');
