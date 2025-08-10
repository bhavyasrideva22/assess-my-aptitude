export interface Question {
  id: string;
  type: 'likert' | 'multiple-choice' | 'scenario';
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory: string;
  question: string;
  options?: string[];
  scale?: {
    min: number;
    max: number;
    labels: string[];
  };
}

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  questions: Question[];
}

// Psychometric Questions (Big 5, Interest, Motivation)
const psychometricQuestions: Question[] = [
  {
    id: 'p1',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'conscientiousness',
    question: 'I prefer to work systematically and methodically through problems.',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    }
  },
  {
    id: 'p2',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'openness',
    question: 'I enjoy learning about new technologies and security concepts.',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    }
  },
  {
    id: 'p3',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    question: 'I find the idea of protecting systems from cyber threats exciting.',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    }
  },
  {
    id: 'p4',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'persistence',
    question: 'I can work on challenging problems for hours without getting frustrated.',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    }
  },
  {
    id: 'p5',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'analytical',
    question: 'I prefer analyzing details rather than focusing on big picture concepts.',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    }
  },
  {
    id: 'p6',
    type: 'multiple-choice',
    category: 'psychometric',
    subcategory: 'motivation',
    question: 'What motivates you most about a potential career in application security?',
    options: [
      'Making a meaningful impact by protecting users and data',
      'The intellectual challenge and problem-solving aspects',
      'Job security and career growth opportunities',
      'Working with cutting-edge technology',
      'The ethical responsibility of defending against threats'
    ]
  }
];

// Technical Questions (Programming, Security, Logic)
const technicalQuestions: Question[] = [
  {
    id: 't1',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'programming',
    question: 'Which of the following best describes SQL injection?',
    options: [
      'A technique to optimize database queries',
      'A method to inject malicious SQL code into application queries',
      'A way to connect multiple databases',
      'A database backup procedure'
    ]
  },
  {
    id: 't2',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'owasp',
    question: 'According to OWASP Top 10, which is the #1 web application security risk?',
    options: [
      'Cross-Site Scripting (XSS)',
      'Injection vulnerabilities',
      'Broken Authentication',
      'Security Misconfiguration'
    ]
  },
  {
    id: 't3',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'cryptography',
    question: 'What is the primary purpose of HTTPS?',
    options: [
      'To compress web content',
      'To encrypt data transmission between client and server',
      'To speed up website loading',
      'To store user preferences'
    ]
  },
  {
    id: 't4',
    type: 'scenario',
    category: 'technical',
    subcategory: 'logic',
    question: 'A user reports they can access another user\'s profile by changing the ID in the URL. What type of vulnerability is this?',
    options: [
      'Cross-Site Request Forgery (CSRF)',
      'Insecure Direct Object References (IDOR)',
      'Cross-Site Scripting (XSS)',
      'SQL Injection'
    ]
  },
  {
    id: 't5',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'programming',
    question: 'Which HTTP status code indicates a successful request?',
    options: [
      '200',
      '404',
      '500',
      '302'
    ]
  }
];

// WISCAR Framework Questions
const wiscarQuestions: Question[] = [
  {
    id: 'w1',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'will',
    question: 'I am willing to dedicate 6-12 months to intensive learning to become job-ready.',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    }
  },
  {
    id: 'w2',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'skill',
    question: 'Rate your current programming skills (any language).',
    scale: {
      min: 1,
      max: 5,
      labels: ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert']
    }
  },
  {
    id: 'w3',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'cognitive',
    question: 'I can effectively break down complex problems into smaller, manageable parts.',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    }
  },
  {
    id: 'w4',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'learning',
    question: 'I actively seek feedback and use it to improve my performance.',
    scale: {
      min: 1,
      max: 5,
      labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    }
  },
  {
    id: 'w5',
    type: 'multiple-choice',
    category: 'wiscar',
    subcategory: 'alignment',
    question: 'Which work environment appeals to you most?',
    options: [
      'Working independently on technical challenges',
      'Collaborating with teams to solve security issues',
      'Communicating security risks to business stakeholders',
      'Researching new threats and vulnerabilities',
      'Implementing and maintaining security tools'
    ]
  }
];

export const assessmentSections: AssessmentSection[] = [
  {
    id: 'psychometric',
    title: 'Personality & Interest Assessment',
    description: 'Evaluate your personality traits, interests, and motivation for application security.',
    estimatedTime: '5-7 minutes',
    questions: psychometricQuestions
  },
  {
    id: 'technical',
    title: 'Technical Aptitude',
    description: 'Test your current knowledge of programming, security concepts, and logical reasoning.',
    estimatedTime: '8-10 minutes',
    questions: technicalQuestions
  },
  {
    id: 'wiscar',
    title: 'Readiness & Alignment',
    description: 'Assess your will, skills, cognitive readiness, learning ability, and career alignment.',
    estimatedTime: '5-7 minutes',
    questions: wiscarQuestions
  }
];

export interface AssessmentResponse {
  questionId: string;
  answer: string | number;
  timestamp: Date;
}

export interface AssessmentResults {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    learning: number;
    alignment: number;
  };
  overallScore: number;
  recommendation: 'pursue' | 'maybe' | 'alternative';
  strengths: string[];
  improvements: string[];
  nextSteps: string[];
}