
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, XCircle, Wand2, Zap } from 'lucide-react';

interface ATSOptimizationProps {
  resumeData: any;
  onOptimize: (suggestions: any[]) => void;
}

const ATSOptimization = ({ resumeData, onOptimize }: ATSOptimizationProps) => {
  const [atsScore, setAtsScore] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const analyzeResume = () => {
    setAnalyzing(true);
    
    // Simulate ATS analysis
    setTimeout(() => {
      const personalInfo = resumeData.personalInfo || {};
      const experience = resumeData.experience || [];
      const skills = resumeData.skills || [];
      const education = resumeData.education || [];

      let score = 0;
      const issues: any[] = [];
      const suggestions: any[] = [];

      // Check personal info completeness
      const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'location'];
      const missingPersonalFields = requiredFields.filter(field => !personalInfo[field]);
      
      if (missingPersonalFields.length === 0) {
        score += 20;
      } else {
        issues.push({
          type: 'error',
          category: 'Personal Information',
          message: `Missing required fields: ${missingPersonalFields.join(', ')}`,
          fix: 'Complete all required personal information fields'
        });
      }

      // Check professional summary
      if (personalInfo.summary && personalInfo.summary.length > 50) {
        score += 15;
      } else {
        issues.push({
          type: 'warning',
          category: 'Professional Summary',
          message: 'Professional summary is missing or too short',
          fix: 'Add a compelling 2-3 sentence professional summary'
        });
      }

      // Check work experience
      if (experience.length > 0) {
        score += 25;
        
        // Check for quantified achievements
        const hasQuantifiedAchievements = experience.some((exp: any) => 
          exp.achievements?.some((ach: string) => /\d+/.test(ach))
        );
        
        if (hasQuantifiedAchievements) {
          score += 10;
        } else {
          suggestions.push({
            type: 'suggestion',
            category: 'Experience',
            message: 'Add quantified achievements (numbers, percentages, etc.)',
            fix: 'Include specific metrics in your accomplishments'
          });
        }
      } else {
        issues.push({
          type: 'error',
          category: 'Work Experience',
          message: 'No work experience added',
          fix: 'Add at least one work experience entry'
        });
      }

      // Check skills
      if (skills.length >= 5) {
        score += 15;
      } else {
        issues.push({
          type: 'warning',
          category: 'Skills',
          message: 'Add more relevant skills (recommended: 5+)',
          fix: 'Include both technical and soft skills relevant to your field'
        });
      }

      // Check education
      if (education.length > 0) {
        score += 10;
      } else {
        suggestions.push({
          type: 'suggestion',
          category: 'Education',
          message: 'Consider adding educational background',
          fix: 'Add your relevant educational qualifications'
        });
      }

      // Check for keywords density
      const allText = JSON.stringify(resumeData).toLowerCase();
      const commonKeywords = ['management', 'development', 'project', 'team', 'leadership', 'analysis'];
      const keywordCount = commonKeywords.filter(keyword => allText.includes(keyword)).length;
      
      if (keywordCount >= 3) {
        score += 5;
      } else {
        suggestions.push({
          type: 'suggestion',
          category: 'Keywords',
          message: 'Include more industry-relevant keywords',
          fix: 'Research job descriptions and include relevant keywords naturally'
        });
      }

      setAtsScore(Math.min(score, 100));
      setAnalysis({
        issues: [...issues, ...suggestions],
        score: Math.min(score, 100),
        recommendations: generateRecommendations(score)
      });
      setAnalyzing(false);
    }, 2000);
  };

  const generateRecommendations = (score: number) => {
    if (score >= 80) {
      return [
        'Your resume is well-optimized for ATS systems!',
        'Consider customizing keywords for specific job applications',
        'Regularly update your resume with new achievements'
      ];
    } else if (score >= 60) {
      return [
        'Your resume has good ATS compatibility with room for improvement',
        'Focus on adding quantified achievements',
        'Include more industry-specific keywords'
      ];
    } else {
      return [
        'Your resume needs significant optimization for ATS systems',
        'Complete all required sections',
        'Add detailed work experience with achievements',
        'Include relevant skills and keywords'
      ];
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  useEffect(() => {
    if (resumeData && Object.keys(resumeData).length > 0) {
      analyzeResume();
    }
  }, [resumeData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          ATS Optimization
        </CardTitle>
        <CardDescription>
          Optimize your resume for Applicant Tracking Systems
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* ATS Score */}
        <div className="text-center">
          <div className={`text-4xl font-bold ${getScoreColor(atsScore)}`}>
            {atsScore}/100
          </div>
          <div className="text-sm text-muted-foreground mb-4">
            ATS Compatibility Score - {getScoreLabel(atsScore)}
          </div>
          <Progress value={atsScore} className="w-full" />
        </div>

        {/* Analysis Button */}
        <div className="text-center">
          <Button 
            onClick={analyzeResume} 
            disabled={analyzing}
            className="w-full"
          >
            {analyzing ? (
              <>Analyzing Resume...</>
            ) : (
              <>
                <Wand2 className="h-4 w-4 mr-2" />
                Re-analyze Resume
              </>
            )}
          </Button>
        </div>

        {/* Issues and Suggestions */}
        {analysis && (
          <div className="space-y-4">
            <h4 className="font-medium">Analysis Results</h4>
            
            <div className="space-y-3">
              {analysis.issues.map((issue: any, index: number) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="mt-0.5">
                    {issue.type === 'error' && <XCircle className="h-4 w-4 text-red-500" />}
                    {issue.type === 'warning' && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                    {issue.type === 'suggestion' && <CheckCircle className="h-4 w-4 text-blue-500" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {issue.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">{issue.message}</p>
                    <p className="text-xs text-muted-foreground">{issue.fix}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-medium text-blue-900 mb-2">Recommendations</h5>
              <ul className="space-y-1">
                {analysis.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="text-sm text-blue-800">
                    • {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ATSOptimization;
