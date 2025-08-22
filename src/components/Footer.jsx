export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-500 py-6 mt-12">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
        <span className="text-sm">
          © {new Date().getFullYear()} <span className="font-semibold">Mini Shop</span>. All rights reserved.
        </span>
        
      </div>
    </footer>
  );
}
