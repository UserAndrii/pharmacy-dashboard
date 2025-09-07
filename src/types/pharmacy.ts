export interface Pharmacy {
  _id: string;
  city: string;
  region: string;
  respondent: string;
  fullAddress: string;
  pharmacyName: string;
  address: string;
  edrpou: string;
  phone: string;
  experience: string;
  position: string;
  ageCategory: string;
  pharmacyType: string;
  dailyPatients: string;
  employeeCount: string;
  institutionType: string;
  institutionName: string;
  dosageForm: string;
  manufacturer: string;
}

export interface CreatePharmacyData {
  city: string;
  region: string;
  respondent: string;
  fullAddress: string;
  pharmacyName: string;
  address: string;
  edrpou: string;
  phone: string;
  experience: string;
  position: string;
  ageCategory: string;
  pharmacyType: string;
  dailyPatients: string;
  employeeCount: string;
  institutionType: string;
  institutionName: string;
  dosageForm: string;
  manufacturer: string;
}
