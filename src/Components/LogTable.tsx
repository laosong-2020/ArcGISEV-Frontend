// src/components/LogTable.tsx

import React, { useEffect, useState } from 'react';

type LogType = {
  id: number;
  type: string;
  time: number;
  source: string;
  machine: string;
  user: string;
  code: string;
  message: string;
}
// TODO: add pagination, filter, search, sort, etc.
export function PortalLogTable() {
  const [logs, setLogs] = useState<LogType[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api/portal/logs`,
        {
          method: 'GET',
          credentials: 'include',
        }
      )
      if (!resp.ok) {
        return;
      }
      const respJson = await resp.json();
      const data = respJson.data;
      setLogs(data);
    }
    fetchLogs();
  }, [])
  return (
    <div className="overflow-y-auto w-full h-full">
      <table className="table table-xs table-pin-rows table-pin-cols w-full">
        <thead>
          <tr>
            <th></th>
            <td>Type</td>
            <td>Timestamp</td>
            <td className="hidden md:table-cell">Source</td>
            <td className="hidden md:table-cell">Machine</td>
            <td className="hidden md:table-cell">User</td>
            <td className="hidden md:table-cell">Code</td>
            <td className="hidden xl:table-cell">Message</td>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <th>{log.id}</th>
              <td className={
                log.type === 'SEVERE'
                  ? 'text-red-300'
                  : log.type === 'WARNING'
                  ? 'text-orange-300'
                  : ''
              }>
                {log.type}
              </td>
              <td>{new Date(log.time).toLocaleString()}</td>
              <td className="hidden md:table-cell">{log.source}</td>
              <td className="hidden md:table-cell">{log.machine}</td>
              <td className="hidden md:table-cell">{log.user}</td>
              <td className="hidden md:table-cell">{log.code}</td>
              <td className="hidden xl:table-cell">{log.message}</td>
              <th></th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ServerLogTable() {
  const [logs, setLogs] = useState<LogType[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api/server/logs`,
        {
          method: 'GET',
          credentials: 'include',
        }
      )
      if (!resp.ok) {
        return;
      }
      const respJson = await resp.json();
      const data = respJson.data;
      setLogs(data);
    }
    fetchLogs();
  }, [])
  return (
    <div className="overflow-y-auto w-full h-full">
      <table className="table table-xs table-pin-rows table-pin-cols w-full">
        <thead>
          <tr>
            <th></th>
            <td>Type</td>
            <td>Timestamp</td>
            <td className="hidden md:table-cell">Source</td>
            <td className="hidden md:table-cell">Machine</td>
            <td className="hidden md:table-cell">User</td>
            <td className="hidden md:table-cell">Code</td>
            <td className="hidden xl:table-cell">Message</td>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <th>{log.id}</th>
              <td className={
                log.type === 'SEVERE'
                  ? 'text-red-300'
                  : log.type === 'WARNING'
                  ? 'text-orange-300'
                  : ''
              }>
                {log.type}
              </td>
              <td>{new Date(log.time).toLocaleString()}</td>
              <td className="hidden md:table-cell">{log.source}</td>
              <td className="hidden md:table-cell">{log.machine}</td>
              <td className="hidden md:table-cell">{log.user}</td>
              <td className="hidden md:table-cell">{log.code}</td>
              <td className="hidden xl:table-cell">{log.message}</td>
              <th></th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}