const transactionType = [
  {title: 'Top Up', value: 'TOPUP'},
  {title: 'Bonus', value: 'BONUS'},
  {title: 'Profit', value: 'PROFIT'},
  {title: 'Payout', value: 'PAYOUT'}
];

const transactionRemark = [
  { title: 'Pending', value: 'PENDING' },
  { title: 'Successful', value: 'SUCCESSFUL' },
  { title: 'Failed', value: 'FAILED' },    
  { title: 'Reversed', value: 'REVERSED' },
  { title: 'Rejected', value: 'REJECTED' }
];

export default { transactionType, transactionRemark }