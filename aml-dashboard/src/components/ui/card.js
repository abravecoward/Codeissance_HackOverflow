function Card() {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src="https://via.placeholder.com/150" alt="Card image" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Card Title</div>
        <p className="text-gray-700 text-base">
          Card content goes here. Customize it with TailwindCSS as needed.
        </p>
      </div>
    </div>
  );
}

export default Card;
