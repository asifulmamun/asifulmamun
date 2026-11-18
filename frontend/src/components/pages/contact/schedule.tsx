'use client';

import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Clock3, Globe2 } from 'lucide-react';

export type ScheduleWindow = { start: string; end: string; channel: string };

export type ContactScheduleContent = {
  timezone: string;
  timezoneLabel: string;
  weekend: ScheduleWindow[];
  weekday: ScheduleWindow[];
};

type ScheduleProps = {
  content: ContactScheduleContent;
  title: string;
  timezoneTitle: string;
  deviceTimezoneTitle: string;
  availableNow: string;
  outsideHours: string;
  whatsappWindow: string;
  emailAlways: string;
  intro: string;
};

function timeParts(date: Date, timezone: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);

  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value;
  return { weekday: value('weekday') ?? '', hour: Number(value('hour') ?? 0), minute: Number(value('minute') ?? 0) };
}

function formatClock(date: Date, timezone: string) {
  return new Intl.DateTimeFormat(undefined, {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(date);
}

function windowMinutes(window: ScheduleWindow) {
  const toMinute = (value: string) => {
    const [hour, minute] = value.split(':').map(Number);
    return hour * 60 + minute;
  };
  return { start: toMinute(window.start), end: toMinute(window.end) };
}

export default function Schedule(props: ScheduleProps) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(timer);
  }, []);

  const availability = useMemo(() => {
    const bd = timeParts(now, props.content.timezone);
    const minute = bd.hour * 60 + bd.minute;
    const isWeekend = bd.weekday === 'Sat' || bd.weekday === 'Sun';
    const windows = isWeekend ? props.content.weekend : props.content.weekday;
    return {
      isOnline: windows.some((window) => {
        const range = windowMinutes(window);
        return minute >= range.start && minute < range.end;
      }),
      windows,
      isWeekend,
    };
  }, [now, props.content]);

  const bdTime = formatClock(now, props.content.timezone);
  const bdDate = new Intl.DateTimeFormat(undefined, { timeZone: props.content.timezone, weekday: 'short', day: 'numeric', month: 'short' }).format(now);
  const deviceTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local timezone';
  const deviceTime = formatClock(now, Intl.DateTimeFormat().resolvedOptions().timeZone);

  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-slate-50/70 p-5 sm:p-7 dark:border-white/10 dark:bg-slate-900/50">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">{props.title}</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold">{availability.isOnline ? props.availableNow : props.outsideHours}</h2>
        </div>
        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${availability.isOnline ? 'bg-base/10 text-base' : 'bg-slate-200/70 text-slate-500 dark:bg-white/10 dark:text-slate-400'}`}>
          <span className={`h-2 w-2 rounded-full ${availability.isOnline ? 'animate-pulse bg-base' : 'bg-slate-400'}`} />
          {availability.isOnline ? 'Online' : 'Offline'}
        </span>
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">{props.intro}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[20px] border border-slate-200/80 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-950/40">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Clock3 className="h-4 w-4 text-accent" /> {props.timezoneTitle}</div>
          <p className="mt-3 font-serif text-2xl font-semibold">{bdTime}</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{bdDate} · {props.content.timezoneLabel}</p>
        </div>
        <div className="rounded-[20px] border border-slate-200/80 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-950/40">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Globe2 className="h-4 w-4 text-accent" /> {props.deviceTimezoneTitle}</div>
          <p className="mt-3 font-serif text-2xl font-semibold">{deviceTime}</p>
          <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">{deviceTimezone}</p>
        </div>
      </div>

      <div className="mt-6 border-t border-slate-200/80 pt-5 dark:border-white/10">
        <div className="flex items-center gap-2 text-sm font-semibold"><CalendarDays className="h-4 w-4 text-accent" /> {availability.isWeekend ? 'Saturday – Sunday' : 'Monday – Friday'}</div>
        <div className="mt-3 space-y-2">
          {(availability.isWeekend ? props.content.weekend : props.content.weekday).map((window) => (
            <div key={`${window.start}-${window.end}`} className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3 text-sm dark:bg-slate-950/40">
              <span>{window.start} – {window.end}</span>
              <span className="text-xs font-medium text-accent">WhatsApp</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-6 text-slate-500 dark:text-slate-400">{props.whatsappWindow}</p>
      </div>

      <p className="mt-4 rounded-2xl bg-accent/8 px-4 py-3 text-xs leading-6 text-slate-600 dark:text-slate-300">{props.emailAlways}</p>
    </section>
  );
}
