import React from 'react';

interface IProps {
  className?: string;
}

const Spinner = ({className}: IProps) => {
  return (
      <div className={`flex items-center ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
  )
}

export default Spinner