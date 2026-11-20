'use client';

import { useEffect, useState } from 'react';
import { Clock3, Globe2 } from 'lucide-react';

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
  briefEnd: string;
  windows: ScheduleWindow[];
};

type ScheduleProps = {
  content: ContactScheduleContent;
  title: string;
  timezoneTitle: string;
  deviceTimezoneTitle: string;
  availableNow: string;
  outsideHours: string;
  briefDelay: string;
  checkingAvailability: string;
  scheduleNote: string;
  countdownLabel: string;
  availableInLabel: string;
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
    hour12: true,
  }).format(date);
}

function isValidTimezone(timezone: string) {
  if (!timezone) return false;
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: timezone });
    return true;
  } catch {
    return false;
  }
}

async function detectIpTimezone() {
  const providers = [
    {
      url: 'https://get.geojs.io/v1/ip/geo.json',
      timezone: (data: Record<string, unknown>) => data.timezone,
    },
    {
      url: 'https://ipapi.co/json/',
      timezone: (data: Record<string, unknown>) => data.timezone,
    },
  ];

  for (const provider of providers) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 4_000);
    try {
      const response = await fetch(provider.url, { signal: controller.signal });
      if (!response.ok) continue;
      const data = await response.json() as Record<string, unknown>;
      const timezone = provider.timezone(data);
      if (typeof timezone === 'string' && isValidTimezone(timezone)) return timezone;
    } catch {
      // Try the next provider, then fall back to the browser timezone.
    } finally {
      window.clearTimeout(timeout);
    }
  }

  return null;
}

function formatWindowClock(time: string, locale: string) {
  const [hour, minute] = time.split(':').map(Number);
  const date = new Date(Date.UTC(2000, 0, 1, hour, minute));
  return new Intl.DateTimeFormat(locale, {
    timeZone: 'UTC',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

function formatCountdown(milliseconds: number) {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':');
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

export default function Schedule(props: ScheduleProps) {
  const [now, setNow] = useState<Date | null>(null);
  const [deviceTimezone, setDeviceTimezone] = useState<string | null>(null);

  useEffect(() => {
    const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local timezone';
    setDeviceTimezone(browserTimezone);
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1_000);

    let active = true;
    void detectIpTimezone().then((ipTimezone) => {
      if (active && ipTimezone) setDeviceTimezone(ipTimezone);
    });

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  const currentDhakaTime = now ? dateParts(now, props.content.timezone) : null;
  const deviceTime = now && deviceTimezone ? formatClock(now, deviceTimezone, props.content.locale) : '--:--';
  const dhakaTime = now ? formatClock(now, props.content.timezone, props.content.locale) : '--:--';
  const availabilityWindow = props.content.windows[0];
  const isOnline = currentDhakaTime ? props.content.windows.some((window) => {
    if (!window.days.includes(currentDhakaTime.weekday)) return false;
    const minute = currentDhakaTime.hour * 60 + currentDhakaTime.minute;
    const [startHour, startMinute] = window.start.split(':').map(Number);
    const [endHour, endMinute] = window.end.split(':').map(Number);
    return minute >= startHour * 60 + startMinute && minute < endHour * 60 + endMinute;
  }) : false;
  const currentMinute = currentDhakaTime
    ? currentDhakaTime.hour * 60 + currentDhakaTime.minute
    : null;
  const [briefEndHour, briefEndMinute] = props.content.briefEnd.split(':').map(Number);
  const briefEndMinuteOfDay = briefEndHour * 60 + briefEndMinute;
  const [availabilityEndHour, availabilityEndMinute] = availabilityWindow?.end.split(':').map(Number) ?? [0, 0];
  const availabilityEndMinuteOfDay = availabilityEndHour * 60 + availabilityEndMinute;
  const isBriefDelay = isOnline
    ? false
    : currentMinute !== null && currentMinute >= availabilityEndMinuteOfDay && currentMinute <= briefEndMinuteOfDay;
  const availabilityStatus = !now
    ? props.checkingAvailability
    : isOnline
      ? props.availableNow
      : isBriefDelay
        ? props.briefDelay
        : props.outsideHours;
  const statusClasses = isOnline
    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'
    : isBriefDelay
      ? 'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300'
      : 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300';
  const statusDotClasses = isOnline
    ? 'animate-pulse bg-emerald-500'
    : isBriefDelay
      ? 'animate-pulse bg-orange-500'
      : 'bg-red-500';
  let localAvailabilityStart = '--';
  let localAvailabilityEnd = '--';
  if (now && deviceTimezone && availabilityWindow) {
    const today = dateParts(now, props.content.timezone);
    const [startHour, startMinute] = availabilityWindow.start.split(':').map(Number);
    const [endHour, endMinute] = availabilityWindow.end.split(':').map(Number);
    localAvailabilityStart = formatClock(zonedDateTimeToInstant(today, startHour, startMinute, props.content.timezone), deviceTimezone, props.content.locale);
    localAvailabilityEnd = formatClock(zonedDateTimeToInstant(today, endHour, endMinute, props.content.timezone), deviceTimezone, props.content.locale);
  }
  let countdown = '';
  let nextQuickResponseLocal = '';
  if (now && deviceTimezone && availabilityWindow && currentDhakaTime) {
    const [startHour, startMinute] = availabilityWindow.start.split(':').map(Number);
    const startMinuteOfDay = startHour * 60 + startMinute;
    let nextParts: DateParts = { ...currentDhakaTime };
    if (currentMinute !== null && currentMinute >= startMinuteOfDay) {
      const tomorrow = new Date(Date.UTC(nextParts.year, nextParts.month - 1, nextParts.day + 1));
      nextParts = {
        ...nextParts,
        year: tomorrow.getUTCFullYear(),
        month: tomorrow.getUTCMonth() + 1,
        day: tomorrow.getUTCDate(),
        weekday: tomorrow.getUTCDay(),
      };
    }
    const nextQuickResponse = zonedDateTimeToInstant(nextParts, startHour, startMinute, props.content.timezone);
    countdown = formatCountdown(nextQuickResponse.getTime() - now.getTime());
    nextQuickResponseLocal = formatClock(nextQuickResponse, deviceTimezone, props.content.locale);
  }

  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-slate-50/70 p-5 sm:p-7 dark:border-white/10 dark:bg-slate-900/50">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">{props.title}</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold">{props.checkingAvailability}</h2>
          
      {availabilityWindow && (
        <p className="mt-4 rounded-2xl bg-accent/8 px-4 py-3 text-xs leading-6 text-slate-600 dark:text-slate-300">
          {props.scheduleNote
            .split('{start}').join(formatWindowClock(availabilityWindow.start, props.content.locale))
            .split('{end}').join(formatWindowClock(availabilityWindow.end, props.content.locale))
            .split('{briefEnd}').join(formatWindowClock(props.content.briefEnd, props.content.locale))}
        </p>
      )}

      {now && availabilityWindow && (
            <div className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
              <p className="text-[11px] font-semibold uppercase tracking-wide">
                {isOnline ? props.availableInLabel : props.countdownLabel}
              </p>
              <p className="mt-1 font-mono text-sm font-bold">
                {isOnline
                  ? `${props.availableNow} · ${localAvailabilityStart}–${localAvailabilityEnd}`
                  : `${countdown} · ${formatWindowClock(availabilityWindow.start, props.content.locale)} Asia/Dhaka · ${nextQuickResponseLocal}`}
              </p>
            </div>
          )}
        </div>
        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${statusClasses}`}>
          <span className={`h-2 w-2 rounded-full ${statusDotClasses}`} />
          {availabilityStatus}
        </span>
      </div>

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

      {availabilityWindow && (
        <div className="mt-6 border-t border-slate-200/80 pt-5 dark:border-white/10">
          <p className="text-sm font-semibold">{props.upcomingTitle}</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/70 px-4 py-3 dark:bg-slate-950/40">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{props.dhakaColumn} · Asia/Dhaka</p>
              <p className="mt-1 text-sm font-semibold">{formatWindowClock(availabilityWindow.start, props.content.locale)} – {formatWindowClock(availabilityWindow.end, props.content.locale)}</p>
            </div>
            <div className="rounded-2xl bg-white/70 px-4 py-3 dark:bg-slate-950/40">
              <p className="truncate text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{props.localColumn} · {deviceTimezone}</p>
              <p className="mt-1 text-sm font-semibold">{localAvailabilityStart} – {localAvailabilityEnd}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
