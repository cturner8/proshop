const renderStars = (value, colour) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i}>
        <i
          style={{ color: colour }}
          className={
            value >= i + 1
              ? "fas fa-star"
              : value >= i + 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
    );
  }

  return stars;
};

export const Rating = ({ value, text, colour = "#f8e825" }) => {
  return (
    <div className="rating">
      {renderStars(value, colour)}
      <span>{text && text}</span>
    </div>
  );
};
