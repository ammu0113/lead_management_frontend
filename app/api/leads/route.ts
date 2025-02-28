import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

let leads = [
  { id: 1, firstName: 'Jorge', lastName: 'Ruiz', email: 'jorge@example.com', country: 'Mexico', status: 'PENDING', submittedAt: '02/02/2024, 2:45 PM', visas: ['O-1'], linkedIn: 'https://linkedin.com/in/jorge', additionalInfo: 'Looking for options' },
  { id: 2, firstName: 'Bahar', lastName: 'Zamir', email: 'bahar@example.com', country: 'Mexico', status: 'PENDING', submittedAt: '02/02/2024, 2:45 PM', visas: ['EB-1A'], linkedIn: 'https://linkedin.com/in/bahar', additionalInfo: 'Current F-1 visa' },
  { id: 3, firstName: 'Mary', lastName: 'Lopez', email: 'mary@example.com', country: 'Brazil', status: 'PENDING', submittedAt: '02/02/2024, 2:45 PM', visas: ['EB-2 NIW'], linkedIn: 'https://linkedin.com/in/mary', additionalInfo: 'PhD in Computer Science' },
  { id: 4, firstName: 'Li', lastName: 'Zijin', email: 'li@example.com', country: 'South Korea', status: 'PENDING', submittedAt: '02/02/2024, 2:45 PM', visas: ['O-1', 'EB-1A'], linkedIn: 'https://linkedin.com/in/li', additionalInfo: 'Award-winning researcher' },
  { id: 5, firstName: 'Mark', lastName: 'Antonov', email: 'mark@example.com', country: 'Russia', status: 'PENDING', submittedAt: '02/02/2024, 2:45 PM', visas: ['EB-2 NIW'], linkedIn: 'https://linkedin.com/in/mark', additionalInfo: 'Software engineer with 10 years experience' },
  { id: 6, firstName: 'Jane', lastName: 'Ma', email: 'jane@example.com', country: 'Mexico', status: 'PENDING', submittedAt: '02/02/2024, 2:45 PM', visas: ["I don't know"], linkedIn: 'https://linkedin.com/in/jane', additionalInfo: 'Looking for options after graduation' },
  { id: 7, firstName: 'Anand', lastName: 'Jain', email: 'anand@example.com', country: 'Mexico', status: 'REACHED_OUT', submittedAt: '02/02/2024, 2:45 PM', visas: ['O-1'], linkedIn: 'https://linkedin.com/in/anand', additionalInfo: 'Entrepreneur with multiple startups' },
  { id: 8, firstName: 'Anna', lastName: 'Voronova', email: 'anna@example.com', country: 'France', status: 'PENDING', submittedAt: '02/02/2024, 2:45 PM', visas: ['EB-1A'], linkedIn: 'https://linkedin.com/in/anna', additionalInfo: 'Researcher in AI' },
];

const statuses = ["PENDING", "REACHED_OUT", "APPROVED", "REJECTED"];
const countries = [
  "USA",
  "Canada",
  "Germany",
  "India",
  "Australia",
  "UK",
  "France",
  "Italy",
  "Spain",
  "Brazil",
];
const visas = [
  "O-1",
  "EB-1A",
  "EB-2 NIW",
  "I don't know",
  "H-1B",
  "L-1",
  "F-1",
  "E-2",
];
const firstNames = [
  "John",
  "Emma",
  "Carlos",
  "Priya",
  "Ali",
  "Elena",
  "Luca",
  "Sophia",
  "David",
  "Chen",
];
const lastNames = [
  "Smith",
  "Johnson",
  "Gomez",
  "Sharma",
  "Khan",
  "Fernandez",
  "Rossi",
  "Dubois",
  "Taylor",
  "Li",
];
for (let i = 9; i <= 20; i++) {
  leads.push({
    id: i,
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    email: `user${i}@example.com`,
    country: countries[Math.floor(Math.random() * countries.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    submittedAt: "02/02/2024, 2:45 PM",
    visas: [visas[Math.floor(Math.random() * visas.length)]],
    linkedIn: `https://linkedin.com/in/user${i}`,
    additionalInfo: "Interested in immigration options",
  });
}

export async function GET(request: NextRequest) {
  // you would check authentication here
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');
  
  let filteredLeads = leads;
  
  if (status) {
    filteredLeads = leads.filter(lead => lead.status === status);
  }
  
  return NextResponse.json(filteredLeads);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    // console.log(formData);
    // console.log(request);
    // Process form data
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const country = formData.get('country') as string;
    const linkedIn = formData.get('linkedIn') as string;
    const additionalInfo = formData.get('additionalInfo') as string;
    
    // // Process visas (multiple values)
    const visas = formData.getAll('visas') as string[];
    
    // // Process file
    const resumeFile = formData.get('resume') as File;
    let resumeFileName = '';
    
    if (resumeFile) {
      // you would upload this file to storage
      resumeFileName = resumeFile.name;
    }
    
    // // Create new lead
    const newLead = {
      id: leads.length + 1,
      firstName,
      lastName,
      email,
      country,
      linkedIn,
      additionalInfo,
      visas,
      resumeFileName,
      status: 'PENDING',
      submittedAt: new Date().toLocaleString(),
    };

    // // you would save this to a database
    leads.push(newLead as any);
    // console.log(leads);
    return NextResponse.json({ success: true, lead: newLead });

  } catch (error) {
    console.error('Error processing lead submission:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process submission' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json();
    
    // Find and update the lead
    const leadIndex = leads.findIndex(lead => lead.id === id);
    
    if (leadIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      );
    }
    
    leads[leadIndex] = {
      ...leads[leadIndex],
      status
    };
    
    return NextResponse.json({ 
      success: true, 
      lead: leads[leadIndex] 
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update lead' },
      { status: 500 }
    );
  }
}