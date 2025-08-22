export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 mt-10 border-t">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        
        {/* Branding or Copyright */}
        <p className="text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} Sabrina Hossain Lira. All rights reserved.
        </p>

        {/* Navigation or Social Links */}
        
      </div>
    </footer>
  );
}