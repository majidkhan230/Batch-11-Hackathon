const { default: mongoose } = require("mongoose");



const loanSchema = new mongoose.Schema({
    category: String,
    subcategory: String,
    amount: Number,
    period: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    guarantors: [{ name: String, cnic: String, email: String, location: String }],
  });
  
const loanModel = mongoose.model('Loan', loanSchema);

export default loanModel