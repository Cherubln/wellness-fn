import React from 'react'

const Loader = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <span className="loading loading-ring text-secondary loading-lg"></span>
    </div>
  );
}

export default Loader