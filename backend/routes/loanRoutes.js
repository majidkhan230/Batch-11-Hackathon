import express from 'express'

const loanRoutes = express.Router()





loanRoutes.post('/create', createLoan); 
loanRoutes.get('/', getLoans); 
loanRoutes.get('/user/:userId', getLoansByUser); 
loanRoutes.put('/status/:loanId', updateLoanStatus); 
loanRoutes.delete('/:loanId', deleteLoan); 

export default loanRoutes;
