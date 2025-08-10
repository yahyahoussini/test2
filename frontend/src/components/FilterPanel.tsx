'use client';

import { ReactNode } from 'react';

type FilterPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

function PillButton({ children, selected = false }: { children: ReactNode, selected?: boolean }) {
  return (
    <button className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${selected ? 'bg-black text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
      {children}
    </button>
  );
}

export default function FilterPanel({ isOpen, onClose }: FilterPanelProps) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${isOpen ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Bottom Sheet Panel */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4 cursor-pointer" onClick={onClose} />

        <div className="space-y-6">
          <div>
            <h3 className="font-bold mb-3">Sort By</h3>
            <div className="flex flex-wrap gap-2">
              <PillButton selected>Best Selling</PillButton>
              <PillButton>Skin Care</PillButton>
              <PillButton>Shampoo</PillButton>
            </div>
          </div>

          <div>
            <label className="block font-bold mb-2" htmlFor="productName">Product Name</label>
            <input type="text" id="productName" placeholder="e.g. Argan Oil" className="w-full p-3 border rounded-lg bg-gray-100" />
          </div>

          <div>
            <label className="block font-bold mb-2" htmlFor="productCode">Product Code</label>
            <input type="text" id="productCode" placeholder="e.g. #12345" className="w-full p-3 border rounded-lg bg-gray-100" />
          </div>

          <div>
            <h3 className="font-bold mb-3">Price Range</h3>
            <div className="flex flex-wrap gap-2">
              <PillButton>$15 - $30</PillButton>
              <PillButton>$30 - $50</PillButton>
              <PillButton>$50+</PillButton>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <button className="w-full py-3 border border-gray-300 rounded-lg font-bold hover:bg-gray-100">Reset</button>
          <button className="w-full py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800">Apply</button>
        </div>
      </div>
    </>
  );
}
