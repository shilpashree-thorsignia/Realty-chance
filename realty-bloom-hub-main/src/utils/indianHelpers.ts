
export const propertyAmenities = [
  "Air Conditioning",
  "Balcony",
  "Garage",
  "Gym",
  "Swimming Pool",
  "Furnished",
  "Pet Friendly",
  "Security",
  "Garden",
  "Elevator",
  "Parking",
  "Internet",
  "Power Backup",
  "Water Supply",
  "Gas Pipeline",
  "Club House"
];

export const indianStatesAndCities = [
  {
    state: "Delhi",
    cities: ["New Delhi", "Delhi NCR"]
  },
  {
    state: "Maharashtra",
    cities: ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik"]
  },
  {
    state: "Karnataka",
    cities: ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"]
  },
  {
    state: "Tamil Nadu",
    cities: ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem"]
  },
  {
    state: "Telangana",
    cities: ["Hyderabad", "Warangal", "Karimnagar", "Nizamabad"]
  },
  {
    state: "Gujarat",
    cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"]
  }
];

export function formatIndianRupees(amount: number): string {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });
  
  return formatter.format(amount);
}

/**
 * Types of property in Indian context
 */
export const indianPropertyTypes = [
  { value: "flat", label: "Flat/Apartment" },
  { value: "house", label: "Individual House/Villa" },
  { value: "plot", label: "Plot/Land" },
  { value: "commercial", label: "Commercial Property" },
  { value: "pg", label: "PG/Co-living" },
];

/**
 * Property amenities common in India
 */
export const indianPropertyAmenities = [
  "Power Backup", "Lift", "Security", "Car Parking", "Club House", 
  "Swimming Pool", "Gym", "Children's Play Area", "24x7 Water Supply",
  "Gated Community", "CCTV Camera", "Rainwater Harvesting", "Garden",
  "Vastu Compliant", "Indoor Games", "Gas Pipeline"
];
