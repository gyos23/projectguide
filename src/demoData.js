// Demo Data for ProjectGuide
// This provides a realistic sample project: "Website Redesign Project"

export const getDemoData = () => {
  const projectId = 'demo-project-001';

  return {
    project: {
      id: projectId,
      name: 'Corporate Website Redesign',
      description: 'Complete redesign of company website to improve user experience, modernize design, and increase conversion rates',
      methodology: 'traditional',
      createdAt: new Date('2025-11-01').toISOString(),
      status: 'active'
    },

    teamMembers: [
      { id: 1, name: 'Sarah Chen', role: 'Project Manager', email: 'sarah.chen@company.com' },
      { id: 2, name: 'Marcus Williams', role: 'UX Designer', email: 'marcus.w@company.com' },
      { id: 3, name: 'Emily Rodriguez', role: 'Frontend Developer', email: 'emily.r@company.com' },
      { id: 4, name: 'David Park', role: 'Backend Developer', email: 'david.park@company.com' },
      { id: 5, name: 'Jennifer Liu', role: 'QA Engineer', email: 'jennifer.liu@company.com' },
      { id: 6, name: 'Robert Johnson', role: 'Marketing Manager', email: 'robert.j@company.com' },
      { id: 7, name: 'Lisa Anderson', role: 'Executive Sponsor', email: 'lisa.anderson@company.com' }
    ],

    // Task statuses for demo project
    tasks: {
      // PM Orientation & Setup - Mostly completed
      't0a': { status: 'completed' },
      't0b': { status: 'completed' },
      't0c': { status: 'completed' },
      't0d': { status: 'completed' },
      't0e': { status: 'completed' },
      't0f': { status: 'completed' },
      't0g': { status: 'completed' },
      't0h': { status: 'completed' },

      // Pre-Project Documents - Completed
      't0i': { status: 'completed' },
      't0j': { status: 'completed' },
      't0k': { status: 'completed' },
      't0l': { status: 'completed' },
      't0m': { status: 'completed' },
      't0n': { status: 'completed' },
      't0o': { status: 'completed' },

      // Initiating - Completed
      't1': { status: 'completed' },
      't2': { status: 'completed' },
      't3': { status: 'completed' },
      't4': { status: 'completed' },
      't5': { status: 'completed' },
      't6': { status: 'completed' },

      // Planning - Mix of completed and in progress
      't7': { status: 'completed' },
      't8': { status: 'completed' },
      't9': { status: 'completed' },
      't10': { status: 'completed' },
      't11': { status: 'completed' },
      't12': { status: 'completed' },
      't13': { status: 'completed' },
      't14': { status: 'completed' },
      't15': { status: 'completed' },
      't16': { status: 'completed' },
      't17': { status: 'completed' },
      't18': { status: 'completed' },
      't19': { status: 'completed' },
      't20': { status: 'completed' },
      't21': { status: 'completed' },
      't22': { status: 'completed' },
      't23': { status: 'completed' },
      't24': { status: 'in-progress' },
      't25': { status: 'in-progress' },
      't26': { status: 'todo' },
      't27': { status: 'todo' },
      't28': { status: 'completed' },
      't29': { status: 'completed' },
      't30': { status: 'completed' },
      't31': { status: 'completed' },
      't32': { status: 'completed' },
      't33': { status: 'completed' },
      't34': { status: 'completed' },
      't35': { status: 'in-progress' },
      't36': { status: 'completed' },
      't37': { status: 'completed' },
      't38': { status: 'completed' },
      't39': { status: 'in-progress' },
      't40': { status: 'in-progress' },
      't41': { status: 'completed' },
      't42': { status: 'completed' },
      't43': { status: 'in-progress' },
      't44': { status: 'completed' },
      't45': { status: 'completed' },

      // Executing - Some completed, many in progress
      't46': { status: 'in-progress' },
      't47': { status: 'completed' },
      't48': { status: 'in-progress' },
      't49': { status: 'in-progress' },
      't50': { status: 'todo' },
      't51': { status: 'completed' },
      't52': { status: 'in-progress' },
      't53': { status: 'in-progress' },
      't54': { status: 'in-progress' },
      't55': { status: 'in-progress' },
      't56': { status: 'in-progress' },
      't57': { status: 'in-progress' },
      't58': { status: 'in-progress' },
      't59': { status: 'in-progress' },
      't60': { status: 'in-progress' },
      't61': { status: 'in-progress' },

      // Monitoring & Controlling - Some in progress
      't62': { status: 'in-progress' },
      't63': { status: 'in-progress' },
      't64': { status: 'in-progress' },
      't65': { status: 'in-progress' },
      't66': { status: 'todo' },
      't67': { status: 'todo' },
      't68': { status: 'in-progress' },
      't69': { status: 'todo' },
      't70': { status: 'in-progress' },
      't71': { status: 'todo' },
      't72': { status: 'in-progress' },
      't73': { status: 'todo' },
      't74': { status: 'in-progress' },
      't75': { status: 'todo' },
      't76': { status: 'in-progress' },
      't77': { status: 'todo' },
      't78': { status: 'in-progress' },
      't79': { status: 'todo' },
      't80': { status: 'in-progress' },
      't81': { status: 'todo' },

      // Closing - Not started yet
      't82': { status: 'todo' },
      't83': { status: 'todo' },
      't84': { status: 'todo' },
      't85': { status: 'todo' },
      't86': { status: 'todo' },
      't87': { status: 'todo' },
      't88': { status: 'todo' },
      't89': { status: 'todo' },
      't90': { status: 'todo' },
      't91': { status: 'todo' },
      't92': { status: 'todo' },
      't93': { status: 'todo' },
      't94': { status: 'todo' }
    },

    // Task notes
    taskNotes: {
      't1': 'Project charter approved by executive sponsor Lisa Anderson. Budget: $250K, Timeline: 6 months. Key objectives: 40% increase in conversion rate, improved mobile responsiveness, modern brand identity.',
      't4': 'Identified 23 stakeholders including marketing team, sales team, customer support, IT operations, and external agency partners.',
      't11': 'Collected requirements through 15 stakeholder interviews, 3 focus groups with customers, and competitive analysis of 10 competitor websites.',
      't13': 'WBS created with 5 major deliverables: Discovery & Research, Design, Development, Testing & QA, Launch & Training. Total of 127 work packages.',
      't19': 'Project schedule created using MS Project. Critical path includes: Requirements (2 weeks) → Design (4 weeks) → Development (8 weeks) → QA (3 weeks) → Launch (1 week).',
      't22': 'Budget approved: $250,000 total. Breakdown: Design $45K, Development $120K, Testing $25K, Content $20K, Contingency $40K.',
      't24': 'Quality metrics defined: Page load time <2 seconds, Mobile responsiveness score >95, Accessibility WCAG 2.1 AA compliance, Zero critical bugs at launch.',
      't37': 'Identified 12 major risks including: scope creep, resource availability, third-party integration delays, browser compatibility issues. Risk register created.',
      't47': 'Kickoff meeting held on Nov 15, 2025. All team members attended. Reviewed project charter, schedule, roles & responsibilities. Team energized and ready!',
      't52': 'Team development activities: Weekly design reviews, pair programming sessions, cross-functional collaboration workshops. Team cohesion improving.',
      't62': 'Weekly status meetings every Monday. Currently tracking 15% ahead of schedule on development, but design phase took 1 week longer than planned.',
      't78': 'Stakeholder feedback: Marketing team very pleased with new design direction. Requested minor adjustments to product page layout.'
    },

    // Task due dates (relative to current date)
    taskDueDates: {
      't24': getDaysFromNow(5),
      't25': getDaysFromNow(5),
      't26': getDaysFromNow(10),
      't27': getDaysFromNow(15),
      't35': getDaysFromNow(7),
      't39': getDaysFromNow(12),
      't40': getDaysFromNow(14),
      't43': getDaysFromNow(20),
      't46': getDaysFromNow(30),
      't48': getDaysFromNow(35),
      't49': getDaysFromNow(25),
      't52': getDaysFromNow(28),
      't53': getDaysFromNow(28),
      't54': getDaysFromNow(3),
      't55': getDaysFromNow(7),
      't56': getDaysFromNow(14),
      't57': getDaysFromNow(21),
      't58': getDaysFromNow(7),
      't59': getDaysFromNow(30),
      't60': getDaysFromNow(35),
      't61': getDaysFromNow(14),
      't62': getDaysFromNow(7),
      't63': getDaysFromNow(7),
      't64': getDaysFromNow(7),
      't65': getDaysFromNow(10),
      't68': getDaysFromNow(15),
      't70': getDaysFromNow(20),
      't72': getDaysFromNow(25),
      't74': getDaysFromNow(30),
      't76': getDaysFromNow(35),
      't78': getDaysFromNow(40),
      't80': getDaysFromNow(45)
    },

    // Task assignees
    taskAssignees: {
      // Sarah Chen (PM) - Integration and planning tasks
      't1': 1, 't7': 1, 't8': 1, 't62': 1, 't63': 1, 't64': 1, 't46': 1, 't58': 1,

      // Marcus Williams (UX Designer) - Design and quality tasks
      't24': 2, 't25': 2, 't26': 2, 't52': 2, 't49': 2,

      // Emily Rodriguez (Frontend Dev) - Development tasks
      't48': 3, 't27': 3, 't50': 3, 't68': 3, 't70': 3,

      // David Park (Backend Dev) - Development and integration tasks
      't46': 4, 't59': 4, 't60': 4, 't72': 4, 't74': 4,

      // Jennifer Liu (QA Engineer) - Quality and testing tasks
      't49': 5, 't50': 5, 't27': 5, 't66': 5, 't67': 5,

      // Robert Johnson (Marketing) - Stakeholder and communications tasks
      't55': 6, 't56': 6, 't61': 6, 't78': 6, 't35': 6,

      // Lisa Anderson (Executive Sponsor) - Risk and oversight
      't39': 7, 't40': 7, 't43': 7, 't76': 7, 't80': 7,

      // Team tasks
      't51': 1, 't52': 1, 't53': 1, 't54': 1, 't57': 1, 't65': 1
    }
  };
};

// Helper function to get date X days from now in YYYY-MM-DD format
function getDaysFromNow(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

// Export individual parts for flexibility
export const demoProject = getDemoData();
