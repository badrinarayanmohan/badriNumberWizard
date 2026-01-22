import type { JobListing } from '@/types/job';

const mockCompanies = [
  'Google', 'Meta', 'Amazon', 'Microsoft', 'Apple',
  'Netflix', 'Tesla', 'Airbnb', 'Uber', 'Spotify',
  'Adobe', 'Salesforce', 'Oracle', 'IBM', 'Intel'
];

const mockJobTitles = [
  'Senior Software Engineer',
  'Product Manager',
  'Data Scientist',
  'UX Designer',
  'DevOps Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'ML Engineer',
  'Cloud Architect',
  'Security Engineer',
  'QA Engineer',
  'Technical Writer',
  'Engineering Manager',
  'Solutions Architect'
];

const mockSalaries = [
  '$80,000 - $120,000',
  '$100,000 - $150,000',
  '$120,000 - $180,000',
  '$150,000 - $200,000',
  '$90,000 - $130,000',
  '$110,000 - $160,000'
];

const mockDescriptions = [
  'We are looking for a talented professional to join our team. You will work on cutting-edge technology and collaborate with world-class engineers.',
  'Join our innovative team to build products that impact millions of users worldwide. We offer competitive compensation and great benefits.',
  'Exciting opportunity to work on challenging problems at scale. We value creativity, collaboration, and continuous learning.',
  'Be part of a fast-growing company that is transforming the industry. Work with the latest technologies and methodologies.',
  'We are seeking a passionate individual to help us build the future. Great culture, flexible work environment, and amazing perks.'
];

const mockSources = ['Indeed', 'LinkedIn', 'Glassdoor', 'ZipRecruiter', 'Monster'];

const stateCities: Record<string, string[]> = {
  'New York': ['New York City', 'Buffalo', 'Rochester', 'Albany'],
  'California': ['San Francisco', 'Los Angeles', 'San Diego', 'San Jose'],
  'Texas': ['Austin', 'Houston', 'Dallas', 'San Antonio'],
  'Washington': ['Seattle', 'Spokane', 'Tacoma'],
  'Massachusetts': ['Boston', 'Cambridge', 'Worcester'],
  'Illinois': ['Chicago', 'Naperville', 'Aurora'],
  'Florida': ['Miami', 'Tampa', 'Orlando', 'Jacksonville'],
  'Colorado': ['Denver', 'Boulder', 'Colorado Springs'],
  'Georgia': ['Atlanta', 'Savannah', 'Augusta'],
  'Pennsylvania': ['Philadelphia', 'Pittsburgh', 'Harrisburg']
};

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomDate(daysAgo: number = 30): string {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date.toISOString();
}

function generateMockJob(index: number, location: string): JobListing {
  const company = getRandomItem(mockCompanies);
  const title = getRandomItem(mockJobTitles);

  // Determine city and state
  let city: string;
  let state: string;

  // Check if location matches a state
  const matchedState = Object.keys(stateCities).find(
    s => location.toLowerCase().includes(s.toLowerCase())
  );

  if (matchedState) {
    state = matchedState;
    city = getRandomItem(stateCities[matchedState]);
  } else {
    // Default to California if no match
    state = 'California';
    city = getRandomItem(stateCities['California']);
  }

  return {
    id: `mock-job-${index}-${Date.now()}`,
    title,
    company,
    location: `${city}, ${state}`,
    state: state,
    description: getRandomItem(mockDescriptions),
    salary: Math.random() > 0.3 ? getRandomItem(mockSalaries) : undefined,
    postedDate: getRandomDate(30),
    applyLink: `https://example.com/jobs/${index}`,
    source: getRandomItem(mockSources),
    companyLogo: `https://ui-avatars.com/api/?name=${encodeURIComponent(company)}&background=random`
  };
}

export function generateMockJobs(query: string, location: string, count: number = 20): JobListing[] {
  const jobs: JobListing[] = [];

  for (let i = 0; i < count; i++) {
    jobs.push(generateMockJob(i, location));
  }

  // Filter jobs based on query if provided
  if (query && query.trim()) {
    const lowerQuery = query.toLowerCase();
    return jobs.filter(job =>
      job.title.toLowerCase().includes(lowerQuery) ||
      job.company.toLowerCase().includes(lowerQuery) ||
      job.description.toLowerCase().includes(lowerQuery)
    );
  }

  return jobs;
}

export function getMockJobById(id: string): JobListing | null {
  // Generate a consistent mock job for the given ID
  const index = parseInt(id.split('-')[2] || '0');
  return generateMockJob(index, 'United States');
}
