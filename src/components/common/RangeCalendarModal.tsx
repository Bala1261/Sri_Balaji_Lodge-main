import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Check, Clock } from 'lucide-react';

export interface RangeCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  onSelectRange: (start: string, end: string) => void;
  activeField?: 'checkIn' | 'checkOut';
}

// Utility: format a date object to YYYY-MM-DD
export const formatDateKey = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

// Utility: format YYYY-MM-DD to readable "DD MMM YYYY"
export const formatDisplayDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  if (!y || !m || !d) return dateStr;
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

// Utility: format YYYY-MM-DD to compact "DD MMM"
export const formatCompactDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  if (!y || !m || !d) return dateStr;
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  });
};

// Utility: calculate nights between two YYYY-MM-DD dates
export const calculateNights = (start: string, end: string): number => {
  if (!start || !end) return 0;
  const [y1, m1, d1] = start.split('-').map(Number);
  const [y2, m2, d2] = end.split('-').map(Number);
  const dt1 = new Date(y1, m1 - 1, d1).getTime();
  const dt2 = new Date(y2, m2 - 1, d2).getTime();
  const diff = Math.round((dt2 - dt1) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
};

export const RangeCalendarModal: React.FC<RangeCalendarModalProps> = ({
  isOpen,
  onClose,
  startDate,
  endDate,
  onSelectRange,
}) => {
  // Current view month (defaults to start date or today)
  const today = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  }, []);

  const [viewDate, setViewDate] = useState<Date>(() => {
    if (startDate) {
      const [y, m] = startDate.split('-').map(Number);
      return new Date(y, m - 1, 1);
    }
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const [tempStart, setTempStart] = useState<string>(startDate || '');
  const [tempEnd, setTempEnd] = useState<string>(endDate || '');
  const [hoverDate, setHoverDate] = useState<string | null>(null);
  const [selectionStep, setSelectionStep] = useState<'start' | 'end'>('start');

  // Sync state whenever opened
  useEffect(() => {
    if (isOpen) {
      setTempStart(startDate || '');
      setTempEnd(endDate || '');
      setSelectionStep('start');
      if (startDate) {
        const [y, m] = startDate.split('-').map(Number);
        setViewDate(new Date(y, m - 1, 1));
      }
    }
  }, [isOpen, startDate, endDate]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const selectedNights = calculateNights(tempStart, tempEnd);

  // Month navigation
  const prevMonth = () => {
    const minMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const prev = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
    if (prev >= minMonth) {
      setViewDate(prev);
    }
  };

  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const canGoPrev = useMemo(() => {
    const minMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return viewDate > minMonth;
  }, [viewDate, today]);

  // Quick Preset Actions
  const applyPresetTonight = () => {
    const start = new Date(today);
    const end = new Date(today);
    end.setDate(today.getDate() + 1);

    const sStr = formatDateKey(start);
    const eStr = formatDateKey(end);
    setTempStart(sStr);
    setTempEnd(eStr);
    onSelectRange(sStr, eStr);
    setTimeout(onClose, 250);
  };

  const applyPresetThisWeekend = () => {
    const now = new Date(today);
    const day = now.getDay(); // 0 is Sun, 5 is Fri, 6 is Sat
    const start = new Date(now);
    const end = new Date(now);

    if (day <= 5) {
      // Ahead to this Friday
      const daysUntilFri = 5 - day;
      start.setDate(now.getDate() + daysUntilFri);
      end.setDate(start.getDate() + 2); // Friday to Sunday
    } else if (day === 6) {
      // Today is Saturday -> Saturday to Sunday
      start.setDate(now.getDate());
      end.setDate(now.getDate() + 1);
    } else {
      // Today is Sunday -> Next weekend
      start.setDate(now.getDate() + 5);
      end.setDate(start.getDate() + 2);
    }

    const sStr = formatDateKey(start);
    const eStr = formatDateKey(end);
    setTempStart(sStr);
    setTempEnd(eStr);
    onSelectRange(sStr, eStr);
    setTimeout(onClose, 250);
  };

  const applyPresetNextWeekend = () => {
    const now = new Date(today);
    const day = now.getDay();
    const daysUntilNextFri = ((5 - day + 7) % 7) + 7;
    const start = new Date(now);
    start.setDate(now.getDate() + daysUntilNextFri);
    const end = new Date(start);
    end.setDate(start.getDate() + 2);

    const sStr = formatDateKey(start);
    const eStr = formatDateKey(end);
    setTempStart(sStr);
    setTempEnd(eStr);
    onSelectRange(sStr, eStr);
    setTimeout(onClose, 250);
  };

  // Day click logic
  const handleDateClick = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    const clicked = new Date(y, m - 1, d);
    clicked.setHours(0, 0, 0, 0);

    if (clicked < today) return; // disabled

    if (selectionStep === 'start' || !tempStart || (tempStart && tempEnd)) {
      // Pick start date
      setTempStart(dateStr);
      setTempEnd('');
      setSelectionStep('end');
    } else if (selectionStep === 'end') {
      // Pick end date
      const [sy, sm, sd] = tempStart.split('-').map(Number);
      const startDt = new Date(sy, sm - 1, sd);
      startDt.setHours(0, 0, 0, 0);

      if (clicked < startDt) {
        // User clicked an earlier date, treat as new start
        setTempStart(dateStr);
        setTempEnd('');
        setSelectionStep('end');
      } else if (clicked.getTime() === startDt.getTime()) {
        // Same day: default to 1 night stay (next day)
        const nextDay = new Date(clicked);
        nextDay.setDate(clicked.getDate() + 1);
        const nextDayStr = formatDateKey(nextDay);
        setTempEnd(nextDayStr);
        onSelectRange(dateStr, nextDayStr);
        setTimeout(onClose, 300);
      } else {
        // Valid end date selected!
        setTempEnd(dateStr);
        onSelectRange(tempStart, dateStr);
        setTimeout(onClose, 300);
      }
    }
  };

  // Helper to generate month days
  const renderMonth = (monthOffset: number) => {
    const targetMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + monthOffset, 1);
    const year = targetMonth.getFullYear();
    const month = targetMonth.getMonth();

    const monthName = targetMonth.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days = [];
    // Blank padding for days before the 1st
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    // Days of the month
    for (let d = 1; d <= totalDays; d++) {
      days.push(new Date(year, month, d));
    }

    return (
      <div className="flex-1 min-w-[280px]">
        {/* Month Header */}
        <div className="text-center font-semibold text-sm text-white mb-4 tracking-tight py-1 border-b border-white/10">
          {monthName}
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
            <span key={d} className="text-[11px] font-semibold text-white/50 uppercase">
              {d}
            </span>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((dateObj, idx) => {
            if (!dateObj) {
              return <div key={`empty-${idx}`} className="w-full aspect-square" />;
            }

            dateObj.setHours(0, 0, 0, 0);
            const dateStr = formatDateKey(dateObj);
            const isPast = dateObj < today;
            const isToday = dateObj.getTime() === today.getTime();

            const isStart = tempStart === dateStr;
            const isEnd = tempEnd === dateStr;
            const isInRange =
              tempStart &&
              tempEnd &&
              dateStr > tempStart &&
              dateStr < tempEnd;

            // Hover preview when picking end date
            const isHoverRange =
              selectionStep === 'end' &&
              tempStart &&
              !tempEnd &&
              hoverDate &&
              hoverDate > tempStart &&
              dateStr > tempStart &&
              dateStr <= hoverDate;

            let tileClasses =
              'relative w-full aspect-square flex flex-col items-center justify-center text-xs transition-all font-medium min-h-[42px] sm:min-h-[40px] select-none rounded-none ';

            if (isPast) {
              tileClasses += 'text-white/20 cursor-not-allowed pointer-events-none ';
            } else if (isStart || isEnd) {
              tileClasses += 'bg-white text-[#12141a] font-bold shadow-md z-10 ';
            } else if (isInRange) {
              tileClasses += 'bg-white/15 text-white ';
            } else if (isHoverRange) {
              tileClasses += 'bg-white/10 text-blue-200 border-dashed border-white/30 ';
            } else {
              tileClasses += 'text-white/85 hover:bg-white/15 hover:text-white cursor-pointer ';
            }

            return (
              <button
                key={dateStr}
                type="button"
                disabled={isPast}
                onClick={() => handleDateClick(dateStr)}
                onMouseEnter={() => !isPast && setHoverDate(dateStr)}
                onMouseLeave={() => setHoverDate(null)}
                className={tileClasses}
                aria-label={`Select ${dateStr}`}
              >
                <span>{dateObj.getDate()}</span>
                {isToday && !isStart && !isEnd && (
                  <span className="w-1 h-1 bg-blue-400 rounded-none absolute bottom-1.5" />
                )}
                {isStart && (
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#12141a] leading-none absolute -bottom-0.5">
                    IN
                  </span>
                )}
                {isEnd && (
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#12141a] leading-none absolute -bottom-0.5">
                    OUT
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 modal-backdrop-glass"
        />

        {/* Modal Window: Bottom-sheet on mobile (<768px), Sharp box popover on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 25, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl glass-calendar-popover text-white overflow-hidden z-10 rounded-none my-0 sm:my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="p-4 sm:p-6 pb-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-blue-300 font-semibold mb-1">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>Select Stay Dates</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                {tempStart && tempEnd ? (
                  <span>
                    {formatDisplayDate(tempStart)} &ndash; {formatDisplayDate(tempEnd)}{' '}
                    <span className="text-xs font-normal text-white/70 ml-1">
                      ({selectedNights} {selectedNights === 1 ? 'Night' : 'Nights'})
                    </span>
                  </span>
                ) : tempStart ? (
                  <span>
                    Arrive: {formatDisplayDate(tempStart)} &middot;{' '}
                    <span className="text-blue-300 text-sm font-normal">Select Check-out Date</span>
                  </span>
                ) : (
                  <span>Select Arrival & Departure</span>
                )}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="w-12 h-12 rounded-none bg-white/10 border border-white/15 text-white hover:bg-white/20 flex items-center justify-center transition-colors min-h-[48px] min-w-[48px]"
              aria-label="Close calendar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick-Select Shortcuts (1-Click Presets) */}
          <div className="px-4 sm:px-6 py-3 bg-white/[0.04] border-b border-white/10 flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-white/50 font-semibold mr-1 hidden sm:inline">
              Shortcuts:
            </span>
            <button
              type="button"
              onClick={applyPresetTonight}
              className="px-3.5 py-1.5 rounded-none bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white font-medium transition-all min-h-[38px] active:scale-95"
            >
              Tonight (1 Night)
            </button>
            <button
              type="button"
              onClick={applyPresetThisWeekend}
              className="px-3.5 py-1.5 rounded-none bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white font-medium transition-all min-h-[38px] active:scale-95"
            >
              This Weekend (Fri–Sun)
            </button>
            <button
              type="button"
              onClick={applyPresetNextWeekend}
              className="px-3.5 py-1.5 rounded-none bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white font-medium transition-all min-h-[38px] active:scale-95"
            >
              Next Weekend
            </button>
          </div>

          {/* Calendar Months Display */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1">
            {/* Navigation Arrows */}
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                onClick={prevMonth}
                disabled={!canGoPrev}
                className={`p-2 rounded-none border border-white/15 text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  canGoPrev ? 'bg-white/10 hover:bg-white/20' : 'opacity-20 cursor-not-allowed'
                }`}
                aria-label="Previous month"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="text-xs text-white/60 font-light flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-300" />
                <span>Check-in: 12:00 PM &middot; Check-out: 11:00 AM</span>
              </div>

              <button
                type="button"
                onClick={nextMonth}
                className="p-2 rounded-none bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Next month"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Responsive Dual Month Layout */}
            <div className="flex flex-col md:flex-row gap-6 lg:gap-8 pt-2">
              {renderMonth(0)}
              <div className="hidden md:block w-px bg-white/10 my-2" />
              <div className="hidden md:block flex-1">{renderMonth(1)}</div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-4 sm:p-6 border-t border-white/10 bg-white/[0.03] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                setTempStart('');
                setTempEnd('');
                setSelectionStep('start');
              }}
              className="text-xs text-white/60 hover:text-white transition-colors underline py-2 min-h-[44px] px-2"
            >
              Clear Selection
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-none bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white font-medium transition-colors min-h-[48px]"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!tempStart || !tempEnd}
                onClick={() => {
                  if (tempStart && tempEnd) {
                    onSelectRange(tempStart, tempEnd);
                    onClose();
                  }
                }}
                className={`btn-primary-luxury px-6 py-2.5 text-xs sm:text-sm font-semibold gap-1.5 min-h-[48px] rounded-none ${
                  !tempStart || !tempEnd ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''
                }`}
              >
                <Check className="w-4 h-4 text-lodge-primary" />
                <span>Confirm Dates ({selectedNights} {selectedNights === 1 ? 'Night' : 'Nights'})</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RangeCalendarModal;
