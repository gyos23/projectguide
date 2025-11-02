import React, { useState, useEffect } from 'react';
import { Calendar, CheckSquare, LayoutGrid, BookOpen, ChevronRight, ChevronDown, Search, Settings, BarChart3, Users, FileText, Clock, AlertCircle, Moon, Sun, ChevronLeft } from 'lucide-react';

const ProjectManagementPlatform = () => {
  const [currentStep, setCurrentStep] = useState('landing');
  const [selectedMethodology, setSelectedMethodology] = useState(null);
  const [viewMode, setViewMode] = useState('board');
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [expandedGroups, setExpandedGroups] = useState({});
  const [tasks, setTasks] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showGuidance, setShowGuidance] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filterKnowledgeArea, setFilterKnowledgeArea] = useState('all');
  const [quickFilter, setQuickFilter] = useState('all');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [taskNotes, setTaskNotes] = useState({});
  const [taskDueDates, setTaskDueDates] = useState({});
  const [taskAssignees, setTaskAssignees] = useState({});
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'John Smith', role: 'Project Manager', email: 'john.smith@company.com' },
    { id: 2, name: 'Sarah Johnson', role: 'Business Analyst', email: 'sarah.j@company.com' },
    { id: 3, name: 'Mike Chen', role: 'Technical Lead', email: 'mike.chen@company.com' },
    { id: 4, name: 'Lisa Rodriguez', role: 'Quality Assurance', email: 'lisa.r@company.com' },
    { id: 5, name: 'David Kim', role: 'Stakeholder', email: 'david.kim@company.com' }
  ]);
  const [darkMode, setDarkMode] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(null);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerTask, setDatePickerTask] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  // Methodology configurations
  const methodologies = {
    traditional: {
      name: 'Traditional (Waterfall)',
      description: 'Sequential approach with distinct phases',
      icon: '📊',
      color: 'blue',
      phases: [
        {
          id: 'orientation',
          name: 'PM Orientation & Setup',
          processGroups: [
            {
              name: 'Organizational Familiarization',
              tasks: [
                { id: 't0a', name: 'Request & Review Organizational Process Assets (OPAs)', knowledgeArea: 'Integration', status: 'todo', guidance: 'Templates, policies, procedures, lessons learned from previous projects' },
                { id: 't0b', name: 'Access Project Management Information System (PMIS)', knowledgeArea: 'Integration', status: 'todo', guidance: 'Software tools, databases, scheduling systems used by organization' },
                { id: 't0c', name: 'Review Enterprise Environmental Factors (EEFs)', knowledgeArea: 'Integration', status: 'todo', guidance: 'Org culture, structure, market conditions, regulations' },
                { id: 't0d', name: 'Conduct Internal Environmental Assessment', knowledgeArea: 'Integration', status: 'todo', guidance: 'Understand org capabilities, resource availability, decision-making processes' },
                { id: 't0e', name: 'Review Organizational Standards & Methodologies', knowledgeArea: 'Integration', status: 'todo', guidance: 'PM frameworks, quality standards, compliance requirements' }
              ]
            },
            {
              name: 'Key Stakeholder Meetings',
              tasks: [
                { id: 't0f', name: 'Meet with PMO/Project Sponsor', knowledgeArea: 'Stakeholder', status: 'todo', guidance: 'Understand expectations, authority levels, escalation paths' },
                { id: 't0g', name: 'Review Governance Structure', knowledgeArea: 'Integration', status: 'todo', guidance: 'Steering committee, approval authorities, reporting requirements' },
                { id: 't0h', name: 'Identify Key Decision Makers', knowledgeArea: 'Stakeholder', status: 'todo', guidance: 'Who approves budget, scope changes, resource allocation' }
              ]
            }
          ]
        },
        {
          id: 'pre-project',
          name: 'Pre-Project Documents',
          processGroups: [
            {
              name: 'Business Case & Justification',
              tasks: [
                { id: 't0i', name: 'Develop/Review Business Case', knowledgeArea: 'Integration', status: 'todo', guidance: 'Business needs, cost-benefit analysis, alternatives considered' },
                { id: 't0j', name: 'Create/Review Feasibility Study', knowledgeArea: 'Integration', status: 'todo', guidance: 'Technical, economic, operational, schedule feasibility' },
                { id: 't0k', name: 'Develop Benefits Management Plan', knowledgeArea: 'Integration', status: 'todo', guidance: 'Target benefits, metrics, realization timeframes' },
                { id: 't0l', name: 'Prepare Project Selection Documentation', knowledgeArea: 'Integration', status: 'todo', guidance: 'Scoring models, financial analysis, strategic alignment' }
              ]
            },
            {
              name: 'Initial Agreements & Approvals',
              tasks: [
                { id: 't0m', name: 'Obtain Project Authorization', knowledgeArea: 'Integration', status: 'todo', guidance: 'Formal approval to proceed from sponsor/governance' },
                { id: 't0n', name: 'Review Contracts & Agreements', knowledgeArea: 'Procurement', status: 'todo', guidance: 'Existing vendor agreements, partnership terms' },
                { id: 't0o', name: 'Confirm Budget Allocation', knowledgeArea: 'Cost', status: 'todo', guidance: 'Initial funding approval, budget constraints' }
              ]
            }
          ]
        },
        {
          id: 'initiating',
          name: 'Initiating',
          processGroups: [
            {
              name: 'Project Charter Development',
              tasks: [
                { id: 't1', name: 'Develop Project Charter', knowledgeArea: 'Integration', status: 'todo', guidance: 'Purpose, objectives, high-level requirements, summary milestones' },
                { id: 't2', name: 'Define Project Success Criteria', knowledgeArea: 'Integration', status: 'todo', guidance: 'Measurable criteria for project success' },
                { id: 't3', name: 'Document Assumptions & Constraints', knowledgeArea: 'Integration', status: 'todo', guidance: 'Project assumptions, known constraints, dependencies' }
              ]
            },
            {
              name: 'Stakeholder Identification',
              tasks: [
                { id: 't4', name: 'Identify Stakeholders', knowledgeArea: 'Stakeholder', status: 'todo', guidance: 'All individuals/groups affected by project' },
                { id: 't5', name: 'Create Stakeholder Register', knowledgeArea: 'Stakeholder', status: 'todo', guidance: 'Contact info, requirements, expectations, influence levels' },
                { id: 't6', name: 'Perform Stakeholder Analysis', knowledgeArea: 'Stakeholder', status: 'todo', guidance: 'Power/interest grid, engagement strategies' }
              ]
            }
          ]
        },
        {
          id: 'planning',
          name: 'Planning',
          processGroups: [
            {
              name: 'Integration & Subsidiary Plans',
              tasks: [
                { id: 't7', name: 'Develop Project Management Plan', knowledgeArea: 'Integration', status: 'todo', guidance: 'Master document integrating all subsidiary plans' },
                { id: 't8', name: 'Create Change Management Plan', knowledgeArea: 'Integration', status: 'todo', guidance: 'How changes will be identified, evaluated, approved' },
                { id: 't9', name: 'Develop Configuration Management Plan', knowledgeArea: 'Integration', status: 'todo', guidance: 'Version control, baseline management' }
              ]
            },
            {
              name: 'Scope Management',
              tasks: [
                { id: 't10', name: 'Plan Scope Management', knowledgeArea: 'Scope', status: 'todo', guidance: 'How scope will be defined, validated, controlled' },
                { id: 't11', name: 'Collect Requirements', knowledgeArea: 'Scope', status: 'todo', guidance: 'Stakeholder needs, requirements documentation, traceability matrix' },
                { id: 't12', name: 'Define Scope Statement', knowledgeArea: 'Scope', status: 'todo', guidance: 'Detailed description, deliverables, acceptance criteria, exclusions' },
                { id: 't13', name: 'Create Work Breakdown Structure (WBS)', knowledgeArea: 'Scope', status: 'todo', guidance: 'Hierarchical decomposition, WBS dictionary' },
                { id: 't14', name: 'Create Requirements Traceability Matrix', knowledgeArea: 'Scope', status: 'todo', guidance: 'Link requirements to deliverables and test cases' }
              ]
            },
            {
              name: 'Schedule Management',
              tasks: [
                { id: 't15', name: 'Plan Schedule Management', knowledgeArea: 'Schedule', status: 'todo', guidance: 'Scheduling methodology, tools, performance metrics' },
                { id: 't16', name: 'Define Activities', knowledgeArea: 'Schedule', status: 'todo', guidance: 'Activity list from WBS work packages' },
                { id: 't17', name: 'Sequence Activities', knowledgeArea: 'Schedule', status: 'todo', guidance: 'Dependencies, network diagrams, leads/lags' },
                { id: 't18', name: 'Estimate Activity Durations', knowledgeArea: 'Schedule', status: 'todo', guidance: 'Three-point estimates, reserve analysis' },
                { id: 't19', name: 'Develop Project Schedule', knowledgeArea: 'Schedule', status: 'todo', guidance: 'Critical path, Gantt chart, milestone list, schedule baseline' }
              ]
            },
            {
              name: 'Cost Management',
              tasks: [
                { id: 't20', name: 'Plan Cost Management', knowledgeArea: 'Cost', status: 'todo', guidance: 'How costs will be estimated, budgeted, controlled' },
                { id: 't21', name: 'Estimate Costs', knowledgeArea: 'Cost', status: 'todo', guidance: 'Analogous, parametric, bottom-up estimates' },
                { id: 't22', name: 'Determine Budget', knowledgeArea: 'Cost', status: 'todo', guidance: 'Cost baseline, funding requirements, management reserves' },
                { id: 't23', name: 'Create Cost Management Plan', knowledgeArea: 'Cost', status: 'todo', guidance: 'Cost performance measurement, variance thresholds' }
              ]
            },
            {
              name: 'Quality Management',
              tasks: [
                { id: 't24', name: 'Plan Quality Management', knowledgeArea: 'Quality', status: 'todo', guidance: 'Quality standards, metrics, checklists' },
                { id: 't25', name: 'Define Quality Metrics', knowledgeArea: 'Quality', status: 'todo', guidance: 'Measurable quality attributes' },
                { id: 't26', name: 'Create Quality Assurance Plan', knowledgeArea: 'Quality', status: 'todo', guidance: 'Audits, process improvements' },
                { id: 't27', name: 'Develop Test Plans', knowledgeArea: 'Quality', status: 'todo', guidance: 'Testing strategy, acceptance criteria, test cases' }
              ]
            },
            {
              name: 'Resource Management',
              tasks: [
                { id: 't28', name: 'Plan Resource Management', knowledgeArea: 'Resource', status: 'todo', guidance: 'Roles, responsibilities, reporting relationships' },
                { id: 't29', name: 'Create Resource Breakdown Structure', knowledgeArea: 'Resource', status: 'todo', guidance: 'Resource categories and hierarchy' },
                { id: 't30', name: 'Estimate Activity Resources', knowledgeArea: 'Resource', status: 'todo', guidance: 'Type and quantities needed per activity' },
                { id: 't31', name: 'Develop Team Charter', knowledgeArea: 'Resource', status: 'todo', guidance: 'Team values, agreements, operating guidelines' },
                { id: 't32', name: 'Create RACI Matrix', knowledgeArea: 'Resource', status: 'todo', guidance: 'Responsibility assignment matrix' }
              ]
            },
            {
              name: 'Communications Management',
              tasks: [
                { id: 't33', name: 'Plan Communications Management', knowledgeArea: 'Communications', status: 'todo', guidance: 'Who needs what information, when, how' },
                { id: 't34', name: 'Create Communications Matrix', knowledgeArea: 'Communications', status: 'todo', guidance: 'Stakeholder communication requirements' },
                { id: 't35', name: 'Define Reporting Templates', knowledgeArea: 'Communications', status: 'todo', guidance: 'Status reports, dashboards, presentations' }
              ]
            },
            {
              name: 'Risk Management',
              tasks: [
                { id: 't36', name: 'Plan Risk Management', knowledgeArea: 'Risk', status: 'todo', guidance: 'Risk management approach, roles, timing' },
                { id: 't37', name: 'Identify Risks', knowledgeArea: 'Risk', status: 'todo', guidance: 'Risk register, risk categories' },
                { id: 't38', name: 'Perform Qualitative Risk Analysis', knowledgeArea: 'Risk', status: 'todo', guidance: 'Probability and impact assessment, risk matrix' },
                { id: 't39', name: 'Perform Quantitative Risk Analysis', knowledgeArea: 'Risk', status: 'todo', guidance: 'Numerical analysis, Monte Carlo simulation' },
                { id: 't40', name: 'Plan Risk Responses', knowledgeArea: 'Risk', status: 'todo', guidance: 'Response strategies, contingency plans, risk owners' }
              ]
            },
            {
              name: 'Procurement Management',
              tasks: [
                { id: 't41', name: 'Plan Procurement Management', knowledgeArea: 'Procurement', status: 'todo', guidance: 'Make-or-buy decisions, procurement approach' },
                { id: 't42', name: 'Create Procurement Strategy', knowledgeArea: 'Procurement', status: 'todo', guidance: 'Contract types, vendor selection criteria' },
                { id: 't43', name: 'Develop Statement of Work (SOW)', knowledgeArea: 'Procurement', status: 'todo', guidance: 'Detailed scope for procurement items' }
              ]
            },
            {
              name: 'Stakeholder Management',
              tasks: [
                { id: 't44', name: 'Plan Stakeholder Engagement', knowledgeArea: 'Stakeholder', status: 'todo', guidance: 'Engagement levels, strategies per stakeholder' },
                { id: 't45', name: 'Create Stakeholder Engagement Plan', knowledgeArea: 'Stakeholder', status: 'todo', guidance: 'Detailed engagement strategies and activities' }
              ]
            }
          ]
        },
        {
          id: 'executing',
          name: 'Executing',
          processGroups: [
            {
              name: 'Project Execution & Direction',
              tasks: [
                { id: 't46', name: 'Direct and Manage Project Work', knowledgeArea: 'Integration', status: 'todo', guidance: 'Execute planned activities, implement approved changes' },
                { id: 't47', name: 'Conduct Project Kickoff Meeting', knowledgeArea: 'Communications', status: 'todo', guidance: 'Align team, review objectives, establish working norms' },
                { id: 't48', name: 'Execute Work Packages', knowledgeArea: 'Integration', status: 'todo', guidance: 'Deliver according to project plan' }
              ]
            },
            {
              name: 'Quality Assurance',
              tasks: [
                { id: 't49', name: 'Manage Quality', knowledgeArea: 'Quality', status: 'todo', guidance: 'Quality audits, process analysis, improvements' },
                { id: 't50', name: 'Conduct Quality Reviews', knowledgeArea: 'Quality', status: 'todo', guidance: 'Peer reviews, inspections, walkthroughs' }
              ]
            },
            {
              name: 'Team Development',
              tasks: [
                { id: 't51', name: 'Acquire Resources', knowledgeArea: 'Resource', status: 'todo', guidance: 'Obtain team members, equipment, facilities' },
                { id: 't52', name: 'Develop Team', knowledgeArea: 'Resource', status: 'todo', guidance: 'Training, team building, skill development' },
                { id: 't53', name: 'Manage Team', knowledgeArea: 'Resource', status: 'todo', guidance: 'Performance assessments, conflict resolution' },
                { id: 't54', name: 'Conduct Team Meetings', knowledgeArea: 'Communications', status: 'todo', guidance: 'Regular team coordination and status updates' }
              ]
            },
            {
              name: 'Communications Execution',
              tasks: [
                { id: 't55', name: 'Manage Communications', knowledgeArea: 'Communications', status: 'todo', guidance: 'Create, distribute, store project information' },
                { id: 't56', name: 'Hold Stakeholder Meetings', knowledgeArea: 'Stakeholder', status: 'todo', guidance: 'Regular stakeholder engagement sessions' }
              ]
            },
            {
              name: 'Risk & Issue Management',
              tasks: [
                { id: 't57', name: 'Implement Risk Responses', knowledgeArea: 'Risk', status: 'todo', guidance: 'Execute planned risk response strategies' },
                { id: 't58', name: 'Track Issues & Actions', knowledgeArea: 'Integration', status: 'todo', guidance: 'Issue log, action item tracking' }
              ]
            },
            {
              name: 'Procurement Execution',
              tasks: [
                { id: 't59', name: 'Conduct Procurements', knowledgeArea: 'Procurement', status: 'todo', guidance: 'Obtain seller responses, select vendors, award contracts' },
                { id: 't60', name: 'Manage Vendor Relationships', knowledgeArea: 'Procurement', status: 'todo', guidance: 'Vendor meetings, performance monitoring' }
              ]
            },
            {
              name: 'Stakeholder Engagement',
              tasks: [
                { id: 't61', name: 'Manage Stakeholder Engagement', knowledgeArea: 'Stakeholder', status: 'todo', guidance: 'Address concerns, manage expectations' }
              ]
            }
          ]
        },
        {
          id: 'monitoring',
          name: 'Monitoring & Controlling',
          processGroups: [
            {
              name: 'Integrated Change Control',
              tasks: [
                { id: 't62', name: 'Monitor and Control Project Work', knowledgeArea: 'Integration', status: 'todo', guidance: 'Track, review, regulate progress and performance' },
                { id: 't63', name: 'Perform Integrated Change Control', knowledgeArea: 'Integration', status: 'todo', guidance: 'Review all change requests, approve/reject changes' },
                { id: 't64', name: 'Maintain Change Log', knowledgeArea: 'Integration', status: 'todo', guidance: 'Document all change requests and decisions' }
              ]
            },
            {
              name: 'Scope Control',
              tasks: [
                { id: 't65', name: 'Validate Scope', knowledgeArea: 'Scope', status: 'todo', guidance: 'Formal acceptance of deliverables' },
                { id: 't66', name: 'Control Scope', knowledgeArea: 'Scope', status: 'todo', guidance: 'Monitor scope status, manage scope changes' }
              ]
            },
            {
              name: 'Schedule & Cost Control',
              tasks: [
                { id: 't67', name: 'Control Schedule', knowledgeArea: 'Schedule', status: 'todo', guidance: 'Monitor status, manage schedule changes, update schedule' },
                { id: 't68', name: 'Control Costs', knowledgeArea: 'Cost', status: 'todo', guidance: 'Monitor budget status, manage cost changes, update budget' },
                { id: 't69', name: 'Calculate Earned Value Metrics', knowledgeArea: 'Cost', status: 'todo', guidance: 'EV, PV, AC, SPI, CPI, EAC, ETC calculations' }
              ]
            },
            {
              name: 'Quality Control',
              tasks: [
                { id: 't70', name: 'Control Quality', knowledgeArea: 'Quality', status: 'todo', guidance: 'Monitor quality metrics, validate deliverables' },
                { id: 't71', name: 'Conduct Inspections/Testing', knowledgeArea: 'Quality', status: 'todo', guidance: 'Quality inspections, testing activities' }
              ]
            },
            {
              name: 'Resource & Communications Control',
              tasks: [
                { id: 't72', name: 'Control Resources', knowledgeArea: 'Resource', status: 'todo', guidance: 'Monitor resource utilization, resolve conflicts' },
                { id: 't73', name: 'Monitor Communications', knowledgeArea: 'Communications', status: 'todo', guidance: 'Ensure information needs are met' },
                { id: 't74', name: 'Generate Status Reports', knowledgeArea: 'Communications', status: 'todo', guidance: 'Weekly/monthly status reports to stakeholders' }
              ]
            },
            {
              name: 'Risk Monitoring',
              tasks: [
                { id: 't75', name: 'Monitor Risks', knowledgeArea: 'Risk', status: 'todo', guidance: 'Track risks, identify new risks, evaluate effectiveness' },
                { id: 't76', name: 'Update Risk Register', knowledgeArea: 'Risk', status: 'todo', guidance: 'Maintain current risk information' }
              ]
            },
            {
              name: 'Procurement & Stakeholder Control',
              tasks: [
                { id: 't77', name: 'Control Procurements', knowledgeArea: 'Procurement', status: 'todo', guidance: 'Manage relationships, monitor performance, manage changes' },
                { id: 't78', name: 'Monitor Stakeholder Engagement', knowledgeArea: 'Stakeholder', status: 'todo', guidance: 'Monitor relationships, adjust engagement strategies' }
              ]
            }
          ]
        },
        {
          id: 'closing',
          name: 'Closing',
          processGroups: [
            {
              name: 'Administrative Closure',
              tasks: [
                { id: 't79', name: 'Close Project or Phase', knowledgeArea: 'Integration', status: 'todo', guidance: 'Finalize all activities, obtain acceptance' },
                { id: 't80', name: 'Obtain Final Deliverable Acceptance', knowledgeArea: 'Scope', status: 'todo', guidance: 'Formal sign-off from customer/sponsor' },
                { id: 't81', name: 'Transfer Deliverables', knowledgeArea: 'Integration', status: 'todo', guidance: 'Handover to operations or client' }
              ]
            },
            {
              name: 'Financial Closure',
              tasks: [
                { id: 't82', name: 'Close Financial Accounts', knowledgeArea: 'Cost', status: 'todo', guidance: 'Final payments, close purchase orders' },
                { id: 't83', name: 'Complete Final Budget Reconciliation', knowledgeArea: 'Cost', status: 'todo', guidance: 'Actual vs. planned costs analysis' }
              ]
            },
            {
              name: 'Procurement Closure',
              tasks: [
                { id: 't84', name: 'Close Procurements', knowledgeArea: 'Procurement', status: 'todo', guidance: 'Complete contract closure, final vendor payments' },
                { id: 't85', name: 'Archive Contracts', knowledgeArea: 'Procurement', status: 'todo', guidance: 'Store contract documentation per policy' }
              ]
            },
            {
              name: 'Knowledge Transfer',
              tasks: [
                { id: 't86', name: 'Document Lessons Learned', knowledgeArea: 'Integration', status: 'todo', guidance: 'What went well, what could improve, recommendations' },
                { id: 't87', name: 'Conduct Post-Implementation Review', knowledgeArea: 'Integration', status: 'todo', guidance: 'Evaluate project success against objectives' },
                { id: 't88', name: 'Update Organizational Process Assets', knowledgeArea: 'Integration', status: 'todo', guidance: 'Add templates, lessons learned to knowledge base' },
                { id: 't89', name: 'Archive Project Documents', knowledgeArea: 'Communications', status: 'todo', guidance: 'Store all project records per retention policy' }
              ]
            },
            {
              name: 'Team Closure',
              tasks: [
                { id: 't90', name: 'Release Project Resources', knowledgeArea: 'Resource', status: 'todo', guidance: 'Return equipment, release team members' },
                { id: 't91', name: 'Conduct Team Celebration', knowledgeArea: 'Resource', status: 'todo', guidance: 'Recognize contributions, celebrate success' },
                { id: 't92', name: 'Complete Performance Evaluations', knowledgeArea: 'Resource', status: 'todo', guidance: 'Team member assessments, feedback' }
              ]
            },
            {
              name: 'Benefits Realization',
              tasks: [
                { id: 't93', name: 'Measure Benefits Realization', knowledgeArea: 'Integration', status: 'todo', guidance: 'Compare actual vs. planned benefits from business case' },
                { id: 't94', name: 'Create Benefits Transition Plan', knowledgeArea: 'Integration', status: 'todo', guidance: 'Ongoing measurement and reporting of benefits' }
              ]
            }
          ]
        }
      ]
    },
    hybrid: {
      name: 'Hybrid',
      description: 'Blend of traditional and agile methods',
      icon: '🔄',
      color: 'purple',
      phases: [
        {
          id: 'initiating',
          name: 'Initiating',
          processGroups: [
            {
              name: 'Project Foundation',
              tasks: [
                { id: 'h1', name: 'Develop Vision & Charter', knowledgeArea: 'Integration', status: 'todo' },
                { id: 'h2', name: 'Form Core Team', knowledgeArea: 'Resource', status: 'todo' }
              ]
            }
          ]
        },
        {
          id: 'planning',
          name: 'Planning',
          processGroups: [
            {
              name: 'Strategic Planning',
              tasks: [
                { id: 'h3', name: 'Define Product Roadmap', knowledgeArea: 'Scope', status: 'todo' },
                { id: 'h4', name: 'Create Release Plan', knowledgeArea: 'Schedule', status: 'todo' },
                { id: 'h5', name: 'Establish Governance Model', knowledgeArea: 'Integration', status: 'todo' }
              ]
            }
          ]
        },
        {
          id: 'executing',
          name: 'Iterative Execution',
          processGroups: [
            {
              name: 'Sprint/Iteration Planning',
              tasks: [
                { id: 'h6', name: 'Sprint Planning', knowledgeArea: 'Schedule', status: 'todo' },
                { id: 'h7', name: 'Daily Standups', knowledgeArea: 'Communications', status: 'todo' },
                { id: 'h8', name: 'Sprint Review', knowledgeArea: 'Quality', status: 'todo' },
                { id: 'h9', name: 'Sprint Retrospective', knowledgeArea: 'Integration', status: 'todo' }
              ]
            }
          ]
        },
        {
          id: 'monitoring',
          name: 'Continuous Monitoring',
          processGroups: [
            {
              name: 'Performance Tracking',
              tasks: [
                { id: 'h10', name: 'Track Velocity & Burndown', knowledgeArea: 'Schedule', status: 'todo' },
                { id: 'h11', name: 'Manage Backlog', knowledgeArea: 'Scope', status: 'todo' }
              ]
            }
          ]
        },
        {
          id: 'closing',
          name: 'Closing',
          processGroups: [
            {
              name: 'Project Closure',
              tasks: [
                { id: 'h12', name: 'Final Release', knowledgeArea: 'Integration', status: 'todo' },
                { id: 'h13', name: 'Retrospective & Lessons', knowledgeArea: 'Integration', status: 'todo' }
              ]
            }
          ]
        }
      ]
    },
    agile: {
      name: 'Agile (Scrum)',
      description: 'Iterative, flexible, team-focused approach',
      icon: '🚀',
      color: 'green',
      phases: [
        {
          id: 'initiating',
          name: 'Project Inception',
          processGroups: [
            {
              name: 'Foundation',
              tasks: [
                { id: 'a1', name: 'Define Product Vision', knowledgeArea: 'Scope', status: 'todo' },
                { id: 'a2', name: 'Form Scrum Team', knowledgeArea: 'Resource', status: 'todo' },
                { id: 'a3', name: 'Create Initial Backlog', knowledgeArea: 'Scope', status: 'todo' }
              ]
            }
          ]
        },
        {
          id: 'planning',
          name: 'Release Planning',
          processGroups: [
            {
              name: 'Release Preparation',
              tasks: [
                { id: 'a4', name: 'Prioritize Product Backlog', knowledgeArea: 'Scope', status: 'todo' },
                { id: 'a5', name: 'Define Definition of Done', knowledgeArea: 'Quality', status: 'todo' },
                { id: 'a6', name: 'Estimate User Stories', knowledgeArea: 'Schedule', status: 'todo' }
              ]
            }
          ]
        },
        {
          id: 'sprinting',
          name: 'Sprint Cycles',
          processGroups: [
            {
              name: 'Sprint Activities',
              tasks: [
                { id: 'a7', name: 'Sprint Planning Meeting', knowledgeArea: 'Schedule', status: 'todo' },
                { id: 'a8', name: 'Daily Scrum', knowledgeArea: 'Communications', status: 'todo' },
                { id: 'a9', name: 'Development Work', knowledgeArea: 'Integration', status: 'todo' },
                { id: 'a10', name: 'Sprint Review', knowledgeArea: 'Stakeholder', status: 'todo' },
                { id: 'a11', name: 'Sprint Retrospective', knowledgeArea: 'Integration', status: 'todo' }
              ]
            }
          ]
        },
        {
          id: 'release',
          name: 'Release & Review',
          processGroups: [
            {
              name: 'Release Activities',
              tasks: [
                { id: 'a12', name: 'Prepare Release', knowledgeArea: 'Quality', status: 'todo' },
                { id: 'a13', name: 'Deploy to Production', knowledgeArea: 'Integration', status: 'todo' },
                { id: 'a14', name: 'Gather Feedback', knowledgeArea: 'Stakeholder', status: 'todo' }
              ]
            }
          ]
        }
      ]
    }
  };

  // Initialize tasks when methodology is selected
  useEffect(() => {
    if (selectedMethodology) {
      const initialTasks = {};
      methodologies[selectedMethodology].phases.forEach(phase => {
        phase.processGroups.forEach(group => {
          group.tasks.forEach(task => {
            initialTasks[task.id] = task;
          });
        });
      });
      setTasks(initialTasks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMethodology]);

  // Load data from localStorage on component mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('projectGuideData');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        
        // Restore all saved state
        if (parsed.selectedMethodology) setSelectedMethodology(parsed.selectedMethodology);
        if (parsed.currentStep) setCurrentStep(parsed.currentStep);
        if (parsed.tasks) setTasks(parsed.tasks);
        if (parsed.taskNotes) setTaskNotes(parsed.taskNotes);
        if (parsed.taskDueDates) setTaskDueDates(parsed.taskDueDates);
        if (parsed.taskAssignees) setTaskAssignees(parsed.taskAssignees);
        if (parsed.selectedPhase) setSelectedPhase(parsed.selectedPhase);
        if (parsed.expandedGroups) setExpandedGroups(parsed.expandedGroups);
        if (parsed.teamMembers) setTeamMembers(parsed.teamMembers);
        if (parsed.darkMode !== undefined) setDarkMode(parsed.darkMode);
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error loading saved data:', error);
      }
      // If there's an error, we'll start fresh
    }
  }, []);

  // Save data to localStorage whenever key state changes
  useEffect(() => {
    const dataToSave = {
      selectedMethodology,
      currentStep,
      tasks,
      taskNotes,
      taskDueDates,
      taskAssignees,
      selectedPhase,
      expandedGroups,
      teamMembers,
      darkMode,
      lastSaved: new Date().toISOString()
    };

    try {
      localStorage.setItem('projectGuideData', JSON.stringify(dataToSave));
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error saving data:', error);
      }
    }
  }, [selectedMethodology, currentStep, tasks, taskNotes, taskDueDates, taskAssignees, selectedPhase, expandedGroups, teamMembers, darkMode]);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTask = (taskId) => {
    setTasks(prev => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        status: prev[taskId].status === 'completed' ? 'todo' : 'completed'
      }
    }));
  };

  const toggleGroup = (groupName) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  const getKnowledgeAreas = () => {
    const areas = new Set();
    if (selectedMethodology) {
      methodologies[selectedMethodology].phases.forEach(phase => {
        phase.processGroups.forEach(group => {
          group.tasks.forEach(task => {
            areas.add(task.knowledgeArea);
          });
        });
      });
    }
    return Array.from(areas).sort();
  };

  // Document Templates
  const documentTemplates = {
    'Project Charter': {
      description: 'Formal document that authorizes the project',
      sections: ['Project Purpose', 'Objectives', 'Success Criteria', 'High-Level Requirements', 'Assumptions & Constraints', 'Budget & Timeline']
    },
    'Business Case': {
      description: 'Justification for initiating the project',
      sections: ['Executive Summary', 'Problem Statement', 'Proposed Solution', 'Cost-Benefit Analysis', 'Risk Assessment', 'Recommendation']
    },
    'WBS': {
      description: 'Work Breakdown Structure template',
      sections: ['Level 1 - Project', 'Level 2 - Major Deliverables', 'Level 3 - Work Packages', 'Level 4 - Activities', 'WBS Dictionary']
    },
    'Risk Register': {
      description: 'Document to track and manage project risks',
      sections: ['Risk ID', 'Risk Description', 'Probability', 'Impact', 'Risk Score', 'Mitigation Strategy', 'Owner', 'Status']
    },
    'Stakeholder Register': {
      description: 'List of all project stakeholders',
      sections: ['Name', 'Role', 'Contact Information', 'Requirements', 'Expectations', 'Influence Level', 'Engagement Strategy']
    },
    'Communications Plan': {
      description: 'How project information will be communicated',
      sections: ['Stakeholder', 'Information Needs', 'Frequency', 'Method', 'Owner', 'Distribution List']
    }
  };

  const generateTemplate = (templateName) => {
    const template = documentTemplates[templateName];
    if (!template) return '';

    let content = `# ${templateName}\n\n`;
    content += `**Description:** ${template.description}\n\n`;
    content += `**Project:** [Your Project Name]\n`;
    content += `**Date:** ${new Date().toLocaleDateString()}\n`;
    content += `**Prepared by:** [Your Name]\n\n`;

    template.sections.forEach((section, index) => {
      content += `## ${index + 1}. ${section}\n\n`;
      content += `[Add content for ${section}]\n\n`;
    });

    content += `---\n`;
    content += `**Document Control**\n`;
    content += `- Version: 1.0\n`;
    content += `- Last Updated: ${new Date().toLocaleDateString()}\n`;
    content += `- Next Review: [Date]\n`;

    return content;
  };

  const downloadTemplate = (templateName) => {
    const content = generateTemplate(templateName);
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${templateName.replace(/\s+/g, '_')}_Template.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportReport = (format) => {
    const stats = getProgressStats();
    const currentDate = new Date().toLocaleDateString();
    
    let content = '';
    
    if (format === 'summary') {
      content = `# Project Status Report\n\n`;
      content += `**Date:** ${currentDate}\n`;
      content += `**Methodology:** ${methodology.name}\n`;
      content += `**Overall Progress:** ${stats.percentage}% (${stats.completed}/${stats.total} tasks)\n\n`;
      
      methodology.phases.forEach(phase => {
        const phaseTasks = phase.processGroups.flatMap(g => g.tasks);
        const phaseCompleted = phaseTasks.filter(t => tasks[t.id]?.status === 'completed').length;
        const phaseTotal = phaseTasks.length;
        const phasePercentage = Math.round((phaseCompleted / phaseTotal) * 100);
        
        content += `## ${phase.name}\n`;
        content += `**Progress:** ${phasePercentage}% (${phaseCompleted}/${phaseTotal} tasks)\n\n`;
        
        phase.processGroups.forEach(group => {
          const groupCompleted = group.tasks.filter(t => tasks[t.id]?.status === 'completed').length;
          content += `- **${group.name}:** ${groupCompleted}/${group.tasks.length} tasks completed\n`;
        });
        content += '\n';
      });
    } else if (format === 'detailed') {
      content = `# Detailed Project Report\n\n`;
      content += `**Date:** ${currentDate}\n`;
      content += `**Methodology:** ${methodology.name}\n`;
      content += `**Overall Progress:** ${stats.percentage}%\n\n`;
      
      methodology.phases.forEach(phase => {
        content += `## ${phase.name}\n\n`;
        phase.processGroups.forEach(group => {
          content += `### ${group.name}\n\n`;
          group.tasks.forEach(task => {
            const taskData = tasks[task.id] || task;
            const status = taskData.status === 'completed' ? '✅' : '⏳';
            const assignee = taskAssignees[task.id] ? teamMembers.find(m => m.id === taskAssignees[task.id])?.name : 'Unassigned';
            const dueDate = taskDueDates[task.id] || 'No due date';
            const notes = taskNotes[task.id] || 'No notes';
            
            content += `#### ${status} ${task.name}\n`;
            content += `- **Knowledge Area:** ${task.knowledgeArea}\n`;
            content += `- **Assigned to:** ${assignee}\n`;
            content += `- **Due Date:** ${dueDate}\n`;
            content += `- **Notes:** ${notes}\n`;
            if (task.guidance) {
              content += `- **Guidance:** ${task.guidance}\n`;
            }
            content += '\n';
          });
        });
      });
    } else if (format === 'tasks') {
      const incompleteTasks = Object.values(tasks).filter(task => task.status !== 'completed');
      content = `# Outstanding Tasks Report\n\n`;
      content += `**Date:** ${currentDate}\n`;
      content += `**Outstanding Tasks:** ${incompleteTasks.length}\n\n`;
      
      const tasksByAssignee = {};
      incompleteTasks.forEach(task => {
        const assigneeId = taskAssignees[task.id];
        const assigneeName = assigneeId ? teamMembers.find(m => m.id === assigneeId)?.name : 'Unassigned';
        if (!tasksByAssignee[assigneeName]) {
          tasksByAssignee[assigneeName] = [];
        }
        tasksByAssignee[assigneeName].push(task);
      });
      
      Object.entries(tasksByAssignee).forEach(([assignee, assigneeTasks]) => {
        content += `## ${assignee} (${assigneeTasks.length} tasks)\n\n`;
        assigneeTasks.forEach(task => {
          const dueDate = taskDueDates[task.id] || 'No due date';
          content += `- **${task.name}** (${task.knowledgeArea}) - Due: ${dueDate}\n`;
        });
        content += '\n';
      });
    }
    
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Project_${format}_Report_${currentDate.replace(/\//g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportProjectData = () => {
    const dataToExport = {
      selectedMethodology,
      currentStep,
      tasks,
      taskNotes,
      taskDueDates,
      taskAssignees,
      selectedPhase,
      expandedGroups,
      teamMembers,
      exportedAt: new Date().toISOString(),
      version: '2.0.0'
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    a.download = `ProjectGuide_Backup_${timestamp}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importProjectData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);

        // Restore all state from imported data
        if (importedData.selectedMethodology) setSelectedMethodology(importedData.selectedMethodology);
        if (importedData.currentStep) setCurrentStep(importedData.currentStep);
        if (importedData.tasks) setTasks(importedData.tasks);
        if (importedData.taskNotes) setTaskNotes(importedData.taskNotes);
        if (importedData.taskDueDates) setTaskDueDates(importedData.taskDueDates);
        if (importedData.taskAssignees) setTaskAssignees(importedData.taskAssignees);
        if (importedData.selectedPhase) setSelectedPhase(importedData.selectedPhase);
        if (importedData.expandedGroups) setExpandedGroups(importedData.expandedGroups);
        if (importedData.teamMembers) setTeamMembers(importedData.teamMembers);

        alert('✅ Project data imported successfully!');
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('Error importing data:', error);
        }
        alert('❌ Error importing data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const clearAllData = () => {
    if (window.confirm('⚠️ Are you sure you want to clear all project data? This action cannot be undone.')) {
      // Clear localStorage
      localStorage.removeItem('projectGuideData');

      // Reset all state
      setSelectedMethodology(null);
      setCurrentStep('landing');
      setTasks({});
      setTaskNotes({});
      setTaskDueDates({});
      setTaskAssignees({});
      setSelectedPhase(null);
      setExpandedGroups({});
      setViewMode('board');
      setSearchTerm('');
      setFilterKnowledgeArea('all');

      alert('✅ All project data has been cleared.');
    }
  };

  const addTeamMember = () => {
    if (!newMemberName.trim() || !newMemberRole.trim() || !newMemberEmail.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const newMember = {
      id: Math.max(...teamMembers.map(m => m.id), 0) + 1,
      name: newMemberName.trim(),
      role: newMemberRole.trim(),
      email: newMemberEmail.trim()
    };

    setTeamMembers(prev => [...prev, newMember]);
    setNewMemberName('');
    setNewMemberRole('');
    setNewMemberEmail('');
    setShowAddMember(false);
  };

  const removeTeamMember = (memberId) => {
    const member = teamMembers.find(m => m.id === memberId);
    const assignedCount = Object.values(taskAssignees).filter(id => id === memberId).length;

    if (assignedCount > 0) {
      if (!window.confirm(`${member.name} has ${assignedCount} assigned task(s). Remove anyway? Tasks will be unassigned.`)) {
        return;
      }
      // Unassign all tasks
      setTaskAssignees(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(taskId => {
          if (updated[taskId] === memberId) {
            delete updated[taskId];
          }
        });
        return updated;
      });
    } else {
      if (!window.confirm(`Remove ${member.name} from the team?`)) {
        return;
      }
    }

    setTeamMembers(prev => prev.filter(m => m.id !== memberId));
  };

  // Landing Page
  if (currentStep === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Navigation */}
        <nav className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ProjectGuide
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <Sun className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                  ) : (
                    <Moon className="h-5 w-5 text-gray-700" />
                  )}
                </button>
                <button
                  onClick={() => setCurrentStep('methodology')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Start Your Project
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Project Management
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                Made Simple
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              The only project management platform that guides you through every step of your project journey. 
              Whether you're a seasoned PM or just starting out, we'll help you deliver successful projects using 
              proven methodologies and best practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setCurrentStep('methodology')}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 text-lg font-medium shadow-lg"
              >
                Start Your First Project
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all text-lg font-medium">
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Problem/Solution Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Tired of Projects Going Off Track?
                </h2>
                <div className="space-y-4 text-gray-600">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3">Projects start without clear methodology or structure</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3">Teams miss critical deliverables and milestones</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3">New project managers struggle without guidance</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3">Important documents and templates are forgotten</p>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  We Guide You to Success
                </h2>
                <div className="space-y-4 text-gray-600">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3">Choose the right methodology: Traditional, Hybrid, or Agile</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3">Follow step-by-step checklists for every phase</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3">Get contextual guidance and best practices built-in</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3">Access professional document templates instantly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From project initiation to closure, we provide the tools, templates, and guidance 
                to ensure your projects are delivered on time and within scope.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Methodology Guidance</h3>
                <p className="text-gray-600">Choose from Traditional, Hybrid, or Agile approaches with built-in best practices and contextual help.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckSquare className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Checklists</h3>
                <p className="text-gray-600">Never miss a critical deliverable with comprehensive task lists organized by process groups and phases.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Document Templates</h3>
                <p className="text-gray-600">Professional templates for project charters, business cases, risk registers, and more.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Team Management</h3>
                <p className="text-gray-600">Assign tasks, track workloads, and manage resources with intuitive team collaboration tools.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Progress Tracking</h3>
                <p className="text-gray-600">Visual progress indicators and comprehensive reporting to keep stakeholders informed.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Views</h3>
                <p className="text-gray-600">Switch between board and timeline views to visualize your project in the way that works best for you.</p>
              </div>
            </div>
          </div>
        </div>

        {/* For New PMs Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">
                    Perfect for New Project Managers
                  </h2>
                  <p className="text-lg mb-6 text-blue-100">
                    Starting a new role? Our platform includes a comprehensive orientation phase that guides you through:
                  </p>
                  <ul className="space-y-2 text-blue-100">
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 mr-3 text-green-300" />
                      Understanding organizational processes and assets (OPAs)
                    </li>
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 mr-3 text-green-300" />
                      Accessing project management information systems (PMIS)
                    </li>
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 mr-3 text-green-300" />
                      Conducting internal environmental assessments
                    </li>
                    <li className="flex items-center">
                      <CheckSquare className="h-5 w-5 mr-3 text-green-300" />
                      Identifying key stakeholders and decision makers
                    </li>
                  </ul>
                </div>
                <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🎯</div>
                    <h3 className="text-xl font-semibold mb-2">94 Comprehensive Tasks</h3>
                    <p className="text-blue-100 mb-4">
                      From organizational orientation to project closure, every critical step is covered.
                    </p>
                    <button 
                      onClick={() => setCurrentStep('methodology')}
                      className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                    >
                      Start Learning Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Deliver Successful Projects?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of project managers who trust ProjectGuide to deliver projects on time, 
              within scope, and with confidence.
            </p>
            <button 
              onClick={() => setCurrentStep('methodology')}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 text-lg font-medium shadow-lg"
            >
              Start Your Project Today - It's Free
            </button>
            <p className="text-gray-400 mt-4 text-sm">
              No signup required • Works in any browser • Professional templates included
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Methodology Selection Screen
  if (currentStep === 'methodology') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Delivery Approach</h1>
            <p className="text-lg text-gray-600 mb-6">Select the methodology that best fits your project needs</p>
            <button
              onClick={() => setCurrentStep('landing')}
              className="text-sm text-gray-600 hover:text-blue-600 mb-8 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              ← Back to Home
            </button>
          </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(methodologies).map(([key, method]) => (
              <div
                key={key}
                onClick={() => {
                  setSelectedMethodology(key);
                  setCurrentStep('dashboard');
                }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 group"
              >
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">{method.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{method.name}</h3>
                <p className="text-gray-600 mb-6">{method.description}</p>
                <div className={`inline-flex items-center text-${method.color}-600 font-semibold group-hover:text-${method.color}-700`}>
                  Select <ChevronRight className="ml-2 h-5 w-5" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Need help choosing?</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
              <div className="bg-blue-50 rounded-lg p-4">
                <span className="font-semibold">Choose Traditional if:</span>
                <ul className="mt-2 text-left space-y-1">
                  <li>• Requirements are well-defined</li>
                  <li>• Changes are minimal</li>
                  <li>• Regulatory compliance needed</li>
                </ul>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <span className="font-semibold">Choose Hybrid if:</span>
                <ul className="mt-2 text-left space-y-1">
                  <li>• Mix of stable & changing elements</li>
                  <li>• Multiple delivery approaches</li>
                  <li>• Transitioning to Agile</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <span className="font-semibold">Choose Agile if:</span>
                <ul className="mt-2 text-left space-y-1">
                  <li>• Requirements evolve frequently</li>
                  <li>• Need rapid iterations</li>
                  <li>• Customer collaboration focus</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard
  const methodology = methodologies[selectedMethodology];
  const currentPhaseData = selectedPhase ? methodology.phases.find(p => p.id === selectedPhase) : methodology.phases[0];

  const getProgressStats = () => {
    const allTasks = Object.values(tasks);
    const completed = allTasks.filter(t => t.status === 'completed').length;
    const total = allTasks.length;
    return { completed, total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
  };

  const stats = getProgressStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{methodology.icon}</div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{methodology.name}</h1>
                  <p className="text-sm text-gray-500">Project Management Platform</p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (window.confirm('Return to home? Your progress will be saved automatically.')) {
                    setCurrentStep('landing');
                  }
                }}
                className="text-sm text-gray-600 hover:text-blue-600 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                ← Back to Home
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2">
                <button
                  onClick={() => setViewMode('board')}
                  className={`px-3 py-1 rounded ${viewMode === 'board' ? 'bg-white shadow-sm' : ''}`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`px-3 py-1 rounded ${viewMode === 'timeline' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Calendar className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => setShowDashboard(true)}
                className="p-2 hover:bg-gray-100 rounded-lg"
                title="View Dashboard"
              >
                <BarChart3 className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={() => setShowExportModal(true)}
                className="p-2 hover:bg-gray-100 rounded-lg"
                title="Settings & Export"
              >
                <Settings className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <div className="mb-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Overall Progress</span>
                <span className="text-lg font-bold text-blue-700">{stats.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all"
                  style={{ width: `${stats.percentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-2">
                {stats.completed} of {stats.total} tasks completed
              </p>
            </div>

            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center text-yellow-800 mb-2">
                <AlertCircle className="h-4 w-4 mr-2" />
                <span className="font-semibold text-sm">Quick Start Tip</span>
              </div>
              <p className="text-xs text-yellow-700">
                New to the organization? Start with the PM Orientation phase to understand your environment before diving into project work.
              </p>
            </div>

            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Project Phases</h3>
            <nav className="space-y-1">
              {methodology.phases.map((phase) => {
                const phaseTasks = phase.processGroups.flatMap(g => g.tasks);
                const phaseCompleted = phaseTasks.filter(t => tasks[t.id]?.status === 'completed').length;
                const phaseTotal = phaseTasks.length;
                const isCurrentPhase = selectedPhase === phase.id || (!selectedPhase && phase.id === methodology.phases[0].id);
                
                return (
                  <div key={phase.id}>
                    <button
                      onClick={() => setSelectedPhase(phase.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        isCurrentPhase
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{phase.name}</span>
                        <span className="text-xs text-gray-500">{phaseCompleted}/{phaseTotal}</span>
                      </div>
                      <div className="mt-1 w-full bg-gray-200 rounded-full h-1">
                        <div 
                          className={`h-1 rounded-full transition-all ${isCurrentPhase ? 'bg-blue-600' : 'bg-gray-400'}`}
                          style={{ width: `${(phaseCompleted / phaseTotal) * 100}%` }}
                        />
                      </div>
                    </button>
                  </div>
                );
              })}
            </nav>

            {selectedMethodology === 'traditional' && (
              <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-semibold text-sm text-purple-900 mb-2">Knowledge Areas</h4>
                <div className="flex flex-wrap gap-1">
                  {getKnowledgeAreas().slice(0, 6).map(area => (
                    <span key={area} className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                      {area}
                    </span>
                  ))}
                  {getKnowledgeAreas().length > 6 && (
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                      +{getKnowledgeAreas().length - 6} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Phase Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{currentPhaseData.name}</h2>
                  <p className="text-gray-600">Complete the following tasks and deliverables</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setShowGuidance(!showGuidance)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    {showGuidance ? 'Hide' : 'Show'} Guidance
                  </button>
                  <button 
                    onClick={() => setShowTemplateModal(true)}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Templates
                  </button>
                  <button 
                    onClick={() => setShowResourceModal(true)}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Team
                  </button>
                  <button 
                    onClick={() => setShowExportModal(true)}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Export
                  </button>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setQuickFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    quickFilter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Tasks
                </button>
                <button
                  onClick={() => setQuickFilter('my-tasks')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    quickFilter === 'my-tasks'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  My Tasks
                </button>
                <button
                  onClick={() => setQuickFilter('due-soon')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    quickFilter === 'due-soon'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Due This Week
                </button>
                <button
                  onClick={() => setQuickFilter('overdue')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    quickFilter === 'overdue'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Overdue
                </button>
                <button
                  onClick={() => setQuickFilter('no-date')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    quickFilter === 'no-date'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  No Due Date
                </button>
              </div>

              {/* Search and Filters */}
              <div className="flex space-x-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={filterKnowledgeArea}
                  onChange={(e) => setFilterKnowledgeArea(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Knowledge Areas</option>
                  {getKnowledgeAreas().map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Board View */}
            {viewMode === 'board' && (
              <div className="space-y-6">
                {currentPhaseData.processGroups.map((group, idx) => {
                  const filteredTasks = group.tasks.filter(task => {
                    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchesKA = filterKnowledgeArea === 'all' || task.knowledgeArea === filterKnowledgeArea;

                    // Quick filter logic
                    let matchesQuickFilter = true;
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const oneWeek = new Date(today);
                    oneWeek.setDate(oneWeek.getDate() + 7);

                    if (quickFilter === 'my-tasks') {
                      // For demo, we'll use first team member. In real app, use logged-in user
                      matchesQuickFilter = taskAssignees[task.id] === teamMembers[0].id;
                    } else if (quickFilter === 'due-soon') {
                      const dueDate = taskDueDates[task.id] ? new Date(taskDueDates[task.id]) : null;
                      matchesQuickFilter = dueDate && dueDate >= today && dueDate <= oneWeek;
                    } else if (quickFilter === 'overdue') {
                      const dueDate = taskDueDates[task.id] ? new Date(taskDueDates[task.id]) : null;
                      matchesQuickFilter = dueDate && dueDate < today && tasks[task.id]?.status !== 'completed';
                    } else if (quickFilter === 'no-date') {
                      matchesQuickFilter = !taskDueDates[task.id];
                    }

                    return matchesSearch && matchesKA && matchesQuickFilter;
                  });

                  if (filteredTasks.length === 0 && (searchTerm || filterKnowledgeArea !== 'all' || quickFilter !== 'all')) return null;
                  
                  const isExpanded = expandedGroups[group.name] !== false;
                  const groupCompleted = group.tasks.filter(t => tasks[t.id]?.status === 'completed').length;
                  
                  return (
                    <div key={idx} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                      <button
                        onClick={() => toggleGroup(group.name)}
                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          {isExpanded ? <ChevronDown className="h-5 w-5 text-gray-600" /> : <ChevronRight className="h-5 w-5 text-gray-600" />}
                          <h3 className="font-semibold text-gray-900 text-lg">{group.name}</h3>
                          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            {groupCompleted}/{group.tasks.length}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-32 bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-green-600 h-2.5 rounded-full transition-all"
                              style={{ width: `${(groupCompleted / group.tasks.length) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {Math.round((groupCompleted / group.tasks.length) * 100)}%
                          </span>
                        </div>
                      </button>
                      
                      {isExpanded && (
                        <div className="px-6 pb-4 space-y-2">
                          {filteredTasks.map((task) => {
                            const taskData = tasks[task.id] || task;
                            return (
                              <div
                                key={task.id}
                                className="group/task"
                              >
                                <div
                                  onClick={() => toggleTask(task.id)}
                                  className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all"
                                >
                                  <div className={`w-6 h-6 rounded-md border-2 mr-4 flex items-center justify-center flex-shrink-0 transition-colors ${
                                    taskData.status === 'completed' 
                                      ? 'bg-green-500 border-green-500' 
                                      : 'border-gray-300 group-hover/task:border-blue-500'
                                  }`}>
                                    {taskData.status === 'completed' && (
                                      <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M5 13l4 4L19 7"></path>
                                      </svg>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className={`font-medium ${taskData.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                                      {task.name}
                                    </p>
                                    <div className="flex items-center mt-1 space-x-2">
                                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                                        {task.knowledgeArea}
                                      </span>
                                      {taskAssignees[task.id] && (
                                        <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                                          {teamMembers.find(m => m.id === taskAssignees[task.id])?.name}
                                        </span>
                                      )}
                                      {taskDueDates[task.id] && (
                                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                                          Due: {new Date(taskDueDates[task.id]).toLocaleDateString()}
                                        </span>
                                      )}
                                      {taskNotes[task.id] && (
                                        <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                                          Has notes
                                        </span>
                                      )}
                                      {showGuidance && task.guidance && (
                                        <button 
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedTask(task);
                                          }}
                                          className="text-xs text-gray-500 hover:text-blue-600 flex items-center"
                                        >
                                          <AlertCircle className="h-3 w-3 mr-1" />
                                          Guidance
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedTask(task);
                                        setShowNotesModal(true);
                                      }}
                                      className="p-2 hover:bg-blue-100 rounded-lg opacity-0 group-hover/task:opacity-100 transition-all"
                                      title="Add notes"
                                    >
                                      <FileText className="h-4 w-4 text-blue-600" />
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setDatePickerTask(task);
                                        setSelectedDate(taskDueDates[task.id] || '');
                                        setShowDatePicker(true);
                                      }}
                                      className="p-2 hover:bg-green-100 rounded-lg opacity-0 group-hover/task:opacity-100 transition-all"
                                      title="Set due date"
                                    >
                                      <Clock className="h-4 w-4 text-green-600" />
                                    </button>
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedTask(task);
                                        setShowResourceModal(true);
                                      }}
                                      className="p-2 hover:bg-purple-100 rounded-lg opacity-0 group-hover/task:opacity-100 transition-all"
                                      title="Assign resource"
                                    >
                                      <Users className="h-4 w-4 text-purple-600" />
                                    </button>
                                  </div>
                                </div>
                                {showGuidance && task.guidance && (
                                  <div className="ml-14 mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700">
                                    <div className="flex items-start">
                                      <AlertCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                      <div>
                                        <span className="font-medium text-blue-900">Guidance: </span>
                                        {task.guidance}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Calendar View */}
            {viewMode === 'timeline' && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {calendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        const newDate = new Date(calendarDate);
                        newDate.setMonth(newDate.getMonth() - 1);
                        setCalendarDate(newDate);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => setCalendarDate(new Date())}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Today
                    </button>
                    <button
                      onClick={() => {
                        const newDate = new Date(calendarDate);
                        newDate.setMonth(newDate.getMonth() + 1);
                        setCalendarDate(newDate);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                  {/* Day Headers */}
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="bg-gray-50 p-3 text-center text-sm font-semibold text-gray-700">
                      {day}
                    </div>
                  ))}

                  {/* Calendar Days */}
                  {(() => {
                    const year = calendarDate.getFullYear();
                    const month = calendarDate.getMonth();
                    const firstDay = new Date(year, month, 1).getDay();
                    const daysInMonth = new Date(year, month + 1, 0).getDate();
                    const today = new Date();
                    const isToday = (day) => {
                      return today.getDate() === day &&
                             today.getMonth() === month &&
                             today.getFullYear() === year;
                    };

                    const days = [];

                    // Empty cells before month starts
                    for (let i = 0; i < firstDay; i++) {
                      days.push(<div key={`empty-${i}`} className="bg-gray-50 p-3 min-h-[100px]" />);
                    }

                    // Days of the month
                    for (let day = 1; day <= daysInMonth; day++) {
                      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                      const tasksForDay = Object.entries(tasks).filter(([id, task]) => {
                        const dueDate = taskDueDates[id];
                        return dueDate && dueDate.startsWith(dateStr);
                      });

                      days.push(
                        <div
                          key={day}
                          onClick={() => {
                            if (tasksForDay.length > 0) {
                              setSelectedCalendarDate(dateStr);
                            }
                          }}
                          className={`bg-white p-3 min-h-[100px] ${
                            isToday(day) ? 'bg-blue-50 ring-2 ring-blue-500 ring-inset' : ''
                          } ${tasksForDay.length > 0 ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                        >
                          <div className={`text-sm font-medium mb-2 ${
                            isToday(day) ? 'text-blue-700' : 'text-gray-900'
                          }`}>
                            {day}
                          </div>
                          <div className="space-y-1">
                            {tasksForDay.slice(0, 2).map(([id, task]) => {
                              const assignee = taskAssignees[id] ? teamMembers.find(m => m.id === taskAssignees[id]) : null;
                              return (
                                <div
                                  key={id}
                                  className={`text-xs p-1 rounded truncate ${
                                    task.status === 'completed'
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-blue-100 text-blue-800'
                                  }`}
                                  title={task.name}
                                >
                                  {task.name}
                                </div>
                              );
                            })}
                            {tasksForDay.length > 2 && (
                              <div className="text-xs text-gray-500 font-medium">
                                +{tasksForDay.length - 2} more
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }

                    return days;
                  })()}
                </div>

                {/* Legend */}
                <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-100 rounded"></div>
                    <span className="text-gray-600">Pending Tasks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-100 rounded"></div>
                    <span className="text-gray-600">Completed Tasks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-50 ring-2 ring-blue-500 rounded"></div>
                    <span className="text-gray-600">Today</span>
                  </div>
                </div>
              </div>
            )}

            {/* Task Details for Selected Date */}
            {selectedCalendarDate && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
                  <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Tasks for {new Date(selectedCalendarDate + 'T00:00:00').toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedCalendarDate(null)}
                      className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="space-y-3">
                      {Object.entries(tasks)
                        .filter(([id, task]) => {
                          const dueDate = taskDueDates[id];
                          return dueDate && dueDate.startsWith(selectedCalendarDate);
                        })
                        .map(([id, task]) => {
                          const assignee = taskAssignees[id] ? teamMembers.find(m => m.id === taskAssignees[id]) : null;
                          return (
                            <div
                              key={id}
                              className={`p-4 border rounded-lg ${
                                task.status === 'completed'
                                  ? 'bg-green-50 border-green-200'
                                  : 'bg-white border-gray-200'
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <input
                                      type="checkbox"
                                      checked={task.status === 'completed'}
                                      onChange={() => toggleTask(id)}
                                      className="h-5 w-5 rounded border-gray-300"
                                    />
                                    <h4 className={`font-medium ${
                                      task.status === 'completed'
                                        ? 'text-gray-500 line-through'
                                        : 'text-gray-900'
                                    }`}>
                                      {task.name}
                                    </h4>
                                  </div>
                                  <div className="ml-7 space-y-1">
                                    <p className="text-sm text-gray-600">
                                      <span className="font-medium">Knowledge Area:</span> {task.knowledgeArea}
                                    </p>
                                    {assignee && (
                                      <p className="text-sm text-gray-600">
                                        <span className="font-medium">Assigned to:</span> {assignee.name}
                                      </p>
                                    )}
                                    {taskNotes[id] && (
                                      <p className="text-sm text-gray-600">
                                        <span className="font-medium">Notes:</span> {taskNotes[id]}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className={`px-2 py-1 rounded text-xs font-medium ${
                                  task.status === 'completed'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {task.status === 'completed' ? 'Completed' : 'Pending'}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Date Picker Modal */}
        {showDatePicker && datePickerTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Set Due Date</h3>
                <button
                  onClick={() => {
                    setShowDatePicker(false);
                    setDatePickerTask(null);
                    setSelectedDate('');
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                <strong>{datePickerTask.name}</strong>
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      if (selectedDate) {
                        setTaskDueDates(prev => ({ ...prev, [datePickerTask.id]: selectedDate }));
                      }
                      setShowDatePicker(false);
                      setDatePickerTask(null);
                      setSelectedDate('');
                    }}
                    disabled={!selectedDate}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Set Date
                  </button>
                  {taskDueDates[datePickerTask.id] && (
                    <button
                      onClick={() => {
                        setTaskDueDates(prev => {
                          const updated = { ...prev };
                          delete updated[datePickerTask.id];
                          return updated;
                        });
                        setShowDatePicker(false);
                        setDatePickerTask(null);
                        setSelectedDate('');
                      }}
                      className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template Modal */}
        {showTemplateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl m-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Document Templates</h3>
                <button onClick={() => setShowTemplateModal(false)} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(documentTemplates).map(([templateName, template]) => (
                  <div key={templateName} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <h4 className="font-semibold text-gray-900 mb-2">{templateName}</h4>
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    <div className="text-xs text-gray-500 mb-3">
                      <strong>Sections:</strong> {template.sections.slice(0, 3).join(', ')}
                      {template.sections.length > 3 && ` +${template.sections.length - 3} more`}
                    </div>
                    <button
                      onClick={() => downloadTemplate(templateName)}
                      className="w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Download Template
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Notes Modal */}
        {showNotesModal && selectedTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md m-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Task Notes</h3>
                <button onClick={() => setShowNotesModal(false)} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-3"><strong>{selectedTask.name}</strong></p>
              <textarea
                value={taskNotes[selectedTask.id] || ''}
                onChange={(e) => setTaskNotes(prev => ({...prev, [selectedTask.id]: e.target.value}))}
                placeholder="Add notes, observations, or reminders for this task..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => {
                    setShowNotesModal(false);
                    setSelectedTask(null);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Notes
                </button>
                <button
                  onClick={() => {
                    setTaskNotes(prev => {
                      const updated = {...prev};
                      delete updated[selectedTask.id];
                      return updated;
                    });
                    setShowNotesModal(false);
                    setSelectedTask(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Resource Assignment Modal */}
        {showResourceModal && (selectedTask || !selectedTask) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md m-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {selectedTask ? 'Assign Task' : 'Team Members'}
                </h3>
                <button onClick={() => {setShowResourceModal(false); setSelectedTask(null);}} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {selectedTask && (
                <p className="text-sm text-gray-600 mb-3"><strong>{selectedTask.name}</strong></p>
              )}

              {!selectedTask && !showAddMember && (
                <button
                  onClick={() => setShowAddMember(true)}
                  className="w-full mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Add Team Member
                </button>
              )}

              {!selectedTask && showAddMember && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg space-y-3">
                  <h4 className="font-semibold text-gray-900">New Team Member</h4>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Role (e.g., Developer, Designer)"
                    value={newMemberRole}
                    onChange={(e) => setNewMemberRole(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={addTeamMember}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Add Member
                    </button>
                    <button
                      onClick={() => {
                        setShowAddMember(false);
                        setNewMemberName('');
                        setNewMemberRole('');
                        setNewMemberEmail('');
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {teamMembers.map(member => (
                  <div
                    key={member.id}
                    className={`p-3 border border-gray-200 rounded-lg transition-colors ${
                      selectedTask ? 'cursor-pointer hover:bg-gray-50' : ''
                    } ${
                      selectedTask && taskAssignees[selectedTask.id] === member.id ? 'bg-blue-50 border-blue-300' : ''
                    }`}
                    onClick={() => {
                      if (selectedTask) {
                        setTaskAssignees(prev => ({...prev, [selectedTask.id]: member.id}));
                        setShowResourceModal(false);
                        setSelectedTask(null);
                      }
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{member.name}</h4>
                        <p className="text-sm text-gray-600">{member.role}</p>
                        <p className="text-xs text-gray-500">{member.email}</p>
                        {!selectedTask && (
                          <div className="mt-2 text-xs text-gray-500">
                            Tasks assigned: {Object.values(taskAssignees).filter(id => id === member.id).length}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {selectedTask && taskAssignees[selectedTask.id] === member.id && (
                          <CheckSquare className="h-5 w-5 text-blue-600" />
                        )}
                        {!selectedTask && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeTeamMember(member.id);
                            }}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Remove team member"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedTask && taskAssignees[selectedTask.id] && (
                <button
                  onClick={() => {
                    setTaskAssignees(prev => {
                      const updated = {...prev};
                      delete updated[selectedTask.id];
                      return updated;
                    });
                    setShowResourceModal(false);
                    setSelectedTask(null);
                  }}
                  className="mt-4 w-full px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Unassign Task
                </button>
              )}
            </div>
          </div>
        )}

        {/* Progress Dashboard Modal */}
        {showDashboard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Project Dashboard</h2>
                  <p className="text-sm text-gray-600 mt-1">{methodology.name}</p>
                </div>
                <button
                  onClick={() => setShowDashboard(false)}
                  className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Overall Progress Card */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Overall Progress</h3>
                      <p className="text-blue-100 text-sm">Total project completion</p>
                    </div>
                    <div className="text-4xl font-bold">{stats.percentage}%</div>
                  </div>
                  <div className="w-full bg-white bg-opacity-30 rounded-full h-4">
                    <div
                      className="bg-white h-4 rounded-full transition-all"
                      style={{ width: `${stats.percentage}%` }}
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">{stats.completed}</div>
                      <div className="text-sm text-blue-100">Completed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stats.inProgress}</div>
                      <div className="text-sm text-blue-100">In Progress</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stats.total - stats.completed - stats.inProgress}</div>
                      <div className="text-sm text-blue-100">To Do</div>
                    </div>
                  </div>
                </div>

                {/* Progress by Phase */}
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress by Phase</h3>
                  <div className="space-y-4">
                    {methodology.phases.map(phase => {
                      const phaseTasks = phase.processGroups.flatMap(g => g.tasks);
                      const phaseCompleted = phaseTasks.filter(t => tasks[t.id]?.status === 'completed').length;
                      const phaseTotal = phaseTasks.length;
                      const phasePercentage = phaseTotal > 0 ? Math.round((phaseCompleted / phaseTotal) * 100) : 0;

                      return (
                        <div key={phase.id}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">{phase.name}</span>
                            <span className="text-sm font-semibold text-gray-900">{phasePercentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all"
                              style={{ width: `${phasePercentage}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{phaseCompleted} of {phaseTotal} tasks</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Knowledge Areas Breakdown */}
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tasks by Knowledge Area</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {(() => {
                      const knowledgeAreas = {};
                      methodology.phases.forEach(phase => {
                        phase.processGroups.forEach(group => {
                          group.tasks.forEach(task => {
                            const ka = task.knowledgeArea || 'Other';
                            if (!knowledgeAreas[ka]) {
                              knowledgeAreas[ka] = { total: 0, completed: 0 };
                            }
                            knowledgeAreas[ka].total++;
                            if (tasks[task.id]?.status === 'completed') {
                              knowledgeAreas[ka].completed++;
                            }
                          });
                        });
                      });

                      return Object.entries(knowledgeAreas).map(([ka, data]) => {
                        const percentage = Math.round((data.completed / data.total) * 100);
                        return (
                          <div key={ka} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium text-gray-700">{ka}</span>
                              <span className="text-xs font-semibold text-gray-600">{percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className="bg-blue-500 h-1.5 rounded-full"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{data.completed}/{data.total}</p>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>

                {/* Team Workload */}
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Workload</h3>
                  <div className="space-y-3">
                    {teamMembers.map(member => {
                      const assignedTasks = Object.entries(tasks).filter(([id, _]) => taskAssignees[id] === member.id);
                      const completedTasks = assignedTasks.filter(([id, task]) => task.status === 'completed').length;
                      const totalAssigned = assignedTasks.length;

                      return (
                        <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{member.name}</div>
                              <div className="text-xs text-gray-500">{member.role}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">{totalAssigned} tasks</div>
                            <div className="text-xs text-gray-500">{completedTasks} completed</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Export/Settings Modal - Enhanced for Data Management */}
        {showExportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md m-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Project Settings</h3>
                <button onClick={() => setShowExportModal(false)} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Export Reports</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => {exportReport('summary'); setShowExportModal(false);}}
                      className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      <div className="font-medium text-gray-900 text-sm">Summary Report</div>
                      <div className="text-xs text-gray-600">High-level progress overview by phase</div>
                    </button>
                    
                    <button
                      onClick={() => {exportReport('detailed'); setShowExportModal(false);}}
                      className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      <div className="font-medium text-gray-900 text-sm">Detailed Report</div>
                      <div className="text-xs text-gray-600">Complete task list with assignments and notes</div>
                    </button>
                    
                    <button
                      onClick={() => {exportReport('tasks'); setShowExportModal(false);}}
                      className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      <div className="font-medium text-gray-900 text-sm">Outstanding Tasks</div>
                      <div className="text-xs text-gray-600">Tasks remaining, grouped by assignee</div>
                    </button>
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Data Management</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => {exportProjectData(); setShowExportModal(false);}}
                      className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
                    >
                      <div className="font-medium text-gray-900 text-sm">📥 Export Project Data</div>
                      <div className="text-xs text-gray-600">Download complete project backup (JSON)</div>
                    </button>
                    
                    <div className="relative">
                      <input
                        type="file"
                        accept=".json"
                        onChange={importProjectData}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors cursor-pointer">
                        <div className="font-medium text-gray-900 text-sm">📤 Import Project Data</div>
                        <div className="text-xs text-gray-600">Restore from backup file</div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {clearAllData(); setShowExportModal(false);}}
                      className="w-full p-3 text-left border border-red-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors"
                    >
                      <div className="font-medium text-red-700 text-sm">🗑️ Clear All Data</div>
                      <div className="text-xs text-red-600">Reset project and start over</div>
                    </button>
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div className="text-center text-xs text-gray-500">
                  <p>✅ Auto-save active - Your progress is automatically saved</p>
                  <p className="mt-1">All data is stored locally in your browser</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectManagementPlatform;
