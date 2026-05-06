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

const bookingStructure = [
  { label: 'General Ticket', value: 'general_ticket' },
  { label: 'Different Ticket (e.g VIP, Regular)', value: 'different_ticket' },
  { label: 'Free Ticket', value: 'free_ticket' }
];

const bookingEndSetting = [
  { label: 'End manually', value: 'manually' },
  { label: 'Auto-end on a specific date', value: 'automatically' }
];

const resumeStatus = [
  { label: 'Resume manually', value: 'manually' },
  { label: 'Auto-end on a specific date', value: 'automatically' }
];

const refundSetting = [
  { label: 'I will handle refund manually', value: 'manually' },
  { label: 'Automatic full refund', value: 'automatically' }
];

const duringHold = [
  { label: 'Disable new registrations', value: 'disable' },
  { label: 'Hide event from public listings', value: 'hide' }
];

const happenAfterCancel = [
  { label: 'Mark as "cancelled" (visible to users)', value: 'visible' },
  { label: 'Remove event completely', value: 'remove' }
];

const bookingStatus = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' }
];

const notifyVia = [
  { label: 'Email', value: 'email' },
  { label: 'In app notification', value: 'in_app' },
  { label: 'SMS (optional)', value: 'sms' }
];

const holdEventRegReason = [
  { label: 'Scheduling conflicts', value: 'Scheduling conflicts' },
  { label: 'Low preparation readiness', value: 'Low preparation readiness' },
  { label: 'Venue issues', value: 'Venue issues' },
  { label: 'other', value: 'other' }
];

const cancelEventRegReason = [
  { label: 'Scheduling conflicts', value: 'Scheduling conflicts' },
  { label: 'Low attandance', value: 'Low attandance' },
  { label: 'Venue issues', value: 'Venue issues' },
  { label: 'Personal reasons', value: 'Personal reasons' },
  { label: 'other', value: 'other' }
];

const categories = [
  { label: 'Music Concert', value: 'music_concert' },
  { label: 'Festival', value: 'festival' },
  { label: 'Party / Nightlife', value: 'party' },
  { label: 'Wedding', value: 'wedding' },
  { label: 'Birthday', value: 'birthday' },
  { label: 'Corporate Event', value: 'corporate' },
  { label: 'Conference', value: 'conference' },
  { label: 'Workshop / Training', value: 'workshop' },
  { label: 'Seminar / Talk', value: 'seminar' },
  { label: 'Tech Event', value: 'tech' },
  { label: 'Startup / Networking', value: 'networking' },
  { label: 'Religious Event', value: 'religious' },
  { label: 'Comedy Show', value: 'comedy' },
  { label: 'Theater / Drama', value: 'theater' },
  { label: 'Movie / Cinema', value: 'movie' },
  { label: 'Sports Event', value: 'sports' },
  { label: 'Fitness / Wellness', value: 'fitness' },
  { label: 'Exhibition / Fair', value: 'exhibition' },
  { label: 'Art / Culture', value: 'art' },
  { label: 'Food & Drink', value: 'food_drink' },
  { label: 'Beach / Outdoor', value: 'outdoor' },
  { label: 'Gaming / eSports', value: 'gaming' },
  { label: 'Fashion Show', value: 'fashion' },
  { label: 'Charity / Fundraiser', value: 'charity' },
  { label: 'Education', value: 'education' },
  { label: 'Kids / Family', value: 'family' },
  { label: 'Others', value: 'others' }
];

export default { transactionType, transactionRemark, bookingStructure, categories, bookingEndSetting, bookingStatus, holdEventRegReason, resumeStatus, duringHold, notifyVia, happenAfterCancel, refundSetting, cancelEventRegReason }