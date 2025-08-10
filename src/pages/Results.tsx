import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProgressBar } from '@/components/ProgressBar';
import { RadarChart } from '@/components/RadarChart';
import { AssessmentResponse, AssessmentResults } from '@/data/assessmentData';
import { calculateAssessmentResults } from '@/utils/assessmentScoring';
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Brain, 
  Code, 
  Target,
  TrendingUp,
  BookOpen,
  Users
} from 'lucide-react';
import resultsImage from '@/assets/results-dashboard.jpg';

const Results = () => {
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResults = () => {
      try {
        const responsesData = localStorage.getItem('assessmentResponses');
        if (!responsesData) {
          console.error('No assessment responses found');
          return;
        }

        const responses: AssessmentResponse[] = JSON.parse(responsesData);
        const calculatedResults = calculateAssessmentResults(responses);
        setResults(calculatedResults);
      } catch (error) {
        console.error('Error loading results:', error);
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Analyzing your responses...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <XCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Results Found</h2>
          <p className="text-muted-foreground mb-4">
            We couldn't find your assessment responses. Please retake the assessment.
          </p>
          <Link to="/introduction">
            <Button>Start Assessment</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'pursue': return <CheckCircle className="w-8 h-8 text-accent" />;
      case 'maybe': return <AlertCircle className="w-8 h-8 text-warning" />;
      default: return <XCircle className="w-8 h-8 text-destructive" />;
    }
  };

  const getRecommendationMessage = () => {
    switch (results.recommendation) {
      case 'pursue':
        return {
          title: 'Highly Recommended',
          message: 'You show strong potential for a successful career in application security!',
          color: 'text-accent'
        };
      case 'maybe':
        return {
          title: 'Consider With Development',
          message: 'You have potential but would benefit from strengthening certain areas first.',
          color: 'text-warning'
        };
      default:
        return {
          title: 'Explore Alternatives',
          message: 'Consider alternative career paths that better align with your current profile.',
          color: 'text-destructive'
        };
    }
  };

  const radarData = [
    { label: 'Will', value: results.wiscarScores.will },
    { label: 'Interest', value: results.wiscarScores.interest },
    { label: 'Skill', value: results.wiscarScores.skill },
    { label: 'Cognitive', value: results.wiscarScores.cognitive },
    { label: 'Learning', value: results.wiscarScores.learning },
    { label: 'Alignment', value: results.wiscarScores.alignment }
  ];

  const recommendation = getRecommendationMessage();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Your Assessment Results
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive analysis of your fit for Application Security Engineering
          </p>
        </div>

        {/* Overall Score Card */}
        <Card className="max-w-4xl mx-auto mb-8 overflow-hidden">
          <div className="bg-gradient-primary p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Overall Compatibility Score</h2>
                <p className="text-white/90">
                  Based on personality, technical aptitude, and readiness factors
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">{results.overallScore}%</div>
                <div className="text-white/80">out of 100</div>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              {getRecommendationIcon()}
              <div>
                <h3 className={`text-xl font-semibold ${recommendation.color}`}>
                  {recommendation.title}
                </h3>
                <p className="text-muted-foreground">{recommendation.message}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Detailed Scores */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Score Breakdown */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold">Personality & Interest</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Psychological Fit</span>
                    <span className="font-medium">{results.psychometricScore}%</span>
                  </div>
                  <ProgressBar current={results.psychometricScore} total={100} />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="w-6 h-6 text-secondary" />
                  <h3 className="text-lg font-semibold">Technical Aptitude</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Current Knowledge</span>
                    <span className="font-medium">{results.technicalScore}%</span>
                  </div>
                  <ProgressBar current={results.technicalScore} total={100} />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-accent" />
                  <h3 className="text-lg font-semibold">WISCAR Dimensions</h3>
                </div>
                <div className="space-y-3">
                  {Object.entries(results.wiscarScores).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-muted-foreground capitalize">{key}</span>
                        <span className="font-medium">{value}%</span>
                      </div>
                      <ProgressBar current={value} total={100} />
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Radar Chart */}
            <div>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">WISCAR Profile</h3>
                <RadarChart data={radarData} className="flex justify-center" />
              </Card>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Strengths */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-accent" />
                <h3 className="text-lg font-semibold">Your Strengths</h3>
              </div>
              <ul className="space-y-2">
                {results.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Areas for Improvement */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-warning" />
                <h3 className="text-lg font-semibold">Areas to Develop</h3>
              </div>
              <ul className="space-y-2">
                {results.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{improvement}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        {/* Next Steps */}
        <Card className="max-w-4xl mx-auto mb-12">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Recommended Next Steps</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img 
                  src={resultsImage} 
                  alt="Career development dashboard" 
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
              </div>
              <div>
                <ol className="space-y-3">
                  {results.nextSteps.map((step, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </span>
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <div className="space-y-4">
            <Link to="/introduction">
              <Button size="lg" variant="outline">
                Retake Assessment
              </Button>
            </Link>
            <Link to="/">
              <Button size="lg">
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;