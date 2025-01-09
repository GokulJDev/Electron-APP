import './AboutUsSection.css';
import { assets } from '../assets/assets';

const AboutUsSection = () => {
  const cards = [
    {
      title: '2D-to-3D Conversion',
      description: 'KAIRA converts 2D floor plans into detailed 3D models, allowing users to visualize and explore spaces realistically.',
    },
    {
      title: 'Customization & Experimentation',
      description: 'Users can preview layouts, experiment with furniture placement, and customize interiors, enabling effective design choices before construction.',
    },
    {
      title: 'Enhanced Realism & VR Integration',
      description: 'KAIRA provides lifelike visualization options with VR technology, allowing immersive experiences to improve decision-making for architects, designers, and homeowners.',
    }
  ];

  return (
    <div className="about-us-section">
      <div className="content-left">
        <h1 className="abtitle animated-gradient">ABOUT US</h1>
        <div className="video-container">
          <img src={assets.video} alt="Video" className="video-gif" />
        </div>
      </div>
      <div className="content-right">
        <div className="cards-container">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className="card"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="card-content">
                <h2 className="card-title">{card.title}</h2>
                <p className="card-description">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
