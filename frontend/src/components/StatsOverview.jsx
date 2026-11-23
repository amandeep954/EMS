import React from 'react';
import { Users, UserCheck, UserX, Building2 } from 'lucide-react';

const StatsOverview = ({ stats, loading }) => {
  const cards = [
    {
      title: 'Total Employees',
      value: stats.total,
      icon: Users,
      color: 'blue',
      bgLight: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-100',
    },
    {
      title: 'Active Employees',
      value: stats.active,
      icon: UserCheck,
      color: 'emerald',
      bgLight: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      borderColor: 'border-emerald-100',
    },
    {
      title: 'Inactive Employees',
      value: stats.inactive,
      icon: UserX,
      color: 'amber',
      bgLight: 'bg-amber-50',
      textColor: 'text-amber-600',
      borderColor: 'border-amber-100',
    },
    {
      title: 'Departments',
      value: stats.departmentsCount,
      icon: Building2,
      color: 'purple',
      bgLight: 'bg-purple-50',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={`bg-white rounded-xl p-5 border ${card.borderColor} shadow-sm hover:shadow-md transition-all`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {card.title}
                </p>
                <div className="mt-2 flex items-baseline">
                  {loading ? (
                    <div className="h-8 w-16 bg-slate-200 animate-pulse rounded"></div>
                  ) : (
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      {card.value}
                    </span>
                  )}
                </div>
              </div>
              <div className={`p-3 rounded-xl ${card.bgLight} ${card.textColor}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsOverview;
