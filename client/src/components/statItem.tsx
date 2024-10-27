import React from 'react'

const StatItem = ({ icon, number, text }: {icon: any, number: string, text: string}) => (
    <div className="flex flex-col items-center">
      {icon}
      <span className="text-gradient text-4xl font-bold mt-2">{number}</span>
      <span className="text-gradient text-sm mt-1 text-center">{text}</span>
    </div>
  );

export default StatItem