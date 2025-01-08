import { IconType } from 'react-icons';
import { categoryColors } from './utils/colors';
import { iconMap } from './utils/icons';

export const categoryDetails = {
  housing: {
    name: " Utilities",
    color: categoryColors.blue,
    subcategories: [
      { name: "Rent or Mortgage", icon: iconMap['money-bill'], color: categoryColors.green },
      { name: "Property Taxes", icon: iconMap['home'], color: categoryColors.red },
      { name: "Home Maintenance", icon: iconMap['tools'], color: categoryColors.orange },
      { name: "Electricity", icon: iconMap['bolt'], color: categoryColors.yellow },
      { name: "Water and Sewer", icon: iconMap['water'], color: categoryColors.cyan },
      { name: "Gas", icon: iconMap['fire'], color: categoryColors.red },
      { name: "Internet", icon: iconMap['wifi'], color: categoryColors.indigo },
      { name: "Cable/Streaming Services", icon: iconMap['tv'], color: categoryColors.purple }
    ]
  },
  food: {
    name: "Groceries",
    color: categoryColors.green,
    subcategories: [
      { name: "Groceries", icon: iconMap['shopping-cart'], color: categoryColors.emerald },
      { name: "Dining Out", icon: iconMap['utensils'], color: categoryColors.orange },
      { name: "Snacks and Beverages", icon: iconMap['wine-glass'], color: categoryColors.rose },
      { name: "Meal Delivery Services", icon: iconMap['truck'], color: categoryColors.amber }
    ]
  },
  transportation: {
    name: "Transport",
    color: categoryColors.red,
    subcategories: [
      { name: "Fuel", icon: iconMap['gas-pump'], color: categoryColors.orange },
      { name: "Public Transit", icon: iconMap['bus'], color: categoryColors.blue },
      { name: "Vehicle Maintenance and Repairs", icon: iconMap['car'], color: categoryColors.slate },
      { name: "Car Insurance", icon: iconMap['car-shield'], color: categoryColors.violet },
      { name: "Parking Fees", icon: iconMap['parking'], color: categoryColors.zinc },
      { name: "Tolls", icon: iconMap['road'], color: categoryColors.amber },
      { name: "Ridesharing", icon: iconMap['taxi'], color: categoryColors.yellow }
    ]
  },
  health: {
    name: "Health and Fitness",
    color: categoryColors.teal,
    subcategories: [
      { name: "Health Insurance", icon: iconMap['heartbeat'], color: categoryColors.red },
      { name: "Medical Bills", icon: iconMap['hospital'], color: categoryColors.blue },
      { name: "Gym Membership", icon: iconMap['dumbbell'], color: categoryColors.green },
      { name: "Fitness Equipment", icon: iconMap['running'], color: categoryColors.orange },
      { name: "Vitamins and Supplements", icon: iconMap['apple'], color: categoryColors.yellow }
    ]
  },
  debt: {
    name: "Debt Payments",
    color: categoryColors.purple,
    subcategories: [
      { name: "Loan EMIs", icon: iconMap['money-check'], color: categoryColors.red },
      { name: "Credit Card Payments", icon: iconMap['credit-card'], color: categoryColors.blue }
    ]
  },
  savings: {
    name: "Savings and Investments",
    color: categoryColors.emerald,
    subcategories: [
      { name: "Emergency Fund Contributions", icon: iconMap['piggy-bank'], color: categoryColors.green },
      { name: "Retirement Savings", icon: iconMap['chart-line'], color: categoryColors.blue },
      { name: "Stocks/Mutual Funds/ETFs", icon: iconMap['chart-bar'], color: categoryColors.orange },
      { name: "Real Estate Investments", icon: iconMap['building'], color: categoryColors.red }
    ]
  },
  personalCare: {
    name: "Personal Care",
    color: categoryColors.pink,
    subcategories: [
      { name: "Haircuts and Grooming", icon: iconMap['cut'], color: categoryColors.red },
      { name: "Skincare Products", icon: iconMap['spa'], color: categoryColors.green },
      { name: "Cosmetics", icon: iconMap['paint-brush'], color: categoryColors.purple },
      { name: "Spa Treatments", icon: iconMap['hot-tub'], color: categoryColors.blue }
    ]
  },
  education: {
    name: "Education ",
    color: categoryColors.indigo,
    subcategories: [
      { name: "Tuition Fees", icon: iconMap['graduation-cap'], color: categoryColors.red },
      { name: "Books and Study Materials", icon: iconMap['book'], color: categoryColors.green },
      { name: "Online Courses", icon: iconMap['laptop'], color: categoryColors.blue },
      { name: "Stationery", icon: iconMap['pencil-alt'], color: categoryColors.orange }
    ]
  },
  entertainment: {
    name: "Entertainment and Leisure",
    color: categoryColors.orange,
    subcategories: [
      { name: "Movies and Subscriptions", icon: iconMap['film'], color: categoryColors.red },
      { name: "Concerts and Events", icon: iconMap['music'], color: categoryColors.blue },
      { name: "Gaming", icon: iconMap['gamepad'], color: categoryColors.green },
      { name: "Hobbies", icon: iconMap['palette'], color: categoryColors.purple }
    ]
  },
  children: {
    name: " Family",
    color: categoryColors.sky,
    subcategories: [
      { name: "Childcare", icon: iconMap['baby'], color: categoryColors.red },
      { name: "School Fees", icon: iconMap['school'], color: categoryColors.blue },
      { name: "Toys", icon: iconMap['puzzle-piece'], color: categoryColors.green },
      { name: "Allowances", icon: iconMap['hand-holding-usd'], color: categoryColors.orange }
    ]
  },
  insurance: {
    name: "Insurance",
    color: categoryColors.violet,
    subcategories: [
      { name: "Life Insurance", icon: iconMap['heartbeat'], color: categoryColors.red },
      { name: "Health Insurance", icon: iconMap['hospital'], color: categoryColors.blue },
      { name: "Vehicle Insurance", icon: iconMap['car-shield'], color: categoryColors.green },
      { name: "Home Insurance", icon: iconMap['home'], color: categoryColors.orange }
    ]
  },
  gifts: {
    name: "Gifts and Donations",
    color: categoryColors.rose,
    subcategories: [
      { name: "Charitable Donations", icon: iconMap['hand-holding-heart'], color: categoryColors.red },
      { name: "Gifts for Friends and Family", icon: iconMap['gift'], color: categoryColors.blue }
    ]
  },
  travel: {
    name: "Travel",
    color: categoryColors.amber,
    subcategories: [
      { name: "Flight Tickets", icon: iconMap['plane'], color: categoryColors.red },
      { name: "Accommodation", icon: iconMap['bed'], color: categoryColors.blue },
      { name: "Travel Insurance", icon: iconMap['shield-alt'], color: categoryColors.green },
      { name: "Food and Drinks", icon: iconMap['utensils'], color: categoryColors.orange },
      { name: "Tours and Activities", icon: iconMap['map'], color: categoryColors.purple }
    ]
  },
  miscellaneous: {
    name: "Miscellaneous",
    color: categoryColors.slate,
    subcategories: [
      // Entertainment Subscriptions
      { name: "Video Streaming (Netflix, Prime)", icon: iconMap['tv'], color: categoryColors.red },
      { name: "Music Streaming (Spotify, Apple)", icon: iconMap['music'], color: categoryColors.blue },
      { name: "Gaming Subscriptions", icon: iconMap['gamepad'], color: categoryColors.green },
      
      // Software Subscriptions
      { name: "Cloud Storage (iCloud, Drive)", icon: iconMap['cloud'], color: categoryColors.orange },
      { name: "Software Licenses", icon: iconMap['laptop'], color: categoryColors.purple },
      { name: "Professional Tools", icon: iconMap['tools'], color: categoryColors.red },
      
      // Content Subscriptions
      { name: "News & Magazines", icon: iconMap['newspaper'], color: categoryColors.blue },
      { name: "Learning Platforms", icon: iconMap['graduation'], color: categoryColors.green },
      { name: "Audiobooks", icon: iconMap['book'], color: categoryColors.orange },
      
      // Service Subscriptions
      { name: "Delivery Services", icon: iconMap['truck'], color: categoryColors.red },
      { name: "Gym & Fitness", icon: iconMap['dumbbell'], color: categoryColors.blue },
      { name: "Security Services", icon: iconMap['shield'], color: categoryColors.green },
      
      // Other Categories
      { name: "Pet Care", icon: iconMap['paw'], color: categoryColors.orange },
      { name: "Legal Fees", icon: iconMap['gavel'], color: categoryColors.purple },
      { name: "Bank Charges", icon: iconMap['bank'], color: categoryColors.red }
    ]
  }
} as const;

export type CategoryKey = keyof typeof categoryDetails;
export type SubCategory = {
  name: string;
  icon: IconType;
  color: { bg: string; text: string };
};
