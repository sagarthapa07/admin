export interface SubIssue {
  id: number;
  name: string;
}

export interface Issue {
  id: number;
  name: string;
  subIssues: SubIssue[];
}
export const ISSUES: Issue[] = [
  {
    id: 1,
    name: 'Human Rights',
    subIssues: [
      { id: 101, name: 'Labor Rights' },
      { id: 102, name: 'Social Justice' },
      { id: 103, name: 'Freedom of Religion' },
      { id: 104, name: 'Legal Services' },
      { id: 105, name: 'Racial Justice' },
      { id: 106, name: 'Gender Equality' },
      { id: 107, name: 'Minority Rights' },
      { id: 108, name: 'Civil Liberties' },
      { id: 109, name: 'Refugee Rights' },
      { id: 110, name: 'Freedom of Expression' },
      { id: 111, name: 'Prisoner Rights' },
      { id: 112, name: 'Anti-Discrimination' },
    ],
  },

  {
    id: 2,
    name: 'Community Development',
    subIssues: [
      { id: 201, name: 'Employment & Labor' },
      { id: 202, name: 'Housing & Shelter' },
      { id: 203, name: 'Urban Development' },
      { id: 204, name: 'Rural Development' },
      { id: 205, name: 'Community Engagement' },
      { id: 206, name: 'Local Leadership' },
      { id: 207, name: 'Infrastructure Support' },
      { id: 208, name: 'Capacity Building' },
      { id: 209, name: 'Public Spaces' },
      { id: 210, name: 'Neighborhood Safety' },
    ],
  },

  {
    id: 3,
    name: 'Education',
    subIssues: [
      { id: 301, name: 'Primary Education' },
      { id: 302, name: 'Secondary Education' },
      { id: 303, name: 'Higher Education' },
      { id: 304, name: 'Teacher Training' },
      { id: 305, name: 'Digital Learning' },
      { id: 306, name: 'Scholarships' },
      { id: 307, name: 'Literacy Programs' },
      { id: 308, name: 'Girl Child Education' },
      { id: 309, name: 'Special Education' },
      { id: 310, name: 'School Infrastructure' },
      { id: 311, name: 'Dropout Prevention' },
    ],
  },

  {
    id: 4,
    name: 'Health',
    subIssues: [
      { id: 401, name: 'Public Health' },
      { id: 402, name: 'Mental Health' },
      { id: 403, name: 'Maternal Health' },
      { id: 404, name: 'Child Health' },
      { id: 405, name: 'Disease Prevention' },
      { id: 406, name: 'Nutrition' },
      { id: 407, name: 'Healthcare Access' },
      { id: 408, name: 'Health Awareness' },
      { id: 409, name: 'Emergency Care' },
      { id: 410, name: 'Health Infrastructure' },
    ],
  },

  {
    id: 5,
    name: 'Environment',
    subIssues: [
      { id: 501, name: 'Climate Change' },
      { id: 502, name: 'Environmental Conservation' },
      { id: 503, name: 'Renewable Energy' },
      { id: 504, name: 'Waste Management' },
      { id: 505, name: 'Water Conservation' },
      { id: 506, name: 'Air Quality' },
      { id: 507, name: 'Biodiversity Protection' },
      { id: 508, name: 'Sustainable Practices' },
      { id: 509, name: 'Forest Protection' },
      { id: 510, name: 'Environmental Education' },
    ],
  },

  {
    id: 6,
    name: 'Poverty Alleviation',
    subIssues: [
      { id: 601, name: 'Income Generation' },
      { id: 602, name: 'Microfinance' },
      { id: 603, name: 'Food Security' },
      { id: 604, name: 'Livelihood Programs' },
      { id: 605, name: 'Social Protection' },
      { id: 606, name: 'Cash Assistance' },
      { id: 607, name: 'Skill Development' },
      { id: 608, name: 'Employment Support' },
      { id: 609, name: 'Basic Needs Access' },
      { id: 610, name: 'Economic Inclusion' },
    ],
  },

  {
    id: 7,
    name: 'Women & Gender',
    subIssues: [{ id: 701, name: 'Women Empowerment' }],
  },

  {
    id: 8,
    name: 'Children & Youth',
    subIssues: [
      { id: 801, name: 'Child Protection' },
      { id: 807, name: 'Life Skills Training' },
      { id: 808, name: 'Sports for Youth' },
      { id: 809, name: 'Child Nutrition' },
      { id: 810, name: 'Safe Childhood' },
    ],
  },

  {
    id: 9,
    name: 'Employment & Labor',
    subIssues: [
      { id: 901, name: 'Job Creation' },
      { id: 902, name: 'Skill Training' },
      { id: 903, name: 'Fair Wages' },
      { id: 904, name: 'Worker Safety' },
      { id: 905, name: 'Labor Law Awareness' },
      { id: 906, name: 'Workplace Rights' },
      { id: 907, name: 'Youth Employment' },
      { id: 908, name: 'Migrant Workers' },
      { id: 909, name: 'Informal Sector' },
      { id: 910, name: 'Employment Policies' },
    ],
  },

  {
    id: 10,
    name: 'Democracy & Governance',
    subIssues: [
      { id: 1001, name: 'Good Governance' },
      { id: 1002, name: 'Transparency' },
      { id: 1003, name: 'Anti-Corruption' },
      { id: 1004, name: 'Civic Engagement' },
      { id: 1005, name: 'Electoral Reforms' },
      { id: 1007, name: 'Public Accountability' },
      { id: 1008, name: 'Policy Advocacy' },
      { id: 1009, name: 'Democratic Institutions' },
      { id: 1010, name: 'Citizen Participation' },
    ],
  },
  {
    id: 11,
    name: 'Agriculture & Food Security',
    subIssues: [
      { id: 1, name: 'Sustainable Farming' },
      { id: 2, name: 'Food Security' },
      { id: 3, name: 'Farmer Livelihoods' },
      { id: 4, name: 'Crop Diversification' },
      { id: 5, name: 'Agri Technology' },
      { id: 6, name: 'Organic Farming' },
      { id: 7, name: 'Irrigation Support' },
      { id: 8, name: 'Market Access' },
      { id: 9, name: 'Climate Resilient Agriculture' },
      { id: 10, name: 'Post Harvest Management' },
    ],
  },

  {
    id: 12,
    name: 'Disability Inclusion',
    subIssues: [
      { id: 1, name: 'Inclusive Education' },
      { id: 2, name: 'Accessible Infrastructure' },
      { id: 3, name: 'Assistive Technology' },
      { id: 4, name: 'Employment for Disabled' },
      { id: 5, name: 'Healthcare Access' },
      { id: 6, name: 'Legal Rights Awareness' },
      { id: 7, name: 'Community Integration' },
      { id: 8, name: 'Rehabilitation Services' },
      { id: 9, name: 'Mental Disabilities Support' },
      { id: 10, name: 'Disability Advocacy' },
    ],
  },

  {
    id: 13,
    name: 'Arts & Culture',
    subIssues: [
      { id: 1, name: 'Cultural Preservation' },
      { id: 2, name: 'Traditional Arts' },
      { id: 3, name: 'Performing Arts' },
      { id: 4, name: 'Cultural Exchange' },
      { id: 5, name: 'Art Education' },
      { id: 6, name: 'Museums & Heritage' },
      { id: 7, name: 'Creative Communities' },
      { id: 8, name: 'Indigenous Art' },
      { id: 9, name: 'Public Art Projects' },
      { id: 10, name: 'Cultural Policy' },
    ],
  },

  {
    id: 14,
    name: 'Science & Research',
    subIssues: [
      { id: 1, name: 'Scientific Research' },
      { id: 2, name: 'Innovation Support' },
      { id: 3, name: 'STEM Education' },
      { id: 4, name: 'Research Grants' },
      { id: 5, name: 'Technology Development' },
      { id: 6, name: 'Academic Collaboration' },
      { id: 7, name: 'Data Science' },
      { id: 8, name: 'Open Research' },
      { id: 9, name: 'Applied Sciences' },
      { id: 10, name: 'Ethics in Research' },
    ],
  },

  {
    id: 15,
    name: 'Technology & Innovation',
    subIssues: [
      { id: 1, name: 'Digital Inclusion' },
      { id: 2, name: 'Tech for Good' },
      { id: 3, name: 'Innovation Labs' },
      { id: 4, name: 'Startup Support' },
      { id: 5, name: 'AI & Automation' },
      { id: 6, name: 'Cyber Security' },
      { id: 7, name: 'Open Source Technology' },
      { id: 8, name: 'Smart Cities' },
      { id: 9, name: 'Digital Skills' },
      { id: 10, name: 'Technology Policy' },
    ],
  },

  {
    id: 16,
    name: 'Public Affairs',
    subIssues: [
      { id: 1, name: 'Public Policy' },
      { id: 2, name: 'Government Relations' },
      { id: 3, name: 'Policy Research' },
      { id: 4, name: 'Advocacy Campaigns' },
      { id: 5, name: 'Civic Awareness' },
      { id: 6, name: 'Public Consultations' },
      { id: 7, name: 'Regulatory Reform' },
      { id: 8, name: 'Institutional Capacity' },
      { id: 9, name: 'Public Administration' },
      { id: 10, name: 'Policy Implementation' },
    ],
  },

  {
    id: 17,
    name: 'Disaster Relief & Resilience',
    subIssues: [
      { id: 1, name: 'Emergency Response' },
      { id: 2, name: 'Disaster Preparedness' },
      { id: 3, name: 'Relief Distribution' },
      { id: 4, name: 'Post Disaster Recovery' },
      { id: 5, name: 'Climate Resilience' },
      { id: 6, name: 'Early Warning Systems' },
      { id: 7, name: 'Community Resilience' },
      { id: 8, name: 'Humanitarian Aid' },
      { id: 9, name: 'Risk Reduction' },
      { id: 10, name: 'Rehabilitation Support' },
    ],
  },

  {
    id: 18,
    name: 'Water & Sanitation',
    subIssues: [
      { id: 1, name: 'Clean Drinking Water' },
      { id: 2, name: 'Sanitation Facilities' },
      { id: 3, name: 'Water Conservation' },
      { id: 4, name: 'Wastewater Management' },
      { id: 5, name: 'Hygiene Promotion' },
      { id: 6, name: 'Rural Water Supply' },
      { id: 7, name: 'Urban Sanitation' },
      { id: 8, name: 'Water Governance' },
      { id: 9, name: 'Flood Management' },
      { id: 10, name: 'Water Infrastructure' },
    ],
  },

  {
    id: 19,
    name: 'Migration & Refugees',
    subIssues: [
      { id: 1, name: 'Refugee Assistance' },
      { id: 2, name: 'Migrant Rights' },
      { id: 3, name: 'Asylum Services' },
      { id: 4, name: 'Integration Programs' },
      { id: 5, name: 'Legal Aid for Migrants' },
      { id: 6, name: 'Cross Border Migration' },
      { id: 7, name: 'Safe Migration' },
      { id: 8, name: 'Human Trafficking Prevention' },
      { id: 9, name: 'Emergency Shelter' },
      { id: 10, name: 'Resettlement Support' },
    ],
  },

  {
    id: 20,
    name: 'Sports & Recreation',
    subIssues: [
      { id: 1, name: 'Community Sports' },
      { id: 2, name: 'Youth Sports Programs' },
      { id: 3, name: 'Sports Infrastructure' },
      { id: 4, name: 'Physical Fitness' },
      { id: 5, name: 'Inclusive Sports' },
      { id: 6, name: 'Athlete Development' },
      { id: 7, name: 'Recreation Facilities' },
      { id: 8, name: 'Sports for Development' },
      { id: 9, name: 'Coaching & Training' },
      { id: 10, name: 'Health through Sports' },
    ],
  },
  {
    id: 21,
    name: 'Education & Literacy',
    subIssues: [
      { id: 1, name: 'Primary Education' },
      { id: 4, name: 'Adult Literacy' },
    ],
  },

  {
    id: 22,
    name: 'Healthcare & Wellness',
    subIssues: [
      { id: 6, name: 'Primary Healthcare' },
      { id: 10, name: 'Preventive Care' },
      { id: 3, name: 'Telemedicine' },
      { id: 8, name: 'Health Insurance Access' },
      { id: 5, name: 'Emergency Services' },
    ],
  },
  {
    id: 23,
    name: 'Women Empowerment',
    subIssues: [
      { id: 3, name: 'Skill Development' },
      { id: 8, name: 'Entrepreneurship Support' },
      { id: 1, name: 'Women Safety' },
      { id: 2, name: 'Education Access' },
      { id: 9, name: 'Health & Nutrition' },
      { id: 4, name: 'Workplace Equality' },
      { id: 7, name: 'Self Help Groups' },
    ],
  },

  {
    id: 24,
    name: 'Youth Development',
    subIssues: [
      { id: 7, name: 'Career Guidance' },
      { id: 2, name: 'Skill Training' },
      { id: 9, name: 'Leadership Building' },
      { id: 1, name: 'Youth Engagement' },
      { id: 3, name: 'Mental Wellness' },
      { id: 8, name: 'Digital Skills' },
      { id: 5, name: 'Volunteering' },
    ],
  },

  {
    id: 25,
    name: 'Environment & Climate',
    subIssues: [
      { id: 4, name: 'Climate Awareness' },
      { id: 2, name: 'Plastic Reduction' },
      { id: 10, name: 'Biodiversity Protection' },
      { id: 7, name: 'Air Quality' },
      { id: 3, name: 'Water Conservation' },
      { id: 8, name: 'Sustainable Living' },
      { id: 5, name: 'Eco Education' },
    ],
  },

  {
    id: 26,
    name: 'Rural Development',
    subIssues: [
      { id: 8, name: 'Village Infrastructure' },
      { id: 3, name: 'Rural Employment' },
      { id: 1, name: 'Livelihood Programs' },
      { id: 9, name: 'Education Facilities' },
      { id: 2, name: 'Women SHGs' },
      { id: 5, name: 'Water Supply' },
      { id: 7, name: 'Skill Development' },
    ],
  },

  {
    id: 27,
    name: 'Urban Development',
    subIssues: [
      { id: 5, name: 'Affordable Housing' },
      { id: 9, name: 'Urban Transport' },
      { id: 2, name: 'Waste Management' },
      { id: 7, name: 'Smart Infrastructure' },
      { id: 1, name: 'Slum Development' },
      { id: 6, name: 'Public Spaces' },
      { id: 10, name: 'Traffic Management' },
      { id: 3, name: 'Water Supply' },
      { id: 4, name: 'Urban Health' },
      { id: 8, name: 'Sustainability' },
    ],
  },

  {
    id: 28,
    name: 'Animal Welfare',
    subIssues: [
      { id: 6, name: 'Stray Animal Care' },
      { id: 1, name: 'Animal Shelters' },
      { id: 8, name: 'Wildlife Protection' },
      { id: 3, name: 'Veterinary Services' },
      { id: 7, name: 'Habitat Conservation' },
      { id: 4, name: 'Community Engagement' },
    ],
  },

  {
    id: 29,
    name: 'Elderly Care',
    subIssues: [
      { id: 4, name: 'Old Age Homes' },
      { id: 6, name: 'Social Security' },
      { id: 3, name: 'Pension Awareness' },
      { id: 10, name: 'Caregiver Support' },
      { id: 2, name: 'Legal Aid' },
      { id: 8, name: 'Community Activities' },
      { id: 7, name: 'Home Care Services' },
      { id: 5, name: 'Digital Literacy' },
    ],
  },

  {
    id: 30,
    name: 'Human Rights',
    subIssues: [
      { id: 10, name: 'Rights Awareness' },
      { id: 3, name: 'Legal Support' },
      { id: 6, name: 'Gender Equality' },
      { id: 1, name: 'Child Rights' },
      { id: 8, name: 'Minority Rights' },
      { id: 5, name: 'Labor Rights' },
    ],
  },
  {
    id: 31,
    name: 'Mental Health',
    subIssues: [
      { id: 1, name: 'Awareness Programs' },
      { id: 2, name: 'Counseling Services' },
      { id: 3, name: 'Stress Management' },
      { id: 4, name: 'Depression Support' },
      { id: 5, name: 'Anxiety Care' },
      { id: 6, name: 'Youth Mental Health' },
      { id: 7, name: 'Workplace Mental Health' },
      { id: 8, name: 'Suicide Prevention' },
      { id: 9, name: 'Community Support' },
      { id: 10, name: 'Mental Health Policy' },
    ],
  },

  {
    id: 32,
    name: 'Digital Governance',
    subIssues: [
      { id: 1, name: 'E-Governance' },
      { id: 2, name: 'Digital Transparency' },
      { id: 3, name: 'Online Public Services' },
      { id: 4, name: 'Citizen Portals' },
      { id: 5, name: 'Digital Identity' },
      { id: 6, name: 'Data Privacy' },
      { id: 7, name: 'Cyber Regulations' },
      { id: 8, name: 'IT Infrastructure' },
      { id: 9, name: 'Digital Literacy' },
      { id: 10, name: 'Smart Governance' },
    ],
  },

  {
    id: 33,
    name: 'Financial Inclusion',
    subIssues: [
      { id: 1, name: 'Banking Access' },
      { id: 2, name: 'Micro Finance' },
      { id: 3, name: 'Insurance Awareness' },
      { id: 4, name: 'Digital Payments' },
      { id: 5, name: 'Credit Support' },
      { id: 6, name: 'Savings Programs' },
      { id: 7, name: 'Financial Literacy' },
      { id: 8, name: 'Women Finance Access' },
      { id: 9, name: 'Rural Banking' },
      { id: 10, name: 'Economic Empowerment' },
    ],
  },

  {
    id: 34,
    name: 'Child Welfare',
    subIssues: [
      { id: 1, name: 'Child Protection' },
      { id: 2, name: 'Nutrition Support' },
      { id: 3, name: 'Education Access' },
      { id: 4, name: 'Child Healthcare' },
      { id: 5, name: 'Orphan Care' },
      { id: 6, name: 'Child Rights' },
      { id: 7, name: 'Early Childhood Care' },
      { id: 8, name: 'Street Children Support' },
      { id: 9, name: 'Adoption Services' },
      { id: 10, name: 'Child Safety Programs' },
    ],
  },

  {
    id: 35,
    name: 'Employment & Livelihood',
    subIssues: [
      { id: 1, name: 'Job Creation' },
      { id: 2, name: 'Skill Training' },
      { id: 3, name: 'Self Employment' },
      { id: 4, name: 'MSME Support' },
      { id: 5, name: 'Career Counseling' },
      { id: 6, name: 'Labor Welfare' },
      { id: 7, name: 'Gig Economy' },
      { id: 8, name: 'Entrepreneurship' },
      { id: 9, name: 'Employment Policy' },
      { id: 10, name: 'Workplace Rights' },
    ],
  },

  {
    id: 36,
    name: 'Transportation & Mobility',
    subIssues: [
      { id: 1, name: 'Public Transport' },
      { id: 2, name: 'Road Safety' },
      { id: 3, name: 'Traffic Management' },
      { id: 4, name: 'Urban Mobility' },
      { id: 5, name: 'Rural Connectivity' },
      { id: 6, name: 'Electric Vehicles' },
      { id: 7, name: 'Infrastructure Development' },
      { id: 8, name: 'Pedestrian Safety' },
      { id: 9, name: 'Cycling Infrastructure' },
      { id: 10, name: 'Transport Policy' },
    ],
  },

  {
    id: 37,
    name: 'Energy & Power',
    subIssues: [
      { id: 1, name: 'Renewable Energy' },
      { id: 2, name: 'Solar Power' },
      { id: 3, name: 'Wind Energy' },
      { id: 4, name: 'Energy Access' },
      { id: 5, name: 'Power Infrastructure' },
      { id: 6, name: 'Energy Efficiency' },
      { id: 7, name: 'Clean Energy Policy' },
      { id: 8, name: 'Rural Electrification' },
      { id: 9, name: 'Smart Grids' },
      { id: 10, name: 'Energy Innovation' },
    ],
  },

  {
    id: 38,
    name: 'Housing & Shelter',
    subIssues: [
      { id: 1, name: 'Affordable Housing' },
      { id: 2, name: 'Homeless Support' },
      { id: 3, name: 'Slum Redevelopment' },
      { id: 4, name: 'Urban Housing' },
      { id: 5, name: 'Rural Housing' },
      { id: 6, name: 'Shelter Homes' },
      { id: 7, name: 'Disaster Housing' },
      { id: 8, name: 'Housing Finance' },
      { id: 9, name: 'Rental Housing' },
      { id: 10, name: 'Housing Policy' },
    ],
  },

  {
    id: 39,
    name: 'Justice & Legal Aid',
    subIssues: [
      { id: 1, name: 'Free Legal Aid' },
      { id: 2, name: 'Access to Justice' },
      { id: 3, name: 'Court Awareness' },
      { id: 4, name: 'Legal Literacy' },
      { id: 5, name: 'Women Legal Support' },
      { id: 6, name: 'Child Legal Protection' },
      { id: 7, name: 'Fast Track Justice' },
      { id: 8, name: 'Human Rights Law' },
      { id: 9, name: 'Legal Reform' },
      { id: 10, name: 'Justice Policy' },
    ],
  },

  {
    id: 40,
    name: 'Community Development',
    subIssues: [
      { id: 1, name: 'Community Engagement' },
      { id: 2, name: 'Local Leadership' },
      { id: 3, name: 'Volunteer Programs' },
      { id: 4, name: 'Social Cohesion' },
      { id: 5, name: 'Capacity Building' },
      { id: 6, name: 'Grassroots Initiatives' },
      { id: 7, name: 'Community Safety' },
      { id: 8, name: 'Inclusive Communities' },
      { id: 9, name: 'Civic Participation' },
      { id: 10, name: 'Sustainable Communities' },
    ],
  },
  {
    id: 41,
    name: 'Environmental Conservation',
    subIssues: [
      { id: 1, name: 'Forest Conservation' },
      { id: 2, name: 'Wildlife Protection' },
      { id: 3, name: 'Biodiversity Preservation' },
      { id: 4, name: 'Soil Conservation' },
      { id: 5, name: 'Water Resource Protection' },
      { id: 6, name: 'Climate Action' },
      { id: 7, name: 'Pollution Control' },
      { id: 8, name: 'Eco Restoration' },
      { id: 9, name: 'Environmental Education' },
      { id: 10, name: 'Green Policies' },
    ],
  },

  {
    id: 42,
    name: 'Media & Communication',
    subIssues: [
      { id: 1, name: 'Media Literacy' },
      { id: 2, name: 'Responsible Journalism' },
      { id: 3, name: 'Digital Media' },
      { id: 4, name: 'Community Radio' },
      { id: 5, name: 'Public Awareness Campaigns' },
      { id: 6, name: 'Social Media Outreach' },
      { id: 7, name: 'Information Access' },
      { id: 8, name: 'Freedom of Press' },
      { id: 9, name: 'Strategic Communication' },
      { id: 10, name: 'Media Policy' },
    ],
  },

  {
    id: 43,
    name: 'Tourism & Heritage',
    subIssues: [
      { id: 1, name: 'Sustainable Tourism' },
      { id: 2, name: 'Cultural Heritage' },
      { id: 3, name: 'Eco Tourism' },
      { id: 4, name: 'Rural Tourism' },
      { id: 5, name: 'Tourism Infrastructure' },
      { id: 6, name: 'Local Guides Training' },
      { id: 7, name: 'Heritage Conservation' },
      { id: 8, name: 'Tourism Promotion' },
      { id: 9, name: 'Community Tourism' },
      { id: 10, name: 'Tourism Policy' },
    ],
  },

  {
    id: 44,
    name: 'Consumer Protection',
    subIssues: [
      { id: 1, name: 'Consumer Rights Awareness' },
      { id: 2, name: 'Grievance Redressal' },
      { id: 3, name: 'Product Safety' },
      { id: 4, name: 'Fair Trade Practices' },
      { id: 5, name: 'Online Consumer Safety' },
      { id: 6, name: 'Fraud Prevention' },
      { id: 7, name: 'Legal Consumer Support' },
      { id: 8, name: 'Market Regulation' },
      { id: 9, name: 'Consumer Education' },
      { id: 10, name: 'Consumer Policy' },
    ],
  },

  {
    id: 45,
    name: 'Supply Chain & Logistics',
    subIssues: [
      { id: 1, name: 'Logistics Infrastructure' },
      { id: 2, name: 'Cold Chain Management' },
      { id: 3, name: 'Warehouse Development' },
      { id: 4, name: 'Last Mile Delivery' },
      { id: 5, name: 'Transportation Optimization' },
      { id: 6, name: 'Supply Chain Transparency' },
      { id: 7, name: 'Inventory Management' },
      { id: 8, name: 'Digital Logistics' },
      { id: 9, name: 'Trade Facilitation' },
      { id: 10, name: 'Logistics Policy' },
    ],
  },

  {
    id: 46,
    name: 'Innovation & Startups',
    subIssues: [
      { id: 1, name: 'Startup Incubation' },
      { id: 2, name: 'Funding Support' },
      { id: 3, name: 'Mentorship Programs' },
      { id: 4, name: 'Innovation Hubs' },
      { id: 5, name: 'Business Acceleration' },
      { id: 6, name: 'Market Access' },
      { id: 7, name: 'Technology Transfer' },
      { id: 8, name: 'Startup Policy' },
      { id: 9, name: 'Entrepreneurship Training' },
      { id: 10, name: 'Innovation Ecosystem' },
    ],
  },

  {
    id: 47,
    name: 'Food & Nutrition',
    subIssues: [
      { id: 1, name: 'Nutrition Awareness' },
      { id: 2, name: 'Food Security Programs' },
      { id: 3, name: 'Child Nutrition' },
      { id: 4, name: 'Maternal Nutrition' },
      { id: 5, name: 'Midday Meal Support' },
      { id: 6, name: 'Food Fortification' },
      { id: 7, name: 'Dietary Diversity' },
      { id: 8, name: 'Community Kitchens' },
      { id: 9, name: 'Malnutrition Prevention' },
      { id: 10, name: 'Nutrition Policy' },
    ],
  },

  {
    id: 48,
    name: 'Workplace Safety',
    subIssues: [
      { id: 1, name: 'Occupational Safety' },
      { id: 2, name: 'Health Standards' },
      { id: 3, name: 'Industrial Safety' },
      { id: 4, name: 'Construction Safety' },
      { id: 5, name: 'Safety Training' },
      { id: 6, name: 'Hazard Management' },
      { id: 7, name: 'Labor Protection' },
      { id: 8, name: 'Workplace Wellness' },
      { id: 9, name: 'Compliance Monitoring' },
      { id: 10, name: 'Safety Regulations' },
    ],
  },

  {
    id: 49,
    name: 'Social Entrepreneurship',
    subIssues: [
      { id: 1, name: 'Impact Ventures' },
      { id: 2, name: 'Social Innovation' },
      { id: 3, name: 'Community Enterprises' },
      { id: 4, name: 'Impact Measurement' },
      { id: 5, name: 'Funding for Social Good' },
      { id: 6, name: 'Capacity Building' },
      { id: 7, name: 'Sustainable Business Models' },
      { id: 8, name: 'Market Linkages' },
      { id: 9, name: 'Social Startup Policy' },
      { id: 10, name: 'Ecosystem Development' },
    ],
  },

  {
    id: 50,
    name: 'Ethics & Governance',
    subIssues: [
      { id: 1, name: 'Ethical Leadership' },
      { id: 2, name: 'Transparency' },
      { id: 3, name: 'Accountability' },
      { id: 4, name: 'Anti Corruption' },
      { id: 5, name: 'Good Governance Practices' },
      { id: 6, name: 'Institutional Integrity' },
      { id: 7, name: 'Ethics Training' },
      { id: 8, name: 'Public Trust Building' },
      { id: 9, name: 'Governance Audits' },
      { id: 10, name: 'Ethics Policy' },
    ],
  },
  {
    id: 51,
    name: 'Climate Change & Sustainability',
    subIssues: [
      { id: 1, name: 'Climate Awareness' },
      { id: 2, name: 'Carbon Reduction' },
      { id: 3, name: 'Sustainable Practices' },
      { id: 4, name: 'Green Energy Adoption' },
      { id: 5, name: 'Climate Policy' },
      { id: 6, name: 'Adaptation Strategies' },
      { id: 7, name: 'Mitigation Measures' },
      { id: 8, name: 'Community Action' },
      { id: 9, name: 'Environmental Monitoring' },
      { id: 10, name: 'Sustainability Education' },
    ],
  },

  {
    id: 52,
    name: 'Digital Education',
    subIssues: [
      { id: 1, name: 'Online Learning Platforms' },
      { id: 2, name: 'Digital Classrooms' },
      { id: 3, name: 'Teacher Digital Training' },
      { id: 4, name: 'Student Tech Access' },
      { id: 5, name: 'E Learning Content' },
      { id: 6, name: 'EdTech Innovation' },
      { id: 7, name: 'Remote Assessments' },
      { id: 8, name: 'Cyber Safety for Students' },
      { id: 9, name: 'Digital Inclusion' },
      { id: 10, name: 'Education Technology Policy' },
    ],
  },

  {
    id: 53,
    name: 'Public Health',
    subIssues: [
      { id: 1, name: 'Disease Prevention' },
      { id: 2, name: 'Vaccination Programs' },
      { id: 3, name: 'Health Surveillance' },
      { id: 4, name: 'Epidemic Preparedness' },
      { id: 5, name: 'Health Promotion' },
      { id: 6, name: 'Community Health Workers' },
      { id: 7, name: 'Public Health Research' },
      { id: 8, name: 'Sanitation & Hygiene' },
      { id: 9, name: 'Nutrition Programs' },
      { id: 10, name: 'Public Health Policy' },
    ],
  },

  {
    id: 54,
    name: 'Civic Engagement',
    subIssues: [
      { id: 1, name: 'Voter Awareness' },
      { id: 2, name: 'Citizen Participation' },
      { id: 3, name: 'Grassroots Movements' },
      { id: 4, name: 'Local Governance' },
      { id: 5, name: 'Public Dialogues' },
      { id: 6, name: 'Civic Education' },
      { id: 7, name: 'Community Forums' },
      { id: 8, name: 'Volunteerism' },
      { id: 9, name: 'Democratic Values' },
      { id: 10, name: 'Civic Policy' },
    ],
  },

  {
    id: 55,
    name: 'Inclusive Development',
    subIssues: [
      { id: 1, name: 'Equitable Growth' },
      { id: 2, name: 'Social Inclusion' },
      { id: 3, name: 'Marginalized Communities' },
      { id: 4, name: 'Access to Services' },
      { id: 5, name: 'Inclusive Policies' },
      { id: 6, name: 'Gender Inclusion' },
      { id: 7, name: 'Disability Inclusion' },
      { id: 8, name: 'Economic Equity' },
      { id: 9, name: 'Community Empowerment' },
      { id: 10, name: 'Inclusive Governance' },
    ],
  },

  {
    id: 56,
    name: 'Urban Resilience',
    subIssues: [
      { id: 1, name: 'Disaster Prepared Cities' },
      { id: 2, name: 'Climate Resilient Infrastructure' },
      { id: 3, name: 'Urban Risk Reduction' },
      { id: 4, name: 'Flood Resilience' },
      { id: 5, name: 'Heat Action Plans' },
      { id: 6, name: 'Emergency Response Systems' },
      { id: 7, name: 'Resilient Housing' },
      { id: 8, name: 'Smart City Resilience' },
      { id: 9, name: 'Community Preparedness' },
      { id: 10, name: 'Urban Resilience Policy' },
    ],
  },

  {
    id: 57,
    name: 'Rural Innovation',
    subIssues: [
      { id: 1, name: 'Agri Innovation' },
      { id: 2, name: 'Rural Startups' },
      { id: 3, name: 'Technology in Villages' },
      { id: 4, name: 'Digital Agriculture' },
      { id: 5, name: 'Smart Irrigation' },
      { id: 6, name: 'Rural Supply Chains' },
      { id: 7, name: 'Market Linkages' },
      { id: 8, name: 'Skill Innovation' },
      { id: 9, name: 'Rural Entrepreneurship' },
      { id: 10, name: 'Innovation Policy' },
    ],
  },

  {
    id: 58,
    name: 'Gender Equality',
    subIssues: [
      { id: 1, name: 'Equal Rights' },
      { id: 2, name: 'Gender Sensitization' },
      { id: 3, name: 'Women Leadership' },
      { id: 4, name: 'Workplace Equality' },
      { id: 5, name: 'Gender Based Violence Prevention' },
      { id: 6, name: 'Education Equality' },
      { id: 7, name: 'Health Equity' },
      { id: 8, name: 'Economic Participation' },
      { id: 9, name: 'Legal Protection' },
      { id: 10, name: 'Gender Policy' },
    ],
  },

  {
    id: 59,
    name: 'Waste & Recycling',
    subIssues: [
      { id: 1, name: 'Solid Waste Management' },
      { id: 2, name: 'Recycling Programs' },
      { id: 3, name: 'Plastic Waste Reduction' },
      { id: 4, name: 'E Waste Management' },
      { id: 5, name: 'Composting Initiatives' },
      { id: 6, name: 'Circular Economy' },
      { id: 7, name: 'Waste Segregation' },
      { id: 8, name: 'Community Cleanups' },
      { id: 9, name: 'Waste Awareness' },
      { id: 10, name: 'Waste Management Policy' },
    ],
  },

  {
    id: 60,
    name: 'Peace & Conflict Resolution',
    subIssues: [
      { id: 1, name: 'Conflict Mediation' },
      { id: 2, name: 'Peace Education' },
      { id: 3, name: 'Dialogue Facilitation' },
      { id: 4, name: 'Community Harmony' },
      { id: 5, name: 'Violence Prevention' },
      { id: 6, name: 'Post Conflict Recovery' },
      { id: 7, name: 'Humanitarian Dialogue' },
      { id: 8, name: 'Social Cohesion' },
      { id: 9, name: 'Peace Building Programs' },
      { id: 10, name: 'Peace Policy' },
    ],
  },
];


export const STATES_DATA = [
  {
    id: 1,
    name: 'California',
    counties: [
      { id: 101, name: 'Los Angeles County' },
      { id: 102, name: 'San Diego County' }
    ]
  },
  {
    id: 2,
    name: 'Texas',
    counties: [
      { id: 201, name: 'Harris County' },
      { id: 202, name: 'Dallas County' }
    ]
  },
  {
    id: 3,
    name: 'Florida',
    counties: [
      { id: 301, name: 'Miami-Dade County' },
      { id: 302, name: 'Orange County' }
    ]
  }
];