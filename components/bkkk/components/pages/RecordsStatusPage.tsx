'use client';
import { useEffect, useState } from 'react';
import { analyzeAllRecords } from '@/utils/recordsAnalyzer';
import { Status } from '@/utils/dateStatusHelper';

interface RecordSummary {
  slug: string;
  title: string;
  artist?: string;
  dates: string;
  status: Status;
}

interface CategorySummary {
  category: string;
  upcoming: RecordSummary[];
  current: RecordSummary[];
  past: RecordSummary[];
  total: number;
}

export function RecordsStatusPage() {
  const [analysis, setAnalysis] = useState<CategorySummary[]>([]);

  useEffect(() => {
    const data = analyzeAllRecords();
    setAnalysis(data);
  }, []);

  const getTotals = () => {
    return {
      exhibitions: analysis[0]?.total || 0,
      movingImage: analysis[1]?.total || 0,
      residency: analysis[2]?.total || 0,
      grand: analysis.reduce((sum, cat) => sum + cat.total, 0),
      upcoming: analysis.reduce((sum, cat) => sum + cat.upcoming.length, 0),
      current: analysis.reduce((sum, cat) => sum + cat.current.length, 0),
      past: analysis.reduce((sum, cat) => sum + cat.past.length, 0)
    };
  };

  const totals = getTotals();

  const StatusBadge = ({ status }: { status: Status }) => {
    const styles = {
      upcoming: 'bg-blue-100 text-blue-800 border-blue-200',
      current: 'bg-green-100 text-green-800 border-green-200',
      past: 'bg-gray-100 text-gray-800 border-gray-200'
    };

    const icons = {
      upcoming: '✨',
      current: '🎨',
      past: '📚'
    };

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border ${styles[status]}`}>
        <span>{icons[status]}</span>
        <span className="uppercase tracking-wide">{status}</span>
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-12 px-[5%]">
        <div className="max-w-7xl mx-auto">
          <h1 className="mb-3">Bangkok Kunsthalle</h1>
          <p className="text-xl opacity-80">Records Status Report</p>
          <p className="text-sm opacity-60 mt-2">Updated: March 17, 2026</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="px-[5%] py-12 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto">
          <h2 className="mb-6">Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Records */}
            <div className="bg-white p-6 rounded-lg border-2 border-black">
              <div className="text-3xl font-bold mb-2">{totals.grand}</div>
              <div className="text-sm opacity-60">Total Records</div>
            </div>

            {/* By Category */}
            <div className="bg-white p-6 rounded-lg border">
              <div className="text-xl font-bold mb-3">By Category</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Exhibitions:</span>
                  <span className="font-mono">{totals.exhibitions}</span>
                </div>
                <div className="flex justify-between">
                  <span>Moving Image:</span>
                  <span className="font-mono">{totals.movingImage}</span>
                </div>
                <div className="flex justify-between">
                  <span>Residency:</span>
                  <span className="font-mono">{totals.residency}</span>
                </div>
              </div>
            </div>

            {/* By Status */}
            <div className="bg-white p-6 rounded-lg border">
              <div className="text-xl font-bold mb-3">By Status</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span>✨ Upcoming:</span>
                  <span className="font-mono">{totals.upcoming}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>🎨 Current:</span>
                  <span className="font-mono">{totals.current}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>📚 Past:</span>
                  <span className="font-mono">{totals.past}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
              <div className="text-xl font-bold mb-3">Active Now</div>
              <div className="text-3xl font-bold text-green-700">{totals.current}</div>
              <div className="text-sm opacity-60 mt-1">Current Programs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Records */}
      <div className="px-[5%] py-12">
        <div className="max-w-7xl mx-auto space-y-12">
          {analysis.map((category) => (
            <div key={category.category} className="border rounded-lg overflow-hidden">
              {/* Category Header */}
              <div className="bg-black text-white px-6 py-4 flex justify-between items-center">
                <h3 className="text-xl">{category.category}</h3>
                <span className="text-sm opacity-75">Total: {category.total}</span>
              </div>

              {/* Status Sections */}
              <div className="p-6 space-y-8">
                {/* Upcoming */}
                {category.upcoming.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <StatusBadge status="upcoming" />
                      <span className="text-sm opacity-60">({category.upcoming.length} records)</span>
                    </div>
                    <div className="space-y-4">
                      {category.upcoming.map((record) => (
                        <div key={record.slug} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="font-medium mb-1">{record.title}</div>
                          {record.artist && (
                            <div className="text-sm opacity-75 mb-1">Artist: {record.artist}</div>
                          )}
                          <div className="text-sm opacity-60 mb-2">{record.dates}</div>
                          <div className="text-xs font-mono opacity-50">slug: {record.slug}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Current */}
                {category.current.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <StatusBadge status="current" />
                      <span className="text-sm opacity-60">({category.current.length} records)</span>
                    </div>
                    <div className="space-y-4">
                      {category.current.map((record) => (
                        <div key={record.slug} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="font-medium mb-1">{record.title}</div>
                          {record.artist && (
                            <div className="text-sm opacity-75 mb-1">Artist: {record.artist}</div>
                          )}
                          <div className="text-sm opacity-60 mb-2">{record.dates}</div>
                          <div className="text-xs font-mono opacity-50">slug: {record.slug}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Past */}
                {category.past.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <StatusBadge status="past" />
                      <span className="text-sm opacity-60">({category.past.length} records)</span>
                    </div>
                    <div className="space-y-4">
                      {category.past.map((record) => (
                        <div key={record.slug} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                          <div className="font-medium mb-1">{record.title}</div>
                          {record.artist && (
                            <div className="text-sm opacity-75 mb-1">Artist: {record.artist}</div>
                          )}
                          <div className="text-sm opacity-60 mb-2">{record.dates}</div>
                          <div className="text-xs font-mono opacity-50">slug: {record.slug}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="px-[5%] py-8 bg-gray-50 border-t text-center text-sm opacity-60">
        Status determined automatically based on date ranges (Reference date: March 10, 2026)
      </div>
    </div>
  );
}
