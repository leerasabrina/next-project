"use client";

export default function Spinner() {
  return (
    <div className="flex fixed top-20 z-50 md:left-20  w-full text-center justify-center  items-center py-2">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
