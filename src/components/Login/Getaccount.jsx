import React, { useState } from 'react';
import './Getaccount.css';
import { FaCheck, FaArrowRight, FaInfoCircle, FaRegLightbulb, FaStar } from 'react-icons/fa';

const GetAccount = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [currency, setCurrency] = useState('USD');
  const [showFeatureTooltip, setShowFeatureTooltip] = useState({});
  const [showComparisonTable, setShowComparisonTable] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const plans = {
    basic: {
      monthly: 19.99,
      yearly: 199.99,
      features: [
        'Basic access to KAIRA tools',
        'Limited design storage',
        'Email-only support',
        'Single user access'
      ]
    },
    pro: {
      monthly: 39.99,
      yearly: 399.99,
      features: [
        'All basic features included',
        'Extended storage space',
        'Priority email & chat support',
        'Access for up to 5 users'
      ]
    },
    enterprise: {
      monthly: 89.99,
      yearly: 899.99,
      features: [
        'Full access to all features',
        'Unlimited storage',
        '24/7 support via all channels',
        'Dedicated account manager',
        'Unlimited users',
        'Custom workspace integration'
      ]
    }
  };

  // Exchange rates (simplified for demo)
  const exchangeRates = {
    USD: 1,
    EUR: 0.91,
    GBP: 0.77,
    JPY: 148.5,
    INR: 83.0
  };

  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    INR: '₹'
  };

  const planColors = {
    basic: {
      light: '#f0f7ff',
      main: '#4a90e2',
      dark: '#2a6dc4'
    },
    pro: {
      light: '#f0fff4',
      main: '#38b2ac',
      dark: '#2c9e9e'
    },
    enterprise: {
      light: '#faf5ff',
      main: '#805ad5',
      dark: '#6b46c1'
    }
  };

  const handlePurchase = (planType) => {
    console.log(`Purchasing ${planType} plan with ${selectedPlan} billing in ${currency}`);
    window.location.href = `/contact`;
  };

  const convertPrice = (priceInUSD) => {
    const converted = priceInUSD * exchangeRates[currency];
    return currency === 'JPY' ? Math.round(converted) : converted.toFixed(2);
  };

  const toggleFeatureTooltip = (planType, featureIndex) => {
    setShowFeatureTooltip(prev => ({
      ...prev,
      [`${planType}-${featureIndex}`]: !prev[`${planType}-${featureIndex}`]
    }));
  };

  // Feature details for tooltips
  const featureDetails = {
    'Basic access to KAIRA tools': 'Includes basic AI-powered design assistance and template library.',
    'Limited design storage': 'Store up to 50 design projects in your workspace.',
    'Email-only support': 'Receive support through email with 48-hour response time.',
    'Single user access': 'One user account with full access to your workspace.',
    'All basic features included': 'All features from the Basic plan plus additional capabilities.',
    'Extended storage space': 'Store up to 250 design projects in your workspace.',
    'Priority email & chat support': 'Faster support with 24-hour email response and live chat during business hours.',
    'Access for up to 5 users': 'Create up to 5 user accounts with customizable permissions.',
    'Full access to all features': 'Unrestricted access to the entire KAIRA platform and future releases.',
    'Unlimited storage': 'No storage limits for your design projects.',
    '24/7 support via all channels': 'Round-the-clock support via email, chat, and phone.',
    'Dedicated account manager': 'Personal account manager for onboarding and ongoing assistance.',
    'Unlimited users': 'Create as many user accounts as needed for your organization.',
    'Custom workspace integration': 'Integrate KAIRA with your existing tools and workflows.'
  };

  const getCardStyle = (planType) => {
    if (hoveredCard === planType) {
      return {
        transform: 'translateY(-10px) scale(1.03)',
        boxShadow: `0 10px 30px rgba(0, 0, 0, 0.12), 0 0 0 2px ${planColors[planType].main}`
      };
    }
    return {};
  };

  const getButtonStyle = (planType) => {
    const isHovered = hoveredCard === planType;
    const baseStyle = {
      backgroundColor: isHovered ? planColors[planType].dark : planColors[planType].main
    };
    return baseStyle;
  };

  return (
    <div className="pricing-container">
      <div className="pricing-hero">
        <div className="pricing-header">
          <h1>Choose Your KAIRA Plan</h1>
          <p>Get access to powerful AI design tools tailored to your needs</p>
        </div>

        <div className="action-toggles">
          <div className="billing-toggle">
            <span className={selectedPlan === 'monthly' ? 'active' : ''}>Monthly</span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={selectedPlan === 'yearly'}
                onChange={() => setSelectedPlan(selectedPlan === 'monthly' ? 'yearly' : 'monthly')}
              />
              <span className="slider round"></span>
            </label>
            <span className={selectedPlan === 'yearly' ? 'active' : ''}>
              Yearly <span className="discount-badge">Save 15%</span>
            </span>
          </div>

          <div className="currency-selector">
            <select 
              id="currency" 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
              className="currency-select"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
              <option value="INR">INR (₹)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="pricing-plans">
        {/* Basic Plan */}
        <div 
          className="plan-card"
          style={{
            ...getCardStyle('basic'),
            borderColor: planColors.basic.main,
            backgroundColor: hoveredCard === 'basic' ? planColors.basic.light : '#fff'
          }}
          onMouseEnter={() => setHoveredCard('basic')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="plan-header" style={{borderBottom: `2px solid ${planColors.basic.light}`}}>
            <div className="plan-badge basic">Basic</div>
            <div className="plan-price">
              <span className="currency">{currencySymbols[currency]}</span>
              <span className="amount">{convertPrice(plans.basic[selectedPlan])}</span>
              <span className="period">/{selectedPlan}</span>
            </div>
            <p>For individuals and small-scale use</p>
          </div>
          <ul className="plan-features">
            {plans.basic.features.map((feature, idx) => (
              <li key={idx} className="feature-item">
                <div className="feature-content">
                  <FaCheck className="check-icon" style={{color: planColors.basic.main}} /> 
                  <span>{feature}</span>
                </div>
                <div className="tooltip-container">
                  <FaInfoCircle 
                    className="info-icon" 
                    style={{color: planColors.basic.main}}
                    onMouseEnter={() => toggleFeatureTooltip('basic', idx)}
                    onMouseLeave={() => toggleFeatureTooltip('basic', idx)}
                  />
                  {showFeatureTooltip[`basic-${idx}`] && (
                    <div className="feature-tooltip">{featureDetails[feature]}</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <button 
            className="plan-button" 
            style={getButtonStyle('basic')}
            onClick={() => handlePurchase('basic')}
          >
            Get Started <FaArrowRight className="arrow-icon" />
          </button>
        </div>

        {/* Pro Plan */}
        <div 
          className="plan-card featured"
          style={{
            ...getCardStyle('pro'),
            borderColor: planColors.pro.main,
            backgroundColor: hoveredCard === 'pro' ? planColors.pro.light : '#fff'
          }}
          onMouseEnter={() => setHoveredCard('pro')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="popular-badge"><FaStar className="star-icon" /> Most Popular</div>
          <div className="plan-header" style={{borderBottom: `2px solid ${planColors.pro.light}`}}>
            <div className="plan-badge pro">Professional</div>
            <div className="plan-price">
              <span className="currency">{currencySymbols[currency]}</span>
              <span className="amount">{convertPrice(plans.pro[selectedPlan])}</span>
              <span className="period">/{selectedPlan}</span>
            </div>
            <p>Ideal for teams and regular projects</p>
          </div>
          <ul className="plan-features">
            {plans.pro.features.map((feature, idx) => (
              <li key={idx} className="feature-item">
                <div className="feature-content">
                  <FaCheck className="check-icon" style={{color: planColors.pro.main}} /> 
                  <span>{feature}</span>
                </div>
                <div className="tooltip-container">
                  <FaInfoCircle 
                    className="info-icon" 
                    style={{color: planColors.pro.main}}
                    onMouseEnter={() => toggleFeatureTooltip('pro', idx)}
                    onMouseLeave={() => toggleFeatureTooltip('pro', idx)}
                  />
                  {showFeatureTooltip[`pro-${idx}`] && (
                    <div className="feature-tooltip">{featureDetails[feature]}</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <button 
            className="plan-button" 
            style={getButtonStyle('pro')}
            onClick={() => handlePurchase('pro')}
          >
            Get Started <FaArrowRight className="arrow-icon" />
          </button>
        </div>

        {/* Enterprise Plan */}
        <div 
          className="plan-card"
          style={{
            ...getCardStyle('enterprise'),
            borderColor: planColors.enterprise.main,
            backgroundColor: hoveredCard === 'enterprise' ? planColors.enterprise.light : '#fff'
          }}
          onMouseEnter={() => setHoveredCard('enterprise')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="plan-header" style={{borderBottom: `2px solid ${planColors.enterprise.light}`}}>
            <div className="plan-badge enterprise">Enterprise</div>
            <div className="plan-price">
              <span className="currency">{currencySymbols[currency]}</span>
              <span className="amount">{convertPrice(plans.enterprise[selectedPlan])}</span>
              <span className="period">/{selectedPlan}</span>
            </div>
            <p>For organizations and advanced features</p>
          </div>
          <ul className="plan-features">
            {plans.enterprise.features.map((feature, idx) => (
              <li key={idx} className="feature-item">
                <div className="feature-content">
                  <FaCheck className="check-icon" style={{color: planColors.enterprise.main}} /> 
                  <span>{feature}</span>
                </div>
                <div className="tooltip-container">
                  <FaInfoCircle 
                    className="info-icon" 
                    style={{color: planColors.enterprise.main}}
                    onMouseEnter={() => toggleFeatureTooltip('enterprise', idx)}
                    onMouseLeave={() => toggleFeatureTooltip('enterprise', idx)}
                  />
                  {showFeatureTooltip[`enterprise-${idx}`] && (
                    <div className="feature-tooltip">{featureDetails[feature]}</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <button 
            className="plan-button" 
            style={getButtonStyle('enterprise')}
            onClick={() => handlePurchase('enterprise')}
          >
            Get Started <FaArrowRight className="arrow-icon" />
          </button>
        </div>
      </div>

      {/* Comparison and Information Section */}
      <div className="info-section">
        <div className="comparison-button-container">
          <button 
            className="comparison-button"
            onClick={() => setShowComparisonTable(!showComparisonTable)}
          >
            {showComparisonTable ? 'Hide Comparison' : 'Compare All Plans'}
          </button>
        </div>

        {showComparisonTable && (
          <div className="plan-comparison">
            <h2>Plan Comparison</h2>
            <div className="comparison-table-container">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Basic</th>
                    <th>Professional</th>
                    <th>Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Price ({selectedPlan})</td>
                    <td>{currencySymbols[currency]}{convertPrice(plans.basic[selectedPlan])}</td>
                    <td>{currencySymbols[currency]}{convertPrice(plans.pro[selectedPlan])}</td>
                    <td>{currencySymbols[currency]}{convertPrice(plans.enterprise[selectedPlan])}</td>
                  </tr>
                  <tr>
                    <td>Storage</td>
                    <td>50 projects</td>
                    <td>250 projects</td>
                    <td>Unlimited</td>
                  </tr>
                  <tr>
                    <td>Support</td>
                    <td>Email only<br />(48hr response)</td>
                    <td>Priority email & chat<br />(24hr response)</td>
                    <td>24/7 all channels<br />(1hr response)</td>
                  </tr>
                  <tr>
                    <td>User Access</td>
                    <td>1 user</td>
                    <td>Up to 5 users</td>
                    <td>Unlimited users</td>
                  </tr>
                  <tr>
                    <td>Custom Branding</td>
                    <td><span className="no-feature">✕</span></td>
                    <td><span className="limited-feature">Limited</span></td>
                    <td><span className="yes-feature">✓</span></td>
                  </tr>
                  <tr>
                    <td>Export Formats</td>
                    <td>3 formats</td>
                    <td>10 formats</td>
                    <td>All formats</td>
                  </tr>
                  <tr>
                    <td>Workspace Integration</td>
                    <td><span className="no-feature">✕</span></td>
                    <td><span className="no-feature">✕</span></td>
                    <td><span className="yes-feature">✓</span></td>
                  </tr>
                  <tr>
                    <td>Dedicated Manager</td>
                    <td><span className="no-feature">✕</span></td>
                    <td><span className="no-feature">✕</span></td>
                    <td><span className="yes-feature">✓</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          <div className="faq-item">
            <h3><FaRegLightbulb className="faq-icon" /> Can I try KAIRA before paying?</h3>
            <p>No, KAIRA does not offer a free trial. Access is granted only after purchasing a plan.</p>
          </div>
          <div className="faq-item">
            <h3><FaRegLightbulb className="faq-icon" /> When will I receive login credentials?</h3>
            <p>After successful payment, an admin will contact you via email with your login account within 24 hours.</p>
          </div>
          <div className="faq-item">
            <h3><FaRegLightbulb className="faq-icon" /> Can I get a refund?</h3>
            <p>Since accounts are manually created and assigned, refunds are not supported. Please choose your plan carefully.</p>
          </div>
          <div className="faq-item">
            <h3><FaRegLightbulb className="faq-icon" /> Can I upgrade my plan later?</h3>
            <p>Yes, you can upgrade your plan at any time. The price difference will be prorated for your billing cycle.</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to transform your design workflow?</h2>
          <p>Join thousands of satisfied customers using KAIRA's AI-powered tools</p>
          <a className="cta-button" href="/contact">Get Started Today</a>
        </div>
      </div>

      <div className="contact-support">
        <p>Still have questions? <a href="/contact">Contact our team</a> or email us directly at <strong>support@kaira.app</strong></p>
        <p>Already have an account? <a href="/login">Log in here</a></p>
      </div>
    </div>
  );
};

export default GetAccount;