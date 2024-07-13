const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// تعريف مخطط المدفوعات


// تعريف مخطط الاشتراك
const SubscriptionSchema = new Schema({
    duration: { type: String, required: true }, // مدة الاشتراك
    comments: { type: String, required: false }, // التعليقات (اختياري)
    amount: { type: Number, required: true }, // المبلغ المدفوع
    date: { type:Date } // تاريخ الدفع
});

// تعريف مخطط المستخدم
const UserSchema = new Schema({
    name: { type: String , required:true}, // اسم المستخدم
    subscriptions: [SubscriptionSchema] // قائمة الاشتراكات
}, { timestamps: true });

module.exports = mongoose.model('Subscriber', UserSchema);