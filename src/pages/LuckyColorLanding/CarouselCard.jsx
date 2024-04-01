export default function CarouselCard({ url }) {
  return (
    <div className="card">
      <img
        src={
          url ||
          "https://images.unsplash.com/photo-1559070081-648fb00b2ed1?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTE4OTExNzd8&ixlib=rb-4.0.3&q=85"
        }
      />
      <div className="card-text-content">
        <h3>Fancy Product Title</h3>
        <button>Buy Now</button>
      </div>
    </div>
  );
}