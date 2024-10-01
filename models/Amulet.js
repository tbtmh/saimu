const mongoose = require('mongoose');

const amuletSchema = new mongoose.Schema({
    ชื่อเครื่องราง: {
    type: String,
    required: 'This field is required.'
  },
    ภาพ: {
    type: String,
    required: 'This field is required.'
  },
    พิกัดขาย: {
    type: String,
    required: 'This field is required.'
  },
    ประเภทเครื่องราง: {
    type: String,
    required: 'This field is required.'
  },
    ความเชื่อ: {
    type: Array,
    required: 'This field is required.'
  },
    วัสดุที่ใช้: {
    type: String, 
    required: 'This field is required.'
  },
    ปีที่สร้าง:{ 
    type: String,
    required: 'This field is required.'
  },
    พิธีปลุกเสก: {
    type: String,
    required: 'This field is required.'
  },
    วัตถุประสงค์การใช้งาน: {
    type: String,
    required: 'This field is required.'
  },
    ราคาโดยประมาณ: {
    type: String,
    required: 'This field is required.'
  },
    ความนิยม: {
    type: String,
    required: 'This field is required.'
  },
    ความเกี่ยวข้องกับบุคคลสำคัญ: {
    type: String,
    required: 'This field is required.'
  },
  หมวดหมู่: {
    type: String,
    enum: ['ความรัก', 'สุขภาพ', 'การเงิน', 'การงาน', 'เสริมดวง', 'เดินทาง', 'การเรียน'],
    required: 'This field is required.'
  },
});

amuletSchema.index({ ชื่อเครื่องราง: 'text', ความเชื่อ: 'text' });
// WildCard Indexing
//recipeSchema.index({ "$**" : 'text' });

module.exports = mongoose.model('Amulet', amuletSchema, 'dataset02(amulet)');