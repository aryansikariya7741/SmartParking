import React from 'react';
import styled from 'styled-components';

const AboutPage = () => {
  return (
    <AboutContainer>
      {/* Hero Section */}
      <AboutHero>
        <HeroContent>
          <HeroTitle>Transforming Urban Mobility with <Highlight>AI Parking Technology</Highlight></HeroTitle>
          <HeroSubtitle>We're redefining parking management through innovative computer vision and machine learning solutions.</HeroSubtitle>
        </HeroContent>
      </AboutHero>

      {/* Mission Section */}
      <MissionSection>
        <SectionContent>
          <SectionTitle>Our Purpose</SectionTitle>
          <MissionStatement>
            SmartParkAI develops intelligent systems that optimize parking infrastructure, reduce urban congestion, and create seamless experiences for drivers and cities.
          </MissionStatement>
        </SectionContent>
      </MissionSection>

      {/* Technology Section */}
      <TechSection>
        <SectionContent>
          <SectionTitle>Our Technology</SectionTitle>
          <TechGrid>
            <TechCard>
              <TechIcon>👁️</TechIcon>
              <TechTitle>Computer Vision</TechTitle>
              <TechDescription>
                Advanced camera systems with real-time space detection and vehicle recognition
              </TechDescription>
            </TechCard>
            <TechCard>
              <TechIcon>🧠</TechIcon>
              <TechTitle>Machine Learning</TechTitle>
              <TechDescription>
                Predictive algorithms that forecast parking demand and optimize pricing
              </TechDescription>
            </TechCard>
            <TechCard>
              <TechIcon>📱</TechIcon>
              <TechTitle>Mobile Integration</TechTitle>
              <TechDescription>
                Driver apps that guide users directly to available spaces with turn-by-turn navigation
              </TechDescription>
            </TechCard>
          </TechGrid>
        </SectionContent>
      </TechSection>

      {/* Values Section */}
      <ValuesSection>
        <SectionContent>
          <SectionTitle>What We Believe</SectionTitle>
          <ValuesGrid>
            <ValueCard>
              <ValueIcon>🌱</ValueIcon>
              <ValueTitle>Sustainable Cities</ValueTitle>
              <ValueDescription>
                We build solutions that reduce emissions from unnecessary vehicle circulation
              </ValueDescription>
            </ValueCard>
            <ValueCard>
              <ValueIcon>🔍</ValueIcon>
              <ValueTitle>Data-Driven</ValueTitle>
              <ValueDescription>
                Our decisions are guided by comprehensive parking analytics and urban metrics
              </ValueDescription>
            </ValueCard>
            <ValueCard>
              <ValueIcon>🤝</ValueIcon>
              <ValueTitle>Municipal Partnership</ValueTitle>
              <ValueDescription>
                We work collaboratively with city planners to address specific urban challenges
              </ValueDescription>
            </ValueCard>
          </ValuesGrid>
        </SectionContent>
      </ValuesSection>

      {/* CTA Section */}
      <CTASection>
        <CTAContent>
          <CTATitle>Ready to Implement Smart Parking in Your City?</CTATitle>
          <CTAButton>Request Technology Demo</CTAButton>
        </CTAContent>
      </CTASection>
    </AboutContainer>
  );
};

// Styled Components
const AboutContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #2d3748;
`;

const AboutHero = styled.section`
  background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  height: 500px;
  display: flex;
  align-items: center;
  padding: 0 5%;
  color: white;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Highlight = styled.span`
  color: #4c6ef5;
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  max-width: 800px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const MissionSection = styled.section`
  padding: 6rem 5%;
  background-color: white;
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1a202c;
  text-align: center;
`;

const MissionStatement = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  color: #4a5568;
`;

const TechSection = styled.section`
  padding: 6rem 5%;
  background-color: #f8fafc;
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const TechCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const TechIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const TechTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a202c;
`;

const TechDescription = styled.p`
  color: #718096;
  line-height: 1.6;
`;

const ValuesSection = styled.section`
  padding: 6rem 5%;
  background-color: white;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ValueCard = styled.div`
  background: #f8fafc;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
`;

const ValueIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const ValueTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a202c;
`;

const ValueDescription = styled.p`
  color: #718096;
  line-height: 1.6;
`;

const CTASection = styled.section`
  padding: 6rem 5%;
  background: linear-gradient(135deg, #4c6ef5 0%, #3b5bdb 100%);
  color: white;
`;

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const CTAButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid white;
  background: white;
  color: #4c6ef5;
  font-size: 1.1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
`;

export default AboutPage;