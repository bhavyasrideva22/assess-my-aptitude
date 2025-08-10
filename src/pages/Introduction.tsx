import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, Target, Brain, Code, Shield, TrendingUp } from 'lucide-react';
import assessmentImage from '@/assets/assessment-concept.jpg';

const Introduction = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Your Career Path Insight: Application Security Engineer
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover if application security is the right career path for you through our comprehensive 
            assessment combining personality analysis, technical aptitude, and career readiness evaluation.
          </p>
        </div>

        {/* Hero Image */}
        <div className="max-w-4xl mx-auto mb-12">
          <img 
            src={assessmentImage} 
            alt="Assessment and evaluation concepts" 
            className="w-full h-64 object-cover rounded-lg shadow-elegant"
          />
        </div>

        {/* What You'll Discover */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-center mb-8">What You'll Discover</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Personality Fit</h3>
              <p className="text-sm text-muted-foreground">
                Analyze your traits, interests, and motivation alignment with security careers
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Code className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Technical Readiness</h3>
              <p className="text-sm text-muted-foreground">
                Assess your current knowledge of programming, security concepts, and logical reasoning
              </p>
            </Card>
            <Card className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Career Guidance</h3>
              <p className="text-sm text-muted-foreground">
                Get personalized recommendations and next steps for your career journey
              </p>
            </Card>
          </div>
        </div>

        {/* About Application Security */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <Shield className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold mb-4">About Application Security Engineering</h2>
                <p className="text-muted-foreground mb-4">
                  Application Security Engineers are the guardians of digital systems, protecting applications 
                  and users from cyber threats. They combine technical expertise with analytical thinking to 
                  identify vulnerabilities, implement security measures, and ensure robust defense mechanisms.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 className="font-semibold mb-2">Key Responsibilities</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Conduct security assessments and code reviews</li>
                      <li>• Implement security controls and best practices</li>
                      <li>• Threat modeling and vulnerability analysis</li>
                      <li>• Security tool development and automation</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Career Paths</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Application Security Engineer</li>
                      <li>• Security Analyst</li>
                      <li>• Penetration Tester</li>
                      <li>• DevSecOps Engineer</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Assessment Details */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-center mb-8">Assessment Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-primary" />
                <h3 className="font-semibold">Psychometric Section</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Evaluate personality traits, interests, and motivation using validated psychological frameworks.
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-4 h-4" />
                5-7 minutes
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Code className="w-6 h-6 text-secondary" />
                <h3 className="font-semibold">Technical Aptitude</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Test programming knowledge, security concepts, and logical reasoning abilities.
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-4 h-4" />
                8-10 minutes
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-accent" />
                <h3 className="font-semibold">WISCAR Analysis</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Comprehensive readiness assessment covering Will, Interest, Skill, Cognitive ability, and Alignment.
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-4 h-4" />
                5-7 minutes
              </div>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-primary p-8 rounded-lg shadow-elegant max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Discover Your Potential?
            </h2>
            <p className="text-white/90 mb-6">
              Take our comprehensive assessment to understand your fit for an application security career.
            </p>
            <div className="flex items-center justify-center gap-4 mb-4">
              <Clock className="w-5 h-5 text-white/80" />
              <span className="text-white/90">Total time: 20-25 minutes</span>
            </div>
            <Link to="/assessment?section=psychometric">
              <Button size="xl" variant="hero" className="bg-white text-primary hover:bg-white/90">
                Start Assessment
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;