import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Brain, 
  Shield, 
  Target, 
  TrendingUp, 
  Clock, 
  Users,
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react';
import heroImage from '@/assets/hero-security.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
                Discover Your Perfect
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Career Path</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Take our AI-powered assessment to discover if Application Security Engineering 
                is your ideal career match. Get personalized insights based on psychology, 
                aptitude, and readiness factors.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/introduction">
                  <Button size="xl" variant="hero" className="w-full sm:w-auto">
                    <Target className="w-5 h-5 mr-2" />
                    Start Assessment
                  </Button>
                </Link>
                <Button size="xl" variant="outline" className="w-full sm:w-auto">
                  <Clock className="w-5 h-5 mr-2" />
                  20 minutes
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span>Science-based</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span>Personalized results</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span>Career guidance</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src={heroImage} 
                alt="AI-powered career assessment for cybersecurity" 
                className="w-full rounded-lg shadow-elegant"
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose Our Assessment?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive evaluation combines cutting-edge psychology, technical aptitude testing, 
              and career science to provide you with actionable insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-smooth">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Psychometric Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Validated personality and interest assessment using Big 5 and Holland frameworks
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-smooth">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Technical Aptitude</h3>
              <p className="text-sm text-muted-foreground">
                Programming, security concepts, and logical reasoning evaluation
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-smooth">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibant mb-2">WISCAR Framework</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive readiness assessment covering will, interest, skill, and alignment
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-smooth">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-warning" />
              </div>
              <h3 className="font-semibold mb-2">Career Guidance</h3>
              <p className="text-sm text-muted-foreground">
                Personalized recommendations and next steps for your career journey
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Three comprehensive sections designed to give you complete career clarity
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Personality Assessment</h3>
                <p className="text-muted-foreground text-sm">
                  Evaluate your personality traits, interests, and motivation alignment with security careers
                </p>
                <div className="flex items-center justify-center gap-2 mt-3 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  5-7 minutes
                </div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Technical Evaluation</h3>
                <p className="text-muted-foreground text-sm">
                  Test your programming knowledge, security concepts, and logical reasoning abilities
                </p>
                <div className="flex items-center justify-center gap-2 mt-3 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  8-10 minutes
                </div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Results & Guidance</h3>
                <p className="text-muted-foreground text-sm">
                  Get detailed insights, radar charts, and personalized next steps for your career
                </p>
                <div className="flex items-center justify-center gap-2 mt-3 text-xs text-muted-foreground">
                  <Star className="w-3 h-3" />
                  Instant results
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto overflow-hidden">
            <div className="bg-gradient-hero p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Discover Your Career Potential?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands who have already discovered their perfect career path through 
                our comprehensive assessment platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>15,000+ assessments completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>20-25 minutes total</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  <span>Instant detailed results</span>
                </div>
              </div>

              <Link to="/introduction">
                <Button size="xl" variant="hero" className="bg-white text-primary hover:bg-white/90 shadow-glow">
                  Begin Your Assessment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
