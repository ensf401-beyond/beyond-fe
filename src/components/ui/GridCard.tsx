type GridItem = {
  name: string;
  image: string;
};

function GridCard({ name, image }: GridItem) {
  return (
    <div className="grid-card">
      <img className="sky-object-image" src={image} alt={name}></img>
      <p className="sky-object-name">{name}</p>
      <p className="sky-object-description">Click to view more!</p>
    </div>
  );
}

export default GridCard;
