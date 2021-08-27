import "./Card.css";

export const Card = ({ sets, off, on }) => {
  return (
    <div className="card center">
      <div className="card-text">{sets} SETS</div>
      <div className="card-text border">{on} SECONDS ON</div>
      <div className="card-text">{off} SECONDS OFF</div>
    </div>
  );
};
