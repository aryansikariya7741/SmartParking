import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    { id: 1, name: 'Home', path: '/' },
    { id: 2, name: 'About', path: '/about' },
    { id: 3, name: 'Slot Detection', path: '/detection' },
    { id: 4, name: 'Slot Booking', path: '/booking' },
    { id: 5, name: 'Contact', path: '/contact' },
  ];

  const features = [
    {
      icon: '🚙',
      title: 'Real-Time Detection',
      description: 'AI-powered cameras identify available parking spaces instantly'
    },
    {
      icon: '📱',
      title: 'Mobile Integration',
      description: 'Drivers find and pay for parking via our intuitive app'
    },
    {
      icon: '📈',
      title: 'Cheaper Than Traditional',
      description: 'Dynamic pricing makes parking more affordable'
    },
    {
      icon: '🌱',
      title: 'Eco-Friendly',
      description: 'Reduces emissions by minimizing circling for parking'
    }
  ];

  const benefits = [
    {
      icon: '⏱️',
      title: 'Save Time',
      description: 'Drivers find parking 65% faster on average'
    },
    {
      icon: '💰',
      title: 'Save Money',
      description: 'Competitive pricing compared to traditional parking'
    },
    {
      icon: '🌆',
      title: 'Reduce Congestion',
      description: 'Up to 35% less downtown traffic from reduced circling'
    }
  ];

  return (
    <Container>
      {/* Navigation */}
      <Navbar>
        <Logo>
          <LogoText>SmartPark</LogoText>
          <LogoDot>AI</LogoDot>
        </Logo>
        
        <NavItems menuOpen={menuOpen}>
          {navItems.map(item => (
            <NavLink 
              key={item.id}
              to={item.path}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {item.name}
              {hoveredItem === item.id && <NavUnderline />}
            </NavLink>
          ))}
        </NavItems>
        
        <CtaButton as={Link} to="/login">Login</CtaButton>
        
        <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
          <MenuLine menuOpen={menuOpen} line={1} />
          <MenuLine menuOpen={menuOpen} line={2} />
          <MenuLine menuOpen={menuOpen} line={3} />
        </MenuButton>
      </Navbar>

      {/* Hero Section */}
      <Hero>
        <HeroContent>
          <HeroTitle>
            <Highlight>AI-Powered</Highlight> Parking Made Simple
          </HeroTitle>
          <HeroSubtitle>
            Find, book, and pay for parking seamlessly with our intelligent platform that saves you time and money.
          </HeroSubtitle>
          <HeroButtons>
            <CtaButton primary as={Link} to="/booking">Book Your Slot Now</CtaButton>
            <CtaButton secondary as={Link} to="/detection">Check Available Spaces</CtaButton>
          </HeroButtons>
          <TrustBadges>
            <TrustBadge>
              <TrustIcon>🏙️</TrustIcon>
              <TrustText>Trusted in Major Cities</TrustText>
            </TrustBadge>
            <TrustBadge>
              <TrustIcon>✅</TrustIcon>
              <TrustText>95% Accuracy</TrustText>
            </TrustBadge>
          </TrustBadges>
        </HeroContent>
        <HeroImage>
          <ParkingVisual>
            <VisualHeader>Live Parking Availability</VisualHeader>
            <VisualContent>
              <ParkingSpot available />
              <ParkingSpot available={false} />
              <ParkingSpot available />
              <ParkingSpot available />
              <ParkingSpot available={false} />
              <ParkingSpot available />
              <ParkingSpot available={false} />
              <ParkingSpot available />
            </VisualContent>
            <VisualLegend>
              <LegendItem>
                <LegendColor available />
                <LegendText>Available</LegendText>
              </LegendItem>
              <LegendItem>
                <LegendColor />
                <LegendText>Occupied</LegendText>
              </LegendItem>
            </VisualLegend>
          </ParkingVisual>
        </HeroImage>
      </Hero>

      {/* Features Section */}
      <Features>
        <SectionHeader>
          <SectionTitle>Why Choose SmartParkAI</SectionTitle>
          <SectionSubtitle>Innovative features designed for modern drivers and cities</SectionSubtitle>
        </SectionHeader>
        
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Features>

      {/* Benefits Section */}
      <Benefits>
        <SectionHeader>
          <SectionTitle>Key Benefits</SectionTitle>
          <SectionSubtitle>Experience the advantages of smart parking technology</SectionSubtitle>
        </SectionHeader>
        
        <BenefitsGrid>
          {benefits.map((benefit, index) => (
            <BenefitCard key={index}>
              <BenefitIcon>{benefit.icon}</BenefitIcon>
              <BenefitTitle>{benefit.title}</BenefitTitle>
              <BenefitDescription>{benefit.description}</BenefitDescription>
            </BenefitCard>
          ))}
        </BenefitsGrid>
      </Benefits>

      {/* Footer */}
      <Footer>
        <FooterContent>
          <FooterMain>
            <FooterColumn>
              <FooterLogo>
                <LogoText>SmartPark</LogoText>
                <LogoDot>AI</LogoDot>
              </FooterLogo>
              <FooterDescription>
                Intelligent parking solutions powered by artificial intelligence.
              </FooterDescription>
              <SocialLinks>
                <SocialLink href="#">
                  <i className="fab fa-twitter"></i>
                </SocialLink>
                <SocialLink href="#">
                  <i className="fab fa-linkedin"></i>
                </SocialLink>
                <SocialLink href="#">
                  <i className="fab fa-facebook"></i>
                </SocialLink>
              </SocialLinks>
            </FooterColumn>

            <FooterColumn>
              <FooterHeading>Quick Links</FooterHeading>
              <FooterLink as={Link} to="/">Home</FooterLink>
              <FooterLink as={Link} to="/about">About</FooterLink>
              <FooterLink as={Link} to="/detection">Slot Detection</FooterLink>
              <FooterLink as={Link} to="/booking">Slot Booking</FooterLink>
            </FooterColumn>

            <FooterColumn>
              <FooterHeading>Support</FooterHeading>
              <FooterLink as={Link} to="/contact">Contact Us</FooterLink>
              <FooterLink href="#">FAQs</FooterLink>
              <FooterLink href="#">Help Center</FooterLink>
            </FooterColumn>
          </FooterMain>

          <FooterBottom>
            <Copyright>© {new Date().getFullYear()} SmartParkAI Technologies</Copyright>
            <LegalLinks>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
            </LegalLinks>
          </FooterBottom>
        </FooterContent>
      </Footer>
    </Container>
  );
};

// Animations
const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

// Base Styles
const Container = styled.div`
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #2d3748;
  background-color: #f8fafc;
  overflow-x: hidden;
`;

// Navigation Styles
const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 5%;
  position: sticky;
  top: 0;
  background-color: rgba(255,255,255,0.98);
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 700;
`;

const LogoText = styled.span`
  color: #1a202c;
`;

const LogoDot = styled.span`
  color: #4c6ef5;
`;

const NavItems = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${props => props.menuOpen ? '0' : '-100%'};
    width: 70%;
    height: 100vh;
    background-color: white;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    transition: right 0.3s ease;
    box-shadow: -5px 0 15px rgba(0,0,0,0.1);
  }
`;

const NavLink = styled(Link)`
  position: relative;
  color: #4a5568;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: #1a202c;
  }
`;

const NavUnderline = styled.span`
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #4c6ef5;
  transform-origin: right;
`;

const CtaButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  background: ${props => props.primary ? '#4c6ef5' : 'transparent'};
  color: ${props => props.primary ? 'white' : '#4a5568'};
  border: ${props => !props.primary && '2px solid #e2e8f0'};
  box-shadow: ${props => props.primary && '0 4px 6px rgba(76, 110, 245, 0.2)'};

  &:hover {
    background: ${props => props.primary ? '#3b5bdb' : 'transparent'};
    transform: translateY(-2px);
    box-shadow: ${props => props.primary ? '0 6px 8px rgba(76, 110, 245, 0.3)' : '0 2px 4px rgba(0,0,0,0.05)'};
    border-color: ${props => !props.primary && '#cbd5e0'};
  }
`;

const MenuButton = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 28px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1000;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MenuLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: #2d3748;
  transition: all 0.3s ease;
  transform: ${props => props.menuOpen && props.line === 1 ? 'rotate(45deg) translate(5px, 5px)' : 
    props.menuOpen && props.line === 2 ? 'scale(0)' : 
    props.menuOpen && props.line === 3 ? 'rotate(-45deg) translate(5px, -5px)' : 'none'};
  opacity: ${props => props.menuOpen && props.line === 2 ? '0' : '1'};
`;

// Hero Section Styles
const Hero = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 5% 6rem;
  position: relative;
  background: linear-gradient(to bottom, #f8fafc 0%, #f1f5f9 100%);

  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
    padding-bottom: 4rem;
  }
`;

const HeroContent = styled.div`
  max-width: 600px;
  z-index: 10;

  @media (max-width: 992px) {
    margin-bottom: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #1a202c;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Highlight = styled.span`
  color: #4c6ef5;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 0;
    width: 100%;
    height: 12px;
    background-color: rgba(76, 110, 245, 0.2);
    z-index: -1;
    border-radius: 3px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.1rem;
  color: #4a5568;
  margin-bottom: 2rem;
  line-height: 1.7;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const TrustBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const TrustIcon = styled.span`
  font-size: 1rem;
`;

const TrustText = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
  color: #4a5568;
`;

const HeroImage = styled.div`
  position: relative;
  width: 50%;
  max-width: 600px;

  @media (max-width: 992px) {
    width: 100%;
    margin-top: 2rem;
  }
`;

const ParkingVisual = styled.div`
  position: relative;
  width: 100%;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
  padding: 1.5rem;
`;

const VisualHeader = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #2d3748;
  text-align: center;
`;

const VisualContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 1.5rem;
`;

const ParkingSpot = styled.div`
  height: 60px;
  background-color: ${props => props.available ? '#c6f6d5' : '#fed7d7'};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }

  &::after {
    content: ${props => props.available ? "'P'" : "'🚗'"};
    font-size: 1.2rem;
    font-weight: ${props => props.available ? 'bold' : 'normal'};
    color: ${props => props.available ? '#22543d' : '#742a2a'};
  }
`;

const VisualLegend = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LegendColor = styled.div`
  width: 15px;
  height: 15px;
  background-color: ${props => props.available ? '#c6f6d5' : '#fed7d7'};
  border-radius: 3px;
`;

const LegendText = styled.span`
  font-size: 0.85rem;
  color: #718096;
`;

// Features Section Styles
const Features = styled.section`
  padding: 5rem 5%;
  background-color: white;
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a202c;
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: #718096;
  line-height: 1.7;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background: #f8fafc;
  padding: 2rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
    border-color: #cbd5e0;
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2d3748;
`;

const FeatureDescription = styled.p`
  color: #718096;
  line-height: 1.6;
`;

// Benefits Section Styles
const Benefits = styled.section`
  padding: 5rem 5%;
  background-color: #f1f5f9;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const BenefitCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  }
`;

const BenefitIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const BenefitTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2d3748;
`;

const BenefitDescription = styled.p`
  color: #718096;
  line-height: 1.6;
`;

// Footer Styles
const Footer = styled.footer`
  background-color: #1a202c;
  color: white;
  padding: 4rem 5% 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterMain = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const FooterDescription = styled.p`
  color: #a0aec0;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255,255,255,0.2);
  }
`;

const FooterHeading = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: white;
`;

const FooterLink = styled(Link)`
  color: #a0aec0;
  text-decoration: none;
  margin-bottom: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255,255,255,0.1);
`;

const Copyright = styled.span`
  color: #a0aec0;
  margin-bottom: 1rem;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export default Homepage;