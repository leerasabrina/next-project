export default function Banner() {
  return (
    <div
      className="w-full h-[300px] bg-cover bg-center shadow-lg flex items-center justify-center text-white"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/7tN4kWyQ/pexels-adonyi-foto-1414651.jpg')",
      }}
    >
      <div className="bg-black/50 p-6 rounded-xl">
        <h1 className="text-4xl font-bold">Welcome to Our Shop!</h1>
        <p className="text-lg mt-2">Fresh products, best prices, every day</p>
      </div>
    </div>
  );
}
