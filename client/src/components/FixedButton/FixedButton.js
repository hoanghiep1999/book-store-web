import './FixedButton.css';

export default function FixedButton () {
  return (
    <div className="fixed-btn" onClick={() => { window.scrollTo({top: "0", behavior: "smooth"}) }}>
      <i className="fas fa-arrow-up"></i>
    </div>
  );
}