'use client';

import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Clock3, Globe2 } from 'lucide-react';

export type ScheduleWindow = {
  start: string;
  end: string;
  kind: string;
  channel: string;
  days: number[];
};

export type ContactScheduleContent = {
  timezone: string;
  timezoneLabel: string;
  locale: string;
  windows: ScheduleWindow[];
};

type ScheduleProps = {
  content: ContactScheduleContent;
  title: string;
  timezoneTitle: string;
  deviceTimezoneTitle: string;
  availableNow: string;
  outsideHours: string;
  checkingAvailability: string;
  whatsappWindow: string;
  emailAlways: string;
  intro: string;
  upcomingTitle: string;
  dhakaColumn: string;
  localColumn: string;
  weekdaysLabel: string;
  weekendLabel: string;
  whatsappChannel: string;
};

type DateParts = { year: number; month: number; day: number; weekday: number; hour: number; minute: number };

function dateParts(date: Date, timezone: string): DateParts {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? '';
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return {
    year: Number(get('year')),
    month: Number(get('month')),
    day: Number(get('day')),
    weekday: weekdays.indexOf(get('weekday')),
    hour: Number(get('hour')),
    minute: Number(get('minute')),
  };
}

function formatClock(date: Date, timezone: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(date);
}

function formatScheduleTime(date: Date, timezone: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

function zonedDateTimeToInstant(parts: DateParts, hour: number, minute: number, timezone: string) {
  const targetAsUtc = Date.UTC(parts.year, parts.month - 1, parts.day, hour, minute);
  let timestamp = targetAsUtc;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const observed = dateParts(new Date(timestamp), timezone);
    const observedAsUtc = Date.UTC(observed.year, observed.month - 1, observed.day, observed.hour, observed.minute);
    timestamp += targetAsUtc - observedAsUtc;
  }
  return new Date(timestamp);
}

function upcomingWindows(now: Date, content: ContactScheduleContent, localTimezone: string) {
  const today = dateParts(now, content.timezone);
  const todayAsUtc = Date.UTC(today.year, today.month - 1, today.day);
  return Array.from({ length: 7 }, (_, offset) => {
    const calendarDate = new Date(todayAsUtc + offset * 86_400_000);
    const dayParts: DateParts = {
      ...today,
      year: calendarDate.getUTCFullYear(),
      month: calendarDate.getUTCMonth() + 1,
      day: calendarDate.getUTCDate(),
      weekday: calendarDate.getUTCDay(),
    };
    return content.windows
      .filter((window) => window.days.includes(dayParts.weekday))
      .map((window) => {
        const [startHour, startMinute] = window.start.split(':').map(Number);
        const [endHour, endMinute] = window.end.split(':').map(Number);
        const startsAt = zonedDateTimeToInstant(dayParts, startHour, startMinute, content.timezone);
        const endParts = endHour * 60 + endMinute <= startHour * 60 + startMinute
          ? { ...dayParts, ...(() => {
            const nextDay = new Date(Date.UTC(dayParts.year, dayParts.month - 1, dayParts.day + 1));
            return { year: nextDay.getUTCFullYear(), month: nextDay.getUTCMonth() + 1, day: nextDay.getUTCDate(), weekday: nextDay.getUTCDay() };
          })() }
          : dayParts;
        const endsAt = zonedDateTimeToInstant(endParts, endHour, endMinute, content.timezone);
        return { ...window, startsAt, endsAt };
      });
  }).flat()
    .filter((window) => window.endsAt.getTime() > now.getTime())
    .sort((first, second) => first.startsAt.getTime() - second.startsAt.getTime())
    .map((window) => ({
      ...window,
      startsDhaka: formatScheduleTime(window.startsAt, content.timezone, content.locale),
      endsDhaka: formatScheduleTime(window.endsAt, content.timezone, content.locale),
      startsLocal: formatScheduleTime(window.startsAt, localTimezone, content.locale),
      endsLocal: formatScheduleTime(window.endsAt, localTimezone, content.locale),
      isCurrent: window.startsAt.getTime() <= now.getTime() && window.endsAt.getTime() > now.getTime(),
    }));
}

export default function Schedule(props: ScheduleProps) {
  const [now, setNow] = useState<Date | null>(null);
  const [deviceTimezone, setDeviceTimezone] = useState<string | null>(null);

  useEffect(() => {
    setDeviceTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local timezone');
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(timer);
  }, []);

  const currentDhakaTime = now ? dateParts(now, props.content.timezone) : null;
  const deviceTime = now && deviceTimezone ? formatClock(now, deviceTimezone, props.content.locale) : '--:--';
  const dhakaTime = now ? formatClock(now, props.content.timezone, props.content.locale) : '--:--';
  const isOnline = currentDhakaTime ? props.content.windows.some((window) => {
    if (!window.days.includes(currentDhakaTime.weekday)) return false;
    const minute = currentDhakaTime.hour * 60 + currentDhakaTime.minute;
    const [startHour, startMinute] = window.start.split(':').map(Number);
    const [endHour, endMinute] = window.end.split(':').map(Number);
    return minute >= startHour * 60 + startMinute && minute < endHour * 60 + endMinute;
  }) : false;
  const nextWindows = useMemo(
    () => now && deviceTimezone ? upcomingWindows(now, props.content, deviceTimezone) : [],
    [now, props.content, deviceTimezone],
  );

  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-slate-50/70 p-5 sm:p-7 dark:border-white/10 dark:bg-slate-900/50">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">{props.title}</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold">{!now ? props.checkingAvailability : isOnline ? props.availableNow : props.outsideHours}</h2>
        </div>
        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${isOnline ? 'bg-base/10 text-base' : 'bg-slate-200/70 text-slate-500 dark:bg-white/10 dark:text-slate-400'}`}>
          <span className={`h-2 w-2 rounded-full ${isOnline ? 'animate-pulse bg-base' : 'bg-slate-400'}`} />
          {!now ? props.checkingAvailability : isOnline ? props.availableNow : props.outsideHours}
        </span>
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">{props.intro}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[20px] border border-slate-200/80 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-950/40">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Clock3 className="h-4 w-4 text-accent" /> {props.timezoneTitle}</div>
          <p className="mt-3 font-serif text-2xl font-semibold">{dhakaTime}</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{props.content.timezoneLabel}</p>
        </div>
        <div className="rounded-[20px] border border-slate-200/80 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-950/40">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Globe2 className="h-4 w-4 text-accent" /> {props.deviceTimezoneTitle}</div>
          <p className="mt-3 font-serif text-2xl font-semibold">{deviceTime}</p>
          <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">{deviceTimezone}</p>
        </div>
      </div>

      <div className="mt-6 border-t border-slate-200/80 pt-5 dark:border-white/10">
        <div className="flex items-center gap-2 text-sm font-semibold"><CalendarDays className="h-4 w-4 text-accent" /> {props.upcomingTitle}</div>
        <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {nextWindows.map((window) => (
            <div key={`${window.startsAt.toISOString()}-${window.channel}`} className={`grid gap-3 rounded-2xl px-4 py-3 text-sm sm:grid-cols-2 ${window.isCurrent ? 'bg-base/10 text-base' : 'bg-white/70 dark:bg-slate-950/40'}`}>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{props.dhakaColumn} · {props.content.timezoneLabel}</p>
                <p className="mt-1">{window.startsDhaka} – {window.endsDhaka}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{props.localColumn} · {deviceTimezone}</p>
                <p className="mt-1">{window.startsLocal} – {window.endsLocal}</p>
              </div>
              <p className="text-xs font-medium text-accent sm:col-span-2">{window.isCurrent ? props.availableNow : window.kind === 'weekdays' ? props.weekdaysLabel : props.weekendLabel} · {props.whatsappChannel}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-6 text-slate-500 dark:text-slate-400">{props.whatsappWindow}</p>
      </div>

      <p className="mt-4 rounded-2xl bg-accent/8 px-4 py-3 text-xs leading-6 text-slate-600 dark:text-slate-300">{props.emailAlways}</p>
    </section>
  );
}
