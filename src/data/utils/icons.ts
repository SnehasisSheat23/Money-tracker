import { IconType } from 'react-icons';
import { 
  FaHome, FaMoneyBill, FaTools, FaBolt, FaWater, FaFire, FaWifi, FaTv,
  FaUtensils, FaShoppingCart, FaWineGlass, FaTruck,
  FaGasPump, FaBus, FaCar, FaParking, FaRoad, FaTaxi,
  FaHeartbeat, FaHospital, FaDumbbell, FaRunning, FaAppleAlt,
  FaCreditCard, FaUniversity,
  FaPiggyBank, FaChartLine, FaHandHoldingUsd, FaBuilding,
  FaCut, FaSprayCan, FaMagic, FaSpa,
  FaGraduationCap, FaBook, FaLaptop, FaPencilAlt,
  FaFilm, FaGuitar, FaGamepad, FaPalette,
  FaBaby, FaSchool, FaWallet,
  FaUmbrella, FaUserShield, FaCarAlt, FaHouseUser,
  FaHandHoldingHeart, FaGift,
  FaPlane, FaHotel, FaShieldAlt, FaUtensils as FaDining, FaCompass,
  FaNewspaper, FaPaw, FaGavel, FaUniversity as FaBank,
  FaCloud, FaMusic
} from 'react-icons/fa';

export const iconMap: Record<string, IconType> = {
  // Housing & Utilities
  'home': FaHome,
  'money-bill': FaMoneyBill,
  'tools': FaTools,
  'bolt': FaBolt,
  'water': FaWater,
  'fire': FaFire,
  'wifi': FaWifi,
  'tv': FaTv,
  
  // Food & Groceries
  'utensils': FaUtensils,
  'shopping-cart': FaShoppingCart,
  'wine-glass': FaWineGlass,
  'truck': FaTruck,
  
  // Transportation
  'gas-pump': FaGasPump,
  'bus': FaBus,
  'car': FaCar,
  'parking': FaParking,
  'road': FaRoad,
  'taxi': FaTaxi,
  
  // Health & Fitness
  'heartbeat': FaHeartbeat,
  'hospital': FaHospital,
  'dumbbell': FaDumbbell,
  'running': FaRunning,
  'apple': FaAppleAlt,
  
  // Debt & Savings
  'credit-card': FaCreditCard,
  'piggy-bank': FaPiggyBank,
  'chart-line': FaChartLine,
  'holding-money': FaHandHoldingUsd,
  'building': FaBuilding,
  
  // Personal Care
  'cut': FaCut,
  'spray': FaSprayCan,
  'magic': FaMagic,
  'spa': FaSpa,
  
  // Education
  'graduation': FaGraduationCap,
  'book': FaBook,
  'laptop': FaLaptop,
  'pencil': FaPencilAlt,
  
  // Entertainment
  'film': FaFilm,
  'guitar': FaGuitar,
  'gamepad': FaGamepad,
  'palette': FaPalette,
  
  // Children & Family
  'baby': FaBaby,
  'school': FaSchool,
  'wallet': FaWallet,
  
  // Insurance
  'umbrella': FaUmbrella,
  'shield': FaUserShield,
  'car-shield': FaCarAlt,
  'house-shield': FaHouseUser,
  
  // Gifts & Donations
  'donation': FaHandHoldingHeart,
  'gift': FaGift,
  
  // Travel
  'plane': FaPlane,
  'hotel': FaHotel,
  'shield-alt': FaShieldAlt,
  'dining': FaDining,
  'compass': FaCompass,
  
  // Miscellaneous
  'newspaper': FaNewspaper,
  'paw': FaPaw,
  'gavel': FaGavel,
  'bank': FaBank,
  'cloud': FaCloud,
  'music': FaMusic
};