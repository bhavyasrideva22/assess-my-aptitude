import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProgressBar } from '@/components/ProgressBar';
import { assessmentSections, Question, AssessmentResponse } from '@/data/assessmentData';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const Assessment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sectionId = searchParams.get('section') || 'psychometric';
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, AssessmentResponse>>({});
  const [currentAnswer, setCurrentAnswer] = useState<string | number>('');

  const currentSection = assessmentSections.find(s => s.id === sectionId);
  const currentQuestion = currentSection?.questions[currentQuestionIndex];
  
  const totalQuestions = currentSection?.questions.length || 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const isLastSection = sectionId === 'wiscar';

  useEffect(() => {
    setCurrentAnswer('');
  }, [currentQuestionIndex, sectionId]);

  const handleAnswer = (answer: string | number) => {
    setCurrentAnswer(answer);
  };

  const handleNext = () => {
    if (!currentQuestion || currentAnswer === '') return;

    // Save response
    setResponses(prev => ({
      ...prev,
      [currentQuestion.id]: {
        questionId: currentQuestion.id,
        answer: currentAnswer,
        timestamp: new Date()
      }
    }));

    if (isLastQuestion) {
      if (isLastSection) {
        // All sections complete - go to results
        const allResponses = Object.values({...responses, [currentQuestion.id]: {
          questionId: currentQuestion.id,
          answer: currentAnswer,
          timestamp: new Date()
        }});
        
        localStorage.setItem('assessmentResponses', JSON.stringify(allResponses));
        navigate('/results');
      } else {
        // Move to next section
        const sections = ['psychometric', 'technical', 'wiscar'];
        const currentIndex = sections.indexOf(sectionId);
        const nextSection = sections[currentIndex + 1];
        navigate(`/assessment?section=${nextSection}`);
      }
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      const sections = ['psychometric', 'technical', 'wiscar'];
      const currentIndex = sections.indexOf(sectionId);
      if (currentIndex > 0) {
        const prevSection = sections[currentIndex - 1];
        navigate(`/assessment?section=${prevSection}`);
      } else {
        navigate('/introduction');
      }
    }
  };

  if (!currentSection || !currentQuestion) {
    return <div>Loading...</div>;
  }

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'likert':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground mb-6">
              {currentQuestion.question}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {currentQuestion.scale?.labels.map((label, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index + 1)}
                  className={`p-4 text-sm text-center rounded-lg border transition-smooth ${
                    currentAnswer === index + 1
                      ? 'bg-primary text-primary-foreground border-primary shadow-md'
                      : 'bg-background hover:bg-muted border-border hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium mb-1">{index + 1}</div>
                  <div className="text-xs">{label}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'multiple-choice':
      case 'scenario':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground mb-6">
              {currentQuestion.question}
            </h3>
            <div className="space-y-3">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`w-full p-4 text-left rounded-lg border transition-smooth ${
                    currentAnswer === option
                      ? 'bg-primary text-primary-foreground border-primary shadow-md'
                      : 'bg-background hover:bg-muted border-border hover:border-primary/50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const sections = ['psychometric', 'technical', 'wiscar'];
  const overallProgress = (sections.indexOf(sectionId) * 100 + ((currentQuestionIndex + 1) / totalQuestions) * 100) / sections.length;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">
              {currentSection.title}
            </h1>
            <div className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </div>
          </div>
          <p className="text-muted-foreground mb-4">{currentSection.description}</p>
          <ProgressBar current={overallProgress} total={100} />
        </div>

        {/* Question Card */}
        <Card className="max-w-4xl mx-auto">
          <div className="p-8">
            {renderQuestion()}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={handlePrevious}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Previous
          </Button>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {sections.map((section, index) => (
              <div
                key={section}
                className={`flex items-center ${index > 0 ? 'ml-2' : ''}`}
              >
                {index > 0 && <span className="mx-2">→</span>}
                <span className={`px-2 py-1 rounded text-xs ${
                  section === sectionId 
                    ? 'bg-primary text-primary-foreground' 
                    : sections.indexOf(section) < sections.indexOf(sectionId)
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {section === 'psychometric' ? 'Personality' : 
                   section === 'technical' ? 'Technical' : 'Readiness'}
                </span>
              </div>
            ))}
          </div>

          <Button
            onClick={handleNext}
            disabled={currentAnswer === ''}
            className="flex items-center gap-2"
            variant={isLastQuestion && isLastSection ? 'assessment' : 'default'}
          >
            {isLastQuestion && isLastSection ? (
              <>
                <CheckCircle size={16} />
                Complete Assessment
              </>
            ) : (
              <>
                Next
                <ArrowRight size={16} />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;