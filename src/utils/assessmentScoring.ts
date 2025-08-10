import { AssessmentResponse, AssessmentResults } from '@/data/assessmentData';

export const calculateAssessmentResults = (responses: AssessmentResponse[]): AssessmentResults => {
  // Separate responses by category
  const psychometricResponses = responses.filter(r => r.questionId.startsWith('p'));
  const technicalResponses = responses.filter(r => r.questionId.startsWith('t'));
  const wiscarResponses = responses.filter(r => r.questionId.startsWith('w'));

  // Calculate Psychometric Score (0-100)
  const psychometricScore = calculatePsychometricScore(psychometricResponses);

  // Calculate Technical Score (0-100)
  const technicalScore = calculateTechnicalScore(technicalResponses);

  // Calculate WISCAR Scores
  const wiscarScores = calculateWiscarScores(wiscarResponses);

  // Overall Score (weighted average)
  const overallScore = Math.round(
    (psychometricScore * 0.3) + 
    (technicalScore * 0.4) + 
    (Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6 * 0.3)
  );

  // Determine recommendation
  const recommendation = determineRecommendation(overallScore, psychometricScore, technicalScore, wiscarScores);

  // Generate insights
  const { strengths, improvements, nextSteps } = generateInsights(
    psychometricScore, 
    technicalScore, 
    wiscarScores, 
    recommendation
  );

  return {
    psychometricScore,
    technicalScore,
    wiscarScores,
    overallScore,
    recommendation,
    strengths,
    improvements,
    nextSteps
  };
};

const calculatePsychometricScore = (responses: AssessmentResponse[]): number => {
  if (responses.length === 0) return 0;

  let totalScore = 0;
  let maxPossibleScore = 0;

  responses.forEach(response => {
    if (typeof response.answer === 'number') {
      // Likert scale questions (1-5) - normalize to 0-100
      totalScore += ((response.answer - 1) / 4) * 100;
      maxPossibleScore += 100;
    } else {
      // Multiple choice - assign scores based on optimal answers
      const score = getMultipleChoiceScore(response.questionId, response.answer as string);
      totalScore += score;
      maxPossibleScore += 100;
    }
  });

  return Math.round(totalScore / maxPossibleScore * 100);
};

const calculateTechnicalScore = (responses: AssessmentResponse[]): number => {
  if (responses.length === 0) return 0;

  const correctAnswers: Record<string, string> = {
    't1': 'A method to inject malicious SQL code into application queries',
    't2': 'Injection vulnerabilities',
    't3': 'To encrypt data transmission between client and server',
    't4': 'Insecure Direct Object References (IDOR)',
    't5': '200'
  };

  let correctCount = 0;
  responses.forEach(response => {
    if (correctAnswers[response.questionId] === response.answer) {
      correctCount++;
    }
  });

  return Math.round((correctCount / responses.length) * 100);
};

const calculateWiscarScores = (responses: AssessmentResponse[]): AssessmentResults['wiscarScores'] => {
  const scores = {
    will: 0,
    interest: 0,
    skill: 0,
    cognitive: 0,
    learning: 0,
    alignment: 0
  };

  const wiscarMapping: Record<string, keyof typeof scores> = {
    'w1': 'will',
    'w2': 'skill',
    'w3': 'cognitive',
    'w4': 'learning',
    'w5': 'alignment'
  };

  responses.forEach(response => {
    const dimension = wiscarMapping[response.questionId];
    if (dimension) {
      if (typeof response.answer === 'number') {
        scores[dimension] = Math.round(((response.answer - 1) / 4) * 100);
      } else {
        scores[dimension] = getMultipleChoiceScore(response.questionId, response.answer as string);
      }
    }
  });

  // Calculate interest based on psychometric responses (cross-reference)
  scores.interest = Math.round((scores.will + scores.learning) / 2);

  return scores;
};

const getMultipleChoiceScore = (questionId: string, answer: string): number => {
  const scoringMap: Record<string, Record<string, number>> = {
    'p6': {
      'Making a meaningful impact by protecting users and data': 100,
      'The intellectual challenge and problem-solving aspects': 90,
      'The ethical responsibility of defending against threats': 85,
      'Working with cutting-edge technology': 75,
      'Job security and career growth opportunities': 60
    },
    'w5': {
      'Working independently on technical challenges': 85,
      'Collaborating with teams to solve security issues': 95,
      'Researching new threats and vulnerabilities': 90,
      'Implementing and maintaining security tools': 80,
      'Communicating security risks to business stakeholders': 70
    }
  };

  return scoringMap[questionId]?.[answer] || 50;
};

const determineRecommendation = (
  overall: number, 
  psychometric: number, 
  technical: number, 
  wiscar: AssessmentResults['wiscarScores']
): 'pursue' | 'maybe' | 'alternative' => {
  if (overall >= 75 && technical >= 60 && psychometric >= 70) return 'pursue';
  if (overall >= 60 && (technical >= 40 || psychometric >= 60)) return 'maybe';
  return 'alternative';
};

const generateInsights = (
  psychometric: number,
  technical: number,
  wiscar: AssessmentResults['wiscarScores'],
  recommendation: string
) => {
  const strengths: string[] = [];
  const improvements: string[] = [];
  const nextSteps: string[] = [];

  // Analyze strengths
  if (psychometric >= 75) strengths.push('Strong personality fit for security work');
  if (technical >= 75) strengths.push('Solid technical foundation');
  if (wiscar.cognitive >= 80) strengths.push('Excellent analytical thinking abilities');
  if (wiscar.will >= 80) strengths.push('High motivation and commitment');
  if (wiscar.learning >= 80) strengths.push('Growth mindset and learning agility');

  // Identify improvement areas
  if (technical < 60) improvements.push('Build stronger technical foundation in programming and security');
  if (psychometric < 60) improvements.push('Develop stronger interest and alignment with security work');
  if (wiscar.skill < 60) improvements.push('Enhance core programming and technical skills');
  if (wiscar.cognitive < 60) improvements.push('Practice analytical and problem-solving skills');

  // Generate next steps based on recommendation
  if (recommendation === 'pursue') {
    nextSteps.push('Enroll in an application security certification program');
    nextSteps.push('Start with OWASP Top 10 and basic web security concepts');
    nextSteps.push('Practice on platforms like HackTheBox or TryHackMe');
    nextSteps.push('Join security communities and attend meetups');
  } else if (recommendation === 'maybe') {
    nextSteps.push('Strengthen weak areas identified in the assessment');
    nextSteps.push('Take introductory programming or security courses');
    nextSteps.push('Retake this assessment in 3-6 months');
    nextSteps.push('Consider related roles like QA or general IT');
  } else {
    nextSteps.push('Explore alternative tech roles that match your strengths');
    nextSteps.push('Consider software development, data analysis, or IT support');
    nextSteps.push('Focus on building foundational tech skills first');
    nextSteps.push('Revisit security later after gaining more experience');
  }

  return { strengths, improvements, nextSteps };
};