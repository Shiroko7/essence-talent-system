import React, { useMemo } from 'react';
import { ChangelogEntry } from '../../types/changelog';
import ChangelogEntryCard from './ChangelogEntryCard';
import ChangelogEmpty from './ChangelogEmpty';

interface ChangelogTimelineProps {
  entries: ChangelogEntry[];
}

interface GroupedCommit {
  commitHash: string;
  commitMessage: string;
  date: string;
  entries: ChangelogEntry[];
}

const ChangelogTimeline: React.FC<ChangelogTimelineProps> = ({ entries }) => {
  // Group entries by commit
  const groupedCommits = useMemo(() => {
    const groups = new Map<string, ChangelogEntry[]>();

    entries.forEach(entry => {
      if (!groups.has(entry.commitHash)) {
        groups.set(entry.commitHash, []);
      }
      groups.get(entry.commitHash)!.push(entry);
    });

    // Convert to array with commit info and sort by date (newest first)
    return Array.from(groups.entries())
      .map(([commitHash, entries]): GroupedCommit => ({
        commitHash,
        commitMessage: entries[0].commitMessage,
        date: entries[0].date,
        entries
      }))
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });
  }, [entries]);

  if (entries.length === 0) {
    return <ChangelogEmpty />;
  }

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8">
      {groupedCommits.map(({ commitHash, commitMessage, date, entries }) => (
        <div key={commitHash} className="space-y-4">
          {/* Commit header */}
          <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm py-3 border-b border-gray-700">
            <div className="flex items-start gap-3">
              <span className="font-mono text-xs bg-gray-800 px-2 py-1 rounded text-blue-400 flex-shrink-0">
                {commitHash.substring(0, 7)}
              </span>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-white mb-1">
                  {commitMessage}
                </h2>
                <p className="text-sm text-gray-400">
                  {formatDate(date)} • {entries.length} change{entries.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>

          {/* Entries for this commit */}
          <div className="space-y-3">
            {entries.map(entry => (
              <ChangelogEntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChangelogTimeline;
