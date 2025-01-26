import loanModel from '../models/loanModel.js';
import userModel from '../models/userModel.js';

export const createLoan = async (req, res) => {
  const { category, subcategory, amount, period, userId, guarantors } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const loan = new loanModel({
      category,
      subcategory,
      amount,
      period,
      user: userId,
      guarantors,
    });

    await loan.save();
    res.status(201).json({ message: 'Loan request created successfully', loan });
  } catch (error) {
    res.status(500).json({ message: 'Error creating loan request', error });
  }
};

export const getLoans = async (req, res) => {
  try {
    const loans = await loanModel.find().populate('user', 'name email');
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loans', error });
  }
};

export const getLoansByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const loans = await loanModel.find({ user: userId });
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user loans', error });
  }
};

export const updateLoanStatus = async (req, res) => {
  const { loanId } = req.params;
  const { status } = req.body; 

  try {
    const loan = await loanModel.findById(loanId);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    loan.status = status;
    await loan.save();

    res.status(200).json({ message: 'Loan status updated successfully', loan });
  } catch (error) {
    res.status(500).json({ message: 'Error updating loan status', error });
  }
};

export const deleteLoan = async (req, res) => {
  const { loanId } = req.params;

  try {
    await loanModel.findByIdAndDelete(loanId);
    res.status(200).json({ message: 'Loan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting loan', error });
  }
};


export const loanController = {
    createLoan,deleteLoan,getLoans,updateLoanStatus,
}