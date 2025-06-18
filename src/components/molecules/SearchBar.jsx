import { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

const SearchBar = ({ onSearch, onClear, placeholder = "Search tasks...", className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch?.('');
    onClear?.();
  };

  return (
    <div className={`relative ${className}`}>
      <Input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder={placeholder}
        icon="Search"
        iconPosition="left"
        className="pr-12"
      />
      
      {searchTerm && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <Button
            variant="ghost"
            size="sm"
            icon="X"
            onClick={handleClear}
            className="p-1 hover:bg-surface-100 rounded-full"
          />
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;