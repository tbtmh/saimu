const axios = require('axios');
const Temple = require('../models/Temple');
const Amulet = require('../models/Amulet');

module.exports = (req, res) => {
    res.render('chatbot', { messages: [] }); 
};

module.exports.postMessage = async (req, res) => {
    const { message } = req.body;  

    try {
        console.log(message);  

        const response = await axios.post('http://localhost:5000/predict', { question: message });
        console.log(response.data);

        const predictedCategory = response.data.predicted_category;

        if (predictedCategory === "ไม่ระบุหมวดหมู่") {
            const responseMessage = `
                <div>
                    <p>ขออภัยค่ะ ไม่สามารถระบุหมวดหมู่ของคำถามนี้ได้ ลองใช้คำถามอื่นดูนะคะ!</p>
                </div>
            `;
            return res.json({ response: responseMessage });
        }
        else{
            
            const temples = await Temple.aggregate([{ $match: { 'หมวดหมู่': predictedCategory } }, { $sample: { size: 5 } }]);
            const amulets = await Amulet.aggregate([{ $match: { 'หมวดหมู่': predictedCategory } }, { $sample: { size: 5 } }]);
            
            console.log('Temples:', temples);
            console.log('Amulets:', amulets);

            const responseMessage = `
                <div>
                    <h3>Suggested Temples:</h3>
                    <ul>
                        ${temples.map(t => `
                            <li>
                                เราขอแนะนำวัด <strong>${t.สถานที่}</strong>! 
                                <br>หมวดหมู่: ${t.หมวดหมู่}
                                <br>จุดเด่น: ${t.จุดเด่น} 
                                <br>ที่อยู่: ${t.ที่อยู่}
                                <br>และเปิดทำการในวัน: ${t.วันที่เปิดทำการ} ตั้งแต่ ${t.เวลาเปิดทำการ}
                                <br>รายละเอียดเพิ่มเติม:${t.รายละเอียดเพิ่มเติม}
                                <br>สำหรับการถวายบูชา: ${t.บูชา}
                            </li>
                        `).join('')}
                    </ul>
                    <h3>Suggested Amulets:</h3>
                    <ul>
                        ${amulets.map(a => `
                            <li>
                                แนะนำเครื่องราง: <strong>${a.ชื่อเครื่องราง}</strong>
                                <br>หมวดหมู่: ${a.หมวดหมู่}
                                <br>พิกัดขาย: ${a.พิกัดขาย}
                                <br>ประเภทเครื่องราง: ${a.ประเภทเครื่องราง}
                                <br>ความเชื่อ: ${a.ความเชื่อ}
                                <br>วัสดุที่ใช้: ${a.วัสดุที่ใช้}
                                <br>วัตถุประสงค์การใช้งาน: ${a.วัตถุประสงค์การใช้งาน}
                                <br>ราคาโดยประมาณ: ${a.ราคาโดยประมาณ}
                                <br>ความเกี่ยวข้องกับบุคคลสำคัญ: ${a.ความเกี่ยวข้องกับบุคคลสำคัญ}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;

            res.json({ response: responseMessage });
        }
    } catch (error) {
        console.error('Error contacting Flask:', error);
        res.status(500).send('Error processing request.');
    }
};
