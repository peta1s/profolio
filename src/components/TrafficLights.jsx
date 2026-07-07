function TrafficLights({ onClose }) {
  return (
    <div className="traffic-lights">
      <button className="close-window" type="button" aria-label="Close" onClick={onClose} />
      <span />
      <span />
    </div>
  );
}

export default TrafficLights;
